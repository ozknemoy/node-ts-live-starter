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

export interface IRunOne {
  '$': { 'w:rsidR'?: string, 'w:rsidRPr'?: string },
  'w:rPr': IParagraphPreferences[],
  'w:t': (IWTextOne | IWTextTwo)[]
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
  'w:r': IRunOne[]
}

export function isParagraphOneWithWRun(p: IParagraphOne | IParagraphTwo): p is IParagraphOne {
  return !!p['w:r']
}


export function isWTextOne(wT: IWTextOne | IWTextTwo): wT is IWTextOne {
  return typeof wT !== 'string'
}

export function isWTextTwo(wT: IWTextOne | IWTextTwo): wT is IWTextTwo {
  return typeof wT === 'string'
}

export interface IWTextOne {
  _: string,
  $: { 'xml:space': 'preserve' }
}

export type IWTextTwo = string;

export interface IFont {
  $: {
    'w:ascii': string,
    'w:eastAsia': string,
    'w:hAnsi': string,
    'w:cs': string
  }
}

export interface I$WVal {
  $: {'w:val': string}
}
export interface IParagraphPreferences {
  'w:rFonts': IFont[],
  'w:color': I$WVal[],
  'w:sz': I$WVal[],
  'w:szCs': I$WVal[],
  'w:spacing'?: I$WVal[],
  'w:w'?: I$WVal[],
  'w:shd': [{ '$': { 'w:val': string, 'w:color': string, 'w:fill': string } }],
  'w:lang': [{ '$': { 'w:eastAsia': string } }]
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