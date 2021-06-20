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
    795: 'info',
    789: 'info',
    655: 'remind',
    595: 'info',
    777: 'memas',
    755: 'remind',
    747: 'remind',
    531: 'remind',
    524: 'remind',
    509: 'remind',
    468: 'remind',
    445: 'remind',
    382: 'remind',
    368: 'remind',
    //524: 'remind',
    645: 'memas',
    620: 'remind',
    593: 'memas',
    315: 'memas',
  };
  remindMessages = [
    `привет! Давно не заходили к нам в гости. У нас для вас появилось много полезных постов по самооценке`,
    `мы по вам скучаем :) У нас для Вас много новой информации о любви к себе`,
    `благодарим Вас за недавнюю активность, заходите в гости ещё :)`,
    `напоминаем Вам, что в описании группы есть ссылка на подарок - руководство по поднятию самооценки`,
    `у нас появились много интересных статей по самооценке за время вашего отсутствия, заходите в гости :)`,
    `без вас как-то неуютно :(`,
    `приветствую Вас! Я соскучилась, заходите чаще, чтобы не пропустить посты о любви к себе :)`
  ];
  infoPostMessages = [
    `у нас для Вас классный пост сегодня!`,
    `все о любви к себе здесь и в других постах`,
    `смотрите, что мы вам подобрали о любви к себе!`
  ];
  memasPostMessages = [
    `новая классная цитата для Вас и много постов про любовь к себе :)`,
    `эту цитату лайкнул сам Лабковский, но только тссс никому :)`,
    `эту цитату репостил у себя на стене Курпатов, но только тссс никому :)`
  ];
  remindMessage() {
    return this.remindMessages[_.random(this.remindMessages.length - 1)];
  }
  infoMessage() {
    return this.infoPostMessages[_.random(this.infoPostMessages.length - 1)];
  }
  memasMessage() {
    return this.memasPostMessages[_.random(this.memasPostMessages.length - 1)];
  }
  get info(): [number, string] {
    const postIds = Object.keys(this.posts);
    const postId = postIds[_.random(postIds.length - 1)];
    const type = this.posts[postId];
    return [Number(postId), this[type + 'Message']()]
  }
}

const messages = new Messages();

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

    if(newIds.length >= 3) {
      break;
    }
  }

  if(!newIds.length) return console.log('---------------------------------- end ------------------------------------------')


  const newUsers: IVkUser[] = await getExistedWomenByIds(newIds).catch(e => <any>console.log(e) || []);

  // кривых юзеров сразу записываю в использованные
  if(newIds.length !== newUsers.length) {
    const foundedUserIds: number[] = newUsers.map(u => u.id);
    const bannedUserIds = newIds.filter(id => !foundedUserIds.includes(id));
    console.log(' bannedUserIds ----> ', bannedUserIds);
    updateUsedUsers(bannedUserIds);
  }

  if(!__.isFilledArray(newUsers)) {
    prepareAndPost()
  }

  console.log('found users ---->');
  newUsers.forEach(u => {
    console.log(`${u.first_name} ${u.last_name} (${u.id})`);
  });

  const successUser: number[] = [];
  const failUser: number[] = [];

  newUsers.forEach((u, i) => setTimeout(async () => {
    const [postId, msg] = messages.info;
    try {
      await postCommentOnCroupWall(`[id${u.id}|${u.first_name}], ${msg}`, postId);
      success++;
      successUser.push(u.id);
      if(newUsers.length === i + 1) {
        updateUsedUsers(successUser);
        console.log(new Date(), 'провалов: ' + Math.round(100 * fail/(fail + success)), ', успешно: ' + success);
        console.log('----------- restart ---------');

        setTimeout(prepareAndPost, 53 * 60 * 1000)
      }

    } catch(e) {
      console.log('fail=======>',e);
      fail++;
      failUser.push(u.id);
      if(newUsers.length === i + 1) {
        updateUsedUsers(successUser);
        console.log(new Date(), 'провалов: ' + Math.round(100 * fail/(fail + success)));
      }
    }

  }, 28374 * i));

}

function updateUsedUsers(newIds: number[]) {
  // после того как сделал все что хотел с юзерами добавляю их в использованные
  alreadyUsedUserIds = alreadyUsedUserIds.concat(newIds);
  storage.set('alreadyUsedUsers', alreadyUsedUserIds)
}

fse.readFile(path.normalize('./src/competitor-users.txt')).then((txt) => {
  if(!txt) throw new Error('no users for u');
  allUsersIds = __.splitTextBySpacesSemicolonsComas(txt?.toString()).map(Number).filter(id => !isNaN(id));
  prepareAndPost();
}, console.log)



