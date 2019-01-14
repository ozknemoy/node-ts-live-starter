import * as fs from "fs";

const dunay = [59.961975, 30.935620];
const ozerki = [60.036671, 30.316240];
const distance = '300';
const max_timestamp = Math.floor(+new Date()/1000) - 11e6;//1533686400;
let min_timestamp = max_timestamp - 1e6;//1532686400;
const date_increment = 60*60*3;
let dates = [];
while(min_timestamp < max_timestamp) {
  dates.push(min_timestamp);
  min_timestamp += date_increment;
}
const [location_latitude, location_longitude] = ozerki;

export const VKBaseUrl = 'https://api.vk.com/';

export function getVKUrl (url, methodUrl = 'method/',access_token='399f1393399f1393399f13932b39d1e2213399f399f13936582251784888d414d724237') {
  return VKBaseUrl + methodUrl + url  + `&v=5&access_token=${access_token}`
}

export const url = (d) => getVKUrl("photos.search"
  + "?lat=" + location_latitude
  + "&long=" + location_longitude
  + "&count=" + 1000
  + "&radius=" + distance
  + "&start_time=" + d
  + "&end_time=" + (d + date_increment));

export function writeHtmlFile(body, fileName = new Date().toISOString().slice(0,10)) {
  const html1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>fotos</title></head><body>';
  const html2 = '</body></html>';
  let html = html1 + body.replace(/(\n)/g, '</br>') + html2;
  fs.writeFileSync(`${fileName}.html`, html);
}

export const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;


export function getUrlWithoffset(url: string, n = 0, count = 100) {
  console.log(getVKUrl(url + `&count=${count}&offset=${n * count}`));
  return getVKUrl(url + `&count=${count}&offset=${n * count}`)
}