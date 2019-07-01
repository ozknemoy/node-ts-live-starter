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
          httpService.postFile('upload_image.php', formData).then(function (d) {

            console.log(d);
          });
        });

      }
    };
  })

  .service('httpService', function ($http) {
    this.postFile = function (url, file) {
      return $http({
        url: url,
        method: "POST",
        data: file,
        headers: {'Content-Type': undefined}
      });
    };
  })

;