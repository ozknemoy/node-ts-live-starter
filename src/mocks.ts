import {IParagraphOne, IParagraphPreferences, IRunOne, IWTextOne} from "./models";

export const realXml = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
            xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
            mc:Ignorable="w14 w15 w16se wp14">
    <w:body>
        <w:p w:rsidR="00422579" w:rsidRDefault="009B198C" w:rsidP="00422579">
            <w:pPr>
                <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
            </w:pPr>
            <w:proofErr w:type="spellStart"/>
            <w:r w:rsidRPr="009B198C">
                <w:rPr>
                    <w:rFonts w:ascii="Arial" w:eastAsia="Times New Roman" w:hAnsi="Arial" w:cs="Arial"/>
                    <w:color w:val="292C31"/>
                    <w:sz w:val="21"/>
                    <w:szCs w:val="21"/>
                    <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                    <w:lang w:eastAsia="ru-RU"/>
                </w:rPr>
                <w:t>Oт</w:t>
            </w:r>
            <w:proofErr w:type="spellEnd"/>
            <w:r w:rsidRPr="009B198C">
                <w:rPr>
                    <w:rFonts w:ascii="Arial" w:eastAsia="Times New Roman" w:hAnsi="Arial" w:cs="Arial"/>
                    <w:color w:val="292C31"/>
                    <w:sz w:val="21"/>
                    <w:szCs w:val="21"/>
                    <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                    <w:lang w:eastAsia="ru-RU"/>
                </w:rPr>
                <w:t xml:space="preserve"> космизма барокко к романтическому космизму Е.Г. </w:t>
            </w:r>
        </w:p>
        <w:p w:rsidR="00DE53E5" w:rsidRDefault="00422579" w:rsidP="009B198C">
            <w:bookmarkStart w:id="0" w:name="_GoBack"/>
            <w:bookmarkEnd w:id="0"/>
        </w:p>
        <w:sectPr w:rsidR="00DE53E5">
            <w:pgSz w:w="11906" w:h="16838"/>
            <w:pgMar w:top="1134" w:right="850" w:bottom="1134" w:left="1701" w:header="708" w:footer="708"
                     w:gutter="0"/>
            <w:cols w:space="708"/>
            <w:docGrid w:linePitch="360"/>
        </w:sectPr>
    </w:body>
</w:document>
`;

export const realXmlJson = {
    'w:document': {
      '$': {
        'xmlns:wpc': 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas',
        'xmlns:wps': 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape',
        'mc:Ignorable': 'w14 w15 w16se wp14'
      },
      'w:body': [{
        'w:p':
          [{
            '$': {
              'w:rsidR': '00422579',
              'w:rsidRDefault': '009B198C',
              'w:rsidP': '00422579'
            },
            'w:pPr':
              [{
                'w:spacing':
                  [{'$': {'w:after': '0', 'w:line': '240', 'w:lineRule': 'auto'}}]
              }],
            'w:proofErr': [
              {'$': {'w:type': 'spellStart'}},
              {'$': {'w:type': 'spellEnd'}}],
            'w:r':
              [{
                '$': {'w:rsidRPr': '009B198C'},
                'w:rPr': [
                  {
                    'w:rFonts': [{
                      '$': {
                        'w:ascii': 'Arial',
                        'w:eastAsia': 'Times New Roman',
                        'w:hAnsi': 'Arial',
                        'w:cs': 'Arial'
                      }
                    }
                    ],
                    'w:color': [{'$': {'w:val': '292C31'}}],
                    'w:sz': [{'$': {'w:val': '21'}}],
                    'w:szCs': [{'$': {'w:val': '21'}}],
                    'w:shd': [{'$': {'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF'}}],
                    'w:lang': [{'$': {'w:eastAsia': 'ru-RU'}}]
                  }],
                'w:t': ['Oт']
              }, {
                '$': {'w:rsidRPr': '009B198C'},
                'w:rPr': [
                  {
                    'w:rFonts': [
                      {
                        '$': {
                          'w:ascii': 'Arial',
                          'w:eastAsia': 'Times New Roman',
                          'w:hAnsi': 'Arial',
                          'w:cs': 'Arial'
                        }
                      }],
                    'w:color': [{'$': {'w:val': '292C31'}}],
                    'w:sz': [{'$': {'w:val': '21'}}],
                    'w:szCs': [{'$': {'w:val': '21'}}],
                    'w:shd':
                      [{'$': {'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF'}}],
                    'w:lang': [{'$': {'w:eastAsia': 'ru-RU'}}]
                  }],
                'w:t': [{
                  _: ' космизма барокко к романтическому космизму Е.Г. ',
                  '$': {'xml:space': 'preserve'}
                }]
              }]
          }, {
            '$': {
              'w:rsidR': '00DE53E5',
              'w:rsidRDefault': '00422579',
              'w:rsidP': '009B198C'
            },
            'w:bookmarkStart': [{'$': {'w:id': '0', 'w:name': '_GoBack'}}],
            'w:bookmarkEnd': [{'$': {'w:id': '0'}}]
          }],
        'w:sectPr': [
          {
            '$': {'w:rsidR': '00DE53E5'},
            'w:pgSz': [{'$': {'w:w': '11906', 'w:h': '16838'}}],
            'w:pgMar': [{
              '$': {
                'w:top': '1134',
                'w:right': '850',
                'w:bottom': '1134',
                'w:left': '1701',
                'w:header': '708',
                'w:footer': '708',
                'w:gutter': '0'
              }
            }],
            'w:cols': [{'$': {'w:space': '708'}}],
            'w:docGrid': [{'$': {'w:linePitch': '360'}}]
          }]
      }]
    }
  }
;
export const realXmlRun = `
<w:r w:rsidRPr="009B198C">
    <w:rPr>
        <w:rFonts w:ascii="Arial" w:eastAsia="Times New Roman" w:hAnsi="Arial" w:cs="Arial"/>
        <w:color w:val="292C31"/>
        <w:sz w:val="21"/>
        <w:szCs w:val="21"/>
        <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
        <w:lang w:eastAsia="ru-RU"/>
    </w:rPr>
    <w:t>, Тверь Эпоха Барокко - важнейшее звено в цепи культурных эпох и «великих стилей». Переломный его
        характер проявляется в том, что, наследуя идеи Средневековья, Барокко противопоставляет себя
        Ренессансу, взрывая его иллюзорные надежды на построение социальной гармонии и восхождение по
        «лестнице прогресса», и открывает возможности более сложного развития искусства,
    </w:t>
