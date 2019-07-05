import {TEMP_FILE_DIRECTORY} from "../algo/helpers";
import {DOCX_MIME} from "../file-parse/file-parse.service";
import {logger} from "./winston-logger";

require('dotenv').config();
const path = require('path');
const email = require("emailjs");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = email.server.connect({
  user: "ozk.nemoy",
  password: process.env.EMAIL_PASSWORD,
  host: "smtp.mail.ru",
  ssl: true
});

function sendEmailWithFile(to, fileName) {
  const message = {
    text: "В течении 5 дней вы можете повторно сделать обработку, изменив степень уникальности",
    to,
    from: "admin <ozk.nemoy@mail.ru>",
    //cc: "",
    subject: "Документ с сайта " + process.env.DOMEN,
    attachment:
      [
        //{data: "<html>i <i>hope</i> this works!</html>", alternative: true},
        {path: path.join(TEMP_FILE_DIRECTORY, fileName), type: DOCX_MIME, name: fileName}
      ]
  };

// send the message and get a callback with an error or details of the message that was sent
  server.send(message, function (err, message) {
    if(err) {
      logger.error(`Инфа по файлу ${fileName} не отправлена на мыло ${to}. ${err.toString()}`)
    } else {
      console.log(message);
    }

  });

// you can continue to send more messages with successive calls to 'server.send',
// they will be queued on the same smtp connection

// or you can create a new server connection with 'email.server.connect'
// to asynchronously send individual emails instead of a queue
}


sendEmailWithFile('ozk.nemoyy@yandex.ru', 'table-only.doc');

