import {IParagraphOne, IParagraphPreferences, IRunOne, IWTextOne} from "./models";

export const realXml = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
            xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex"
            xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:w10="urn:schemas-microsoft-com:office:word"
            xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
            xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml"
            xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex"
            xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
            xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
            xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
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
                <w:t>1_1 1_2 1_3 1_4 1_5 </w:t>
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
                <w:t> 2_1 2_2 2_3 2_4  </w:t>
            </w:r>
            <w:r w:rsidRPr="009B198C">
                <w:rPr>
                    <w:rFonts w:ascii="Arial" w:eastAsia="Times New Roman" w:hAnsi="Arial" w:cs="Arial"/>
                    <w:color w:val="292C31"/>
                    <w:sz w:val="21"/>
                    <w:szCs w:val="21"/>
                    <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                    <w:lang w:eastAsia="ru-RU"/>
                </w:rPr>
                <w:t xml:space="preserve"> 3_1 3_2 3_3 3_4 3_5 3_6 3_7 </w:t>
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
      'w:spacing': [{'$': {'w:val': '-1'}}],
      'w:w': [{'$': {'w:val': '1'}}],
      'w:sz': [{'$': {'w:val': '1'}}],
      'w:szCs': [{'$': {'w:val': '1'}}],
      /*'w:shd':
        [{'$': {'w:val': 'clear', 'w:color': 'auto', 'w:fill': 'FFFFFF'}}],*/
      'w:lang': [{'$': {'w:eastAsia': 'ru-RU'}}]
    }],
  'w:t': [
    <IWTextOne>{
      _: ' ' + word + ' ',
      '$': {'xml:space': 'preserve'}
    }
  ]

});

export const xmlSOriginalWTextOnlyJson = {
  'w:document':
    {
      'w:body':
        [{
          'w:p':
            [<IParagraphOne>{
              'w:r':
                [{
                    'w:t': ['Oт']
                  }, {
                    'w:t': [' космизма барокко к романтическому космизму Е.Г. ']
                  }, {
                    'w:t': ['Милюгина 777777 777777 777777']
                  },
                  ]
            },<IParagraphOne>{
              'w:r':
                [{
                    'w:t': [', Тверь Эпоха Барокко - важнейшее звено в цепи культурных эпох и «великих стилей». Переломный его характер проявляется в том, что, наследуя идеи Средневековья, Барокко противопоставляет себя Ренессансу, взрывая его иллюзорные надежды на построение социальной гармонии и восхождение по «лестнице прогресса», и открывает возможности более сложного развития искусства,']
                  }, {
                    'w:t': [' ']
                  },{
                    'w:t': ['выразившегося в маятниковых сменах «правополушарных» (Романтизма и Символизма) и «левополушарных» (Классицизма, Просвещения, Реализма) стилей. Кардинальный характер поворота в развитии философии и искусства, выраженный Барокко наряду с другими направлениями эпохи, настоятельно требует уяснения сущности этого культурно-исторического феномена. В науке Барокко описывается разноречиво - от указаний на ']
                  }, {
                    'w:t': ['антиномичность']
                  }, {
                    'w:t': [' (С.Д.']
                  }, {
                    'w:t': [' ']
                  }, {
                    'w:t': ['Артамонов) до утверждений стремления к цельности и органичности мировосприятия (А.А. ']
                  }, {
                    'w:t': ['Аникст']
                  }, {
                    'w:t': ['). ']
                  }]
            },
            ],
        }
        ]
    }
};
