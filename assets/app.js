const docsUpload = {
  controller: function (Upload, httpService) {
    this.range = {min: 40, max: 85};
    this.error = null;
    this.invalidFileText = 'Выберите файл';
    this.upload = function () {
      if(!this.file) {
        return this.error = this.invalidFileText
      }
      if(!this.email) {
        return this.error = 'Введите email'
      }

      if(this.form.email.$invalid) {
        return this.error = 'Введите валидный email'
      }
      this.error = null;

      httpService.uploadFile(`file-parse/uniquelize/${this.range.min}/${this.range.max}?email=${this.email}`, this.file).then((d) => {
        location.href = d.data.url;
      }, (e) => {
        this.error = e.data.message;
      });
    };

    this.uploadFree = function () {
      if(!this.file) {
        return this.error = this.invalidFileText
      }
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
      Нажмите для выбора файла в фармате docx
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
    <form name="$ctrl.form">
      <input type="email" ng-model="$ctrl.email" name="email" class="docs-upload__email-input" required placeholder="Например abcd@mail.com">
    </form>
  </p>
  <p>
    <button ng-click="$ctrl.upload($file)" class="docs-upload__button docs-upload__main-button">
      Повысить уникальность
    </button>
  </p>
  
  <h3 ng-if="$ctrl.error" class="docs-upload__text-validation">{{$ctrl.error}}</h3>
  
  <p class="pt-5">
    <button ng-click="$ctrl.uploadFree($file)" class="docs-upload__button">
      Или бесплатно попробовать небольшой файл
    </button>
  </p>
  <!--<button ng-click="$ctrl.test()">test</button>-->
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
      httpService.post(`file-parse/reuniquelize/${this.range.min}/${this.range.max}/${this.fileName}`, {} ,{responseType: 'blob'}).then((d) => {
        httpService.saveFileAs(d);
      }, (e) => {
        this.error = e.message;
      });
    };

  },
  template: `
  <div range-slider min="1" max="100" step="1" class="docs-upload__range"
       prevent-equal-min-max
       attach-handle-values="true"
       show-values="true"
       model-min="$ctrl.range.min"
       model-max="$ctrl.range.max"></div>
  <button ng-click="$ctrl.reuniquelize()" class="docs-upload__button docs-upload__main-button">Изменить уникальность</button>
  <h3 ng-if="$ctrl.error" class="docs-upload__text-validation">{{$ctrl.error}}</h3>
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