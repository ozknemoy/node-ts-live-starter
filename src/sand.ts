import {ConvertDocx} from "./algo/conver-docx";
import {xmlSetting} from "./algo/mocks";

console.log("start sandbox");
new ConvertDocx(40, 85).testXmlString(xmlSetting);

