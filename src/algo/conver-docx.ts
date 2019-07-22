import {
  __,
  consoleNode,
  extendWRunWithWT, FILE_DIRECTORY, FREE_WORD_AMOUNT, TEMP_FILE_DIRECTORY,
  wTextTwoToWTextOne
} from "./helpers";
import {
  IJsonXml, IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun, isRunWithWT, isWTextOne,
  isWTextTwo
} from "./models";
import * as path from "path";
const fs = require('fs-extra');
import JSZip = require('jszip');
import {getDummyRun, realXml} from "./mocks";
import {createWordsMap, IDummyAmount} from "./create-words-map";
import {dictWordRandom} from "./dict";
import {HttpException, HttpStatus} from "@nestjs/common";
const xml2js = require('xml2js');

export interface IDocxStats {
  Template: [string],
  TotalTime: [string],
  Pages: [string],
  Words: [string],
  Characters: [string],
  Application: [string],
  DocSecurity: [string],
  Lines: [string],
  Paragraphs: [string],
  ScaleCrop: [string],
  Company: [string],
  LinksUpToDate: [string],
  CharactersWithSpaces: [string],
  SharedDoc: [string],
  HyperlinksChanged: [string],
  AppVersion: [string]
}

export class ConvertDocx {
  private originalDocxFileAsZip;

  constructor(private start: number, private end: number) {}

  /*createOld() {
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
  }*/

  public createFree(file) {
    return new Promise((res, fail) =>
      JSZip.loadAsync(file).then((originalDocxFileAsZip) => {
        this.originalDocxFileAsZip = originalDocxFileAsZip;
        originalDocxFileAsZip.file('word/document.xml').async('string').then((docXml) =>
          this._getStats(docXml).then((wordsAmount: number) => {
            if(wordsAmount <= FREE_WORD_AMOUNT) {
              res(this.readDocx(docXml))
            } else {
              fail(new HttpException(`Документ содержит более ${FREE_WORD_AMOUNT} слов (удалите ${wordsAmount - FREE_WORD_AMOUNT} и попробуйте заново)`, HttpStatus.NOT_ACCEPTABLE))
            }
          },
            (e) => fail(e)
          )
        );
      })
    );
  }

  public create(file: Buffer) {
    return new Promise((res, fail) =>
      JSZip.loadAsync(file).then((originalDocxFileAsZip) => {
        this.originalDocxFileAsZip = originalDocxFileAsZip;
        originalDocxFileAsZip.file('word/document.xml').async('string').then((docXml) => {
          res(this.readDocx(docXml))
      });
      },(e) => fail(e))
    );
  }

  private checkParseDocxError(err, failPromise) {
    if(err) failPromise(err)
  }

  private _getStats(docXml: string) {
    return new Promise((res, fail) =>
      xml2js.parseString(docXml, (err, jsonXml: IJsonXml) => {
        this.checkParseDocxError(err, fail);
        res(createWordsMap(jsonXml, this.start, this.end, undefined)[1]);
      })
    )
  }

  // берет числа самого файла. но майкрософт врёт
  // @deprecated
  private getStatsOld(originalDocxFileAsZip) {
    return new Promise((res, fail) =>
      originalDocxFileAsZip.file('docProps/app.xml').async('string').then((docPropsXml) => {
        xml2js.parseString(docPropsXml, {ignoreAttrs : true}, (err, jsonXmlNoAttrs) => {
          res(jsonXmlNoAttrs.Properties);
        });
      })
    )
  }

  readDocx(xmlStr: string) {
    return new Promise((res, fail) =>
      xml2js.parseString(xmlStr, {ignoreAttrs : true}, (err, jsonXmlNoAttrs: IJsonXml) => {
        xml2js.parseString(xmlStr, (err, jsonXml: IJsonXml) => {
          const parsedJsonXml = this.parseXml(jsonXml, jsonXmlNoAttrs);
          const builder = new xml2js.Builder({renderOpts: {pretty: false}});
          const xmlStr = builder.buildObject(parsedJsonXml);
          // а контейнере подменяю только document.xml
          this.originalDocxFileAsZip.file('word/document.xml', xmlStr);
          this.originalDocxFileAsZip.generateAsync({type: 'uint8array'})
            .then(Buffer.from)
            .then((d) => res(d));
        });
      })
    )

  }

