import {
  TEMP_FILE_DIRECTORY, FILE_DIRECTORY, __, getTextFromWText, isDev
} from './helpers'
import './dict'
import {ConvertDocx} from "./conver-docx";
import {xmlSOriginalWTextOnlyJson as jsonXml} from "./mocks";
import {IParagraphOne, IParagraphTwo, IRunOne, isParagraphOneWithWRun} from "./models";
const fs = require('fs-extra');
fs.ensureDir(FILE_DIRECTORY);
fs.ensureDir(TEMP_FILE_DIRECTORY);



//new ConvertDocx('s оригинал.docx').createTest('assets/s оригинал raw.xml');

function createWordsMap() {
  const allWords = 117;
  const start = 40;
  const end = 85;

  const amountWordsNeededToAdd = /*52*/Math.floor((((end - start)/100 + 1) * allWords) - allWords);
  const middle = Math.floor(allWords/2);

  let _allWords = 0;
  let _allWordsP: number[][] = [];
  let middleFound = false;
  let _middleIndexP = 0;
  let _middleIndexRun = 0;
  let _middleIndexText = 0;
  jsonXml['w:document']['w:body'].forEach((bodyEl, iBodyEl) => {
    bodyEl['w:p'].forEach((p: IParagraphOne | IParagraphTwo, iP) => {
      //consoleNode(p);
      let _allWordsRun: number[] = [];
      if (isParagraphOneWithWRun(p)) {
        p['w:r'].forEach((run: IRunOne, iRun) => {
          const wTextArr: string[] = __.splitWords(run['w:t']
            .map(wT => getTextFromWText(wT))
            .join(' '));
          _allWordsRun.push(wTextArr.length);
          // если перешагнули середину
          if(_allWords + wTextArr.length > middle && !middleFound) {
            middleFound = true;
            _middleIndexP = iP;
            _middleIndexRun = iRun;
            _middleIndexText = middle - _allWords;

            console.log(`++++++ уже ${_allWords} из ${middle} адрес [${iP}][${iRun}][${_middleIndexText}]`,wTextArr.length);

          }
          _allWords += wTextArr.length;
        })
      }
      _allWordsP.push(_allWordsRun);
    });
  });

  console.log('-----', _allWordsP);
  return handleMap(_allWordsP, amountWordsNeededToAdd, _middleIndexP, _middleIndexRun, _middleIndexText)
}

