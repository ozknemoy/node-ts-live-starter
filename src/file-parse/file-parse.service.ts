import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IFileUpload} from "../types/file-upload";
import {ConvertDocx} from "../algo/conver-docx";
import {FILE_DIRECTORY, getFileHash, getForPayUrl} from "../algo/helpers";
import * as path from "path";
import DocxFile from "../bd/docx-file.model";
import {EMAIL_SEND} from "../utils/mailer";
import {IDocxFile} from "../bd/docx-file.interface";
import * as Bluebird from "bluebird";
import {getFileParseError} from "../algo/create-words-map";
import {logger} from "../utils/winston-logger";

const fs = require('fs-extra');


export const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

@Injectable()
export class FileParseService {

  uniquelize(file: IFileUpload, from: number, to: number, email: string) {
    const error = this.checkDocx(file, from, to);
    if (error) return Promise.reject(error);
    if (!email) {
      return Promise.reject(new HttpException('Не верный Email', HttpStatus.BAD_REQUEST));
    }
    return new Promise(async (res, fail) => {
      const buffer = new ConvertDocx(from, to).create(file.buffer);
      // если нормально обработался
      if (!!buffer) {
        const fileName = getFileHash(file.buffer);
        // сначала отправляю письмо
        try {
          await EMAIL_SEND.sendBeforePay(email, fileName, file.originalname);
        } catch(e) {
          fail(e)
        }
        // если отправилось то сохраняю
        const filePath = path.join(FILE_DIRECTORY, fileName);
        fs.writeFile(filePath, file.buffer, (err, d) => {
          if (err) {
            logger.error(err);
            fail(new HttpException('Ошибка записи файла. Попробуйте ещё раз', HttpStatus.CONFLICT));
          }

          this.addNewRowOrUpdate(fileName, file.originalname, email)
            .then(() => res(getForPayUrl(fileName)), (e) => fail(e))
        })
      } else {
        fail(getFileParseError())
      }
    });

  }

  getFileRowDB(hash: string): Bluebird<DocxFile> {
    return DocxFile.findOne({where: {hash}})
  }

  async addNewRowOrUpdate(hash, orginalName, email) {
    const row = await this.getFileRowDB(hash);
    return row
      // если человек снова загрузил тот же файл
      ? row.update(new IDocxFile(row.id, hash, orginalName, email))
      : DocxFile.create(new IDocxFile(undefined, hash, orginalName, email))
  }

  private checkDocx(file: IFileUpload, from: number, to: number) {
    if (!file || Number.isNaN(from) || Number.isNaN(to)) {
      return new HttpException('Кривой запрос', HttpStatus.BAD_REQUEST);
    } else if (file.mimetype !== DOCX_MIME) {
      return new HttpException('Кривой формат. Загружать можно только DOCX', HttpStatus.BAD_REQUEST);
    } else if (file.size > 20 * 1024 * 1024) {
      return new HttpException('Слишком большой файл', HttpStatus.BAD_REQUEST);
    }
  }

  uniquelizeFree(file: IFileUpload, from: number, to: number) {
    const error = this.checkDocx(file, from, to);
    return error
      ? Promise.reject(error)
      : new ConvertDocx(from, to).createFree(file.buffer);
  }

  getExeption() {
    return new HttpException('Такого документа не существует', HttpStatus.BAD_REQUEST)
  }

  async reuniquelize(from: number, to: number, fileName: string) {
    const row = await this.getFileRowDB(fileName);
    if (!row) {
      throw this.getExeption()
    }
    return new Promise((res, fail) => {
      fs.readFile(path.join(FILE_DIRECTORY, fileName), async (err, buffer) => {
        if (err) fail(this.getExeption());
        const file = new ConvertDocx(from, to).create(buffer);
        await row.update({parsed: row.parsed + 1});
        res(file);
      })
    });
  }

  async pay(hash) {
    const row = await this.getFileRowDB(hash);
    await row.update({payed: true});
    return EMAIL_SEND.sendFinalWithFile(row.email, row.hash, row.name)
  }
}
