import * as util from "util";

const fs = require('fs');
console.log('start');

var xml2js = require('xml2js');
var parseString = xml2js.parseString;

fs.readFile(__dirname + '/s.xml', (e, xml) => {
  parseString(xml, function (err, result) {
    // console.log(result);
    console.log(util.inspect(result['w:document']['w:body'], false, null));

    var builder = new xml2js.Builder({normalize: true});
    var xml = builder.buildObject(result);
    fs.writeFileSync('./_s_.xml', xml)
  });
});
