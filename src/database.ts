import {Sequelize} from 'sequelize-typescript';
import Army from "./army.model";
//import {armyJson} from '../../army'
const fetch = require('node-fetch');
import * as fs from 'fs'
import {writeHtmlFile} from "./vk.helpers";
export const DB = new Sequelize({
  database: 'test',
  dialect: 'postgres',
  username: 'postgres',
  password: '1',
  port: 5432,
  define: {
    timestamps: false,
    // prevent sequelize from pluralizing table names
    freezeTableName: true
  },
  operatorsAliases: false,
  // storage: ':memory:',
  //modelPaths: [__dirname + '/../models']
});


DB.addModels([
  Army
]);
/*{force: true}*/

const dunay = [59.961975, 30.935620];
const ozerki = [60.036671, 30.316240];

console.time('1');
/*Army.findById(10).then( async (a) => {
  await a.update({personnelId: 111});
  console.timeEnd('1');
});*/
//DB.query('UPDATE "army" SET "personnelId"=111 WHERE "id" = 10');
const distance = '300';
const max_timestamp = Math.floor(+new Date()/1000) - 11e6;//1533686400;
let min_timestamp = max_timestamp - 1e6;//1532686400;
const date_increment = 60*60*24;
let dates = [];
while(min_timestamp < max_timestamp) {
  dates.push(min_timestamp);
  min_timestamp += date_increment;
}
const [location_latitude, location_longitude] = dunay;
const url = (d) => "https://api.vk.com/method/photos.search?v=1"
  + "&access_token=399f1393399f1393399f13932b39d1e2213399f399f13936582251784888d414d724237"
  + "&lat=" + location_latitude
  + "&long=" + location_longitude
  + "&count=" + 1000
  + "&radius=" + distance
  + "&start_time=" + d
  + "&end_time=" + (d + date_increment);

console.log(url(1545020432));

const url2 = "https://api.vk.com/method/photos.search?lat=55.740701&long=37.609161&count=100&radius=100&start_time=1400619600&end_time=1400792400";
//console.log('777777', ...dates);
Promise.all(
  dates.map(d => fetch(url(d)).then(res => res.json())
    .then(res => res.response
      .filter(r => typeof r === 'object')
      //
    ))
).then((response)=> {
  console.timeEnd('1');

  let ret = flatten(response
    .filter(arr => !!arr.length)
    .map(arr => arr.map(o => o.src_big)));
  let arrUrls = Array['from'](new Set(ret));
  const imgs = arrUrls.map(url => doImg(url)).join();
  writeHtmlFile(imgs)

});
/*
fetch(url(1400619600))
  .then(res => res.json())
  .then((response)=> {
    console.timeEnd('1');
    console.log('8888888888888888',response);
  });*/


function doImg(url) {
  return `<img src="${url}" alt="">`
}
function flatten(arr: any[]) {
  if(!Array.isArray(arr)) {
    console.warn('Это не массив');
    return
  }
  let r = [];
  arr.forEach(e=> Array.isArray(e) ? r = r.concat(flatten(e)) : r.push(e));
  return r;
}