</w:r>
`;

export const realXmlJsonRun = {
  'w:r':
    {
      '$': {'w:rsidR': '008364C4', 'w:rsidRPr': '008364C4'},
      'w:rPr':
        [{
          'w:rFonts':
            [{
              '$':
                {
                  'w:ascii': 'Times New Roman',
                  'w:eastAsia': 'Times New Roman',
                  'w:hAnsi': 'Times New Roman',
                  'w:cs': 'Times New Roman'
                }
            }],
          'w:color': [{'$': {'w:val': 'F8F8F8'}}],
          'w:spacing': [{'$': {'w:val': '-100'}}],
          'w:w': [{'$': {'w:val': '50'}}],
          'w:sz': [{'$': {'w:val': '21'}}],
          'w:szCs': [{'$': {'w:val': '21'}}],
          'w:shd':
            [{'$': {'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF'}}],
          'w:lang': [{'$': {'w:eastAsia': 'ru-RU'}}]
        }],
      'w:t': [{_: 'Милюгина ', '$': {'xml:space': 'preserve'}}]
    }
};

export const dummyXml = `
<w:r w:rsidR="008364C4" w:rsidRPr="008364C4">
    <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman"
                  w:cs="Times New Roman"/>
        <w:color w:val="F8F8F8"/>
        <w:spacing w:val="-100"/>
        <w:w w:val="50"/>
        <w:sz w:val="21"/>
        <w:szCs w:val="21"/>
        <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
        <w:lang w:eastAsia="ru-RU"/>
    </w:rPr>
    <w:t xml:space="preserve">Милюгина </w:t>
</w:r>
`;

export const getDummyRun = (word: string): IRunOne => ({
  $: {'w:rsidR': '008364C4', 'w:rsidRPr': '008364C4'},
  'w:rPr': [
    <IParagraphPreferences>{
      'w:rFonts': [
        {
          '$': {
            'w:ascii': 'Times New Roman',
            'w:eastAsia': 'Times New Roman',
            'w:hAnsi': 'Times New Roman',
            'w:cs': 'Times New Roman'
          }
        }],
      'w:color': [{'$': {'w:val': 'F8F8F8'}}],
      'w:spacing': [{'$': {'w:val': '-100'}}],
      'w:w': [{'$': {'w:val': '50'}}],
      'w:sz': [{'$': {'w:val': '21'}}],
      'w:szCs': [{'$': {'w:val': '21'}}],
      'w:shd':
        [{'$': {'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF'}}],
      'w:lang': [{'$': {'w:eastAsia': 'ru-RU'}}]
    }],
  'w:t': [
    <IWTextOne>{
      _: word + ' ',
      '$': {'xml:space': 'preserve'}
    }
  ]

});