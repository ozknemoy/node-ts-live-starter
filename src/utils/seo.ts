import {DOMEN} from "../algo/helpers";

export interface IPageInfo {
  title: string
  description: string
  keywords: string
}

export interface ISeo {
  [key: string]: IPageInfo
}

export const SEO: ISeo = {
  index: {
    title: 'Повысить уникальность документа ' + DOMEN,
    description: 'Онлайн-сервис повышения уникальности текста. Антиплагиат',
    keywords: 'антиплагиат онлайн, обойти антиплагиат, обмануть антиплагиат, повышение уникальности, антиплагиат отзывы'
  },
  about: {
    title: ' ' + DOMEN,
    description: '',
    keywords: ''
  },
};