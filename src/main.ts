import {
  amountLettersEnough, extendWRunWithWT, getAmountWord, runTwoToRunOne, pluralizeWRun, consoleNode,
  WORKING_DIRECTORY
} from './helpers'
import './dict'
import {dummyXml, realXml} from "./mocks";
import {IJsonXml, IParagraphOne, IParagraphTwo, IRunOne, isParagraphOne, isRunOne, isRunTwo} from "./models";
import JSZip = require("jszip");
import * as path from "path";
const fs = require('fs');
const xml2js = require('xml2js');


let xmlStr = fs.readFileSync(path.join(WORKING_DIRECTORY, 'assets/s оригинал raw.xml'), "utf8");
console.log(xmlStr);

xml2js.parseString(xmlStr /*realXml*/, function (err, jsonXml: IJsonXml) {
  //console.log(result);
  const parsedJsonXml = parseXml(jsonXml);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(parsedJsonXml);
  console.log(xml);
  makeDocxCopyAndPushXml(xml);
});

function parseXml(jsonXml: IJsonXml) {
  jsonXml["w:document"]['w:body'].forEach(bodyEl => {
    bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
      if(isParagraphOne(p)) {
        let newWR: IRunOne[] = [];
        p['w:r'].forEach((run: IRunOne, iRun)=> {
          run['w:t'].forEach(wT => {
            const originalRun: IRunOne = {...run};
            let newWT;
            if(isRunTwo(wT)){
              // преобразую в RunOne
              newWT = runTwoToRunOne(wT)
            } else if(isRunOne(wT)) {
              newWT  = wT;
              //console.log( wT._, getAmountWord(wT._));
            }
            if(amountLettersEnough(newWT._)) {
              // разбиваю run
              newWR = newWR.concat(pluralizeWRun(originalRun, newWT));
            } else {
              newWR.push(extendWRunWithWT(originalRun, newWT));
            }
          });
          //console.log("-----------------57");
          //consoleNode(newWR);
        });
        p['w:r'] = newWR;
      } else {
        // игнор пока
      }
      // обрабатываю только если есть что, иначе оригиналы
      /*if(Object.keys(map).length) {

      }*/
    })
  });
  return jsonXml
}

export function  makeDocxCopyAndPushXml(xmlStr: string) {
  // https://stuk.github.io/jszip/documentation/howto/read_zip.html
  const jsZip = new JSZip();
  // more files !

  fs.readFile(path.join(WORKING_DIRECTORY, "assets/s оригинал.docx"), function(err, originalFile) {
    if (err) throw err;
    jsZip.loadAsync(originalFile).then(function (zip) {
      //fs.writeFile("_new s.xml", xmlStr, ()=>{});
      // а контейнере подменяю только document.xml
      zip.file("word/document.xml", xmlStr);
      zip.generateAsync({type: "uint8array"}).then((d) => {
        fs.writeFileSync('./_new s.docx', d)
      });
    });
  });
  //fs.writeFileSync('./_s_.xml', xmlStr)
}

/*export function  restoreDoc() {
  xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex"
}*/


