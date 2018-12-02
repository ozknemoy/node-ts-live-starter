import {PrintT2Builder} from "./print-t2.class";
import * as path from "path";
import * as moment from 'moment';
import * as fs from "fs-extra";
import {worker} from "./worker";

const fontsDir = './src/fonts';
const fontDescriptors = {
  Roboto: {
    normal: path.resolve(fontsDir + '/Roboto-Regular.ttf'),
    bold: path.resolve(fontsDir + '/Roboto-Medium.ttf'),
    italics: path.resolve(fontsDir + '/Roboto-Italic.ttf'),
    bolditalics: path.resolve(fontsDir + '/Roboto-MediumItalic.ttf')
  }
};

export const tempDirForTesting = () => `${fs.existsSync('E:/') ? 'E' : 'C'}:/files/`;
const PdfPrinter = require('pdfmake');


const pdfSchema = new PrintT2Builder(worker).make();


const printer = new PdfPrinter(fontDescriptors);
printPdf(printer.createPdfKitDocument(pdfSchema));


function printPdf(doc) {
  return new Promise((res) => {
    const chunks = [];
    doc
      .on('data', chunk => {
        chunks.push(chunk);
      })
      .on('end', () => {
        const result = Buffer.concat(chunks);
        saveExactNameOrWithTimestampLocal(tempDirForTesting(), 't2-dev', '.pdf', result);
        res(result);
      })
      .end();
  });
}

function saveExactNameOrWithTimestampLocal(dir: string, name: string, ext: string, buffer: Object) {
  console.log('-----  ok make  -----');
  // пробую писать
  fs.ensureDirSync(dir);
  fs.writeFile(dir + name + ext, buffer, (e) => {
    if (e) {
      console.log('*****    ', e.code, '  make with timestamp  *****');
      // при неудаче добавляю Timestamp
      fs.writeFileSync(`${dir}${name}-${ +new Date}${ext}`, buffer);
    } else {
      console.log(`-----  ok write  to  ${dir}----`);
      // при удаче удаляю файлы с номерами
      fs.readdir(dir, (_e, files) => {
        if (files.length) {
          files.forEach(fileName => {
            if (fileName.indexOf(name + '-') > -1) {
              fs.unlink(dir + fileName, () => {})
            }
          })
        }
      })
    }
  });
}