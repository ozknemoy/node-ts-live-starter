import {BorderStyle, Document, Paragraph, TextRun, WidthType} from 'docx';
import {getOneOneP, addOneThreeP, makeCommonHeader, makeRequisite} from "./labor-contract-helpers.class";
import {
  addUnderlineText, emptyLine, getEmptyLinePlusText, getLRText, getTitle, maxRightTabStop, multiTab, pageMargins, redI,
  removeTableBorders,
  setStandartStyles
} from "./docx-helpers";


export class PrintLaborContractScientificBuilder2 {
  private doc = new Document({
    creator: "admin",
    title: "PrintLaborContractScientific",
    description: "PrintLaborContractScientific",
  }, pageMargins);

  constructor(private pers) {
    setStandartStyles(this.doc)
  }

  make() {
    return this
    /*.makeHeaderAndSectionOne()
    .makeSectionTwo()
      .makeSectionThree()
      .makeSectionFour()
      .makeSectionFive()
      .makeSectionSix()
      .makeSectionSeven()*/
      .makeSectionRequisite()
      .build();
  }

  private makeHeaderAndSectionOne() {
    const one =
      new Paragraph("Приложение №___")
        .right()
        .style('10')
        .addRun(new TextRun("Утверждено приказом").break())
        .addRun(new TextRun("от __________ №__________").break());
    this.doc.addParagraph(one);
    const header = new Paragraph()
      .center()
      .style('10')
      .addRun(new TextRun('Трудовой договор №____').bold().break())
      .addRun(new TextRun('с научным работником').bold().break());
    this.doc.addParagraph(header);
    makeCommonHeader(this.doc);
    const oneOne = new Paragraph()
      .style('9')
      .addRun(new TextRun('1.1. ').break())
      .addRun(new TextRun('Работодатель').bold())
      .addRun(new TextRun(' обязуется предоставить '))
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(', имеющему ученую степень ___________________________________ _______________________________________ и (или) ученое звание ___________________________________, работу в должности ведущего научного сотрудника ________________________________________________________________________________________________________,'));
    this.doc.addParagraph(oneOne);
    this.doc.addParagraph(addUnderlineText(2, 'название структурного подразделения').center());
    this.doc.addParagraph(getOneOneP());
    const _oneOne = new Paragraph('Конкретный вид поручаемой Работнику работы, ее содержание и круг трудовых обязанностей определяются должностной инструкцией, являющейся неотъемлемой частью настоящего трудового договора.')
      .style('9');
    this.doc.addParagraph(_oneOne);
    const oneTwo = new Paragraph('1.2. Основание для заключения трудового договора: ________________________________________ ____________________________________________________________________________________________________.')
      .style('9');
    this.doc.addParagraph(oneTwo);
    addOneThreeP(this.doc);
    const oneFour = new Paragraph('1.4. Трудовой договор является бессрочным/срочным в соответствии с ч. 2 ст. 59 Трудового кодекса Российской Федерации.')
      .style('9');
    this.doc.addParagraph(oneFour);
    this.doc.addParagraph(addUnderlineText(720 * 4));
    const oneEnd = new Paragraph()
      .style('9')
      .addRun(new TextRun('Дата начала работы: «____»__________ 20___ г.;'))
      .addRun(new TextRun('срок действия трудового договора: до  «____» ___________  20___ г.').break());
    this.doc.addParagraph(oneEnd);

