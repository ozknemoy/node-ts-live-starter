

import {LocalStorage} from 'node-localstorage';
export const storage = new LocalStorage('./localstorage-folder');

storage.set = (k: string, v: object) => {
  storage.setItem(k, JSON.stringify(v));
};
storage.get = (k: string) => {
  const val = storage.getItem(k);
  try {
    return JSON.parse(val)
  } catch(e) {
    return val
  }
};




