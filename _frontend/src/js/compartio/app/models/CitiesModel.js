angular.module('Compartio.Common')
.service('CitiesModel',
  function ($http) { //, UtilsService
    var service = this;
    service.all = function () {
      return $http.get('https://compartiotest.firebaseio.com/cities.json', { cache: true})
        .then(
          function(result) {
            return result.data;
        }
    );
  };
}); 