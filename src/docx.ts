import {PrintLaborContractScientificBuilder2} from './print-labor-contract-scientific2.class';
import * as fs from 'fs';
import * as docx from 'docx';

const dox = new PrintLaborContractScientificBuilder2({}).make();
createOfficeFile(dox);

function createOfficeFile(doc) {
  const dir = 'E:/files/';
  const name = 'doc-dev2';
  const ext = '.docx';
  (new docx.Packer()).toBuffer(doc).then((b) => {
    console.info('-----  ok make  -----');
    // пробую писать
    fs.writeFile(dir + name + ext, b, (e) => {
      if (e) {
        console.log('*****    ', e.code, '    *****');
        // при неудаче добавляю номер
        fs.writeFileSync(`${dir}${name}-${ +new Date}${ext}`, b);
      } else {
        console.log('-----  ok write  ----');
        // при удаче удаляю файлы с номерами
        fs.readdir(dir, (e, files) => {
          if (files.length) {
            files.forEach(fileName => {
              if (fileName.indexOf(name + '-') > -1) {
                fs.unlink(dir + fileName, () => {
                })
              }
            })
          }
        })
      }

    });


  });
}