    return this
  }

  makeSectionTwo() {
    this.doc.addParagraph(getTitle('2. Права и обязанности сторон'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('2.1. Права и обязанности работника:').break())
      .addRun(new TextRun('2.1.1. ').break())
      .addRun(new TextRun('Работник').bold())
      .addRun(new TextRun(' имеет право на:'))
      .addRun(new TextRun('- заключение, изменение и расторжение трудового договора в порядке и на условиях, установленных законодательством Российской Федерации;'))
      .addRun(new TextRun('- своевременную и в полном объеме выплату заработной платы в соответствии со своей квалификацией, сложностью труда, количеством и качеством выполненной работы;').break())
      .addRun(new TextRun('- ознакомление с показателями и критериями оценки эффективности его деятельности;').break())
      .addRun(new TextRun('- отдых, обеспечиваемый установлением сокращенной продолжительности рабочего времени, предоставлением еженедельных выходных дней, нерабочих праздничных дней, оплачиваемых ежегодных отпусков, в том числе ежегодного основного удлиненного оплачиваемого отпуска;').break())
      .addRun(new TextRun('- участие в управлении '))
      .addRun(new TextRun('Университетом').bold())
      .addRun(new TextRun(', в обсуждении вопросов, относящихся к деятельности '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(', в порядке и формах, предусмотренных законодательством Российской Федерации, Уставом '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(' и коллективным договором;').break())
      .addRun(new TextRun('- защиту своих трудовых прав, свобод и законных интересов, защиту профессиональной чести и достоинства, на справедливое и объективное расследование нарушения норм профессиональной этики;').break())
      .addRun(new TextRun('- бесплатное пользование библиотекой и информационными ресурсами, доступ к информационно-телекоммуникационным сетям и базам данных, учебным и методическим материалам, музейным фондам, материально-техническим средствам, необходимым для качественного осуществления научной или исследовательской деятельности;').break())
      .addRun(new TextRun('- бесплатное пользование образовательными, методическими и научными услугами '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(' в порядке, установленном законодательством Российской Федерации или локальными нормативными актами;'))
      .addRun(new TextRun('- свободное выражение своего мнения, свободу от вмешательства в профессиональную деятельность;').break())
      .addRun(new TextRun('- осуществление научной, научно-технической, творческой, исследовательской деятельности, участие в экспериментальной и международной деятельности, разработках и во внедрении инноваций;').break())
      .addRun(new TextRun('- объединение в общественные профессиональные организации в формах и в порядке, установленных законодательством Российской Федерации;').break())
      .addRun(new TextRun('- обращение в комиссию по урегулированию споров между участниками образовательных отношений;').break())
      .addRun(new TextRun('- иные права и свободы, предусмотренные трудовым законодательством и законодательством Российской Федерации об образовании.').break())

      .addRun(new TextRun('2.1.2. ').break())
      .addRun(new TextRun('Работник').bold())
      .addRun(new TextRun(' обязан: '))
      .addRun(new TextRun('- при заключении трудового договора предоставить ').break())
      .addRun(new TextRun('Работодателю').bold())
      .addRun(new TextRun(' полную и достоверную информацию о себе, а также предъявить необходимые документы;'))
      .addRun(new TextRun('- добросовестно исполнять трудовые обязанности в соответствии с показателями и критериями оценки эффективности его деятельности;').break())
      .addRun(new TextRun('- представлять в установленном порядке отчеты о достижении основных и дополнительных показателей и критериев оценки эффективности деятельности;').break())
      .addRun(new TextRun('- лично выполнять трудовую функцию, обусловленную настоящим трудовым договором;').break())
      .addRun(new TextRun('- своевременно извещать ').break())
      .addRun(new TextRun('Работодателя').bold())
      .addRun(new TextRun(' о невозможности по уважительной причине выполнять обусловленную трудовым договором работу;'))
      .addRun(new TextRun('- бережно относиться к имуществу Работодателя и других работников;').break())
      .addRun(new TextRun('- при нахождении на территории Университета иметь при себе пропуск и при необходимости предъявлять его;').break())
      .addRun(new TextRun('- способствовать созданию и развитию научно-педагогических школ ').break())
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(' как основы формирования интеллектуальной среды и обеспечения преемственности поколений в науке и образовании;'))
      .addRun(new TextRun('- осуществлять научное руководство проведением исследований по отдельным проблемам (темам, заданиям) науки и техники и возглавлять группу занятых ими работников или быть ответственным исполнителем отдельных заданий научно-технических программ;').break())
      .addRun(new TextRun('- разрабатывать научно-технические решения по наиболее сложным проблемам, методы проведения исследований и разработок;'))
      .addRun(new TextRun('- обосновывать направления новых исследований и разработок и методы их выполнения, вносить предложения для включения в планы научно-исследовательских работ.'))
      .addRun(new TextRun('- организовывать составление программы работ, координировать деятельность соисполнителей при совместном их выполнении с другими учреждениями (организациями), обобщать полученные результаты;'))
      .addRun(new TextRun('- определять сферу применения результатов научных исследований и разработок и организовывать практическую реализацию этих результатов;'))
      .addRun(new TextRun('- участвовать в повышении квалификации научных кадров ').break())
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(' при организации такого повышения квалификации силами '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(';'))
      .addRun(new TextRun('- заботиться о деловой репутации Университета и приумножении его авторитета;').break())
      .addRun(new TextRun('- соблюдать правовые, нравственные и этические нормы, следовать требованиям профессиональной этики;').break())
      .addRun(new TextRun('- систематически повышать свой профессиональный уровень;').break())
      .addRun(new TextRun('- проходить аттестацию на соответствие занимаемой должности;').break())
      .addRun(new TextRun('- проходить предварительные при поступлении на работу и периодические медицинские осмотры, а также внеочередные медицинские осмотры по направлению ').break())
      .addRun(new TextRun('Работодателя').bold())
      .addRun(new TextRun(';'))
      .addRun(new TextRun('- проходить обучение и проверку знаний и навыков в области охраны труда;').break())
      .addRun(new TextRun('- воздерживаться от совершения и (или) участия в совершении коррупционных правонарушений в интересах или от имени Университета;').break())
      .addRun(new TextRun('- воздерживаться от поведения, которое может быть истолковано окружающими как готовность совершить или участвовать в совершении коррупционного правонарушения в интересах или от имени Университета;').break())
      .addRun(new TextRun('- незамедлительно информировать руководство Университета о случаях склонения работника к совершению коррупционных правонарушений;').break())
      .addRun(new TextRun('- незамедлительно информировать руководство Университета о ставшей известной работнику информации о случаях совершения коррупционных правонарушений другими работниками, контрагентами Университета или иными лицами;').break())
      .addRun(new TextRun('- сообщить непосредственному начальнику или иному ответственному лицу о возможности возникновения либо возникшем у работника конфликте интересов;').break())
      .addRun(new TextRun('- соблюдать требования Устава Университета, Правил внутреннего распорядка, Правил пропускного режима, Правил пожарной безопасности и иных локальных нормативных актов, требования по охране труда и обеспечению безопасности труда, соблюдать трудовую дисциплину.').break())

      .addRun(new TextRun('2.1.3. За неисполнение либо ненадлежащее исполнение трудовых обязанностей ').break())
      .addRun(new TextRun('Работник').bold())
      .addRun(new TextRun(' несет дисциплинарную и материальную ответственность в порядке и на основаниях, предусмотренных законодательством Российской Федерации.'))


      .addRun(new TextRun('2.2. Права и обязанности ').break().break())
      .addRun(new TextRun('Работодателя:').bold())
      .addRun(new TextRun('2.2.1. ').break())
      .addRun(new TextRun('Работодатель').bold())
      .addRun(new TextRun(' имеет право:'))
      .addRun(new TextRun('- заключать, изменять и расторгать трудовой договор с ').break())
      .addRun(new TextRun('Работником').bold())
      .addRun(new TextRun(' в порядке и на условиях, установленных законодательством Российской Федерации;'))
      .addRun(new TextRun('- поощрять ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' за добросовестный эффективный труд;'))
      .addRun(new TextRun('- устанавливать показатели и критерии оценки эффективности деятельности ').break())
      .addRun(new TextRun('Работника;').bold())
      .addRun(new TextRun('- привлекать ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' к дисциплинарной и материальной ответственности в порядке, установленном законодательством Российской Федерации;'))
      .addRun(new TextRun('- принимать локальные нормативные акты;').break())
      .addRun(new TextRun('- требовать от ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' исполнения им трудовых обязанностей и бережного отношения к имуществу '))
      .addRun(new TextRun('Работодателя').bold())
      .addRun(new TextRun(' и других работников, соблюдения Правил внутреннего распорядка, иных локальных нормативных актов '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(', связанных с выполнением '))
      .addRun(new TextRun('Работником').bold())
      .addRun(new TextRun(' трудовой функции.'))

      .addRun(new TextRun('2.2.2. ').break().break())
      .addRun(new TextRun('Работодатель').bold())
      .addRun(new TextRun(' обязан:'))
      .addRun(new TextRun('- ознакомить '))
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' с Уставом '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(', Правилами внутреннего распорядка, иными локальными нормативными актами, непосредственно связанными с трудовой деятельностью '))
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(', коллективным договором; '))
      .addRun(new TextRun('- издать приказ (распоряжение) о приеме ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' на работу на условиях, предусмотренных настоящим трудовым договором;'))
      .addRun(new TextRun('- соблюдать трудовое законодательство, локальные нормативные акты, условия коллективного договора, соглашений и настоящего трудового договора;').break())
      .addRun(new TextRun('- предоставлять ').break())
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' работу, обусловленную трудовым договором;'))
      .addRun(new TextRun('- обеспечивать безопасность и условия труда, соответствующие государственным нормативным требованиям охраны труда;').break())
      .addRun(new TextRun('- обеспечивать ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' оборудованием и иными средствами, необходимыми для исполнения им трудовых обязанностей;'))
      .addRun(new TextRun('- выплачивать в полном размере причитающуюся ').break())
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' заработную плату в сроки, установленные в соответствии с законодательством Российской Федерации, коллективным договором, Положением об оплате труда и материальном стимулировании работников Университета, трудовым договором;'))
      .addRun(new TextRun('- осуществлять обязательное социальное страхование ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' в порядке, установленном федеральными законами;'))
      .addRun(new TextRun('- своевременно информировать ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' обо всех изменениях в организации учебного процесса (изменениях учебных планов и объемов нагрузки, расписания занятий и т.д.);'))
      .addRun(new TextRun('- предоставлять возможности для повышения квалификации ').break())
      .addRun(new TextRun('Работника;').bold())
      .addRun(new TextRun('- по письменному заявлению ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' не позднее трех дней выдать ему копии документов, связанных с работой (копии приказа о приеме на работу, приказов о переводах на другую работу, приказа об увольнении с работы, выписки из трудовой книжки, справки о заработной плате, периоде работы в '))
      .addRun(new TextRun('Университете').bold())
      .addRun(new TextRun(' и др.);'))
      .addRun(new TextRun('- исполнять иные обязанности, предусмотренные трудовым законодательством и иными нормативными правовыми актами, содержащими нормы трудового права, коллективным договором, соглашениями, локальными нормативными актами и настоящим трудовым договором.'))

      .addRun(new TextRun(''))

    ;
    this.doc.addParagraph(all);

    return this
  }

  makeSectionThree() {
    this.doc.addParagraph(getTitle('3. Режим рабочего времени и отдыха'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('3.1. Работнику устанавливается полная/неполная рабочая неделя с продолжительностью рабочего времени «____» часов, ').break())
      .addRun(multiTab(60).italic())
      .addRun(new TextRun('исходя из сокращённой продолжительности рабочего времени «36» часов в неделю.').break())
      .addRun(new TextRun('3.2. В рабочее время ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' включается учебная (преподавательская), воспитательная работа, индивидуальная работа с обучающимися, научная, творческая и исследовательская работа, а также другая педагогическая работа, предусмотренная трудовыми (должностными) обязанностями и (или) индивидуальным планом, - методическая, подготовительная, организационная, диагностическая, работа по ведению мониторинга, работа, предусмотренная планами воспитательных, физкультурно-оздоровительных, спортивных, творческих и иных мероприятий, проводимых с обучающимися. Соотношение учебной (преподавательской) и другой педагогической работы в пределах рабочей недели или учебного года определяется локальным нормативным актом '))
      .addRun(new TextRun('Университета.').bold())
      .addRun(new TextRun('3.3. Режим рабочего времени и времени отдыха ').break())
      .addRun(new TextRun('Работника'))
      .addRun(new TextRun(' определяется коллективным договором, правилами внутреннего распорядка, иными локальными нормативными актами '))
      .addRun(new TextRun('Университета').bold())
      .addRun(new TextRun(', трудовым договором, графиками работы и расписанием занятий.'))
      .addRun(new TextRun('3.4. ').break())
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' предоставляется ежегодный основной удлиненный оплачиваемый отпуск продолжительность которого определяется Правительством Российской Федерации и на момент заключения настоящего договора составляет 56 календарных дней.'))
      .addRun(new TextRun('3.5. Очередность предоставления оплачиваемых отпусков определяется графиком отпусков, утвержденных ').break())
      .addRun(new TextRun('Работодателем').bold())
      .addRun(new TextRun(' с учетом мнения выборного органа первичной профсоюзной организации.'));

    this.doc.addParagraph(all);
    return this
  }

  makeSectionFour() {
    this.doc.addParagraph(getTitle('4. Оплата труда и материальное стимулирование Работника'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('4.1. За выполнение трудовой функции ').break())
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' устанавливается _______ % должностного оклада (пропорционально отработанному времени) в размере ____________________ рублей.'))

      .addRun(new TextRun('4.2. ').break())
      .addRun(new TextRun('Выплаты компенсационного характера:').underline())
      .addRun(new TextRun('- выплаты работникам, занятым на тяжелых работах, работах с вредными и (или) опасными  и иными особыми условиями труда, выплаты за работу в условиях, отклоняющихся от нормальных - оформляются отдельным соглашением к Трудовому договору;').break())
      .addRun(new TextRun('- надбавки за работу со сведениями, составляющими государственную тайну, их засекречиванием и рассекречиванием, а также за работу с шифрами, - в размере _____________________________ рублей.').break())
      .addRun(new TextRun('- иные выплаты компенсационного характера: ____________________________________________________________________ ____________________________________________________________________________________________________________.').break())

      .addRun(new TextRun('4.3. Выплаты стимулирующего  характера:').break())
      .addRun(new TextRun('4.3.1. За качество выполняемых работ: за наличие _________________________________________________________').break())
      .addRun(multiTab(120, 9, 'отраслевой награды, почетного звания,'))
      .addRun(new TextRun(emptyLine).break())
      .addRun(multiTab(80, 9, 'звания «Заслуженный профессор ГУАП»'))
      .addRun(new TextRun('- в размере ____________________________ рублей.').break())
      .addRun(new TextRun('4.3.2. За интенсивность и высокие результаты работы, премиальные выплаты по итогам работы могут назначаться единовременно или на определенный срок в соответствии с Положением об оплате труда и материальном стимулировании работников ГУАП по представлению руководителя подразделения.').break())
      .addRun(new TextRun('4.3.3. Выплаты за интенсивность и высокие результаты работы также могут назначаться в зависимости от достижения основных и дополнительных показателей и критериев оценки эффективности деятельности ').break())
      .addRun(new TextRun('Работника.').bold())
      .addRun(new TextRun('4.3.4. Основные показатели и критерии оценки эффективности деятельности ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' оцениваются в баллах. При их достижении на отчетную дату '))
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' может назначаться ежемесячная выплата, размер которой определяется путем умножения количества баллов на размер выплаты за один балл, установленный локальным нормативным актом '))
      .addRun(new TextRun('Университета.').bold())
      .addRun(new TextRun('Основными показателями и критериями оценки эффективности деятельности Работника являются:').break());
    this.doc.addParagraph(all);

    const table = this.doc.createTable(6, 2);
    table.getCell(0, 0).addContent(new Paragraph()
      .addRun(new TextRun(' Наименование основного показателя и (или) критерия эффективности').bold()));
    table.getCell(0, 1).addContent(new Paragraph()
      .addRun(new TextRun(' кол-во баллов').bold()));
    table.getCell(1, 0).addContent(new Paragraph(' методическое обеспечение проводимых занятий'));
    table.getCell(1, 1).addContent(new Paragraph(' 15'));
    table.getCell(2, 0).addContent(new Paragraph(' не менее одного выступления на научных конференциях в год'));
    table.getCell(2, 1).addContent(new Paragraph(' 5'));
    table.getCell(3, 0).addContent(new Paragraph(' не менее двух научных публикаций в год'));
    table.getCell(3, 1).addContent(new Paragraph(' 5'));
    table.getCell(4, 0).addContent(new Paragraph(' надлежащее заполнение всех разделов личного кабинета преподавателя с регулярным обновлением к началу учебного семестра'));
    table.getCell(4, 1).addContent(new Paragraph(' 5'));
    table.getCell(5, 0).addContent(new Paragraph()
      .addRun(new TextRun(' Максимальное количество баллов ').bold()));
    table.getCell(5, 1).addContent(new Paragraph()
      .addRun(new TextRun(' 30').bold()));

    const threeFive = new Paragraph()
      .style('9')
      .addRun(new TextRun('4.3.5. При достижении на отчетную дату дополнительных показателей и критериев оценки эффективности деятельности ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' ему может назначаться единовременная выплата, размер которой устанавливается локальным нормативным актом '))
      .addRun(new TextRun('Университета.').bold())
      .addRun(new TextRun('Дополнительными показателями и критериями оценки эффективности деятельности ').break())
      .addRun(new TextRun('Работника').bold())
      .addRun(new TextRun(' являются:'))

      .addRun(new TextRun('-	защита штатными работниками в отчетном периоде диссертации на соискание ученой степени доктора наук;').break())
      .addRun(new TextRun('-	защита штатными работниками в отчетном периоде диссертации на соискание ученой степени кандидата наук;').break())
      .addRun(new TextRun('-	научное консультирование диссертации на соискание ученой степени доктора наук, выполненной штатными работниками ГУАП (при условии успешной защиты диссертации в отчетном периоде);').break())
      .addRun(new TextRun('-	научное руководство диссертацией на соискание ученой степени кандидата наук, выполненной штатными работниками ГУАП (при условии успешной защиты диссертации в отчетном периоде);').break())
      .addRun(new TextRun('-	публикация в изданиях, входящих в международную реферативную базу данных Scopus;').break())
      .addRun(new TextRun('-	публикация в изданиях, входящих в международную реферативную базу данных Web of Science;').break())
      .addRun(new TextRun('-	публикация в изданиях, входящих в международную реферативную базу данных European Reference Index for the Humanities; ').break())
      .addRun(new TextRun('-	патент на изобретение, полученный ГУАП;').break())
      .addRun(new TextRun('-	патент на полезную модель, полученный ГУАП;').break())
      .addRun(new TextRun('-	патент на промышленный образец, полученный ГУАП;').break())
      .addRun(new TextRun('-	заявка на выдачу патента на изобретение;').break())
      .addRun(new TextRun('-	заявка на выдачу патента на полезную модель;').break())
      .addRun(new TextRun('-	заявка на выдачу патента на промышленный образец;').break())
      .addRun(new TextRun('-	свидетельство о государственной регистрации программного обеспечения / базы данных / топологии интегральной микросхемы, полученное ГУАП;').break())
      .addRun(new TextRun('-	заявка на выдачу свидетельства о государственной регистрации программного обеспечения / базы данных / топологии интегральной микросхемы;').break())
      .addRun(new TextRun('-	заявка на участие в конкурсе в рамках Федеральной целевой программы «Исследования и разработки по приоритетным направлениям развития научно-технологического комплекса России»;').break())
      .addRun(new TextRun('-	победа в конкурсе в рамках Федеральной целевой программы «Исследования и разработки по приоритетным направлениям развития научно-технологического комплекса России»;').break())
      .addRun(new TextRun('-	заявка на участие в конкурсе в рамках проектной части государственного задания в сфере научной деятельности;').break())
      .addRun(new TextRun('-	победа в конкурсе в рамках проектной части государственного задания в сфере научной деятельности;').break())
      .addRun(new TextRun('-	победа в иных грантовых программах, в том числе международных (Российского фонда фундаментальных исследований, Российского научного фонда и т.д.).').break());
    this.doc.addParagraph(threeFive);
    return this
  }

  makeSectionFive() {
    this.doc.addParagraph(getTitle('5. Дополнительные условия'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('5.1. Условия о неразглашении ').break())
      .addRun(new TextRun('Работником').bold())
      .addRun(new TextRun(' охраняемой законом тайны (государственной, служебной, коммерческой) '))
      .addRun(new TextRun(emptyLine).break())
      .addRun(new TextRun(emptyLine).break())
      .addRun(new TextRun(emptyLine).break())
      .addRun(new TextRun(getEmptyLinePlusText('5.2. Иные условия: ')).break())
      .addRun(new TextRun(emptyLine).break())
      .addRun(new TextRun(emptyLine).break());
    this.doc.addParagraph(all);
    return this
  }

  makeSectionSix() {
    this.doc.addParagraph(getTitle('6.Изменение и прекращение трудового договора'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('6.1. Условия настоящего трудового договора могут быть изменены и (или) дополнены по соглашению ').break())
      .addRun(new TextRun('Сторон').bold())
      .addRun(new TextRun('. Любые соглашения '))
      .addRun(new TextRun('Сторон').bold())
      .addRun(new TextRun(' об изменении (дополнении) настоящего трудового договора имеют силу в случае, если они совершены в письменной форме путем составления одного документа, подписанного обеими '))
      .addRun(new TextRun('Сторонами.').bold())
      .addRun(new TextRun('6.2. Настоящий трудовой договор прекращает свое действие по основаниям, предусмотренным Трудовым кодексом Российской Федерации и иными федеральными законами.').break())
      .addRun(new TextRun('6.3. Дополнительные основания прекращения настоящего трудового договора (в соответствии со ст. 336 Трудового кодекса Российской Федерации):').break())
      .addRun(new TextRun('- повторное в течение одного года грубое нарушение Устава ').break())
      .addRun(new TextRun('Университета;').bold())
      .addRun(new TextRun('- применение, в том числе однократное, методов воспитания, связанных с физическим и (или) психическим насилием над личностью обучающегося;').break())
      .addRun(new TextRun('- неизбрание по конкурсу на должность научно-педагогического работника или истечение срока избрания по конкурсу.').break())
    ;
    this.doc.addParagraph(all);
    return this
  }

  makeSectionSeven() {
    this.doc.addParagraph(getTitle('7. Заключительные положения'));
    const all = new Paragraph()
      .style('9')
      .addRun(new TextRun('7.1. Условия труда на рабочем месте устанавливаются ').break())
      .addRun(new TextRun('Работнику').bold())
      .addRun(new TextRun(' в соответствии с требования законодательства Российской Федерации в сфере охраны труда по результатам специальной оценки условий труда и оформляются приложением к настоящему трудовому договору. '))
      .addRun(new TextRun('7.2. Трудовой договор составлен в двух экземплярах, имеющих равную юридическую силу. У каждой из ').break())
      .addRun(new TextRun('Сторон').bold())
      .addRun(new TextRun(' находится по одному экземпляру настоящего трудового договора.'));
    this.doc.addParagraph(all);
    return this
  }

  makeSectionRequisite() {
    //makeRequisite(this.doc);
    const table = this.doc.createTable(3, 3);
    table.getCell(0, 0).addContent(new Paragraph()
      .center()
      .addRun(new TextRun(' Работодатель ').bold()));
    table.getCell(0, 1).addContent(new Paragraph(' \t\t '));
    table.getCell(0, 2).addContent(new Paragraph()
      .center()
      .addRun(new TextRun(' Работник ').bold()));
    const line = '______________________________________________';
    const left = new Paragraph()
      .center()
      .addRun(new TextRun('Федеральное государственное автономное'))
      .addRun(new TextRun(' образовательное учреждение высшего образования ').break())
      .addRun(new TextRun('“Санкт-Петербургский государственный').break().bold())
      .addRun(new TextRun(' университет аэрокосмического приборостроения”').break().bold())
      .addRun(new TextRun('Адрес:  190000,  Санкт-Петербург,').break())
      .addRun(new TextRun('ул. Большая Морская, д. 67, лит. А').break())
      .addRun(new TextRun('ИНН  7812003110/КПП 783801001').break())
      .addRun(new TextRun(''))
      .addRun(new TextRun(''));


    const right = new Paragraph();

    if(true) {
      right
        .addRun(new TextRun(line))
        .addRun(new TextRun(line).break())
        .addRun(new TextRun(line).break())
        .addRun(new TextRun('                          (Фамилия, Имя, Отчество)').break());
    } else {

    }

    if(true) {
      right
        .addRun(new TextRun(line).break())
        .addRun(new TextRun('                          (дата и место рождения)').break());
    } else {

    }
    right
      .addRun(new TextRun('Почтовый индекс, адрес и телефон:').break());
    if(true) {
      right
        .addRun(new TextRun(line).break())
        .addRun(new TextRun(line).break())
        .addRun(new TextRun(line).break())
    } else {

    }
    right
      .addRun( new TextRun(
        true
          ? getEmptyLinePlusText('паспорт: серия, №  ', line)
          : ''
      ).break())
      .addRun( new TextRun(
        true
          ? getEmptyLinePlusText('выдан  ', line)
          : ''
      ).break())
      .addRun( new TextRun(
        true
          ? getEmptyLinePlusText('ИНН  ', line)
          : ''
      ).break())
      .addRun( new TextRun(
        true
          ? getEmptyLinePlusText('Св-во с/с №  ', line)
          : ''
      ).break());
    const footerL = new Paragraph()
      .addRun(new TextRun('Ректор (проректор)').break())
      .addRun(new TextRun('_______________/_________________').break());
    const footerR = new Paragraph()
      .addRun(new TextRun(`____________________ (______________________)`).break())
      .addRun(new TextRun('(подпись Работника)                       ФИО').break());

    table.getCell(1, 0).addContent(left);
    table.getCell(1, 2).addContent(right);
    table.getCell(2, 0).addContent(footerL);
    table.getCell(2, 2).addContent(footerR);
    removeTableBorders(table,3, 3);

    return this
  }

  private build() {
    return this.doc
  }
}
