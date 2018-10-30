import JSZip = require("jszip");


const jszip = require("jszip");
import * as fs from 'fs'


export class MergeDocx {
  private dictName = 'merge-docx';
  private fileName = 'docx';
  private fileExt = '.docx';
  private bodyTag = '</w:body>';
  private bodyTagRegexp = /<\/?w:body>/;
  private prefsTag = '<w:sectPr>';
  private prefsTagRegexp = /<w:sectPr.*<\/w:sectPr>/;
  private xmlBodyPath = 'word/document.xml';

  constructor() {

  }

   prepare() {
     const os = require('os');

     console.log(os.hostname());
  }

  zip() {
    let zip = new jszip();
    zip.file("file.txt", "content");
    zip.file("hello.txt", "Hello World\n");
    zip.generateAsync({type: "uint8array"}).then((d) => {
      fs.writeFileSync('z.zip', d)
    });
    /*zip
      .generateNodeStream({type:'nodebuffer',streamFiles:true})
      .pipe(fs.createWriteStream('out.zip'))
      .on('finish', function () {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
        console.log("out.zip written.");
      });*/
  }

  unzip() {

  }

  work() {
    /*const str = '<w:sectPr w:rsidR="00C1549D"><w:headerReference w:type="default" r:id="rId7"/><w:footerReference w:type="default" r:id="rId8"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="-500" w:right="500" w:bottom="-100" w:left="500" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr>';
    console.log(this.prefsTagRegexp.test(str));
    console.log(this.prefsTagRegexp.test(str));*/
    //console.log((str+'1').replace(this.prefsTagRegexp, ''));
    this.mergeFileFromZip('doc-dev.docx', 'second.docx', '')
  }

  async putDataToZip(content: string, zipName: string, fileName: string) {
    let zip = new jszip();
    zip.file(fileName + '.txt', content);
    fs.writeFileSync(zipName + '.zip', await zip.generateAsync({type: 'uint8array'}))
  }

  async getFileFromZip(path: string, pathTargetFileInZip = this.xmlBodyPath): Promise<[string, JSZip]> {
    let zip = new jszip();
    const file = fs.readFileSync(path);
    const readed = await zip.loadAsync(file);
    const content = await readed.file(pathTargetFileInZip).async('string');
    return [content, zip];
  }

  async mergeFileFromZip(pathOne: string, pathTwo: string, pathTarget) {
    const [firstContent, zip] = await this.getFileFromZip(pathOne);
    const [secondContent] = await this.getFileFromZip(pathTwo);
    // беру только тело
    const secondBody = secondContent.split(this.bodyTagRegexp)[1];
    // откидываю настройки
    const secondBodyNoPrefs = secondBody.replace(this.prefsTagRegexp, '');
    //console.log(secondBodyNoPrefs);
    // вставляю тело перед настройками первого докс
    const firstBody = firstContent.replace(this.prefsTag, secondBodyNoPrefs + this.prefsTag);

    zip.file(this.xmlBodyPath, firstBody);
    zip.generateAsync({type: "uint8array"}).then((d) => {
      fs.writeFileSync('merged.docx', d)
    });
    //readed.remove('word/footnotes.xml');
    //console.log(Object.keys(readed.files).length);

    //fs.writeFileSync(pathTarget, d);
    //console.log(d);
    //this.putDataToZip(d + '_copy', 'new', '1');
  }
}