var JSZip = require("jszip");

  var zip = new JSZip();


export class MergeDocx  {
  private dictName = 'merge-docx';
  private fileName = 'docx';
  private fileExt = '.docx';

  constructor() {

  }

  prepare() {}

  zip() {
    //zip.file("file.txt", "content");
    console.log(typeof zip.file("file.txt", "content"));

     // "file.txt"
    console.log(zip.file("nodemon.json"));
    zip.remove("4.js");
    //zip/*.folder(this.dictName)*/.file("hello.txt", "Hello World");
  }
  unzip() {
    zip.folder(this.dictName).file("hello.txt", "Hello World");
  }
}