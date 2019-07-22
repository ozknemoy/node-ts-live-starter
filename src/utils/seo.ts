import {DOMEN} from "../algo/helpers";

export interface IPageInfo {
  title: string
  description: string
  keywords: string
  robots: string
}

export interface ISeo {
  index: IPageInfo
  about: IPageInfo
  doxUpload: IPageInfo
  pay: IPageInfo
  handledFile: IPageInfo
}

const robots = 'index, follow';
const norobots = 'nofollow';

export const SEO: ISeo = {
  index: {
    title: 'Повысить уникальность документа ' + DOMEN,
    description: 'Онлайн-сервис повышения уникальности текста. Антиплагиат',
    keywords: 'антиплагиат онлайн, обойти антиплагиат, обмануть антиплагиат, повышение уникальности, антиплагиат отзывы',
    robots,
  },
  about: {
    title: 'Повысить уникальность документа ' + DOMEN,
    description: '',
    keywords: '',
    robots,
  },
  // http://anfox.ru/Home/Order
  doxUpload: {
    title: 'Повышение уникальности текста ' + DOMEN,
    description: 'обойти антиплагиат, повысить уникальность текста',
    keywords: 'Поможем пройти антиплагиат и поднять уникальность текста за 5 мин! Лучший метод обхода антиплагиат.ру и etxt.',
    robots,
  },
  pay: {
    title: 'Оплата повышения уникальности текста ' + DOMEN,
    description: 'Оплата повышения уникальности текста',
    keywords: '',
    robots: norobots,
  },
  handledFile: {
    title: 'Изменение уникальности текста бесплатно' + DOMEN,
    description: 'Изменение уникальности текста бесплатно',
    keywords: '',
    robots: norobots,
  },

};