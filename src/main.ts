
console.log('start');

const faker:Faker.FakerStatic = require('faker/locale/ru');


//import {HandleData} from '../../staffjs/src/shared/handle-data';
import {IPersonnel} from "../../staffjs/src/server/components/personnel/personnel.interface";
function past(years?: number) {
  return faker.date.past(years).toISOString()
}

function between(from: number, to: number) {
  let _from = faker.date.recent(100);
  _from.setFullYear(2018 - from);
  _from.toISOString();
  let _to = faker.date.future(0.01);
  _to.setFullYear(2018 - to);
  return faker.date.between(_from, _to).toISOString();
}

console.log(between(20, 11));
export class FakePersonnel {
  static create() {
    let ret = [];
    for (var i = 0; i < 1; i++) {
      ret.push(FakePersonnel.build())
    }
    return ret
  }
  static build() {

    const [surname, name] = faker.name.findName().split(' ');

    const worker: Partial<IPersonnel> = {
      number: faker[0],
      surname,
      name,
      middleName: faker.lorem.word(),
      inn: faker.lorem.word(),
      insurance: faker.random.uuid(),
      educationName: faker.lorem.word(),

      workExpDate: faker.date.recent().toISOString(),
      profession: faker.name.jobType(),

      afterInstEduName: faker.lorem.word(),
      membershipGAN: faker.random.boolean(),
      membershipGANDate: past(5),
      membershipOAN: faker.random.boolean(),
      membershipOANDate: past(5),
      phone: faker.phone.phoneNumber(),
      medicalCert: faker.random.boolean(),
      psychoCert: faker.random.boolean(),
      convictionCert: faker.random.boolean(),
      disabilityDegree: faker.lorem.words(),
    };
    const passport: Partial<IPersonnel['passport']> = {
      birthDate: between(80, 20),
      birthPlace: faker[5],
      citizenship: faker[6],
      maritalStatus: faker[7],
      number: faker.random.uuid().slice(4, 15),
      passportIssued: faker[9],
      passportDate: between(30, 11),
      address: `${faker.address.zipCode()}, ${faker.address.city()} ${faker.address.streetName()}  ${faker.address.streetAddress()} `,
      passportRegDate: between(20, 11),
    };
    // https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#date
    console.log(passport);
    /*const institution: Partial<IPersonnel['institutions'][0]> = {
      name: faker[14],

      endDate: HandleData.setYear(faker[16]),
      qualification: faker[17],
      specialty: faker[18],
      docNumber: faker[19],// T
    };
    const scientificInst: Partial<IPersonnel['scientificInst'][0]> = {
      name: faker[21],
      fullInfo: faker[22],
      endDate: HandleData.setYear(faker[23]),
      specialty: faker[24],
      academicDegree: faker[111],
      scienceBranch: faker[26],
      dateAndNumber: faker[29],
      dissertationCouncil: faker[28],
    };
    const academicRank: Partial<IPersonnel['academicRank'][0]> = {
      rank: faker[112],
      specialty: faker[33],
      docNumber: faker[30],
      docDate: HandleData.ruDateToServer(faker[31]),
      appointingAuthority: faker[32],
    };

    const workplaces: Partial<IPersonnel['workplaces'][0]> = {
      date: HandleData.ruDateToServer(faker[42] || faker[56]),
      department: faker[34],
      specialty: faker[35],
      reason: faker[43] || faker[57],
      academicCouncilDate: HandleData.ruDateToServer(faker[120]),
      attractionTerms,
      rate: +faker[37],
      duration: +faker[108],
      category: faker[37],
      dismissalDate: HandleData.ruDateToServer(faker[74]),
      dismissalGround: faker[75],
      lawArticle: faker[77],
    };
    const workExp: Partial<IPersonnel['workExp']> = this.getWorkExp(faker, null);
    const laborContracts: Partial<IPersonnel['laborContract'][0]> = {
      number: faker[39],
      date: HandleData.ruDateToServer(faker[40]),
      endDate: HandleData.ruDateToServer(faker[41]),
      specialty: faker[35],
      department: faker[34],
      attractionTerms,
    };
    const rewards/!*: Partial<IPersonnel['rewards']>*!/ = this.getRewards(faker);

    return {
      worker, rewards,academicRank, passport, institution, scientificInst ,
      workplaces, workExp, laborContracts
    }*/
  }

  static getRewards(faker) {
    const r = [];
    if(faker[62]) r.push('ОрденаМедали');
    if(faker[64]) r.push('ВедомствНагр');
    if(faker[65]) r.push('ПремииСПб');
    if(faker[66]) r.push('ЗвЗаслужИгоспремии');
    if(faker[67]) r.push('НагрГУАП');
    if(faker[68]) r.push('ПрочиеНагр');
    if(faker[71]) r.push('РегионНагр');
    if(faker[93]) r.push('ЗаслДеятН');
    if(faker[94]) r.push('ЗаслРабВШ');
    if(faker[95]) r.push('ЗаслРабСПО');
    if(faker[96]) r.push('ЗаслЮр');
    if(faker[97]) r.push('ПочРабВПО');
    if(faker[98]) r.push('РазвНИРстуд');
    if(faker[99]) r.push('ЗаслПрофГУАП');
    if(faker[100]) r.push('ПочРабСфМолП');
    if(faker[101]) r.push('ПочРабОбО');
    if(faker[110]) r.push('ПочРабНауки');

    return r.map((name) => ({name}))
  }

  static getWorkExp(faker, personnelId): Partial<IPersonnel['workExp']> {
    return <Partial<IPersonnel['workExp']>>[{
      id: null,
      personnelId,
      typeId: 1,
      amountY: parseInt(faker[46]),
      amountM: parseInt(faker[47]),
      amountD: parseInt(faker[48]),
    },{
      id: null,
      personnelId,
      typeId: 2,
      amountY: parseInt(faker[49]),
      amountM: parseInt(faker[50]),
      amountD: parseInt(faker[51]),
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

console.log(FakePersonnel.create());
