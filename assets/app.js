const appRoot = {
  controller: function (httpService) {
    httpService.get('cool-data').then(d => this.coolData = d)
  },
  template: `
  <div ng-repeat="row in $ctrl.coolData track by row.id">
    {{::row.hash}}
  </div>
  `
};



angular.module('app', [])
  .component('appRoot', appRoot)

  .service('httpService', function ($http) {
    const baseUrl = location.origin + '/api/';

    this.post = function (url, data, config) {
      return $http.post(baseUrl + url, data, config).then(d => d.data);
    };

    this.get = function (url, config) {
      return $http.get(baseUrl + url, config).then(d => d.data);
    };

  })

;
