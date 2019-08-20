import {needlessBranchDict, qualDict} from "./xmls";
import {__} from "./__";

export function checkMapIntegrity(map: string[][], obj/*for eval*/: typeof Object) {
  return map.every(path => {
    try {
      eval(`obj${getEvalPath(path)}`);
      return true
    } catch(e) {
      return false
    }
  })
}


export function getEvalPath(path: string[]): string {
  return __.copy(path)
    .map(chunk => /[A-Za-zА-Яа-яЁё]/.test(chunk) ? '.' + chunk : `[${parseInt(chunk)}]`)
    .join('')
}

export function firstPassMap(root): string[][] {
  const mapString = _firstPassMap(root);
  return mapString.map(str => str.split('.'))
}
//based on https://stackoverflow.com/questions/37759768/get-all-paths-in-json-object
function _firstPassMap(obj, root = "", result = []) {
  const props = Object.keys(obj);
  return props.reduce((prev,current) => {
    const p = root + current + ".";
    typeof obj[current] === 'object' && Object.keys(obj[current]).length
      ? _firstPassMap(obj[current],p,prev)
      : prev.push(p + obj[current]);
    return prev;
  },result);
}
export function firstPassMapNoValue(map: string[][]): string[][] {
  return __.copy(map).map(path => {
    path.pop();
    return path
  })
}

export function secondPassMap(_firstMap: string[][], xmlJson/*for eval*/: typeof Object) {
  const firstMap = firstPassMapNoValue(_firstMap);
  const xPath = firstMap.map(path => path.join('/'));

  const secondMap = [];
  firstMap.forEach(path => {
    const endPointEl = path[path.length - 1];

    if(qualDict.hasOwnProperty(endPointEl)) {
      // с обработкой
      const neededElPath = qualDict[endPointEl];
      const dictElDottedPath = neededElPath.replace(/\//g, '.');
      const dictElFirstProp = neededElPath.split('/')[0];
      // xpath текущего элемента
      const currentPath = __.copy(path);
      let valueOfEl: string;
      let newPath: string[];
      let deleted: string[] = [];
      // поднимаюсь по дереву вверх
      while(currentPath.length > 1) {
        // удаляю по одному уровню и проверяю есть ли такое свойство
        deleted.push(currentPath.pop());
        const currentDottedPath = getEvalPath(currentPath);
        if(eval(`xmlJson${currentDottedPath}`).hasOwnProperty(dictElFirstProp)) {
          valueOfEl = eval(`xmlJson${currentDottedPath}.${dictElDottedPath}`);
          newPath = currentPath;
          newPath.push(`[${neededElPath}="${valueOfEl}"]`);
          deleted = deleted.reverse();
          newPath = newPath.concat(deleted);
          break;
        }
      }
      secondMap.push(newPath)
    } else if(path.some(el => needlessBranchDict.indexOf(el) > -1)) {
      // лишний поэтому игнор
    } else {
      // обычный элемент
      secondMap.push([...path])
    }
  });
  // добавить слеши
  return addSlash(secondMap)
}

export function addSlash(map: string[][]) {
  // вставляю слеш если первый символ не скобка
  return __.copy(map).map(path => path.map(tag => /^[^[]/.test(tag) ? '/' + tag : tag))
}