import {
  getUrlWithOffset, getExistedWomenByIds,
  getVKUrl,
  nemoyServiceToken,
  permServiceToken,
  shuffle,
  yServiceToken,
  yToken, postCommentOnCroupWall, urlCommentOnCroupWall
} from "./vk.helpers";
import {IUserFromGroup, ISerFromGroupRoot} from "./user-from-group";
import {isVkError} from "./vk-error";
import {IVKPostResponse} from "./vk-post-user.interface";
import {storage} from "./storage";
import * as path from "path";
import {__} from "./__.util";
import {IVkUser} from "./vk-user";
const fse = require('fs-extra')
var _ = require('lodash');

let success = 0;
let fail = 0;


class Messages {
  posts = {
    778: 'remind',
    7777: 'info',
  };
  remindMessages = [
    `привет! Давно не заходили к нам в гости`,
    `мы по вам соскучались :) У нас для Вас много новой информации по любви к себе`,
    `приветствую Вас! Я соскучилась, заходите чаще :)`
  ];
  infoPostMessages = [
    `у нас для вас клевый пост сегодня!`,
    `как вам пост?`,
    `смотрите, что мы вам подобрали!`
  ];
  remindMessage() {
    return this.remindMessages[_.random(this.remindMessages.length - 1)];
  }
  infoMessage() {
    return this.infoPostMessages[_.random(this.infoPostMessages.length - 1)];
  }
  get info(): [number, string] {
    const postIds = Object.keys(this.posts);
    const postId = postIds[_.random(postIds.length - 1)];
    const type = this.posts[postId];
    return [Number(postId), this[type + 'Message']()]
  }
}

const messages = new Messages();
console.log(messages.info);

let alreadyUsedUserIds = storage.get('alreadyUsedUsers') || [];
let allUsersIds: number[];




async function prepareAndPost() {
  if(!allUsersIds) throw new Error(' no allUsersIds');

  let newIds = [];

  for (var i = 0; i < allUsersIds.length; i++) {
    const userId = allUsersIds[i];
    if(alreadyUsedUserIds.indexOf(userId) === -1) {
      newIds.push(userId);
    }

    if(newIds.length >= 2) {
      break;
    }
  }

  if(!newIds.length) return console.log('---------------------------------- end ------------------------------------------')

  const newUsers = await getExistedWomenByIds(newIds)/*.catch(console.log)*/;

  newUsers.forEach(u => {
    console.log(`${u.first_name} ${u.last_name}`);
  });
  newUsers.forEach((u, i) => setTimeout(async () => {
    const [postId, msg] = messages.info;
    console.log();
    try {
      await postCommentOnCroupWall(`[id${u.id}|${u.first_name}], ${msg}`, postId);
      success++;
      if(newUsers.length === i + 1) {
        console.log(new Date(), 'провалов: ' + Math.round(100 * fail/(fail + success)));
        console.log('----------- restart ---------');
        setTimeout(prepareAndPost, /*53 **/ 60 * 1000)
      }

    } catch(e) {
      fail++;
    }

  }, /*17*/8374 * i));
  // после того как сделал все что хотел с юзерами добавляю их в использованные
  alreadyUsedUserIds = alreadyUsedUserIds.concat(newIds);
  storage.set('alreadyUsedUsers', alreadyUsedUserIds)
}

fse.readFile(path.normalize('./src/competitor-users.txt')).then((txt) => {
  if(!txt) throw new Error('no users for u');
  allUsersIds = __.splitTextBySpacesSemicolonsComas(txt?.toString()).map(Number).filter(id => !isNaN(id));
  prepareAndPost();
}, console.log)



