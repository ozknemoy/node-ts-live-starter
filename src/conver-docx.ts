import {
  amountLettersEnough, consoleNode,
  extendWRunWithWT, FILE_DIRECTORY, pluralizeWRun, TEMP_FILE_DIRECTORY, WORKING_DIRECTORY,
  wTextTwoToWTextOne
} from "./helpers";
import {
  IJsonXml, IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun, isWTextOne,
  isWTextTwo
} from "./models";
import * as path from "path";
const fs = require('fs-extra');
import JSZip = require('jszip');
import {realXml} from "./mocks";
const xml2js = require('xml2js');

export class ConvertDocx {
  private originalDocxFileAsZip;

  constructor(private filePath: string) {}

  create() {
    fs.readFile(path.join(FILE_DIRECTORY, this.filePath), (err, file) => {
      if(err) throw new Error('ошибка чтения файла');
      // https://stuk.github.io/jszip/documentation/howto/read_zip.html
      JSZip.loadAsync(file).then((originalDocxFileAsZip) => {
        this.originalDocxFileAsZip = originalDocxFileAsZip;
        originalDocxFileAsZip.file('word/document.xml').async('string').then((docXml) => {
          this.readDocx(docXml);
        });
      });
    });
  }

  createTest(filePath: string) {
    // беру тестовый докс в который позже сделаю инжект
    fs.readFile(path.join(FILE_DIRECTORY, this.filePath), (err, file) => {
      if(err) throw new Error('ошибка чтения файла');
      // https://stuk.github.io/jszip/documentation/howto/read_zip.html
      JSZip.loadAsync(file).then((originalDocxFileAsZip) => {
        this.originalDocxFileAsZip = originalDocxFileAsZip;
        this.readDocx(/*realXml*/fs.readFileSync(path.join(WORKING_DIRECTORY, filePath)));
      });
    });
  }

  getStats(originalDocxFileAsZip) {
    originalDocxFileAsZip.file('docProps/app.xml').async('string').then((docPropsXml) => {
      xml2js.parseString(docPropsXml, {ignoreAttrs : true}, (err, jsonXmlNoAttrs) => {
        consoleNode(jsonXmlNoAttrs.Properties);
      });
    });
  }

  readDocx(xmlStr: string) {
    xml2js.parseString(xmlStr, {ignoreAttrs : true}, (err, jsonXmlNoAttrs: IJsonXml) => {
      consoleNode(jsonXmlNoAttrs);
      xml2js.parseString(xmlStr, (err, jsonXml: IJsonXml) => {
        //console.log(jsonXml);
        const parsedJsonXml = this.parseXml(jsonXml, jsonXmlNoAttrs);
        const builder = new xml2js.Builder({renderOpts: {pretty: false}});
        const xml = builder.buildObject(parsedJsonXml);
        //console.log(xml);
        this.makeDocxCopyAndPushXml(xml);
      });
    });
  }

  parseXml(jsonXml: IJsonXml, jsonXmlNoAttrs: IJsonXml) {
    jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
      bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
        //consoleNode(p);
        if(isParagraphOneWithWRun(p)) {
          let newWR: IRunOne[] = [];
          p['w:r'].forEach((run: IRunOne, iRun)=> {
            run['w:t'].forEach((wT, iWT) => {
              const originalRun: IRunOne = {...run};
              let newWT;
              if(isWTextTwo(wT)){
                // преобразую в RunOne
                newWT = wTextTwoToWTextOne(wT);
              } else if(isWTextOne(wT)) {
                newWT = wT;
              }
              // плагин не записал в свойство _ пустоту в теге <w:t xml:space='preserve'> </w:t>
              // PR https://github.com/Leonidas-from-XIV/node-xml2js/pull/512
              if(newWT._ === undefined) {
                // но у инстанса jsonXmlNoAttrs есть эта пустота
                const emptyValue = jsonXmlNoAttrs['w:document']['w:body'][iBodyEl]['w:p'][iP]['w:r'][iRun]['w:t'][iWT];
                if(typeof emptyValue === 'string') {
                  newWT._ = emptyValue;
                } else if(emptyValue && typeof emptyValue._ === 'string') {
                  newWT._ = emptyValue._;
                }
              }
              if(amountLettersEnough(newWT._)) {
                // разбиваю run
                newWR = newWR.concat(pluralizeWRun(originalRun, newWT));
              } else {
                newWR.push(extendWRunWithWT(originalRun, newWT));
              }
            });
          });
          p['w:r'] = newWR;
        } else {
          // игнор пока
        }
      })
    });
    return jsonXml
  }

  makeDocxCopyAndPushXml(xmlStr: string) {
    // а контейнере подменяю только document.xml
    this.originalDocxFileAsZip.file('word/document.xml', xmlStr);
    this.originalDocxFileAsZip.generateAsync({type: 'uint8array'}).then((d) => {
      fs.writeFile(path.join(TEMP_FILE_DIRECTORY, this.filePath), d, ()=>{console.log('file writed');});

    });
  }

}