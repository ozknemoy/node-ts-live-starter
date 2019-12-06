/**
 * Created by Vakarchuk.DM on 24.10.2017.
 */
import {ValidationError} from "class-validator";

interface IUnderscore {
    qntyDecimal: number,
    where: <T>(arr: T[] , attr: keyof T, value:string|number, returnEmtyObject?:boolean)=> T,
    isFilledArray: (arr: any[]) => boolean,
    isEmptyArray: (arr: any[]) => boolean,
    isDippedFilledArray: (obj, ...pathOne: string[]) => boolean,
    precise: (number: number , n?:number)=> number,
    sum: Function,
    subtract: Function,
    multiply: Function,
    divide: Function,
    getUniqueDict: <T>(/*полный массив*/dict: T[], /*уже выбранные значения*/valArr: any[], numCurrentRow: number, prop: keyof T) => T[],
    getUniqueDictPrimitive: Function,
    calcSumForProp: (arr: any[], prop: string)=> number,

    _isCountable: (a: number , b:number)=> boolean,
    _getCountable: (a: number)=> number,
    flatten: (a: any[])=> any[],
    mapObjects: (a: Object, b: Object, arrOne: string[], arrTwo: string[])=> any,
    setValueToMaybeDottedProp: (obj, prop: string, value)=> void
    getValueFromMaybeDottedProp: <T>(obj: T, prop: keyof T)=> any
    copy: <T>(obj: T) => T
    isInvalidPrimitive: (value: any)=> boolean
    isInvalidValue: (value: any)=> boolean
    capitalizeFirstLetter: (str: string) => string
    lowerFirstLetter: (str: string) => string
  constructErrorMessage: (err: string) => string
  constructErrorNotUniqueMessage: (err: string) => string
  constructErrorMaxLengthMessage: (err: string, num: number) => string
  handleValidationErrors: (err: ValidationError[]) => string[]
}

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

export let __: IUnderscore = {
    qntyDecimal: 3,// количество знаков после запятой у всех количеств в приложении
// вернет {}  если returnEmtyObject true
    where: function (arr, attr, value, returnEmtyObject) {
        if (!arr.length || !attr || value  === null || value === undefined) return returnEmtyObject ? <any>{} : <any>null;
        const ret = arr.find(function (obj) {
            if (obj[attr] == <any>value) return true
        });
        return ret? ret : (returnEmtyObject ? <any>{} : null)
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
  getValueFromMaybeDottedProp<T>(obj: T, prop: keyof T) {
    // если buyer отсутствует doc.header.buyer.id то упадет но верну что значение undefined
    try {
      return eval('obj.' + prop)
    } catch(e) {
      return
    }
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
  capitalizeFirstLetter(string) {
    return __.isInvalidPrimitive(string) ? null : string.charAt(0).toUpperCase() + string.slice(1);
  },
  lowerFirstLetter(string) {
    return __.isInvalidPrimitive(string) ? null : string.charAt(0).toLowerCase() + string.slice(1);
  },
  constructErrorMessage(err: string) {
      return `Не заполнено обязательное поле "${err}"`
  },
  constructErrorNotUniqueMessage(err: string) {
      return `Поле "${err}" не уникально`
  },
  constructErrorMaxLengthMessage(err: string, num: number) {
      return `Поле "${err}" не должно быть больше ${num} символов`
  },
  handleValidationErrors(err: ValidationError[]): string[] {
      return this.flatten(err.map(e => Object.values(e.constraints)))
  },
};