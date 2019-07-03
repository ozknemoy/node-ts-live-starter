const aRoot = {
  controller: function (Upload, httpService) {
    this.range = {min: 40, max: 85};
    this.error = null;

    this.upload = function (file) {
      if(!file) return;
      this.error = null;
      Upload.upload({
        url: `file-parse/uniqueize-2000/${this.range.min}/${this.range.max}`,
        data: {file}
      }).then((d) => {
        httpService.saveFileAs(d)
      }, (e) => {
        this.error = e.data.message;
      });
    }

  },
  template: `
  <div class="button" ngf-select="$ctrl.upload($file)" ngf-accept="'.docx'">Upload on file select</div>
  <div range-slider min="1" max="100" step="1"
       prevent-equal-min-max
       attach-handle-values="true"
       show-values="true"
       model-min="$ctrl.range.min"
       model-max="$ctrl.range.max"></div>
  <div ng-if="$ctrl.error">{{$ctrl.error}}</div>     
  `
};

angular.module('docx-upload', ['ngFileUpload', 'ui-rangeSlider'])
  .component('aRoot', aRoot)


  .service('httpService', function ($http) {
    this.saveFileAs = function (response) {
      var contentDisposition = response.headers("content-disposition");
      //Retrieve file name from content-disposition
      var fileName = contentDisposition.substr(contentDisposition.indexOf("filename=") + 9);
      fileName = fileName.replace(/\"/g, "");
      var blob = new Blob([response.data], {type: response.headers("content-type")});
      saveAs(blob, fileName);
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