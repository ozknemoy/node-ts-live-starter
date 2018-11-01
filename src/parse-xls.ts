
import * as fs from "fs";
import xlsx from 'node-xlsx';
import {HandleData} from '../../staffjs/src/client/app/shared/services/handle-data';
import {INodeXlsxParsed} from "../../staffjs/src/server/interfaces/node-xlsx";
import {IPersonnel, IPersonnelAdapter} from "../../staffjs/src/server/components/personnel/personnel.interface";



export class ParseXls {

  constructor() {

  }

  static create(personnelId, excelPath = './src/staff.xls') {
    const w = xlsx.parse(fs.readFileSync(excelPath))[0];
    return  ParseXls.parse(personnelId, w.data[1]);
  }

  static splitByN(_str, n, splitter = ' ') {
    const strArr = _str.split(splitter);
    let out = [];
    for (let i = 0; i < n; i++) {
      if(strArr[i]) {
        out.push(strArr[i])
      } else {
        out.push('')
      }
    }
    return out
  }

  static parse(personnelId: number, xls: string[]) {
    const [name, surname, middleName] = ParseXls.splitByN(xls[1], 3);

    const worker: Partial<IPersonnel> = {
      number: xls[0],
      surname,
      name,
      middleName,
      inn: xls[4],
      insurance: xls[5],
      passport: {
        birthDate: xls[6],
        birthPlace: xls[7],
        citizenship: xls[8],
        maritalStatus: xls[9],
        number: xls[10],
        passportIssued: xls[11],
        passportDate: xls[12],
        address: xls[13],
        passportRegDate: xls[14],
      },
      educationName: xls[15],
      institutions: /*<Partial<IPersonnel['institutions']>>*/[{
        /*id: null,
        docName: null,*/
        personnelId,
        name: xls[16],

        endDate: ParseXls.setYear(xls[18]),
        qualification: xls[19],
        specialty: xls[20],
        docNumber: xls[21],// T
      }]
    };


    return worker
  }

  static setYear(year) {
    if(!year) return null;
    const d = new Date();
    d.setFullYear(year, 1, 1);
    return HandleData.dateToServer(d.toString())
  }

}



