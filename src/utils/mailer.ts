import {
  DOMEN_PROD, FILE_DIRECTORY, getAfterPayUrl, getForPayUrl, ORIGIN,
} from "../algo/helpers";
import {DOCX_MIME} from "../file-parse/file-parse.service";
import {logger} from "./winston-logger";
import {HttpException, HttpStatus} from "@nestjs/common";

require('dotenv').config();
const path = require('path');
const email = require("emailjs");

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const mailName = 'admn-unique-text';
class EmailSend {
  from = `${DOMEN_PROD} <${mailName}@mail.ru>`;

  private server = email.server.connect({
    user: mailName,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.mail.ru',
    ssl: true
  });

  sendFinalWithFile(to: string, fileName: string, originalName: string) {
    const html = `
    <html>
      В течении 5 дней вы можете повторно сделать обработку, изменив степень уникальности.
      <a href="${getAfterPayUrl(fileName)}" target="_blank">Повторно обработать</a>
    </html>`;
    const message = {
      //text: '',
      to,
      from: this.from,
      subject: "Ваш готовый документ с сайта " + DOMEN_PROD,
      attachment: [
        {data: html, alternative: true},
        {path: path.join(FILE_DIRECTORY, fileName), type: DOCX_MIME, name: originalName}
      ]
    };

    return this.send(message, `Инфа по файлу ${fileName} не отправлена на мыло ${to}.`)
  }

  sendBeforePay(to: string, fileName: string, originalName: string) {
    const html = `
    <html>
      Уникальность документа ${originalName} повышена. После оплаты новый документ станет доступным для скачивания и изменения уникальности. Так же он будет отправлен на указанный e-mail.
            <a href="${getForPayUrl(fileName)}" target="_blank">Перейти к оплате</a>
    </html>
    `;
    const message = {
      to,
      from: this.from,
      subject: `Ваш документ "${originalName}" успешно обработан`,
      attachment: [{data: html, alternative: true},]
    };

    return this.send(message, `Инфа по файлу ${fileName} не отправлена на мыло ${to}.`)
  }

  send(message, errorTxt: string) {
    return new Promise((res, fail) =>
      this.server.send(message, function (err, messageObj) {
        if (err) {
          logger.error(`${errorTxt} ${err.toString()}`);
          console.log('----------fail', err.toString());
          fail(new HttpException('Ошибка отправки Email', HttpStatus.BAD_GATEWAY));
        } else {
          //console.log(messageObj);
          res();
        }
      })
    )
  }
}

export const EMAIL_SEND = new EmailSend();
//EMAIL_SEND.sendFinalWithFile('ozk.nemoyy@yandex.ru', 'table-only.doc');

