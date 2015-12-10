angular.module('Compartio.Common')
  .controller('MainCtrl', function(
    CitiesModel,
    $rootScope,
    $scope,
    $location,
    $state,
    DebugService
  ) { //, LoginService
  DebugService.log("Entering MainCtrl");
  var main = this;

  //main.currentUser = null;

  $rootScope.cities = typeof($rootScope.cities) == 'undefined' ? [] : $rootScope.cities;
  $rootScope.selectedCity = typeof($rootScope.selectedCity) == 'undefined' ? {
    slug: ''
  } : $rootScope.selectedCity;
  DebugService.log("Ciudad: "  + $rootScope.selectedCity.slug);
  CitiesModel.all()
    .then(function (cities) {
      $rootScope.cities = cities;
    });


})
.run(function($rootScope, $state) {
  angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
  $rootScope.$on('$stateChangeStart', function(event, toState, fromState){
    console.log(toState.name==="city"?"YRHA":"");
  });
});