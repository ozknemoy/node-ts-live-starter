import * as _ from 'lodash';

import {IPersonnel} from '../../staffjs/src/server/components/personnel/personnel.interface';
import {PrintHelpers} from '../../staffjs/src/server/components/print/print-helpers.class';
import {INSTITUTIONS_NAME} from '../../staffjs/src/shared/constants';
import {HandleData} from '../../staffjs/src/shared/handle-data';
import {
  getMarginT, marginTMd, marginTSm, makeEmptiness, underlineText, underlineFull,
  tableFontSize, defaultTableLayout, defaultFontSize
} from "./pdf-helpers";
import {log} from "util";


export class PrintT2Builder {
  private pdf = [];

  constructor(private pers: IPersonnel) {
  }

  make() {
    return this
    /*.makeHeader()
    .makeSectionFirstToSixth()
    .makeSectionSeventh()
    .makeSectionNinth()
    .makeSectionTenth()*/
      .makeSectionEleventh()
      .build();
  }

  private makeHeader() {
    const worker = this.pers;
    // https://github.com/bpampuch/pdfmake/blob/master/examples/textDecorations.js
    const name = {text: INSTITUTIONS_NAME + '\n\n', decoration: 'underline', width: '*'/*, decorationStyle: 'dashed'*/};
    const contractDate =  HandleData.where(this.pers.workplaces, 'active', true, true).contractDate;
    const tblBody = [
      HandleData.getRuDate(contractDate),
      worker.number,
      worker.inn,
      worker.insurance,
      worker.surname ? worker.surname.charAt(0) : null,
      worker.workNature,
      worker.workplaces && worker.workplaces.length ? worker.workplaces[0].attractionTerms : '',
      worker.sex
    ];
    const tbl = {
      fontSize: tableFontSize,
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 22, 'auto', 50, 'auto'],
        body: [[
          'Дата составления',
          'Табельный номер',
          'Идентификационный номер налогоплательщика',
          'Номер страхового свидетельства государственного пенсионного страхования',
          'Алфавит',
          'Характер работы',
          'Вид работы',
          'Пол',
        ], tblBody]
      },
      layout: defaultTableLayout
    };

    this.pdf.push(name);
    this.pdf.push(tbl);
    return this;
  }

  private makeSectionFirstToSixth() {
    const contractNumber =  HandleData.where(this.pers.workplaces, 'active', true, true).contractNumber;
    const contractDate =  HandleData.where(this.pers.workplaces, 'active', true, true).contractDate;
    const worker = this.pers;
    const title = {
      text: [
        {text: 'ЛИЧНАЯ КАРТОЧКА\n', fontSize: 14, bold: true},
        {text: 'работника\n\n', fontSize: 11, bold: true},
        {text: 'I. ОБЩИЕ СВЕДЕНИЯ', fontSize: 11, bold: true}
      ],
      alignment: 'center',
      margin: [0, 10]
    };
    const undertitle = [{
      table: {
        widths: ['*', 125],
        body: [
          [
            {text: 'Трудовой договор', alignment: 'right', fontSize: defaultFontSize},
            {
              fontSize: tableFontSize,
              table: {
                widths: ['50%', '50%'],
                body: [
                  ['номер', contractNumber],
                  ['дата', HandleData.getRuDate(contractDate)]
                ]
              },
              layout: defaultTableLayout
            }]
        ]
      },
      //
      // registerDefaultTableLayouts
      layout: 'noBorders'
    }];
    const mainInfo = [
      {
        columns: [
          {text: '1. Фамилия', width: 70},
          underlineText(HandleData.getUnderlined(worker.surname, 30, true)),
          {text: 'Имя', alignment: 'right', width: 65},
          underlineText(HandleData.getUnderlined(worker.name, 30, true)),
          {text: 'Отчество', alignment: 'right', width: 65},
          underlineText(HandleData.getUnderlined(worker.middleName, 23, true))
        ],
        columnGap: 5
      }, {
        text: [
          '2. Дата рождения  ',
          underlineText(HandleData.getUnderlined(worker.passport ? HandleData.getRuDate(worker.passport.birthDate) : '', 30)),
        ]
      }, {
        text: [
          '3. Место рождения  ',
          underlineText(HandleData.getUnderlined(worker.passport ? worker.passport.birthPlace : '', 70)),
        ]
      }, {
        text: [
          '4. Гражданство  ',
          underlineText(HandleData.getUnderlined(worker.passport ? worker.passport.citizenship : '', 50)),
        ]
      }, {
        text: [
          '5. Знание иностранного языка ',
          underlineText(HandleData.getUnderlined(worker.foreignLanguage, 45)),
          '  ',
          underlineText(HandleData.getUnderlined(worker.foreignLanguageGrade, 50))
        ]
      }, {
        text: [
          '6. Образование ',
          underlineText(HandleData.getUnderlined(worker.educationName, 100)),
        ]
      },
    ];

    const bodyOne = (worker.institutions || []).map((inst) => this.getEduOneTableRow(inst));
    const eduTableOne = {
      margin: [0, 20],
      fontSize: tableFontSize,
      table: {
        body: [[
          {text: 'Наименование образовательного учреждения', rowSpan: 2},
          {text: 'Документ об образовании, о квалификации или наличии специальных знаний', colSpan: 3}, {}, {},
          {text: 'Год окончания', rowSpan: 2},
          {text: 'Квалификация по документу об образовании', rowSpan: 2},
          {text: 'Направление или специальность по документу', rowSpan: 2},
        ], [
          '', 'наименование', 'серия', 'номер', '', '', '',
        ], ...PrintHelpers.addEmptyRow(bodyOne, 2, 7)]
      },
      layout: defaultTableLayout
    };
    const afterInstEduName = {
      text: [
        'Послевузовское профессиональное образование ',
        underlineText(HandleData.getUnderlined(worker.afterInstEduName, 50)),
      ]
    };
    const bodyTwo = (worker.scientificInst || []).map((inst) => this.getEduTwoTableRow(inst));
    const eduTableTwo = {
      margin: [0, 20],
      fontSize: tableFontSize,
      table: {
        body: [[
          'Наименование образовательного, научного учреждения',
          'Документ об образовании, номер, дата выдачи',
          'Год окончания',
          'Направление или специальность по документу',
        ], ...PrintHelpers.addEmptyRow(bodyTwo, 2, 4)]
      },
      layout: defaultTableLayout
    };
    this.pdf = this.pdf.concat([title, undertitle, mainInfo, eduTableOne, afterInstEduName, eduTableTwo]);

    return this;
  }

  private getEduTwoTableRow(scientificInst: IPersonnel['scientificInst'][0]) {
    return [
      scientificInst.name,
      scientificInst.fullInfo,
      HandleData.getRuDateWithoutDays(scientificInst.endDate),
      scientificInst.specialty
    ];
  }

  private getEduOneTableRow(inst: IPersonnel['institutions'][0]) {
    return [
      inst.name,
      inst.docName,
      inst.docCode,
      inst.docNumber,
      HandleData.getRuDateWithoutDays(inst.endDate),
      inst.qualification,
      inst.specialty
    ];
  }

  private makeSectionSeventh() {
    const worker = this.pers;
    const seventh = {
      margin: marginTMd,
      text: [
        '7. Профессия \t',
        {text: HandleData.getUnderlined(worker.profession, 70), decoration: 'underline'}
        ]
    };
    const workExp = HandleData.sortArrById(worker.workExp);
    const eightTitle = {
      margin: getMarginT(280),
      text: [
        `8. Стаж работы (по состоянию на ${HandleData.getRuDate(worker.workExpDate) || '“		”	          	20	 г.'}):`
      ]
    };
    const workExpUnderline = (arr) => {
      return arr.map(text => text.map(t =>
        ({alignment: 'center', width: 42, text: '\t' + t + '\t\n', decoration: 'underline'})))
    };
    const fillWorkExp = (wrkExp: IPersonnel['workExp']) => {
      const line = '\t';
      let tbl = [[], [], []];
      /// для четвертой строки пустышки
      wrkExp.push(<any>{});
      wrkExp.forEach(({amountD, amountM, amountY}: IPersonnel['workExp'][0], i) => {
        tbl[0].push(HandleData.getValidValue(amountD, line));
        tbl[1].push(HandleData.getValidValue(amountM, line));
        tbl[2].push(HandleData.getValidValue(amountY, line));
      });
      return workExpUnderline(tbl)
    };
    const workExpHandledToTable = fillWorkExp(workExp);
    const workExpTable = {
      margin: marginTSm,
      columns: [
        {
          width: 270,
          text: ['Общий\n', 'Непрерывный\n', 'Дающий право на надбавку за выслугу лет\n', '']
        }, workExpHandledToTable[0],
        {width: 40, text: Array(4).fill('дней\n')},
        workExpHandledToTable[1],
        {width: 55, text: Array(4).fill('месяцев\n')},
        workExpHandledToTable[2],
        {width: 30, text: Array(4).fill('лет\n')},
      ]
    };
    this.pdf = this.pdf.concat([seventh, eightTitle, workExpTable]);
    return this;
  }

  private makeSectionNinth() {
    const ninth = {
      margin: marginTMd,
      text: [
        `9. Состояние в браке \t\t`,
        underlineText(_.get(this.pers, 'passport.maritalStatus') || '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t')
      ]
    };
    this.pdf = this.pdf.concat([ninth]);
    return this;
  }

  private makeSectionTenth() {
    const f = this.pers.families;
    const body: (string | number)[][] = f.map((row) => [row.relationshipDegree, row.fullName, row.birthYear]);
    const tbl = {
      fontSize: tableFontSize,
      margin: [0, 15],
      table: {
        widths: [90, '*', 50],
        body: [[
          'Степень родства (ближайшие родственники)',
          'Фамилия, имя, отчество',
          'Год рождения'
        ], ...PrintHelpers.addEmptyRow(body, 5, 3)]
      },
      layout: defaultTableLayout
    };
    this.pdf.push(tbl);
    return this;
  }

  private makeSectionEleventh() {
    const tenth = {
      margin: marginTMd,
      text: [
        '11. Паспорт:	№ ',
        underlineText(_.get(this.pers, 'passport.number') || '\t\t\t\t\t\t'),
        '\tДата выдачи\t',
        underlineText(_.get(this.pers, 'passport.passportDate')? HandleData.getRuDate(this.pers.passport.passportDate) : '\t\t\t\t\t\t'),
        '\n',
        'Выдан\t',
        underlineText(HandleData.getUnderlined(_.get(this.pers, 'passport.passportIssued'), 108, true, true) || makeEmptiness(39)),
      ]
    };
    const tenthUnderline = {
      margin: [60, 0, 0, 0],
      text: [{text: '(наименование органа, выдавшего паспорт)', fontSize: 7},]
    };
    const lines = underlineFull(3, {margin: [50, 0, 0, 0],});

    const address = _.get(this.pers, 'passport.address');
    const addressFact = _.get(this.pers, 'passport.addressFact');
    const addrLength = 136;
    const addrFLength = addrLength - 45;
    const addressUndrln = underlineFull(1, {margin: [100, 0, 0, 0],});
    const addrss = [{
      margin: marginTMd,
      text: [
        '12. Адрес места жительства:\n',
        'По паспорту \t \t',
        underlineText(HandleData.getUnderlined(address, address? addrFLength : addrLength, true, true)),
      ]
    }, addressUndrln,{
      text: [
        '\nФактический\t\t',
        underlineText(HandleData.getUnderlined(addressFact, addressFact? addrFLength : addrLength, true, true)),
      ]
    }, addressUndrln
    ];
    const last = {
      margin: marginTMd,
      text: [
        `Дата регистрации по месту жительства\t`,
        underlineText(HandleData.getRuDate(_.get(this.pers, 'passport.passportRegDate')) || '“   ”\t \t\t    \tг.'),
        '\n',
        'Номер телефона ',
        underlineText(HandleData.getUnderlined(this.pers.phone, 40)),
      ]
    };


    this.pdf = this.pdf.concat([tenth, tenthUnderline, lines, ...addrss, last]);
    return this;
  }

  private build() {
    return {
      content: this.pdf,
      /*defaultStyle: {

      },*/
    };
  }
}
