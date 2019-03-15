
const phantom = require('phantom');
import {getProxies} from './proxy'
interface IRequest {
  headers: { name: string, value: string}[],
  id: number,
  method: 'GET',
  time: string,//'2019-03-02T15:50:10.525Z'
  url: string
}

const youtubePlayButton = '.ytp-large-play-button ytp-button';
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

var useragent = [
  'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36 OPR/32.0.1948.25',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2421.0 Safari/537.36 OPR/32.0.1899.0',
  'Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/4.0 (compatible; GoogleToolbar 7.5.5111.1712; Windows 6.1; MSIE 9.11.9600.17239)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; Win32; x32; rv:65.0) Gecko/20100101 Firefox/65.0',
  'Mozilla/5.0 (Linux; Android 4.3; Nexus 4 Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.82 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A465 Safari/8536.25 (2637345E-FAD0-4B3B-A7E9-3FB6E057CFDD)',
  'Mozilla/5.0 (BB10; Kbd) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.1.0.4633 Mobile Safari/537.10+',
  'Mozilla/5.0 (Linux; Android 4.1.2; GT-I9105P Build/JZO54K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
  'Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A523',
  'Mozilla/5.0 (Linux; U; Android 4.0.3; en-gb; HTC_One_V Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931',
  'Chrome (AppleWebKit/537.1; Chrome50.0; Windows NT 6.3) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
  'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.9200',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
  '',
];
/*nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => document.querySelector('#r1-0 a.result__a')['href'])
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  });*/

const timeArr = [16e3, 19e3, 24e3, 26e3, 22e3, 28e3];
let errors = [];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
const NightmareTimeout = 10e3;
function _doIt(proxyUrls: any[], i) {
  const proxy = getRandom(proxyUrls);

  const proxyUrl = `${proxy.protocols && proxy.protocols.length ? proxy.protocols[0] : 'http'}://${proxy.ipAddress}:${proxy.port}`;
  console.log(proxyUrl);
  Nightmare({
    switches: {
      'proxy-server': proxyUrl
    },
    waitTimeout: NightmareTimeout,
    gotoTimeout: NightmareTimeout,
    loadTimeout: NightmareTimeout,
    /*show: true*/
  })
    .useragent(useragent[Math.floor(Math.random()*useragent.length)])
    .goto('https://vk.com/fursov_like?w=wall-13992166_15208')
    //.wait(500)
    /*.goto('https://vk.com/navalny?w=wall129244038_1460925',
      {Origin: 'https://vk.com', Referer: 'https://vk.com', ___cookie: 'YSC=cdQuCSk-80s; VISITOR_INFO1_LIVE=fDZy0pWNXKw; SID=DQfTwpaSgJBgkfljLwwmpETG22XSSiScCZw97bQ4zcc9elaT65hLFLtXRllFhoOxYjrBAA.; HSID=ANXE4pLFW1e3S0aBS; SSID=AfOb9pgLo81O-EKCO; APISID=hi8qnHRbHsvotoR9/A40kytQp1ndTZNb1G; SAPISID=pi0LsQCBiLjmGpTE/AJvONho-tdBIb2oL7; gsScrollPos-96=0; PREF=f1=50000000&al=ru; LOGIN_INFO=AFmmF2swRQIgNGMfXGiYdbtCho0AGGgq9ksQGemp2qzB_G8sQIRnIpUCIQCXxMaRpuQZpry3nWbZLESJ0BYTob-7rCan6TzmfTwURg:QUQ3MjNmdzJXZ3pUeDBTVGhPVnEzTVoyX3NSVFl3RzM1VGVIdXItRjdlN1VmdFVDY3VnQnhxRkVUQ3hwZFFNQkxJMW1MWVJsb0tPV2NYVDRNVHpwWXNPb2NZQUZ3UWp5SW9jQXliQnByUnBEODNhR2N2eVFsaklQOC1CUW0xVGQ1cTd1VFdpdVhXaWpBdUVQa1NIckxrZG02OXdNTGxyQWVTTTdSSC1KbVpGX0w2YUZCeGdGbkVr; gsScrollPos-47=0; gsScrollPos-56=0; wide=1; gsScrollPos-547=0; gsScrollPos-52=0; gsScrollPos-51=0; gsScrollPos-65=0'}
      /!*'https://vk.com/fursov_like?w=wall-13992166_15208'*!/)*/
    //.click('.wk_layer_wrap .page_post_video_play_inline')
    /*.evaluate(() => {
      const btn = document.querySelector('.ytp-large-play-button ytp-button');
      if(btn) {
        click(btn);
        return btn
      }
    })*/
    //.visible('.ytp-large-play-button ytp-button')
    .wait(1000/*getRandom(timeArr)*/)
    .end()
    .then(() => console.count('++++++++++++++++++++++end++++++++++++++++++++++++++++++'))
    .catch(error => {
      if(errors[i]) errors[i]++;
      else errors[i] = 1;
      if(errors[i] > 10) return;
      if(error.details === 'ERR_PROXY_CONNECTION_FAILED' ||
        error.details === 'ERR_CONNECTION_RESET' ||
        error.details === 'ERR_TUNNEL_CONNECTION_FAILED' ||
        error.details === 'ERR_NO_SUPPORTED_PROXIES') {
        _doIt(proxyUrls, i)
      }
      console.error('failed:', proxyUrl, error.details)
    });
}

