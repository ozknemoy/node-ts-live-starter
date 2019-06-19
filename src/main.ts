import * as util from "util";
import {getAmountWord} from './helpers'
import './dict'
import {dummyXml, realXml} from "./mocks";
import {IJsonXml, IParagraphOne, IParagraphTwo, isParagraphOne, isRunOne, isRunTwo} from "./models";

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
    fs.writeFileSync('./_s_.xml', xml)
  });
});*/
parseString(realXml, function (err, jsonXml: IJsonXml) {
  //console.log(result);
  //console.log(util.inspect(jsonXml, false, null));
  parseXml(jsonXml);
  /*const builder = new xml2js.Builder();
  const xml = builder.buildObject(jsonXml);*/
  //console.log(xml);
});

function parseXml(jsonXml: IJsonXml) {
  jsonXml["w:document"]['w:body'].forEach(bodyEl => {
    bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
      let map = {};
      if(isParagraphOne(p)) {
        p['w:r'].forEach((run, iRun)=> {
          //map[iRun] = {};
          run['w:t'].forEach(wT => {
            // сохраняю исходный
            map[iRun] = run;
            // разбиваю run
            if(isRunOne(wT)) {
              console.log(wT._, getAmountWord(wT._));
            } else if(isRunTwo(wT)){
              console.log(wT, getAmountWord(wT));

            }
          })
        })
      } else {
        // игнор пока
      }
      // обрабатываю только если есть что, иначе оригиналы
      if(Object.keys(map).length) {

      }
    })
  })
}