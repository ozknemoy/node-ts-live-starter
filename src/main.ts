import * as util from "util";
import {amountLettersEnough, extendWRunWithWT, getAmountWord, runTwoToRunOne, pluralizeWRun, consoleNode} from './helpers'
import './dict'
import {dummyXml, realXml} from "./mocks";
import {IJsonXml, IParagraphOne, IParagraphTwo, IRunOne, isParagraphOne, isRunOne, isRunTwo} from "./models";
import JSZip = require("jszip");
import * as path from "path";

const fs = require('fs');
console.log('start');

var xml2js = require('xml2js');
var parseString = xml2js.parseString;


/*fs.readFile(__dirname + '/s.xml', (e, xml) => {
  parseString(xml, function (err, result) {
    // console.log(result);
    //console.log(util.inspect(result['w:document']['w:body'], false, null));

    const builder = new xml2js.Builder({normalize: true});
    const xml = builder.buildObject(result);

  });
});*/
parseString(realXml, function (err, jsonXml: IJsonXml) {
  //console.log(result);
  const parsedJsonXml = parseXml(jsonXml);
  //console.log(util.inspect(parsedJsonXml['w:document']['w:body'][0]['w:p'], false, null));
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
              console.log( wT._, getAmountWord(wT._));
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
  console.log(path.join(__dirname, "../assets/s оригинал.docx"));

  fs.readFile(path.join(__dirname, "../assets/s оригинал.docx"), function(err, originalFile) {
    if (err) throw err;
    jsZip.loadAsync(originalFile).then(function (zip) {
      zip.file("word/document.xml", xmlStr);
      zip.generateAsync({type: "uint8array"}).then((d) => {
        fs.writeFileSync('./_new s.zip', d)
      });
    });
  });
  //fs.writeFileSync('./_s_.xml', xmlStr)
}

