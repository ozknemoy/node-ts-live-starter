import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IFileUpload} from "../types/file-upload";
import {ConvertDocx} from "../algo/conver-docx";

@Injectable()
export class FileParseService {
  docxMime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  uniqueize(file: IFileUpload, from: number, to: number): string {
    this.checkDocx(file, from, to);
    // сохранить во временную папку

    // отправить письмо
    return 'Hello World!';
  }

  private checkDocx(file: IFileUpload, from: number, to: number) {
    if(!file || Number.isNaN(from) || Number.isNaN(to)) {
      return new HttpException('Кривой запрос dev', HttpStatus.BAD_REQUEST);
    } else if(file.mimetype !== this.docxMime) {
      return new HttpException('Кривой формат. Загружать можно только DOCX', HttpStatus.BAD_REQUEST);
    } else if(file.size > 20 * 1024 * 1024) {
      return new HttpException('Слишком большой файл', HttpStatus.BAD_REQUEST);
    }
  }

  uniqueizeFree(file: IFileUpload, from: number, to: number) {
    const error = this.checkDocx(file, from, to);
    return error
      ? Promise.reject(error)
      : new ConvertDocx('s оригинал.docx', 3, 85).createFree(file.buffer);
  }
}
