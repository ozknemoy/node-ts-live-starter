const docsUpload = {
  controller: function (Upload, httpService) {
    this.range = {min: 40, max: 85};
    this.error = null;

    this.upload = function () {
      if(!this.file) return;
      this.error = null;
      Upload.upload({
        url: `file-parse/uniquelize/${this.range.min}/${this.range.max}?email=${this.email}`,
        data: {file: this.file}
      }).then((d) => {
        location.href = d.data.url;
      }, (e) => {
        this.error = e.data.message;
      });
    };

    this.uploadFree = function () {
      if(!this.file) return;
      this.error = null;
      Upload.upload({
        url: `file-parse/uniquelize-free/${this.range.min}/${this.range.max}`,
        data: {file: this.file}
      }).then((d) => {
        httpService.saveFileAs(d)
      }, (e) => {
        this.error = e.data.message;
      });
    };
  },
  template: `
  <div class="button" ngf-select="$ctrl.file = $file" ngf-accept="'.docx'">Нажмите для выбора файла</div>
  <div range-slider min="1" max="100" step="1"
       prevent-equal-min-max
       attach-handle-values="true"
       show-values="true"
       model-min="$ctrl.range.min"
       model-max="$ctrl.range.max"></div>
  <button ng-click="$ctrl.uploadFree($file)" ng-disabled="!$ctrl.file">Бесплатно попробовать небольшой файл</button><br>
  <input type="email" ng-model="$ctrl.email">
  <button ng-click="$ctrl.upload($file)" ng-disabled="!$ctrl.file || !$ctrl.email">Повысить уникальность</button>
  <div ng-if="$ctrl.error">{{$ctrl.error}}</div>
  `
};

const docsReunique = {
  bindings: {
    fileName: '@'
  },
  controller: function (Upload, httpService) {
    this.range = {min: 40, max: 85};
    this.error = null;

    this.reuniquelize = function () {
      this.error = null;
      httpService.post(`file-parse/reuniquelize/${this.range.min}/${this.range.max}/${this.fileName}`, {}).then((d) => {
        httpService.saveFileAs(d);
      }, (e) => {
        this.error = e.message;
      });
    };

  },
  template: `
  <div range-slider min="1" max="100" step="1"
       prevent-equal-min-max
       attach-handle-values="true"
       show-values="true"
       model-min="$ctrl.range.min"
       model-max="$ctrl.range.max"></div>
  <button ng-click="$ctrl.reuniquelize()">Изменить уникальность</button>
  <div ng-if="$ctrl.error">{{$ctrl.error}}</div>
  `
};

angular.module('docx-upload', ['ngFileUpload', 'ui-rangeSlider'])
  .component('docsUpload', docsUpload)
  .component('docsReunique', docsReunique)


  .service('httpService', function ($http) {
    this.saveFileAs = function (response) {
      var contentDisposition = response.headers("content-disposition");
      //Retrieve file name from content-disposition
      var fileName = contentDisposition.substr(contentDisposition.indexOf("filename=") + 9);
      fileName = fileName.replace(/\"/g, "");
      var blob = new Blob([response.data], {type: response.headers("content-type")});
      saveAs(blob, fileName);
    };

    this.post = function (url, data) {
      console.log(location.origin + '/' + url, url);
      return $http.post(location.origin + '/' + url, data);
    };

    this.postFile = function (url, file) {
      return $http({
        url: url,
        method: "POST",
        data: file,
        headers: {'Content-Type': undefined}
      }).then(file => saveFileAs(file));
    };
  })

;