  parseXml(jsonXml: IJsonXml, jsonXmlNoAttrs: IJsonXml) {
    try {
    const wordsMap = createWordsMap(jsonXmlNoAttrs, this.start, this.end, undefined)[0];
    jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
      if(!bodyEl['w:p']) return;
      bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
        if(isParagraphOneWithWRun(p)) {
          let newWR: IRunOne[] = [];
          p['w:r'].forEach((run: IRunOne, iRun)=> {
            // если у ран нет текста то просто копирую его без обработки
            if(!isRunWithWT(run)) {
              return newWR.push(run);
            }
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
                  //console.log("++++center",this.pluralizeWRun(originalRun, originalTxtArr, map).map(d => d['w:t']));
                } else if(map.from === 0) {
                  // не полный правый
                  // не менять порядок!!!
                  /*newWR = newWR.concat(this.pluralizeWRun(originalRun, originalTxtArr, map));
                  newWR = newWR.concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(map.to).join(''))));*/
                  const right = []
                    .concat(this.pluralizeWRun(originalRun, originalTxtArr, map))
                    .concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(map.to).join(''))));
                  newWR = newWR.concat(right);
                  //console.log("++++right", right.map(d => d['w:t'][0]._));
                } else if(map.to === originalTxtArr.length ) {
                  // не полный левый
                  // не менять порядок!!!
                  /*newWR = newWR.concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(0, map.from).join(''))));
                  newWR = newWR.concat(this.pluralizeWRun(originalRun, originalTxtArr, map));*/
                  const left = []
                    .concat(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxtArr.slice(0, map.from).join(''))))
                    .concat(this.pluralizeWRun(originalRun, originalTxtArr, map));
                  //console.log("++++left", left.map(d => d['w:t'][0]._));
                  newWR = newWR.concat(left);
                } else {
                  console.log("---------------------------------ошибка алгоритма 44444444444-----------------------------------------------------------------\n", originalTxtArr, map);
                }
              }
            });
          });
          p['w:r'] = newWR;
          /*consoleNode(newWR.map(wr => {
            delete wr['w:rPr'];
            return wr/!*['w:t']*!/
          }));*/

        } else {
          // ничего не делаю если вдруг сюда зайдёт
        }
      })
    });
    return jsonXml
    } catch(e) {
      throw new HttpException('Документ не разобрался', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  pluralizeWRun(originalRun: IRunOne , originalTxtArr: string[], map: IDummyAmount): IRunOne[] {
    let runs: IRunOne[] = [];
    originalTxtArr.forEach((originalTxt, i) => {
      // именно такое условие
      if(i >= map.from && i < map.to) {
        runs.push(extendWRunWithWT(originalRun , wTextTwoToWTextOne(originalTxt)));
        runs.push(getDummyRun(dictWordRandom() /*'77777777'*/));
      }
    });
    return runs
  }



  createTest(filePath = 's оригинал.docx') {
    // беру тестовый докс в который позже сделаю инжект
    fs.readFile(path.join(FILE_DIRECTORY, filePath), (err, file) => {
      if(err) throw new Error('ошибка чтения файла');
      // https://stuk.github.io/jszip/documentation/howto/read_zip.html
      JSZip.loadAsync(file).then((originalDocxFileAsZip) => {
        this.originalDocxFileAsZip = originalDocxFileAsZip;
        this.readDocx(realXml/*fs.readFileSync(path.join(WORKING_DIRECTORY, filePath))*/);
      });
    });
  }

  readDocxAndSaveDev(xmlStr: string) {
    xml2js.parseString(xmlStr, {ignoreAttrs : true}, (err, jsonXmlNoAttrs: IJsonXml) => {
      //consoleNode(jsonXmlNoAttrs);
      xml2js.parseString(xmlStr, (err, jsonXml: IJsonXml) => {
        const parsedJsonXml = this.parseXml(jsonXml, jsonXmlNoAttrs);
        const builder = new xml2js.Builder({renderOpts: {pretty: false}});
        const xml = builder.buildObject(parsedJsonXml);
        this.makeDocxCopyAndPushXml(xml);
      });
    });
  }
  makeDocxCopyAndPushXml(xmlStr: string) {
    // а контейнере подменяю только document.xml
    this.originalDocxFileAsZip.file('word/document.xml', xmlStr);
    this.originalDocxFileAsZip.generateAsync({type: 'uint8array'}).then((d) => {
      fs.writeFile(path.join(TEMP_FILE_DIRECTORY, 's оригинал.docx'), d,
        ()=>{console.log('file writed ', path.join(TEMP_FILE_DIRECTORY, 's оригинал.docx'));});

    });
  }

}