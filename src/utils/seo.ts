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
    title: 'Повысить уникальность документа ' + DOMEN,
    description: '',
    keywords: ''
  },
  // http://anfox.ru/Home/Order
  doxUpload: {
    title: 'Повышение уникальности текста ' + DOMEN,
    description: 'обойти антиплагиат, повысить уникальность текста',
    keywords: 'Поможем пройти антиплагиат и поднять уникальность текста за 5 мин! Лучший метод обхода антиплагиат.ру и etxt.'
  },
};