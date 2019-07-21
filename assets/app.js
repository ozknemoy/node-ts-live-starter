const docsUpload = {
  controller: function (Upload, httpService) {
    this.range = {min: 40, max: 85};
    this.error = null;

    this.upload = function () {
      if(!this.file) return;
      this.error = null;
      httpService.uploadFile(`file-parse/uniquelize/${this.range.min}/${this.range.max}?email=${this.email}`, this.file).then((d) => {
        location.href = d.data.url;
      }, (e) => {
        this.error = e.data.message;
      });
    };

    this.uploadFree = function () {
      if(!this.file) return;
      this.error = null;
      httpService.uploadFile(`file-parse/uniquelize-free/${this.range.min}/${this.range.max}`, this.file, 'blob').then((d) => {
        httpService.saveFileAs(d)
      }, (e) => {
        this.error = e.data.message;
      });
    };

    this.test = function () {
      httpService.postFile(`file-parse/test`,{})
    };
  },
  template: `
  <p>
    <button class="button docs-upload__button" ngf-select="$ctrl.file = $file" ngf-accept="'.docx'">
      Нажмите для выбора файла
    </button>
    <span class="docs-upload__file-info">{{$ctrl.file.name}}</span>
  </p>
  
  <h3>Выберите исходную уникальность и требуемую:</h3>
  
  <div range-slider min="1" max="100" step="1" class="docs-upload__range"
       prevent-equal-min-max
       attach-handle-values="true"
       show-values="true"
       model-min="$ctrl.range.min"
       model-max="$ctrl.range.max"></div>
       
  <h3>Введите email, на который мы отправим вам файл:</h3>
  <p>
    <input type="email" ng-model="$ctrl.email" class="docs-upload__email-input" placeholder="abcd@mail.com">
  </p>
  <p>
    <button ng-click="$ctrl.upload($file)" ng-disabled="!$ctrl.file || !$ctrl.email" class="docs-upload__button">
      Повысить уникальность
    </button>
  </p>
  <br>
  <br>
  <p>
    <button ng-click="$ctrl.uploadFree($file)" ng-disabled="!$ctrl.file" class="docs-upload__button">
      Или бесплатно попробовать небольшой файл
    </button>
  </p>
  <!--<button ng-click="$ctrl.test()">test</button>-->
  <h2 ng-if="$ctrl.error">{{$ctrl.error}}</h2>
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

angular.module('docx-upload', ['ngFileUpload', 'ui-rangeSlider', 'ngFileSaver'])
  .component('docsUpload', docsUpload)
  .component('docsReunique', docsReunique)


  .service('httpService', function ($http, FileSaver, Upload) {

    this.saveFileAs = function (response) {
      var contentDisposition = response.headers("content-disposition");
      var fileName = contentDisposition
        .substr(contentDisposition.indexOf("filename=") + 9)
        .replace(/\"/g, "");
      FileSaver.saveAs(response.data, fileName);
    };

    this.post = function (url, data, config) {
      return $http.post(location.origin + '/' + url, data, config);
    };

    this.uploadFile = function (url, file, responseType = '') {
      return Upload.upload({
        url,
        data: {file},
        responseType
      })
    };

    this.postFile = function (url, file) {
      return $http.post(url,file,{responseType: 'blob'}).then(file => this.saveFileAs(file));
    };
  })

/*.config(function httpInterceptor($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push(function () {
      return {
        request: function (config) {
          return config;
        },
      }
    }
  )
})*/
;