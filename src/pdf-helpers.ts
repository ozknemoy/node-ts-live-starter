export const marginTMd = [0, 20, 0, 0];
export const marginTSm = [0, 13, 0, 0];

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