import {IWTextOne, IRunOne, isWTextTwo, IWTextTwo} from "./models";
import * as util from "util";
import {join} from "path";
require('dotenv').config();

export const FOLDER_DIST = join(process.cwd(), 'dist');
export const isDev = process.env.NODE_ENV === 'development';
export const WORKING_DIRECTORY = !isDev
  ? FOLDER_DIST
  : join(process.cwd(), '');

export const FILE_DIRECTORY = join(WORKING_DIRECTORY, 'temp-file');
export const TEMP_FILE_DIRECTORY = FILE_DIRECTORY + '-handled';
console.log(process.env.NODE_ENV, WORKING_DIRECTORY);


export const ruRegexp = /[а-яА-ЯёЁ]+/;


const _cf = (function () {
  function _shift(x) {
    const parts = x.toString().split('.');
    return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length)
  }

  return function (...rest) {
    return Array.prototype.reduce.call(rest, function (prev, next) {
      return prev === undefined || next === undefined || prev === null || next === null?
        undefined : Math.max(prev, _shift(next))
    }, -Infinity)
  };
})();

export let __ = {
// вернет {}  если returnEmtyObject true
  where: function (arr, attr, value, returnEmtyObject) {
    if (!arr.length || !attr || value  === null || value === undefined) return returnEmtyObject ? {} : null;
    const ret = arr.find(function (obj) {
      if (obj[attr] == value) return true
    });
    return ret? ret : (returnEmtyObject ? {} : null)
  },

  isFilledArray: function (arr) {
    return !!arr && Array.isArray(arr) && !!arr.length
  },

  isEmptyArray: function (arr) {
    return !!arr && Array.isArray(arr) && arr.length === 0
  },

  isDippedFilledArray: function (obj, ...fields) {
    if(!!obj && typeof obj === 'object' && fields && fields.length) {
      try {
        let arr = eval('obj.' + fields.join('.'));
        if(!!arr && __.isFilledArray(arr)) return true
      }
      catch (e){
        return false
      }
    }
    return false
  },

  precise: function (number, n?) {
    return parseFloat(parseFloat('' + number).toPrecision(n || 15))
  },

  _isCountable: function (a, b) {
    return !!a && !!b
  },

  _getCountable: function (a) {
    return  a? __.precise(a) : 0
  },

  sum: function (...rest) {
    rest = rest.map(this._getCountable);
    const f = _cf.apply(null, rest);

    if (f === undefined) return;
    function cb(x, y) {
      return x + f * y
    }
    return Array.prototype.reduce.call(rest, cb, 0) / f
  },

  subtract: function (l, r) {
    l = this._getCountable(l);
    r = this._getCountable(r);
    const f = _cf(l, r);
    // добавил сюда multiply иначе не работало
    return (this.multiply(l * f) - this.multiply(r * f)) / f
  },

  multiply: function (...rest) {
    rest = rest.map(this._getCountable);
    const f = _cf.apply(null, rest);

    function cb(x, y) {
      return (x * f) * (y * f) / (f * f)
    }

    return Array.prototype.reduce.call(rest, cb, 1)
  },

  divide: function (l, r) {
    if(!this._isCountable(l, r)) return 0;
    const f = _cf(l, r);
    return (l * f) / (r * f);
  },

  // вернет справочник с не повторяющимися уже выбранными полями
  getUniqueDict: function (dict, valArr, numCurrentRow, prop) {
    if(!dict || !valArr || !__.isFilledArray(valArr)) return [];
    return dict.filter( row =>
      // текущее значение строки должно быть в справочнике
      (valArr[numCurrentRow] && valArr[numCurrentRow] === row[prop]) ||
      // значение из  словаря уже не должно быть в массиве
      valArr.indexOf(row[prop]) === -1)
      .sort((a, b)=> {
        return a[prop] > b[prop]? 1 : -1
      })
  },

  // вернет справочник примитивов с не повторяющимися уже выбранными полями
  getUniqueDictPrimitive: function (dict, valArr, numCurrenRov) {
    if(!dict || !valArr || !__.isFilledArray(valArr)) return [];
    return dict.filter( primitive=>
      // текущее значение строки тоже должно быть в справочнике
      (valArr[numCurrenRov] && valArr[numCurrenRov] === primitive) ||
      valArr.indexOf(primitive) === -1)
      .sort((a, b)=> {
        return a > b? 1 : -1
      })
  },

  calcSumForProp(arr: any[], prop: string) {
    const sum = arr.reduce((prev,b)=> __.sum(prev, parseFloat(b[prop])), 0);
    return isNaN(sum)? null : sum
  },

  flatten(arr: any[]) {
    if(!Array.isArray(arr)) {
      console.warn('Это не массив');
      return
    }
    let r = [];
    arr.forEach(e=> Array.isArray(e) ? r = r.concat(this.flatten(e)) : r.push(e));
    return r;
  },

  mapObjects(objOne, objTwo, arrOne, arrTwo) {
    if(!arrOne || !arrTwo || !arrOne.length || arrOne.length !== arrTwo.length) {
      return console.warn('кривые массивы');
    }
    let obj = <any>{};
    arrOne.forEach((one, i)=> {
      obj[one] = objTwo[arrTwo[i]]
    });
    return obj
  },
  setValueToMaybeDottedProp(obj, prop: string, value) {
    if(prop.indexOf('.') > -1) {
      const [keyOne, keyTwo] = prop.split('.');
      obj[keyOne][keyTwo] = value;
    } else {
      obj[prop] = value;
    }
  },
  getValueFromMaybeDottedProp(obj, prop: string) {
    return eval('obj.' + prop)
  },
  copy(obj) {
    return typeof obj === 'object' && obj !== null ? JSON.parse(JSON.stringify(obj)) : obj
  },
  isInvalidPrimitive(value) {
    return value === null || value === undefined || value === '' || ((typeof value === 'string' && value.trim() === ''))
  },
  isInvalidValue(value) {
    return __.isInvalidPrimitive(value) || (Array.isArray(value) && !value.length)
  },
  splitWords(str: string): string[] {
    // ` 123 45  678
    // 111 22   33 ` -> [" 123 ", "45  ", "678↵", "111 ", "22   ", "33 "]
    // [\s]* любое количество пробелов, переновов, табов
    // [^\s] любое количество НЕ [\s]
    // не обрабатывается пустая строка поэтому отдельное условие
    return typeof str === 'string' && str.trim() === ''
      ? [str]
      : str.match(/[\s]*[^\s]+[\s]*/g)
  }
};

export function getRsidR() {
  (Math.random() + '').slice(-8)
}

export function getAmountWord(str: string) {
  return __.splitWords(str).length
}

export function amountLettersEnough(str: string, n = 1) {
  return !__.isInvalidPrimitive(str) && str.length > n
}

export function wTextTwoToWTextOne(str: string): IWTextOne {
  return {
    _: str,
    '$': {'xml:space': 'preserve'}
  }
}

export function extendWRunWithWT(originalRun: IRunOne , wT: IWTextOne): IRunOne {
  return {...originalRun, ...{'w:t': <any>[wT]}}
}

export const consoleNode = (str) => console.log(util.inspect(str, false, null));

export function getTextFromWText(wT: IWTextOne | IWTextTwo): string {
  return isWTextTwo(wT) ? wTextTwoToWTextOne(wT)._ : wT._
}