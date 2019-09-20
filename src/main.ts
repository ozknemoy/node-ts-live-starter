import {isWoman} from "./names";
import {OneList} from "./types";


var request = require("request"),
  cheerio = require("cheerio");

const limit = 20;

//(new Array(100).fill(0)).forEach((n, i) => setTimeout(() => getList(i), 3000 * i));


function getList(from = 0, startFrom = 101) {
  from = from + startFrom;
  const url = `https://love.mail.ru/api/search?offset=${from * limit}&limit=${(from + 1) * limit}&noid=1766268675&nchanged=1549811160&nactive=0`;
  request({
    url,
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
      console.log(f.length, 'from: ' + from, url);
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
  'mb1219494465',
  'mb1759295852',
  'mb1771751423',
  'mb1771673460',
  'mb1771496917',
  'mb1771536321',
  'mb1593831889',
  'mb1767842014',
  'mb1769968200',
  'mb1771648767',
  'mb1771735923',
  'mb1771398746',
  'mb1771272482',
  'mb1771735923',
  'mb1745916019',
  'mb1769216371',
  'mb1754279267',
  'mb1372785103',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
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
  return (txt.indexOf('Телосложение:') > -1 && txt.indexOf('полное') > -1)
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
    const h = +regH.exec(txt)[1];
    const w = +regW.exec(txt)[1];
    const delta = h - 100 - w;
    if (delta < -7) return true;
    return false
  } else if (regW.test(txt)) {
    const w = +(regW.exec(txt))[1];

    if (w > 70) return true;
    return false
  }

}

enum ERELS {
  notSerious = 'ничего серьёзного',
  husbant = 'в браке',
  rels = 'в отношениях'
}

const _rel = 'Отношения:';
const rel = _rel + '\n\t\t\t\t\t\tнет';
function hasNoRels100(txt) {
  return txt.indexOf(_rel) > -1 && txt.indexOf(rel) > -1
}

function hasRels(txt) {
  return txt.indexOf(_rel) > -1 && txt.indexOf(ERELS.rels) > -1
}

function hasHusband(txt) {
  return txt.indexOf(_rel) > -1 && txt.indexOf(ERELS.husbant) > -1
}


function hasRelsHusband(txt): boolean {
  return hasHusband(txt) || hasRels(txt)
}

function _isNeeded(txt: string) {
  return  hasHusband(txt) && !isFat(txt)
}

function isNeeded(txt: string) {
  return  _isNeeded(txt) ? '--------->' : ''
}

function isSmoking(txt) {
  return txt.indexOf('курю') > -1 && txt.indexOf('не курю') === -1
}


checkOn('mb1771272482', 777);
console.log(isNotMyAge('с парнем в возрасте 28 - 36 лет'));
function isNotMyAge(txt) {
  const ceil = 37;
  const reg = /в возрасте (\d\d) - (\d\d) /;
  if(reg.exec(txt)) {
    const upperAge = +reg.exec(txt)[2];
    return upperAge < ceil
  }
  return false
}
/*checkOn('mb1761458267', 777);*/
function checkOn(id: string, selfAge) {

  request(baseUrl + id, function (error, response, body) {
    if (!error) {
      const $ = cheerio.load(body);
      const anketa_left = $('.span1.margin-r .b-anketa_field').text();
      const anketa_right = $('.span1:not(.margin-r) .b-anketa_field').text();

      console.log(selfAge + ' ' + id ,
        'isNotMyAge: ' + isNotMyAge(anketa_left),
        'isSmoking: ' + isSmoking(anketa_right),
        'hasRelsHusband: ' + hasRelsHusband(anketa_left) + '.',
        /*anketa_right, anketa_left*/);

      if(!isFat(anketa_left)
        && !isNotMyAge(anketa_left)
        && hasRelsHusband(anketa_left)
        && !isSmoking(anketa_right)
        && !alreadySel(id)) {
        console.log(selfAge + ' ' + id );
      }
    } else {
      console.log("checkOn ошибка: " + error);
    }
  });
}