let __proxyNumber = 0;
const __numOfProxy = 20;
let __errors = {};
function _doItByOneProxy(i, proxyUrls: string[]) {
  const currentProxy = proxyUrls[__proxyNumber];
  if(!currentProxy) {
    console.count('---- -----end------- ---');
    return;
  }
  Nightmare({
    switches: {
      'proxy-server': currentProxy
    },
    waitTimeout: NightmareTimeout,
    gotoTimeout: NightmareTimeout,
    loadTimeout: NightmareTimeout,
    /*show: true*/
  })
    .goto('https://vk.com/navalny?w=wall129244038_1460925')
    .wait(500)
    .end()
    .then(() => console.count('++++++++++++++++++++++end++++++++++++++++++++++++++++++'))
    .catch(error => {
      if(__errors[currentProxy]) __errors[currentProxy]++;
      else __errors[currentProxy] = 1;
      console.error('failed:', currentProxy, error.details);
      // один прокси дергаю 5 раз
      if(__errors[currentProxy] > 6) __proxyNumber ++;
      if(__proxyNumber >= __numOfProxy) {
        console.count('----------end-----------');
        return;
      }
      if(error.details === 'ERR_PROXY_CONNECTION_FAILED' ||
        error.details === 'ERR_CONNECTION_RESET' ||
        error.details === 'ERR_TUNNEL_CONNECTION_FAILED' ||
        error.details === 'ERR_NO_SUPPORTED_PROXIES') {
        _doItByOneProxy(i, proxyUrls)
      }
    });
}

function getRandomProxy(proxyUrls: any[]): string {
  const proxy = getRandom(proxyUrls);
  return `${proxy.protocols && proxy.protocols.length ? proxy.protocols[0] : 'http'}://${proxy.ipAddress}:${proxy.port}`
}

let intervalByOneProxy;
function doItByOneProxy(proxyUrls) {
  __proxyNumber = 0;
  const __proxyUrls = new Array(__numOfProxy)
    .fill({})
    .map(() => getRandomProxy(proxyUrls));
  //console.log(__proxyUrls);
  for (let i = 0; i < 30*__numOfProxy; i++) {
    setTimeout(()=> _doItByOneProxy(i, __proxyUrls), 1500*i)
  }
  if(intervalByOneProxy) return;
  intervalByOneProxy = setInterval(()=> doItByOneProxy(proxies), 300e3)
}

function doIt(proxyUrls) {
  for (let i = 0; i < 100; i++) {
    setTimeout(()=> {
      _doIt(proxyUrls, i)
    }, 5000*i + i^3 + i^2 + i)

  }
}

let proxies;
(async function() {
  proxies = await getProxies();
  doItByOneProxy(proxies.slice(0, 100));
})();

(async function() {

  console.time('1');
  const instance = await phantom.create(/*["--proxy=201.172.242.184:15124", "--proxy-type=socks5"]*/);
  const page = await instance.createPage();
  page.setting('loadImages', false);
  page.setting('useragent', useragent[Math.floor(Math.random()*useragent.length)]);
  page.property('viewportSize', {width: 800, height: 600});

  await page.on('onResourceRequested', true, function(requestData: IRequest, request, regex) {
    //console.info('Requesting', requestData.url);
    
    if (
      (/\.doubleclick\./gi.test(requestData.url)) ||
      (/\.pubmatic\.com$/gi.test(requestData.url)) ||
      (/yandex/gi.test(requestData.url)) ||
      (/google/gi.test(requestData.url)) ||
      (/gstatic/gi.test(requestData.url)) ||
      (/http(s)?:\/\/.+?\.css$/gi).test(requestData.url)
    ) {
      request.abort();
      console.log('777777777',requestData.url);
    }

  });

  const status = await page.open('https://www.youtube.com/watch?v=hqqA7yOWFNw&list=PL8BUnFV2tycpoilHIXnm5bKk4fWfNmLM6&index=2&t=0s');
  /*if (status === 'success') {
    page.injectJs('//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js');
  }*/
  console.timeEnd('1');
  console.log('-------------loaded-----------------', status);

  page.evaluateJavaScript(`function() { return document.querySelector('#primary-inner').innerHTML; }`).then(function(html){
    console.log('5555555555', html);
  });
  setTimeout(async () => {
    /*const html = await page.property('content');
    console.log(html);*/
    console.log('-------------closing-----------------');
    await instance.exit();
  }, 15e3);

  /*waitFor(
    function() {
      return page.evaluate(function() {
        // Кликаем на кнопку
        $('.button').trigger('click');
        // Ждём, пока элемент не станет скрытым
        return $('.button').is(':hidden');
      });
    }, function() {
      // Выполняем действия после того, как необходимый элемент появился на экране
    });*/
});


