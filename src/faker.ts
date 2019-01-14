import {url} from "./vk.helpers";

//const faker = require('faker/locale/ru');
const request = require('request');
//faker.setLocale("ru");
import Personnel from '../../staffjs/src/server/components/personnel/personnel.model'
import {Sequelize} from 'sequelize-typescript';
//import * as fs from 'fs'

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


export const DB = new Sequelize({
  database: 'staffjs',
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
});

/*DB.query(`select * from staff`).then(([users, result]) => {
  users.forEach(({id}) => {

    const [i, f] = faker.name.findName().split(' ');
    DB.query(`update staff set name='${i}', surname='${f}', "middleName"='' where id=${id}`)
  })

});*/
/*DB.addModels([
  Personnel
]);
Personnel.sync();*/
const testProxy = (url: string, proxyList: any[], cb, proxyType = 'http') => {
  if(!(proxyList instanceof Array) && !(cb instanceof Function) && !url){
    throw new Error('arguments not set');
  }

  const proxyIndex = Math.floor(Math.random() * proxyList.length);
  const proxy = proxyList[proxyIndex];
  const proxyUrl = `${proxyType}://${proxy.ipAddress}:${proxy.port}`;
  console.log('proxyUrl: ', proxyUrl);

  const anyParam = {method : 'GET', proxy : proxyUrl, strictSSL: false, timeout: 4000};


  request(url, anyParam, (error, response, body) => {
    if(error){
      console.count('request error');
      testProxy(url, proxyList, cb)
    } else {
      cb(response, body);
    }
  });
};
let proxies = localStorage.get('proxies') || [];
if(!proxies.length) {
  const ProxyLists = require('proxy-lists');

  const options = {
    countries: ['ru'],
    //sourcesWhiteList: ['freeproxylists']
  };

  const gettingProxies = ProxyLists.getProxies(options);
  let started;
  gettingProxies.on('data', function(_proxies) {
    proxies = proxies.concat(_proxies);
    if(!started && proxies.length > 100) {
      started = true;
      localStorage.set('proxies', proxies);
      testProxy(url(+new Date('2018-12-31')), proxies, getPhotos)
    }
  });

  gettingProxies.on('error', function(error) {
    //console.error('7777777777777777',error);
  });

  gettingProxies.once('end', function() {
    console.log("--------end--------");
  });
} else {
  testProxy(url(+new Date('2018-12-31')), proxies, getPhotos)
}


function getPhotos(response, body) {
  console.log(/*response,*/ '\n',body);
}
