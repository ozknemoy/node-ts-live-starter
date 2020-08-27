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


export const nemoyServiceToken = '399f1393399f1393399f13932b39d1e2213399f399f13936582251784888d414d724237';
export const permServiceToken = '4be9657904894e9a432f519992c71b594a65185f6d89cd5826b8cde438d746ffc2feceb8f5c93caae37ee';
export const yServiceToken = '98efa8fa98efa8fa98efa8fad7989c91f1998ef98efa8fac7f0a430336eaa7daba68385';
export const yToken = '8ba48e74fa9652b9fc6421820ca48fd66b957c3b6dcf1dc3e5fd618dcf9c4326258f1e4d227515a31569c';
export function getVKUrl (url, access_token) {
  return `${VKBaseUrl}method/${url}&v=5.120&access_token=${access_token}`
}

export const url = (d) => getVKUrl("photos.search"
  + "?lat=" + location_latitude
  + "&long=" + location_longitude
  + "&count=" + 1000
  + "&radius=" + distance
  + "&start_time=" + d
  + "&end_time=" + (d + date_increment), nemoyServiceToken);

export function writeHtmlFile(body, fileName = new Date().toISOString().slice(0,10)) {
  const html1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>fotos</title></head><body>';
  const html2 = '</body></html>';
  let html = html1 + body.replace(/(\n)/g, '</br>') + html2;
  fs.writeFileSync(`${fileName}.html`, html);
}

export const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export function getUrlWithOffset(url: string, access_token: string, n = 0, count = 100) {
  return getVKUrl(url + `&count=${count}&offset=${n * count}`, access_token)
}

export function shuffle(array) {//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
