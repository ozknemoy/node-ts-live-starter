
export const ruRegexp = /[а-яА-ЯёЁ]+/;

export function findRuText(str: string) {
  return
}

export function getRsidR() {
  (Math.random() + '').slice(-8)
}

export function getAmountWord(str: string) {
  return str.split(' ').length
}

export function getAmountWordEnough(str: string) {
  return getAmountWord(str)
}

