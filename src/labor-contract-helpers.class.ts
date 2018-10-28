import {Paragraph, TextRun, Document} from "docx";
import {
  addEmptyLineUnderlined, addEmptyLineWithTextUnderlined, addUnderlineText, getEmptyLinePlusText, getLRText,
  getTitle, redI
} from "./docx-helpers";

export function makeCommonHeader(doc: Document) {
  doc.addParagraph(
    getLRText(redI + 'Санкт-Петербург', '«___»_________20__г.')
    .style('9')
  );

  const five = new Paragraph()
    .style('9')
    .addRun(new TextRun('Федеральное государственное автономное образовательное учреждение высшего образования «Санкт-Петербургский   государственный   университет   аэрокосмического   приборостроения»,  в   лице   ректора/проректора')
      .tab()
      .break());
  doc.addParagraph(five);
  doc.addParagraph(addUnderlineText(720 * 9.5));
  addEmptyLineWithTextUnderlined(doc, 'имя ф', true, 10);
  const underFio = new Paragraph()
    .center()
    .style('8')
    .addRun(new TextRun('фамилия, имя, отчество').italic());
  doc.addParagraph(underFio);
  const six = new Paragraph()
    .style('9')
    .addRun(new TextRun('действующего на основании Устава /доверенности от_______20____  г. №________, '));
  doc.addParagraph(six);
  doc.addParagraph(addUnderlineText(720 * 3.5));
  const seven = new Paragraph()
    .style('9')
    .spacing({before: 50})
    .addRun(new TextRun('именуемое в  дальнейшем «'))
    .addRun(new TextRun('Работодатель').bold())
    .addRun(new TextRun('» или  «'))
    .addRun(new TextRun('Университет').bold())
    .addRun(new TextRun('», с одной стороны и ____________________________________'));
  doc.addParagraph(seven);
  doc.addParagraph(addEmptyLineUnderlined(true));
  doc.addParagraph(underFio);
  const eight = new Paragraph()
    .style('9')
    .spacing({before: 50})
    .addRun(new TextRun('именуемый в дальнейшем «'))
    .addRun(new TextRun('Работник').bold())
    .addRun(new TextRun('», с другой стороны, именуемые в дальнейшем «'))
    .addRun(new TextRun('Стороны').bold())
    .addRun(new TextRun('», заключили настоящий договор о нижеследующем:'));
  doc.addParagraph(eight);
  doc.addParagraph(getTitle('1. Предмет трудового договора'));

  return doc
}

const onePointOneTextChunk1 = 'обеспечить условия труда, предусмотренные трудовым законодательством и иными нормативными правовыми актами, содержащими нормы трудового права, коллективным договором, соглашениями, локальными нормативными актами и настоящим трудовым договором, своевременно и в полном размере выплачивать ';
const onePointOneTextChunk2 = ' заработную плату, а ';
const onePointOneTextChunk3 = ' обязуется лично выполнять определенную настоящим трудовым договором трудовую функцию, соблюдать правила внутреннего распорядка Университета.';

export function getOneOneP() {
  return new Paragraph()
    .style('9')
    .spacing({before: 50})
    .addRun(new TextRun(onePointOneTextChunk1))
    .addRun(new TextRun('Работнику').bold())
    .addRun(new TextRun(onePointOneTextChunk2))
    .addRun(new TextRun('Работник').bold())
    .addRun(new TextRun(onePointOneTextChunk3));

}

export function addOneThreeP(doc: Document) {
  const oneThree = new Paragraph('1.3. Трудовой договор является договором по основной работе / по совместительству.')
    .style('9');
  doc.addParagraph(oneThree);
  doc.addParagraph(addUnderlineText(720 * 6));
}

export function makeRequisite(doc: Document) {
  doc.addParagraph(getTitle('8.Реквизиты и подписи сторон'));



  doc.addParagraph(
    new Paragraph()
      .leftTabStop(6000)
      .spacing({before: 300})
      .addRun(new TextRun('Работодатель').bold())
      // правый таб обязателен. видимо из-за rightTabStop
      .addRun(new TextRun('Работник').bold().tab())
      .style('9')
  );

  const line = '______________________________________________';

  doc.addParagraph(new Paragraph()
    .leftTabStop(6000)
    .style('9')
    .addRun(new TextRun('Федеральное государственное автономное').break())
    .addRun(new TextRun(line).tab())

    .addRun(new TextRun(' образовательное учреждение высшего образования ').break())
    .addRun(new TextRun(line).tab())

    .addRun(new TextRun('“Санкт-Петербургский государственный').break().bold())
    .addRun(new TextRun(line).tab())

    .addRun(new TextRun(' университет аэрокосмического приборостроения”').break().bold())
    .addRun(new TextRun('                          (Фамилия, Имя, Отчество)').tab())

    .addRun(new TextRun('Адрес:  190000,  Санкт-Петербург,').break())
    .addRun(new TextRun(line).tab())

    .addRun(new TextRun('ул. Большая Морская, д. 67, лит. А').break())
    .addRun(new TextRun('                          (дата и место рождения)').tab())

    .addRun(new TextRun('ИНН 7812003110 / КПП 783801001').break())
    .addRun(new TextRun('Почтовый индекс, адрес и телефон:').tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(line).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(line).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(line).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(getEmptyLinePlusText('паспорт: серия, № ', line)).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(getEmptyLinePlusText('выдан  ', line)).tab())
    .addRun(new TextRun(line).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun(getEmptyLinePlusText('ИНН  ', line)).tab())
    .addRun(new TextRun('Ректор (проректор)').break())
    .addRun(new TextRun(getEmptyLinePlusText('Св-во с/с №  ', line)).tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun('').break())
    .addRun(new TextRun('_______________/_________________').break())
    .addRun(new TextRun('____________________ (______________________)').tab())
    .addRun(new TextRun('').break())
    .addRun(new TextRun('(подпись Работника)                       ФИО').tab())
  );


  const one = new Paragraph('С Уставом, Правилами внутреннего распорядка, Правилами пропускного режима Университета, коллективным договором, правилами техники безопасности, правилами пожарной безопасности, требованиями по охране труда ознакомлен: ')
    .style('8')
    .spacing({before: 200})
  ;
  doc.addParagraph(one);
  const two = new Paragraph()
    .style('8')
    .right()
    .addRun(new TextRun('____________________(__________________)'))
    .addRun(new TextRun(' подпись Работника              ФИО      \t').break())
  ;
  doc.addParagraph(two);
  const three = new Paragraph()
    .style('8')
    .addRun(new TextRun('Экземпляр трудового договора на руки получил: ____________________(__________________)'))
    .addRun(new TextRun('\t\t\t                                         подпись Работника              ФИО').break())
  ;
  doc.addParagraph(three);



  return this
}