angular.module('Compartio.Common')
.service('CitiesModel',
  function ($http) { //, UtilsService
    var service = this;
    service.all = function () {
      //return $http.jsonp('https://compartiotest.firebaseio.com/cities.json?callback=JSON_CALLBACK',  {cache: true})
      return $http.get('/API_TEMP/cities.json',  {cache: true})
        .then(
          function(result) {
            return result.data;
        }
    );
  };
}); 