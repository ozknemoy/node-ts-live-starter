import * as util from "util";
import {chunkXml} from "./xmls";

console.log('---------------------start-------------------------');
const xml2js = require('xml2js');
const {parseString} = require('xml2js');

export const consoleNode = (obj) => console.log(util.inspect(obj, false, null, true));


//const builder = new xml2js.Builder(/*{renderOpts: {pretty: false}}*/);

{
  let endPointI = 0;
  parseString(chunkXml, {explicitArray: false/*, explicitRoot: false*/}, function (err, xmlJson) {

    //console.log("+++++++++++", xmlJson);
    //const ret = parseXmlJson(xmlJson, [], null);
    const ret = firstPassMap(xmlJson);
    if(!checkIntegrity(ret, xmlJson)) {
      throw new Error('checkIntegrity failed')
    }
    consoleNode(ret);

  });

  function checkIntegrity(map: string[][], obj) {
    return map.every(path => {
      try {
        //console.log(path.join('.'),eval(`obj.${path.join('.')}`));
        eval(`obj.${path.join('.')}`)
        return true

      } catch(e) {
        return false
      }
    })
  }

  function parseXmlJson(xmlJson, parent: string[][], prevTagName: string[]/*, ret: string[][]*/) {

    const tags = Object.keys(xmlJson);
    const lastElement = tags.length - 1;

    let parentTagNames;
    tags.forEach((tagName, i) => {
      if(!prevTagName) {
        parentTagNames = [tagName];
      } else {
        parentTagNames = prevTagName.concat(tagName);
        //parentTagNames.push(tagName);
      }

      if (!parent[endPointI]) {
        parent[endPointI] = parentTagNames;
        //console.log('------------------>',parentTagNames,endPointI);
      } else {
        parent[endPointI].push(tagName);
      }

      if(5 === endPointI || tagName === 'DTM') {
        console.log("1111111111",parent[endPointI],endPointI);

      }

      if (typeof xmlJson[tagName] === 'object' && xmlJson[tagName]) {
        parseXmlJson(xmlJson[tagName], parent, parentTagNames)
      } else {
        // дошел до самого глубокого
        // если последний то не пишу новое значение
        parentTagNames = null;
        if (i < lastElement) {
          const path = parent[endPointI].slice(0, parent[endPointI].length - 1);
          //console.log('*******',path);

          parent.push(<any>path);
        }
        endPointI++;
      }
    });


    return parent
  }

  function firstPassMap(root) {
    const mapString = _firstPassMap(root);
    return mapString.map(str => str.split('.').filter(arr => !!arr))
  }
  //based on https://stackoverflow.com/questions/37759768/get-all-paths-in-json-object
  function _firstPassMap(obj, root = "", result = []) {
    const props = Object.keys(obj);
    return props.reduce((prev,current) => {
      const p = root + current + ".";
      typeof obj[current] === 'object' && Object.keys(obj[current]).length
        ? _firstPassMap(obj[current],p,prev)
        : prev.push(p);
      return prev;
    },result);
  }
}

