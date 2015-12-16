angular.module('Compartio.Common')
.service('GivesModel',
  function ($http,
    ErrorService
    ) { //, UtilsService
    var service = this;
    service.allFromCity = function ($citySlug) {
      // return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
      return $http.get('/API_TEMP/'+$citySlug+'/gives.json')
        .then(function successCallback(response) {
          return response.data;
        }, function errorCallback(response) {
          ErrorService.log("Error al obtener gives:", response);
        });
    };
    service.categoryFromCity = function ($citySlug, $categorySlug) { 
      // return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
      return $http.get('/API_TEMP/'+$citySlug+'/gives_cat_'+$categorySlug+'.json')
        .then(
          function successCallback(response) {
          return response.data;
        }, function errorCallback(response) {
          ErrorService.log("Error al obtener gives:", response);
        });
    };
    service.searchFromCity = function ($citySlug, $searchString) { //@TODO
      // return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
      return $http.get('/API_TEMP/'+$citySlug+'/gives_search_'+$searchString+'.json')
        .then(
          function(result) {
            return result.data;
        });
    };
    service.searchAndCategoryFromCity = function ($citySlug, $searchString, $categoryId) { //@TODO
      // return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
      return $http.get('/API_TEMP/'+$citySlug+'/gives.json')
        .then(
          function(result) {
            return result.data;
        });
    };
}); 