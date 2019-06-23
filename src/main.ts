import {
  TEMP_FILE_DIRECTORY, FILE_DIRECTORY
} from './helpers'
import './dict'
import {ConvertDocx} from "./conver-docx";
import {xmlSOriginalWTextOnlyJson as jsonXml} from "./mocks";
import {IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun} from "./models";
const fs = require('fs-extra');
fs.ensureDir(FILE_DIRECTORY);
fs.ensureDir(TEMP_FILE_DIRECTORY);



new ConvertDocx('s оригинал.docx').createTest('assets/s оригинал raw.xml');

const allWords = 115;
const start = 40;
const end = 85;

const neededToAdd = Math.floor((((end - start)/100 + 1) * allWords) - allWords);
console.log(neededToAdd);

jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
  bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
    //consoleNode(p);
    if (isParagraphOneWithWRun(p)) {
      let newWR: IRunOne[] = [];
      p['w:r'].forEach((run: IRunOne, iRun) => {

      })
    }
  });
});