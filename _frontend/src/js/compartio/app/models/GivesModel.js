angular.module('Compartio.Common')
.service('GivesModel',
  function ($http) { //, UtilsService
    var service = this;
    service.allFromCity = function ($citySlug) {
      return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
        .then(
          function(result) {
            return result.data;
       });
    };
    service.categoryFromCity = function ($citySlug, $categoryId) { //@TODO
      return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
        .then(
          function(result) {
            return result.data;
        });
    };
    service.searchFromCity = function ($citySlug, $searchString) { //@TODO
      return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
        .then(
          function(result) {
            return result.data;
        });
    };
    service.searchAndCategoryFromCity = function ($citySlug, $searchString, $categoryId) { //@TODO
      return $http.jsonp('https://compartiotest.firebaseio.com/gives/'+$citySlug+'.json?callback=JSON_CALLBACK')
        .then(
          function(result) {
            return result.data;
        });
    };
}); 