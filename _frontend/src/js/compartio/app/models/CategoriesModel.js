angular.module('Compartio.Common')
.service('CategoriesModel',
  function ($http) { //, UtilsService
    var service = this;
    service.all = function ($city_slug) {
      //return $http.jsonp('https://compartiotest.firebaseio.com/categories.json?callback=JSON_CALLBACK',  {cache: true})
      return $http.get('/API_TEMP/'+$city_slug+'/categories.json',  {cache: true})
        .then(
          function(result) {
            return result.data;
        }
    );
  };
}); 