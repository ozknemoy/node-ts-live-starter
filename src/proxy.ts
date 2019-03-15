
import {LocalStorage} from 'node-localstorage';
const localStorage = new LocalStorage('./localstorage');

localStorage.set = (k: string, v: object) => {
  localStorage.setItem(k, JSON.stringify(v));
};
localStorage.get = (k: string) => {
  const val = localStorage.getItem(k);
  try {
    return JSON.parse(val)
  } catch(e) {
    return val
  }
};

export function getProxies() {
  return new Promise((res) => {
    let proxies = localStorage.get('proxies') || [];
    if(!proxies.length) {
      console.log('start');

      const ProxyLists = require('proxy-lists');

      const options = {
        countries: ['ru'],
        protocols: ['http', 'https']
        //sourcesWhiteList: ['freeproxylists']
      };

      const gettingProxies = ProxyLists.getProxies(options);
      gettingProxies.on('data', function(_proxies) {
        proxies = proxies.concat(_proxies);
        console.log(proxies.length);
        if(proxies.length > 1500) {
          localStorage.set('proxies', proxies);
          res(proxies)
        }
      });

      gettingProxies.on('error', function(error) {
        console.error('-------------->',error);
      });


    } else {
      res(proxies)
    }
  })
}




