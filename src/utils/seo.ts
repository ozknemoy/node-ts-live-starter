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
  checkTextUniqueness: IPageInfo
  faq: IPageInfo
  textRu: IPageInfo
}

const robots = 'index, follow';
const norobots = 'nofollow';

/*В тайтл, первый обзац и картинку статьи если есть самый лучший ключ.
  В Заголовок h1 другой ключ.
  Дискрипшен о чем статья можно сокращенно первый обзац вписать.
  Тайтл не очень длинный он вписывается в первый абзац и внизу статьи
у конкурентов есть же приличный твоих*/


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
  faq: {
    title: 'FAQ Повысить уникальность документа ' + DOMEN,
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
  checkTextUniqueness: {
    title: 'Проверка на уникальность текста',
    description: '',
    keywords: '',
    robots: robots,
  },
  textRu: {
    title: 'Текст ру проверка уникальности',
    description: '',
    keywords: '',
    robots: robots,
  },

};