import * as util from "util";
import {bdsmXml, chunkXml} from "./xmls";
import {checkMapIntegrity, firstPassMap, firstPassMapNoValue, secondPassMap} from "./helpers";

console.log('---------------------start-------------------------');
const xml2js = require('xml2js');
const {parseString} = require('xml2js');

export const consoleNode = (obj) => console.log(util.inspect(obj, false, null, true));


//const builder = new xml2js.Builder(/*{renderOpts: {pretty: false}}*/);

{
  parseString(bdsmXml, {explicitArray: false/*, explicitRoot: false*/}, function (err, xmlJson) {

    console.log("+++++++++++", xmlJson);
    const firstMap = firstPassMap(xmlJson);
    const firstMapNoValue = firstPassMapNoValue(firstMap);
    consoleNode(firstMapNoValue);
    if(!checkMapIntegrity(firstMapNoValue, xmlJson)) {
      throw new Error('\n checkIntegrity failed')
    }
    const secondMap = secondPassMap(firstMap, xmlJson);
    console.log(secondMap);

  });



}

