/**
 * Created by ozk.nemoy on 24.10.2017.
 */
const copy = require('rfdc')();

export interface IRolePermission {
  [key: string]: string[]
}

const _cf = (function () {
  function _shift(x) {
    const parts = x.toString().split('.');
    return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length)
  }

  return function (...rest) {
    return Array.prototype.reduce.call(rest, function (prev, next) {
      return prev === undefined || next === undefined || prev === null || next === null ?
        undefined : Math.max(prev, _shift(next))
    }, -Infinity)
  };
})();

export class __ {

  // вернет {}  если returnEmptyObject true
  static where<T, KEY extends keyof T>(arr: T[], attr: KEY, value: T[KEY], returnEmtyObject?: boolean): T {
    if (!arr.length || !attr || value === null || value === undefined) return returnEmtyObject ? <any>{} : <any>null;
    const ret = arr.find(function (obj) {
      if (obj[attr] == <any>value) return true
    });
    return ret ? ret : (returnEmtyObject ? <any>{} : null)
  }

  static isFilledArray(arr: any[]): boolean {
    return !!arr && Array.isArray(arr) && !!arr.length
  }

  static isEmptyArray(arr: any[]): boolean {
    return !!arr && Array.isArray(arr) && arr.length === 0
  }

  static isDippedFilledArray(obj, ...fields: string[]): boolean {
    if (!!obj && typeof obj === 'object' && fields && fields.length) {
      try {
        let arr = eval('obj.' + fields.join('.'));
        if (!!arr && __.isFilledArray(arr)) return true
      } catch (e) {
        return false
      }
    }
    return false
  }

  static precise(number: number, n?: number): number {
    return parseFloat(parseFloat('' + number).toPrecision(n || 15))
  }

  static _isCountable(a: number , b:number): boolean {
    return !!a && !!b
  }

  static _getCountable(a: number): number {
    return a ? __.precise(a) : 0
  }

  static sum(...rest) {
    rest = rest.map(this._getCountable);
    const f = _cf.apply(null, rest);

    if (f === undefined) return;

    function cb(x, y) {
      return x + f * y
    }

    return Array.prototype.reduce.call(rest, cb, 0) / f
  }

  static subtract(l, r) {
    l = this._getCountable(l);
    r = this._getCountable(r);
    const f = _cf(l, r);
    // добавил сюда multiply иначе не работало
    return (this.multiply(l * f) - this.multiply(r * f)) / f
  }

  static multiply(...rest) {
    rest = rest.map(this._getCountable);
    const f = _cf.apply(null, rest);

    function cb(x, y) {
      return (x * f) * (y * f) / (f * f)
    }

    return Array.prototype.reduce.call(rest, cb, 1)
  }

  static divide(l, r) {
    if (!this._isCountable(l, r)) return 0;
    const f = _cf(l, r);
    return (l * f) / (r * f);
  }

  // вернет справочник с не повторяющимися уже выбранными полями
  static getUniqueDict<T>(/*полный массив*/dict: T[], /*уже выбранные значения*/valArr: (T[keyof T])[], numCurrentRow: number, prop: keyof T): T[] {
    if (!dict || !valArr || !__.isFilledArray(valArr)) return [];
    return dict.filter(row =>
      // текущее значение строки должно быть в справочнике
      (valArr[numCurrentRow] && valArr[numCurrentRow] === row[prop]) ||
      // значение из  словаря уже не должно быть в массиве
      valArr.indexOf(row[prop]) === -1)
      .sort((a, b) => a[prop] > b[prop] ? 1 : -1)
  }

  // вернет справочник примитивов с не повторяющимися уже выбранными полями
  static getUniqueDictPrimitive<T>(dict: T[], valArr: any[], numCurrenRov: number): T[] {
    if (!dict || !valArr || !__.isFilledArray(valArr)) return [];
    return dict.filter(primitive =>
      // текущее значение строки тоже должно быть в справочнике
      (valArr[numCurrenRov] && valArr[numCurrenRov] === primitive) ||
      valArr.indexOf(primitive) === -1)
      .sort((a, b) => {
        return a > b ? 1 : -1
      })
  }

  static calcSumForProp(arr: any[], prop: string) {
    const sum = arr.reduce((prev, b) => __.sum(prev, parseFloat(b[prop])), 0);
    return isNaN(sum) ? null : sum
  }

  static flatten<T>(arr: T[] | T[][]): T[] {
    if (!Array.isArray(arr)) {
      console.warn('Это не массив');
      return
    }
    let r = [];
    arr.forEach(el => Array.isArray(el) ? r = r.concat(__.flatten(el)) : r.push(el));
    return r;
  }

