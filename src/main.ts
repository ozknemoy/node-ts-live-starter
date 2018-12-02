import {ParseXls} from "./parse-xls";
import * as fs from "fs";
import xlsx from 'node-xlsx';

const one = ParseXls.splitByN('123 456', 2);
const _one = ['123', '456'];
console.assert(one[1] === _one[1], 'ParseXls.splitBySpace1', one);

const two = ParseXls.splitByN('123 456', 3);
const _two = ['123', '456'];
console.assert(two[1] === _two[1], 'ParseXls.splitBySpace1', one);

//console.log(ParseXls.create());

/*
const w = xlsx.parse(fs.readFileSync('./staff-full.xls'))[0].data.slice(1);
const departments = w.map(cell => cell[34]);
let ret = {};
departments.forEach(dep => {
  if(ret[dep]) {
    ret[dep] ++;
  } else {
    ret[dep] = 1
  }
});

const line = JSON.stringify(ret)
  .replace(/,/g, '\n')
  .replace(/:/g, ' - ')
  .replace(/{|}|"/g, '');
fs.writeFileSync('departments.txt', line);*/
