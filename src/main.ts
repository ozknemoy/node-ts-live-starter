import {ParseXls} from "./parse-xls";

const one = ParseXls.splitByN('123 456', 2);
const _one = ['123', '456'];
console.assert(one[1] === _one[1], 'ParseXls.splitBySpace1', one);

const two = ParseXls.splitByN('123 456', 3);
const _two = ['123', '456'];
console.assert(two[1] === _two[1], 'ParseXls.splitBySpace1', one);

console.log(ParseXls.create(22));