  static mapObjects(objOne: Object, objTwo: Object, arrOne: string[], arrTwo: string[]): Object {
    if (!arrOne || !arrTwo || !arrOne.length || arrOne.length !== arrTwo.length) {
      console.warn('кривые массивы');
      return;
    }
    let obj = <any>{};
    arrOne.forEach((one, i) => {
      obj[one] = objTwo[arrTwo[i]]
    });
    return obj
  }

  static setValueToMaybeDottedProp(obj, prop: string, value): void {
    if (prop.indexOf('.') > -1) {
      const [keyOne, keyTwo] = prop.split('.');
      obj[keyOne][keyTwo] = value;
    } else {
      obj[prop] = value;
    }
  }

  static getValueFromMaybeDottedProp<T>(obj: T, prop: keyof T): any {
    // если buyer отсутствует doc.header.buyer.id то упадет но верну что значение undefined
    try {
      return eval('obj.' + prop)
    } catch (e) {
      return
    }
  }

  static copy<T>(obj: T): T {
    return typeof obj === 'object' && obj !== null ? copy(obj) : obj
  }

  static extractOnlyDefinedValues<T>(obj: T): Partial<T> {
    const ret: Partial<T> = {};
    for(const key in obj) {
      if(obj[key] !== undefined) {
        ret[key] = obj[key];
      }
    }
    return ret
  }

  static isInvalidPrimitive(value): boolean {
    return value === null || value === undefined || value === '' || ((typeof value === 'string' && value.trim() === ''))
  }

  static isValidPrimitive(value): boolean {
    return !__.isInvalidPrimitive(value)
  }

  static isInvalidValue(value): boolean {
    return __.isInvalidPrimitive(value) || (Array.isArray(value) && !value.length)
  }

  static isValidPrimitives(...value): boolean {
    return !value.some(__.isInvalidPrimitive)
  }

  static capitalizeFirstLetter(string: string): string {
    return __.isInvalidPrimitive(string) ? null : string.charAt(0).toUpperCase() + string.slice(1);
  }

  static lowerFirstLetter(string: string): string {
    return __.isInvalidPrimitive(string) ? null : string.charAt(0).toLowerCase() + string.slice(1);
  }

  static constructRequireErrorMessage(field: string): string {
    return `Не заполнено обязательное поле "${field}"`
  }

  static constructMinErrorMessage(field: string, num: number): string {
    return `Поле "${field}" должно быть больше ${num}`
  }

  static constructRangeErrorMessage(field: string, min: number, max: number, int?: boolean): string {
    return `Поле "${field}" должно быть ${int ? 'целым числом' : ''} от ${min} до ${max}`
  }

  static constructIntErrorMessage(field: string): string {
    return `Поле "${field}" должно быть целым числом`
  }

  static constructErrorNotUniqueMessage(field: string, plural = false): string {
    return `Пол${plural ? 'я' : 'е'} "${field}" не уникальн${plural ? 'ы' : 'о'}`.replace(/,\s?/, '", "')
  }

  static constructErrorMaxLengthMessage(field: string, num: number): string {
    return `Поле "${field}" не должно быть больше ${num} символов`
  }

  static constructInvalidMessage(field: string): string {
    return `Поле "${field}" не валидно`
  }

  static maxLengthErrorMessage(num: number) {
    return `Не более ${num} символов`
  }
  // для обязательного поля ис ограничением по длине
  static constructRequiredErrorMaxLengthMessage(field: string, num: number): string {
    return `${this.constructRequireErrorMessage(field)}. ${this.maxLengthErrorMessage(num)}`
  }

  static emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static isValidEmail(email: string) {
    var re = __.emailRegexp;
    return re.test(email);
  }

  static isValidEmailsString(emails: string, separator) {
    if (!emails) return true;
    return emails.split(separator).every(__.isValidEmail)
  }

  static getTokenFromString(tokenHeader: string): string {
    return tokenHeader.replace('Bearer ', '')
  }

  static isNotAllPropsEmpty<T>(obj: T, blackListProps?: (keyof T)[]): boolean {
    if (!obj) return false;
    return Object.keys(obj)
      .filter(prop => blackListProps ? blackListProps.indexOf(<keyof T>prop) === -1 : true)
      .some(prop => {
        const val = obj[prop];
        if(typeof val === 'number') return !isNaN(obj[prop]);
        return !this.isInvalidValue(obj[prop])
      })
  }

