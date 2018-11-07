import {ParseXls} from "./parse-xls";
import {HandleData} from '../../staffjs/src/client/app/shared/services/handle-data';

const one = ParseXls.splitByN('123 456', 2);
const _one = ['123', '456'];
console.assert(one[1] === _one[1], 'ParseXls.splitBySpace1', one);
const two = ParseXls.splitByN('123 456', 3);
const _two = ['123', '456'];
console.assert(two[1] === _two[1], 'ParseXls.splitBySpace1', two);
const three = ParseXls.splitByN('123 456 789 000 777', 3);
const _three = ['123', '456', '789 000 777'];
console.assert(three[1] === _three[1], 'ParseXls.splitBySpace1', three);



console.assert(HandleData.setYear(2018) === '2017-12-31T21:00:00.000Z',
  'ParseXls.setYear', HandleData.setYear(2018));
console.assert(HandleData.onlyDayToServer('2018-01-01') === '2017-12-31T21:00:00.000Z',
  'ParseXls.onlyDayToServer', HandleData.onlyDayToServer('2018-01-01'));
console.assert(HandleData.ruDateToServer('13.11.2018') === '2018-11-12T21:00:00.000Z',
  'ParseXls.ruDateToServer', HandleData.ruDateToServer('13.11.2018'));

console.log(ParseXls.create());