import {isWoman} from "./names";
import {OneList} from "./types";


var request = require("request"),
  cheerio = require("cheerio");

const limit = 100;
// пробежал с 1 по 19 *100
[0, 0, 0, 0, 0].forEach((n, i) =>
  setTimeout(() => getList(i, 19), 3000 * i));
function getList(from = 0, startFrom = 0) {
  from = from + startFrom;
  request({
    url: `https://love.mail.ru/api/search?offset=${from * limit}&limit=${(from + 1) * limit}&noid=1766268675&nchanged=1549811160&nactive=0`,
    headers: {
      //Referer: 'https://love.mail.ru/ru/search.phtml?ia=M&lf=F&af=34&at=35&p=a&t=a&s_c=3159_4925_4962_0&form=1',
      Cookie: 'mmbsid=jOqugitemUwRtzlAER3jK9cdae5Iy6Oz_20190224150506_love.mail.ru;  stat=love.mail.ru|cr|mamba:/search.phtml|163|665|0|74;',
      Host: 'love.mail.ru',
      'Mamba-Client': '{"platform":"web"}',
      'Mamba-Device-Id': '5c624400-3825-11e9-a700-63b90a6d3dce',
    }
  }, function (error, response, body) {
    if (!error) {
      const items: OneList[] = JSON.parse(body).items;
      const f: OneList[] = items.filter(one => one.gender === "F"
        && one.lookFor === "парня"
        && one.location === "Россия, Санкт-Петербург");
      f.map(one => checkOn(one.login, one.selfAge));
      console.log(f.length, 'from: ' + from);
    } else {
      console.log("Произошла ошибка: " + error, 'from: ' + from);
    }
  });
}

const baseUrl = 'https://love.mail.ru/ru/';
const ids = [
  'mb1763967967',
  'mb1765076909',
  'mb1764709590',
  'mb1753526954',
  'mb1764170046',
  'mb1765642739',
  'mb1745695167',
  'mb1747101559',
  'mb1759499767',
  'mb1766559636',
  'mb1766178362',
  'mb1766231163',
  'mb1310255285',
  'mb1754195226',
  'ira_koko',
  '',
  '',

];

const idsNot = [
  'mb1563861009',
  'mb1766304929',
  'mb1760910344',
  'mb1746718979',
  'mb1751747871',
  'mb1315198804',
  'mb1754734591',
  'mb704676969',
  'mb1749945315',
  'mb1761025584',
  'a_elis_82',
  'mb1751575017',
  '',
  '',
  '',
  '',
];

function alreadySel(id) {
  return ids.indexOf(id) > -1 || idsNot.indexOf(id) > -1
}


function isFat(txt) {
  return (txt.indexOf('Телосложение:') > -1 && txt.indexOf('Полное') > -1)
    || isFatCounted(txt)
}

const a = 'Рост:\n' +
  '                            162 см\n' +
  '                            \n' +
  '                        \n' +
  '                        \n' +
  '                            Вес:\n' +
  '                            72 кг';
const b = 'Вес:\n' +
  '                            100 кг\n' +
  '                            \n' +
  '                        \n' +
  '                    \n' +
  '\t\t\t\t\t\tТелосложение:\n' +
  '\t\t\t\t\t\tОбычное';

//console.log(isFatCounted(a));

function isFatCounted(txt) {
  const regH = /(\d\d\d) см/;
  const regW = /(\d?\d\d) кг/;

  if (regH.test(txt) && regW.test(txt)) {
    const h = +(regH.exec(txt))[1];
    const w = +(regW.exec(txt))[1];
    const delta = h - 100 - w;
    if (delta < -5) return true;
    return false
  } else if (regW.test(txt)) {
    const w = +(regW.exec(txt))[1];

    if (w > 75) return true;
    return false
  }

}

const _rel = 'Отношения:';
const rel = _rel + '\n\t\t\t\t\t\tНет';
function hasNoRels(txt) {
  return txt.indexOf(_rel) > -1 && txt.indexOf(rel) > -1
}

function hasRels(txt) {
  // второе условие сомнительно
  return txt.indexOf(_rel) > -1 && txt.indexOf(rel) === -1 && txt.indexOf('Ничего серьёзного') === -1
}

function hasHusband(txt) {
  return txt.indexOf('В браке') > -1 ? 'В браке' : ''
}

function _isNeeded(txt: string) {
  return  hasHusband(txt) && !isFat(txt)
}

function isNeeded(txt: string) {
  return  _isNeeded(txt) ? '--------->' : ''
}

function isSmoling(txt) {
  return txt.indexOf('Курю') > -1
}


function checkOn(id: string, selfAge) {

  request(baseUrl + id, function (error, response, body) {
    if (!error) {
      const $ = cheerio.load(body);
      const anketa_left = $('.span1.margin-r .b-anketa_field').text();
      const anketa_right = $('.span1:not(.margin-r) .b-anketa_field').text();

      if(!isFat(anketa_left) && hasRels(anketa_left) && !alreadySel(id)) console.log(selfAge + ' ' + id ,
        'isSmoling: ' + isSmoling(anketa_right),
        hasHusband(anketa_left)/*, anketa_left*/);
    } else {
      console.log("checkOn ошибка: " + error);
    }
  });
}