  static getHandledEmptyArray<T>(arr: T[]): T[] {
    const newArr = (arr || []).filter(d => !this.isInvalidValue(d));
    return newArr.length ? newArr : null;
  }

  static splitTextBySpacesSemicolonsComas(str: string, deduped = false): string[] {
    if(this.isInvalidPrimitive(str)) return null;
    const ret = str.split(/\s|\n|,|;/g).filter(one => one !== '');
    return deduped ? this.dedupe(ret) : ret;
  }

  static dedupe(val: any[]) {
    return Array.isArray(val) ? Array.from(new Set(val)) : val
  }

  /** вернет только элементы с уникальными свойствами propName */
  static dedupeArrayOfObjectsByProperty<T>(arr: T[], propName: keyof T): T[] {
    if(!__.isFilledArray(arr)) return arr;
    const uniqueProps = __.dedupe(arr.map(one => one[propName]));
    return uniqueProps.map(one => __.where(arr, propName, one))
  }

  static copyToClipboard(val) {
    var selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;//this.text.join('\r\n');

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // [{[proOne]:2, [propTwo]: 'изменение'}] -> {[proOneValue]:[propTwoValue]}
  static toKeyProp<T>(obj: T[], propKey: keyof T, propValue: keyof T): {[key: string]: any} {
    let o = {};
    obj.forEach(row => {
      o[row[propKey].toString()] = row[propValue];
    });
    return o;
  }

  static setLaneDictValue<T>(dict: T[], defaultValue: string | number, propName: keyof T) {
    return dict && dict.length === 1 ? dict[0][propName] : defaultValue
  }

  static setLaneDictObject<T>(dict: T[], defaultValue = null): T {
    return dict && dict.length === 1 ? dict[0] : defaultValue
  }

  /** regexp положительное целое число */
  static hasOnlyDigitsRegexp = /^-?\d+$/;

  /** положительное целое число */
  static hasOnlyDigits(value): boolean {
    return this.hasOnlyDigitsRegexp.test(value);
  }

  /** любое число */
  static isNumber(val: string| number): boolean {
    if(this.isInvalidPrimitive(val)) return false;
    const numberReSnippet = "(?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity))";
    const matchOnlyNumberRe = new RegExp("^("+ numberReSnippet + ")$");
    return matchOnlyNumberRe.test(val.toString());
  }

  // https://regex101.com/r/lV5mB3
  static handleORAError(str: string): string {
    // нельзя использовать запятую в тексте ошибки
    const match = str.match(/ORA-\d*:\s*([^,|\n]*)/);
    // сюда могут попадать уже обработанные handleORAError ошибки поэтому проверяю
    return match ? match[1] : str;
  }

  static enum(separator:string, ..._enum: (string | number)[]):string {
    if(!_enum) return;
    return _enum
        .filter(e => !this.isInvalidPrimitive(e))
        .join(separator + ' ')
  }

  static constructUrl(mainChunk, params) {
    let chunk = '';
    for (let prop in params) {
      if (params[prop] !== null && params[prop] !== undefined) {
        const _chunk = prop + '=' + params[prop];
        chunk = chunk === '' ? '?' + _chunk : chunk + '&' + _chunk;
      }
    }
    return mainChunk + chunk;
  }

  static innErrorMessage = 'ИНН должен состоять из 10 или 12 цифр';
  static innRegexp = /(^$|^null$|^\d{10,10}$)|(^\d{12,12}$)/;

  static kppErrorMessage = 'КПП должен состоять из 9 цифр';
  static kppRegexp = /(^$|^null$|^\d{9,9}$)/;

  static okpoErrorMessage = 'ОКПО должен состоять из 8 или 10 цифр';
  static okpoRegexp = /(^$|^null$|^\d{8,8}$)|(^\d{10,10}$)/;

  static ogrnErrorMessage = 'ОГРН должен состоять из 13 или 15 цифр';
  static ogrnRegexp = /(^$|^null$|^\d{13,13}$)|(^\d{15,15}$)/;

  static spacesRegexpError(f: string) {
    return `${f} не должен содержать пробелы`
  }
  static spacesRegexp = /(\s)|(\n)/;

  // использовать если уже есть другая проверка @Validate иначе использовать @Length
  static callbackOptionalMaxLength(maxLength: number): [Function, boolean] {
    return [v =>  !__.isInvalidPrimitive(v) && v.length > maxLength, true]
  }

  static userRightIsAdmin(right: number): boolean {
    return [1, 2].indexOf(right) > -1
  }

  static createContentDisposition(fileName: string): [string, string] {
    const ret = 'attachment; filename=' + fileName;
    return ['Content-Disposition', ret];
  }

  static getFileNameFromHttpResponse(httpResponse) {
    const contentDispositionHeader = decodeURIComponent(httpResponse.headers.get('Content-Disposition'));
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  static objectEquals(x, y): boolean {

    if (x === null || x === undefined || y === null || y === undefined) {
      return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) return false;
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) return x === y;
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) return x === y;
    if (x === y || x.valueOf() === y.valueOf()) return true;
    if (Array.isArray(x) && x.length !== y.length) return false;

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) return false;

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) return false;
    if (!(y instanceof Object)) return false;

    // recursive object equality check
    const p = Object.keys(x);
    return Object.keys(y).every((i) =>  p.indexOf(i) !== -1)
      && p.every((i) => this.objectEquals(x[i], y[i]));
  }

  // equal [1, 2, 0] and [0, 2, 1]
  static arrayEqualsEvenShuffle(x, y): boolean {
    return this.objectEquals(this.isFilledArray(x)? x.sort() : x, this.isFilledArray(y) ? y.sort() : y)
  }


  //{id:null}+{id:4,name:'ret'} -> {id:4}
  static extendObjectByKnownProperties<COMMON, T extends COMMON, Y extends COMMON>(base: T, second: Y): T {
    let ret: T = <T>{};
    for(let key in base) {
      if(base.hasOwnProperty(key) && base[key] !== undefined && key in second) {
        ret[key] = second[<any>key]
      } else if(base[key] !== undefined) {
        ret[key] = base[<any>key]
      }
    }
    return ret
  }

  static cherryPickProps<T>(obj: T, props: (keyof T)[]): Partial<T> {
    let ret: Partial<T> = {};
    props.forEach(prop => {
      ret[prop] = obj[prop]
    })
    return ret
  }

  static splitArrayOnChunks<T>(array: T[], chunkSize: number): T[][] {
    if(!array || __.isEmptyArray(array)) return;
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(array.length/chunkSize); i++){
      subarray[i] = array.slice((i*chunkSize), (i*chunkSize) + chunkSize);
    }
    return subarray
  }

  /** вернет значение из глубины объекта по пути свойств */
  static getValueFromDippedObject<T>(obj: T, props: string | keyof T) {
    if(__.isInvalidPrimitive(props) || __.isInvalidValue(obj) || typeof obj !== 'object') return null;

    if((<string>props).indexOf('.') > -1) {
      try {
        return eval('obj.' + props);
      }
      catch (e){
        return null
      }
    } else {
      return obj[<keyof T>props]
    }
  }

  static getRouteParamsMap(route: string): [string[], string[]] {
    const params = [];
    const queryParams = [];
    const arr = route.split(/(:|\/|\?|=)/).filter(s => s !== '');
    arr.forEach(((ch, i) => {
      if(ch === ':') {
        params.push(arr[i + 1]);
      } else if(ch === '?') {
        queryParams.push(arr[i + 1]);
      }
    }))


    return[params, queryParams]
  }

  static thousand (nStr, toFixed = 2) {
    if (nStr == 0 || nStr === null) return 0;
    if (!nStr) return undefined;
    if(toFixed) nStr = (+nStr).toFixed(toFixed);
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return (x1 + x2).replace(/\./g, ',');
  }
  /**
   * вернет слово в правильном склонении в зависимости от числа
   * 1 — яблоко
   * 2 — яблока
   * 5 — яблок
   */
  static getNoun(number: number, one: string, two: string, five: string): string {
      //принципиально возвращать undefined / для bind-once
      if (__.isInvalidPrimitive(number)) return <null | undefined>number;
      number = Math.abs(number);
      number %= 100;
      if (number >= 5 && number <= 20) {
        return five;
      }
      number %= 10;
      if (number === 1) {
        return one;
      }
      if (number >= 2 && number <= 4) {
        return two;
      }
      return five;
  }

  /** сравнение двух примитивов. изначально для бека истории */
  static isEqualForHistory(a, b) {
    return a === b
      || this.isEqualBoolean(a, b)
      || (a === '' && b === null)
      || (a === null && b === '')
      || (a === undefined && b === null)
  }

  /** сравнение двух примитивов если хотя бы один Boolean */
  static isEqualBoolean(a, b) {
    if(typeof a === 'boolean' || typeof b === 'boolean') {
      return (a === false && b === null)
        || (a === null && b === false)
        || (a === undefined && b === null)
        || (a === undefined && b === false)
    } else return false
  }
}
