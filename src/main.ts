import {
  TEMP_FILE_DIRECTORY, FILE_DIRECTORY,
} from './helpers'
import './dict'
import {createWordsMap} from "./create-words-map";
import {xmlSOriginalWTextOnlyJson} from "./mocks";
import {ConvertDocx} from "./conver-docx";
const fs = require('fs-extra');
fs.ensureDir(FILE_DIRECTORY);
fs.ensureDir(TEMP_FILE_DIRECTORY);



//new ConvertDocx('s оригинал.docx', 40, 85).createTest('assets/s оригинал raw.xml');
new ConvertDocx('s оригинал.docx', 40, 85).create();


// test createWordsMap(jsonXml)