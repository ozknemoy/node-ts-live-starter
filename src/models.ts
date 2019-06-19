export interface IJsonXml {
  'w:document': {
    $: { [key: string]: string }
    'w:body': {
      'w:p': (IParagraphOne | IParagraphTwo)[]
      'w:sectPr': {
        '$': { 'w:rsidR': string },
        'w:pgSz': { '$': { 'w:w': string, 'w:h': string } }[],
        'w:pgMar': [{
          '$': {
            'w:top': string,
            'w:right': string,
            'w:bottom': string,
            'w:left': string,
            'w:header': string,
            'w:footer': string,
            'w:gutter': string
          }
        }],
        'w:cols': { '$': { 'w:space': string } }[],
        'w:docGrid': { '$': { 'w:linePitch': string } }[]
      }[]
    }[]
  }
}

export interface IParagraphOne {
  '$': IParagraphRoot,
  'w:pPr': [{
    'w:spacing': [
      { '$': {
            'w:after': '0',
            'w:line': '240',
            'w:lineRule': 'auto'
      }
      }
      ]
  }],
  'w:proofErr': [
    { '$': { 'w:type': 'spellStart' } },
    { '$': { 'w:type': 'spellEnd' } }
    ],
  'w:r': {
    '$': { 'w:rsidRPr': string },
    'w:rPr': IParagraphPreferences[],
    'w:t': (IRunOne | IRunTwo)[]
  }[]
}

export function isParagraphOne(p: IParagraphOne | IParagraphTwo): p is IParagraphOne {
  return !!p['w:r']
}


export function isRunOne(wT: IRunOne | IRunTwo): wT is IRunOne {
  return typeof wT !== 'string'
}

export function isRunTwo(wT: IRunOne | IRunTwo): wT is IRunTwo {
  return typeof wT === 'string'
}

export interface IRunOne {
  _: ' космизма барокко к романтическому космизму Е.Г. ',
  '$': { 'xml:space': 'preserve' }
}

export type IRunTwo = string;

export interface IFont {
  '$': {
    'w:ascii': string,
    'w:eastAsia': string,
    'w:hAnsi': string,
    'w:cs': string
  }
}

export interface IParagraphPreferences {
  'w:rFonts': IFont[],
  'w:color': [{ '$': { 'w:val': '292C31' } }],
  'w:sz': [{ '$': { 'w:val': '21' } }],
  'w:szCs': [{ '$': { 'w:val': '21' } }],
  'w:shd': [{ '$': { 'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF' } }],
  'w:lang': [{ '$': { 'w:eastAsia': 'ru-RU' } }]
}

export interface IParagraphTwo {
  '$': IParagraphRoot,
  'w:bookmarkStart': IParagraphBookmark[],
  'w:bookmarkEnd': IParagraphBookmark[]

}

export interface IParagraphBookmark {
  '$': { 'w:id': '0', 'w:name'?: '_GoBack' }
}

export interface IParagraphRoot {
  'w:rsidR'?: string,
  'w:rsidRDefault'?: string,
  'w:rsidP'?: string
  'w:rsidRPr'?: string
}