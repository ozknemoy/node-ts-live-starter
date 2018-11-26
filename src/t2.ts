import {PrintT2Builder} from "./print-t2.class";
import * as path from "path";
import * as moment from 'moment';
import * as fs from "fs-extra";

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

export const worker = <any>{
  "id": 2,
  "number": "7513",
  "inn": null,
  "insurance": "17730795400",
  "workNature": null,
  "sex": "м",
  "name": "Евгений",
  "surname": "Агафонов",
  "middleName": "Евгеньевич",
  "foreignLanguage": null,
  "foreignLanguageGrade": null,
  "educationName": "Высшее профессиональное",
  "afterInstEduName": null,
  "profession": null,
  "phone": "8912331885",
  "workExpDate": "2017-12-02T21:00:00.000Z",
  "workHistoryFileUrl": null,
  "medicalCert": false,
  "membershipGAN": false,
  "membershipGANDate": null,
  "membershipOAN": false,
  "membershipOANDate": null,
  "medicalCertDate": null,
  "psychoCert": false,
  "psychoCertDate": null,
  "convictionCert": false,
  "disabilityDegree": "1",
  "active": true,
  "extraInfo": null,
  "createdAt": "2018-11-24T08:33:04.016Z",
  "updatedAt": "2018-11-25T06:01:22.543Z",
  "attestations": [],
  "institutions": [
    {
      "id": 340,
      "personnelId": 2,
      "name": "ГУАП",
      "docName": null,
      "docCode": null,
      "docNumber": null,
      "qualification": "радиоэлектронные системы и комплексы",
      "specialty": "инженер",
      "endDate": "2016-12-31T20:00:00.000Z"
    }
  ],
  "passport": {
    "id": 472,
    "personnelId": 2,
    "birthDate": "1993-12-15T20:00:00.000Z",
    "birthPlace": "г.Ставрополь Ставропольский Край",
    "citizenship": null,
    "maritalStatus": null,
    "number": "40 13 878114",
    "passportIssued": "ТП № 26 отдела УФМС России по СПб и ЛО",
    "passportDate": "2014-01-27T20:00:00.000Z",
    "address": "пр.Ленинский д.120 кв.198 Кировский  район",
    "addressFact": null,
    "passportRegDate": null
  },
  "families": [],
  "profRetrainings": [],
  "qualificationImprovements": [],
  "rewards": [
    {
      "id": 879,
      "personnelId": 2,
      "name": "ПочРабОбО",
      "docNumber": null,
      "docName": null,
      "docDate": null
    },
    {
      "id": 880,
      "personnelId": 2,
      "name": "ПочРабНауки",
      "docNumber": null,
      "docName": null,
      "docDate": null
    }
  ],
  "socialSecurities": [],
  "vacation": [],
  "workplaces": [
    {
      "id": 301,
      "personnelId": 2,
      "date": "2016-08-31T20:00:00.000Z",
      "department": "ОКБ РЭС",
      "specialty": "инженер 2 категории",
      "salary": null,
      "salaryCoef": null,
      "reason": "523",
      "academicCouncilDate": null,
      "attractionTerms": "основная",
      "rate": "1",
      "duration": 40,
      "category": "ИТП",
      "dismissalDate": "2016-11-19T20:00:00.000Z",
      "dismissalGround": "06-738\\16 от18.11.2016",
      "lawArticle": null,
      "contractNumber": "666\\17",
      "contractDate": "2017-12-03T20:00:00.000Z",
      "contractEndDate": "2021-09-19T20:00:00.000Z",
      "terminationReason": null,
      "soutDate": null,
      "soutClass": null,
      "active": true
    }
  ],
  "workExp": [
    {
      "id": 1423,
      "personnelId": 2,
      "amountD": 0,
      "amountM": 0,
      "amountY": 0,
      "typeId": 1
    },
    {
      "id": 1424,
      "personnelId": 2,
      "amountD": 0,
      "amountM": 0,
      "amountY": 0,
      "typeId": 2
    },
    {
      "id": 1425,
      "personnelId": 2,
      "amountD": null,
      "amountM": null,
      "amountY": null,
      "typeId": 3
    }
  ],
  "scientificInst": [],
  "academicRank": []
};

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
      console.log('-----  ok write  ----');
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