const aRoot = {
  controller: function () {
    console.log('1111');
  },
  template: `
  <input file-uploader type="file" name="file">
  
  `
};

angular.module('docx-upload', [])
  .component('aRoot', aRoot)
  .directive('fileUploader', function (httpService) {
    return {
      link: function (scope, element, attr) {
        element.bind('change', function () {
          var formData = new FormData();
          formData.append('file', element[0].files[0]);
          httpService.postFile('file-parse/uniqueize-2000/40/85', formData).then(function (d) {

            console.log(d);
          });
        });

      }
    };
  })

  .service('httpService', function ($http) {
    function saveFileAs(response) {
      var contentDisposition = response.headers("content-disposition");
      //Retrieve file name from content-disposition
      var fileName = contentDisposition.substr(contentDisposition.indexOf("filename=") + 9);
      fileName = fileName.replace(/\"/g, "");
      var contentType = response.headers("content-type");
      var blob = new Blob([response.data], { type: contentType });
      saveAs(blob, fileName);
    }

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