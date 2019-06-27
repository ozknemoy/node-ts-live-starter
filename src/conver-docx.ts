import {
  __,
  amountLettersEnough, consoleNode,
  extendWRunWithWT, FILE_DIRECTORY, TEMP_FILE_DIRECTORY, WORKING_DIRECTORY,
  wTextTwoToWTextOne
} from "./helpers";
import {
  IJsonXml, IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun, isWTextOne,
  isWTextTwo, IWTextOne
} from "./models";
import * as path from "path";
const fs = require('fs-extra');
import JSZip = require('jszip');
import {getDummyRun, realXml} from "./mocks";
import {createWordsMap, IDummyAmount} from "./create-words-map";
import {dictWordRandom} from "./dict";
const xml2js = require('xml2js');

export class ConvertDocx {
  private originalDocxFileAsZip;

  constructor(private filePath: string, private start: number, private end: number) {}

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
        this.readDocx(realXml/*fs.readFileSync(path.join(WORKING_DIRECTORY, filePath))*/);
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
      //consoleNode(jsonXmlNoAttrs);
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
    const wordsMap = createWordsMap(jsonXmlNoAttrs, this.start, this.end, undefined);
    jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
      bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
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
              if(newWT._ === undefined) {
                // но у инстанса jsonXmlNoAttrs есть эта пустота
                const emptyValue = jsonXmlNoAttrs['w:document']['w:body'][iBodyEl]['w:p'][iP]['w:r'][iRun]['w:t'][iWT];
                if(typeof emptyValue === 'string') {
                  newWT._ = emptyValue;
                } else if(emptyValue && typeof emptyValue._ === 'string') {
                  newWT._ = emptyValue._;
                }
              }
              const originalTxtArr = __.splitWords(newWT._);
              const map: IDummyAmount = wordsMap[iP][iRun];
              console.log(map, originalTxtArr.length, newWT._);
              if(__.isInvalidPrimitive(map.from)) {
                // если мапы нет то добавляю весь newWT без разбиения
                newWR.push(extendWRunWithWT(originalRun, newWT));
              } else {
                // [текст как есть] 456 [текст как есть]
                //               1234567890
                // map.from == 0  всегда    map.to === originalTxtArr.length

                if(map.from === 0 && map.to === originalTxtArr.length) {
                  // полный отрезок
                  newWR = newWR.concat(this.pluralizeWRun(originalRun, originalTxtArr, map));
                } else if(map.from === 0) {
                  // не полный левый

                  // не менять порядок!!!
                  newWR = newWR.concat(this.pluralizeWRun(originalRun, originalTxtArr, map));
                  newWR = newWR.concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(map.to - 1).join(''))));
                } else if(map.to === originalTxtArr.length ) {
                  // не полный правый
                  // не менять порядок!!!
                  newWR = newWR.concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(0, map.to - 1).join(''))));
                  newWR = newWR.concat(this.pluralizeWRun(originalRun, originalTxtArr, map));
                } else {
                  console.log("---------------------------------ошибка алгоритма 44444444444-----------------------------------------\n", originalTxtArr, map);
                }
              }
            });
          });
          p['w:r'] = newWR;
          /*consoleNode(newWR.map(wr => {
            delete wr['w:rPr'];
            return wr
          }));*/

        } else {
          // игнор пока
        }
      })
    });
    return jsonXml
  }

  pluralizeWRun(originalRun: IRunOne , originalTxtArr: string[], map: IDummyAmount): IRunOne[] {
    let runs: IRunOne[] = [];
    originalTxtArr.forEach((originalTxt, i) => {
      // именно такое условие
      if(i >= map.from && i < map.to) {
        runs.push(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxt)));
        runs.push(getDummyRun(/*dictWordRandom()*/'777777777777'));
      }
    });
    return runs
  }

  makeDocxCopyAndPushXml(xmlStr: string) {
    // а контейнере подменяю только document.xml
    this.originalDocxFileAsZip.file('word/document.xml', xmlStr);
    this.originalDocxFileAsZip.generateAsync({type: 'uint8array'}).then((d) => {
      fs.writeFile(path.join(TEMP_FILE_DIRECTORY, this.filePath), d, ()=>{console.log('file writed ', path.join(TEMP_FILE_DIRECTORY, this.filePath));});

    });
  }

}