import {ConvertDocx} from "./src/algo/conver-docx";
import {xmlSetting} from "./src/algo/mocks";

console.log("start sandbox");
new ConvertDocx(40, 85).testXmlString(xmlSetting);

