
import * as fs from "fs";
import xlsx from 'node-xlsx';
import {HandleData} from '../../staffjs/src/client/app/shared/services/handle-data';
import {IPersonnel} from "../../staffjs/src/server/components/personnel/personnel.interface";



export class ParseXls {

  static createFromFile(file) {
    const w = xlsx.parse(file)[0];
    return  this.parse( w.data[1]);
  }

  static create(excelPath = './staff.xls') {
    try {
      const w = xlsx.parse(fs.readFileSync(excelPath))[0];
      return  this.parse(w.data[1]);
    } catch (e) {
      throw new Error(e);
    }
  }

  static splitByN(_str, n, splitter = ' ') {
    const strArr = _str.split(splitter);
    let out = [];
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i]) {
        // пишем лишнее в последний элемент разбивая с помощью splitter
        if (i > n - 1) {
          out[n - 1] = out[n - 1] + splitter + strArr[i]
        } else {
          out.push(strArr[i])
        }
      } else {
        out.push('')
      }
    }
    return out
  }

  static parse(xls: string[]) {
    xls.forEach((cell, i) => {
      if(cell === '') {
        xls[i] = null
      }
    });
    const [surname, name, middleName] = this.splitByN(xls[1], 3);

    const worker: Partial<IPersonnel> = {
      number: xls[0],
      surname,
      name,
      middleName,
      inn: /*invalidINN*/(xls[2]) ? null : xls[2],
      insurance: xls[3],
      educationName: xls[13],

      workExpDate: xls[52],
      profession: xls[54],

      //afterInstEduName: xls[20],
      membershipGAN: !!xls[58],
      membershipGANDate: HandleData.ruDateToServer(xls[59]),
      membershipOAN: !!xls[60],
      membershipOANDate: HandleData.ruDateToServer(xls[61]),
      scientificRank: xls[25],
      phone: xls[85],
      medicalCert: !!xls[36],
      psychoCert: !!xls[118],
      conviction: !!xls[113],
      disabilityDegree: xls[107],
    };
    const passport: Partial<IPersonnel['passport']> = {
      birthDate: HandleData.ruDateToServer(xls[4]),
      birthPlace: xls[5],
      citizenship: xls[6],
      maritalStatus: xls[7],
      number: xls[8],
      passportIssued: xls[9],
      passportDate: HandleData.ruDateToServer(xls[10]),
      address: xls[11],
      passportRegDate: HandleData.ruDateToServer(xls[12]),
    };
    const institution: Partial<IPersonnel['institutions'][0]> = {
      name: xls[14],

      endDate: HandleData.setYear(xls[16]),
      qualification: xls[17],
      specialty: xls[18],
      docNumber: xls[19],// T
    };
    const scientificInst: Partial<IPersonnel['scientificInst'][0]> = {
      name: xls[21],
      fullInfo: xls[22],
      endDate: HandleData.setYear(xls[23]),
      specialty: xls[24],
      academicDegree: xls[111],
      scienceBranch: xls[26],
      dateAndNumber: xls[29],
      dissertationCouncil: xls[28],
    };
    const academicRank: Partial<IPersonnel['academicRank'][0]> = {
      rank: xls[112],
      specialty: xls[33],
      docNumber: xls[30],
      docDate: HandleData.ruDateToServer(xls[31]),
      appointingAuthority: xls[32],
    };
    // Z-AH пока пропустил
    const attractionTerms = xls[44] === 'Шт' ? 'основная' : (xls[44] === 'С' ? 'по совместительству' : null)
    const workplaces: Partial<IPersonnel['workplaces'][0]> = {
      date: HandleData.ruDateToServer(xls[42] || xls[56]),
      department: xls[34],
      specialty: xls[35],
      reason: xls[43] || xls[57],
      academicCouncilDate: HandleData.ruDateToServer(xls[120]),
      attractionTerms,
      rate: +xls[37],
      duration: +xls[108],
      category: xls[37],
      dismissalDate: HandleData.ruDateToServer(xls[74]),
      dismissalGround: xls[75],
      dismissalReason: xls[76],
      lawArticle: xls[77],
    };
    const workExp: Partial<IPersonnel['workExp']> = this.getWorkExp(xls, null);
    const laborContracts: Partial<IPersonnel['laborContract'][0]> = {
      number: xls[39],
      date: HandleData.ruDateToServer(xls[40]),
      endDate: HandleData.ruDateToServer(xls[41]),
      specialty: xls[35],
      department: xls[34],
      attractionTerms,
    };
    const rewards/*: Partial<IPersonnel['rewards']>*/ = this.getRewards(xls);

    return {
      worker, rewards,academicRank, passport, institution, scientificInst ,
      workplaces, workExp, laborContracts
    }
  }

  static getRewards(xls) {
    const r = [];
    if(xls[62]) r.push('ОрденаМедали');
    if(xls[64]) r.push('ВедомствНагр');
    if(xls[65]) r.push('ПремииСПб');
    if(xls[66]) r.push('ЗвЗаслужИгоспремии');
    if(xls[67]) r.push('НагрГУАП');
    if(xls[68]) r.push('ПрочиеНагр');
    if(xls[71]) r.push('РегионНагр');
    if(xls[93]) r.push('ЗаслДеятН');
    if(xls[94]) r.push('ЗаслРабВШ');
    if(xls[95]) r.push('ЗаслРабСПО');
    if(xls[96]) r.push('ЗаслЮр');
    if(xls[97]) r.push('ПочРабВПО');
    if(xls[98]) r.push('РазвНИРстуд');
    if(xls[99]) r.push('ЗаслПрофГУАП');
    if(xls[100]) r.push('ПочРабСфМолП');
    if(xls[101]) r.push('ПочРабОбО');
    if(xls[110]) r.push('ПочРабНауки');

    return r.map((name) => ({name}))
  }

  static getWorkExp(xls, personnelId): Partial<IPersonnel['workExp']> {
    return <Partial<IPersonnel['workExp']>>[{
      id: null,
      personnelId,
      typeId: 1,
      amountY: parseInt(xls[46]),
      amountM: parseInt(xls[47]),
      amountD: parseInt(xls[48]),
    },{
      id: null,
      personnelId,
      typeId: 2,
      amountY: parseInt(xls[49]),
      amountM: parseInt(xls[50]),
      amountD: parseInt(xls[51]),
    },{
      id: null,
      personnelId,
      typeId: 3,
      amountY: null,
      amountM: null,
      amountD: null,
    }]
  }
}



