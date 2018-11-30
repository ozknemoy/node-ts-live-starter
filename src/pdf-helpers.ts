
import {HandleData} from '../../staffjs/src/shared/handle-data';
export const marginTMd = [0, 20, 0, 0];
export const marginTSm = [0, 13, 0, 0];
export const tableFontSize = 10;
export const defaultFontSize = 10;
export const defaultTableLayout = {
  // 0.5 подобрано для совпадения с decoration: 'underline'
  hLineWidth: (i, node) => 0.5,
  vLineWidth: (i, node) =>  0.5
};

export const getMarginT = (n: number) => [0, n, 0, 0];

export function underlineText(text: string) {
  return {text, decoration: 'underline'}
}
export function makeEmptiness(n: number) {
  let str = '\t';
  while (str.length < n) {
    str += '\t';
  }
  return str
}

export function underlineFull(n, ext: Object = {}) {
  let body = Array(n).fill(HandleData.copy([{
    border: [false, false, false, true],
    text: ''
  }]));
  return {...{
    layout: defaultTableLayout,
    table: {
      heights: 12,
      widths: ['*'/*, 'auto'*/],
      body
    }
  }, ...ext}
}