function handleMap(_allWordsP: number[][], amountWordsNeededToAdd: number, _middleIndexP: number, _middleIndexRun: number, _middleIndexText: number) {
  // получили
  //                <--M[47]-->                    [_middleIndexP][_middleIndexRun][_middleIndexText]
  // [ [ 1, 6, 1 ], [    48   , 1, 45, 1, 1, 1, 10, 1, 1 ] ] адрес [1][0][47]
  let allWordsNeededToAddToP: IDummyAmount[][] = _allWordsP.map(p => p.map(r => ({})));
  let amountWordsNeededToAddToPFlatten: number[] = __.flatten(_allWordsP);
  let amountWordsNeededToAddRemains = amountWordsNeededToAdd;
  let amountWordsNeededToAddRemainsLeft = Math.ceil(amountWordsNeededToAddRemains / 2);
  let amountWordsNeededToAddRemainsRight = amountWordsNeededToAddRemains - amountWordsNeededToAddRemainsLeft;

  // количество в среднем wT
  let middleAmount = _allWordsP[_middleIndexP][_middleIndexRun];

  allWordsNeededToAddToP[_middleIndexP][_middleIndexRun].from = Math.max(_middleIndexText - amountWordsNeededToAddRemainsLeft, 0);
  amountWordsNeededToAddRemainsLeft -= allWordsNeededToAddToP[_middleIndexP][_middleIndexRun].from > 0
    ? amountWordsNeededToAddRemainsLeft : _middleIndexText;
  allWordsNeededToAddToP[_middleIndexP][_middleIndexRun].to = Math.min(middleAmount, _middleIndexText + amountWordsNeededToAddRemainsRight);
  amountWordsNeededToAddRemainsRight -= allWordsNeededToAddToP[_middleIndexP][_middleIndexRun].to < middleAmount
    ? amountWordsNeededToAddRemainsRight : middleAmount - _middleIndexText;




  let _allWordsNeededToAddToPFlatten: IDummyAmount[] = __.flatten(allWordsNeededToAddToP);
  let _middleRunFlatten;
  //ищу середину
  for (let i = 0; i < _allWordsNeededToAddToPFlatten.length; i++) {
    if(_allWordsNeededToAddToPFlatten[i].from !== undefined) {
      _middleRunFlatten = i;
    }
  }

  // если ещё надо переходить дальше
  if(amountWordsNeededToAddRemainsLeft > 0) {
    console.log('Left', amountWordsNeededToAddRemainsLeft);
    for (let i = _middleRunFlatten - 1; i >= 0; i--) {
      const min = Math.min(amountWordsNeededToAddRemainsLeft, amountWordsNeededToAddToPFlatten[i]);
      amountWordsNeededToAddRemainsLeft -= min;
      if(amountWordsNeededToAddRemainsLeft <= 0) {
        Object.assign(_allWordsNeededToAddToPFlatten[i], {from: 0, to: min});
        break;
      } else {
        Object.assign(_allWordsNeededToAddToPFlatten[i], {from: 0, to: amountWordsNeededToAddToPFlatten[i]})
      }
    }
  }
  // если ещё надо переходить дальше
  if(amountWordsNeededToAddRemainsRight > 0) {
    console.log('Right', amountWordsNeededToAddRemainsRight);
    for (let i = _middleRunFlatten + 1; i < _allWordsNeededToAddToPFlatten.length; i++) {
      const min = Math.min(amountWordsNeededToAddRemainsRight, amountWordsNeededToAddToPFlatten[i]);
      amountWordsNeededToAddRemainsRight -= min;
      if(amountWordsNeededToAddRemainsRight <= 0) {
        Object.assign(_allWordsNeededToAddToPFlatten[i], {from: 0, to: min});
        break;
      } else {
        Object.assign(_allWordsNeededToAddToPFlatten[i], {from: 0, to: amountWordsNeededToAddToPFlatten[i]})
      }
    }
  }

  console.log(allWordsNeededToAddToP);
  return allWordsNeededToAddToP
}

interface IDummyAmount {
  from?: number
  to?: number
}

if(isDev) {
  const dummy = { /*from: 0, to: 0*/ };

  const testOne = handleMap([ [ 1, 6, 1 ], [48, 1, 45, 1, 1, 1, 10, 1, 1 ] ],
    52, 1, 0, 47);

  const _testOne: IDummyAmount[][] = [
    [ dummy, dummy, dummy ],
    [ { from: 21, to: 48 }, { from: 0, to: 1 }, { from: 0, to: 24 }, dummy, dummy, dummy, dummy, dummy, dummy ] ];

  if(testOne[1][0].from !== _testOne[1][0].from || testOne[1][0].to !== _testOne[1][0].to) {
    throw new Error('failed testOne 1')
  }
  if(testOne[1][1].from !== _testOne[1][1].from || testOne[1][1].to !== _testOne[1][1].to) {
    console.log(testOne[1][1].from , _testOne[1][1].from , testOne[1][1].to , _testOne[1][1].to);
    throw new Error('failed testOne 2', )
  }
  if(testOne[1][2].from !== _testOne[1][2].from || testOne[1][2].to !== _testOne[1][2].to) {
    throw new Error('failed testOne 3')
  }

  const test2 = handleMap([ [ 1, 6, 1 ], [48, 1, 45, 1, 1, 1, 10, 1, 1 ] ],
    96, 1, 0, 47);

  const _test2: IDummyAmount[][] = [
    [ dummy, dummy, {from: 0, to: 1} ],
    [ { from: 0, to: 48 }, { from: 0, to: 1 }, { from: 0, to: 45 }, { from: 0, to: 1 }, dummy, dummy, dummy, dummy, dummy ] ];

  if(test2[0][2].from !== _test2[0][2].from || test2[0][2].to !== _test2[0][2].to) {
    throw new Error('failed test2 1')
  }
  if(test2[1][0].from !== _test2[1][0].from || test2[1][0].to !== _test2[1][0].to) {
    throw new Error('failed test2 2')
  }
}


//createWordsMap();