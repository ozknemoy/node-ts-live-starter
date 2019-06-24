import {
  TEMP_FILE_DIRECTORY, FILE_DIRECTORY, __, getTextFromWText
} from './helpers'
import './dict'
import {ConvertDocx} from "./conver-docx";
import {xmlSOriginalWTextOnlyJson as jsonXml} from "./mocks";
import {IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun} from "./models";
const fs = require('fs-extra');
fs.ensureDir(FILE_DIRECTORY);
fs.ensureDir(TEMP_FILE_DIRECTORY);



//new ConvertDocx('s оригинал.docx').createTest('assets/s оригинал raw.xml');

function findMiddle() {
  const allWords = 115;
  const start = 40;
  const end = 85;

  const amountWordsNeededToAdd = Math.floor((((end - start)/100 + 1) * allWords) - allWords);
  const middle = Math.floor(allWords/2);
//console.log(neededToAdd);

  let _allWords = 0;
  let middleFound = false;
  jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
    bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
      //consoleNode(p);
      if (isParagraphOneWithWRun(p)) {
        p['w:r'].forEach((run: IRunOne, iRun) => {
          const runLength = __.splitWords(run['w:t']
            .map(wT => getTextFromWText(wT))
            .join(' ')).length;
          console.log(_allWords, runLength);
          // если перешагнули середину
          if(_allWords + runLength > middle && !middleFound) {
            middleFound = true;
            //run.__isMiddle = true;
            console.log("+++++++++++++++", _allWords, iP, iRun, run);
          }
          _allWords += runLength;
        })
      }
    });
  });
}

findMiddle();