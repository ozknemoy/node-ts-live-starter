import {isDev} from "./helpers";
import {_createWordsMap, IDummyAmount} from "./create-words-map";


if(isDev) {
  console.log("------------- test start -------------");

  const dummy = { /*from: 0, to: 0*/ };
  const testOne = _createWordsMap([ [ 1, 6, 1 ], [48, 1, 45, 1, 1, 1, 10, 1, 1 ] ],
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
  const test2 = _createWordsMap([ [ 1, 6, 1 ], [48, 1, 45, 1, 1, 1, 10, 1, 1 ] ],
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

  const test3 = _createWordsMap([ [ 1, 1, 1 ], [1, 2, 1, 1, 1, 1 ] ],
    3, 1, 1, 1);
  const _test3: IDummyAmount[][] = [
    [ dummy, dummy, dummy ],
    [{ from: 0, to: 1 }, { from: 0, to: 2 }, dummy, dummy, dummy, dummy]];

  if(test3[1][0].from !== _test3[1][0].from || test3[1][0].to !== _test3[1][0].to) {
    console.log(test3[1][0].from, _test3[1][0].from, test3[1][0].to, _test3[1][0].to);
    throw new Error('failed test3 1')
  }
  if(test3[1][2].from !== _test3[1][2].from || test3[1][2].to !== _test3[1][2].to) {
    console.log(test3[1][2].from, _test3[1][2].from, test3[1][2].to, _test3[1][2].to);
    throw new Error('failed test3 2')
  }
  if(test3[1][1].from !== _test3[1][1].from || test3[1][1].to !== _test3[1][1].to) {
    console.log(test3[1][1].from, _test3[1][1].from, test3[1][1].to, _test3[1][1].to);
    throw new Error('failed test3 3')
  }

  const test4 = _createWordsMap([ [ 5, 4, 7 ] ],
    8, 0, 1, 3);
  const _test4: IDummyAmount[][] = [[{from: 4, to: 5 }, {from: 0, to: 4 }, {from: 0, to: 2 }]];

  if(test4[0][0].from !== _test4[0][0].from || test4[0][0].to !== _test4[0][0].to) {
    console.log(test4[0][0].from, _test4[0][0].from, test4[0][0].to, _test4[0][0].to);
    throw new Error('failed test4 1 проверяет граничное левое значение')
  }

  const test5 = _createWordsMap([ [ 1, 6, 1, 48, 1, 45, 1, 1, 1, 10, 1, 1] ],
    52, 0, 5, 1);
  const _test5: IDummyAmount[][] = [[dummy, dummy, dummy,{from: 24, to: 48 }, {from: 0, to: 1 }, {from: 0, to: 27 }, dummy, dummy, dummy, dummy, dummy, dummy]];

  if(test5[0][3].from !== _test5[0][3].from || test5[0][3].to !== _test5[0][3].to) {
    console.log(test5[0][3].from, _test5[0][3].from, test5[0][3].to, _test5[0][3].to);
    throw new Error('failed test5 1 проверяет граничное левое значение')
  }
  if(test5[0][5].from !== _test5[0][5].from || test5[0][5].to !== _test5[0][5].to) {
    console.log(test5[0][5].from, _test5[0][5].from, test5[0][5].to, _test5[0][5].to);
    throw new Error('failed test5 2 проверяет граничное левое значение')
  }


  console.log("------------- test end -------------");
}