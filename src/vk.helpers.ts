import * as fs from "fs";
import {IVkUser} from "./vk-user";
import {__} from "./__.util";
const request = require('request-promise');

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


export const nemoyServiceToken = process.env.nemoyServiceToken;
export const permServiceToken = process.env.permServiceToken;
export const yServiceToken = process.env.yServiceToken;
export const yToken = process.env.yToken;


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

export function urlCommentOnCroupWall(message: string, postId: number, groupId = 166231334, accessToken: string = yToken) {
  return `${VKBaseUrl}method/wall.createComment?v=5.131&owner_id=-${groupId}&post_id=${postId}&message=${encodeURIComponent(message)}&access_token=${accessToken}`
}

export function postCommentOnCroupWall(message: string, postId: number, groupId = 166231334, accessToken: string = yToken): Promise<unknown> {
  console.log('...posting comment for users...');
  return request(urlCommentOnCroupWall(message, postId, groupId, accessToken)).then(handleVKResponse)
}

export function urlUsersInfoByIds(ids: number[], accessToken: string = yToken) {
  return `${VKBaseUrl}method/users.get?v=5.131&user_ids=${ids.join(',')}&access_token=${accessToken}&fields=bdate,city,sex,country,nickname`
}

export function getExistedWomenByIds(ids: number[], accessToken: string = yToken): Promise<IVkUser[]> {
  if(!__.isFilledArray(ids)) return Promise.reject('no users for getExistedUsersInfoByIds');
  console.log('...requesting users...');
  return request(urlUsersInfoByIds(ids, accessToken)).then(handleVKResponse).then(d => d.map(u => new IVkUser(u)).filter(user => /*user.isWoman &&*/ !user.hasOwnProperty('deactivated')))
}

function handleVKResponse(d) {
  try {
    const resp = JSON.parse(d);
    if(resp.hasOwnProperty('error')) {
      console.log(resp.error);
      return Promise.reject(resp.error)
    } else {
      return resp.response
    }
  } catch(e) {
    console.log(e);
  }
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
