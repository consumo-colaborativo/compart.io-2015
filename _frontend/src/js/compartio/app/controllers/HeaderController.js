angular.module('Compartio.Common')
  .controller('HeaderCtrl', function(
    CitiesModel,
    $rootScope,
    $scope,
    $location,
    $state,
    DebugService
  ) { //, LoginService
  DebugService.log("Entering HeaderCtrl");
  var header = this;
  //Le dice a la cabecera si está en la home para mostrar una y otra
	if($state.current.name === 'home'){
		header.design = 'home';
	} else {
		header.design = 'list';
	}

  //main.currentUser = null;

  //Cabecera
  //Desplegable ciudades
  // $rootScope.cities = [];
  // CitiesModel.all()
  //     .then(function (cities) {
  //         $rootScope.cities = cities;
  //     });
  // $rootScope.selectedCity = "";
  // $scope.cityChange = function(item){
  //     // $location.go('city', 1)
  //     if(item){
  //         DebugService.log("Cambiando de ciudad");
  //         $state.go('city', {'city_slug': item.slug});
  //     }
  // };
  header.cityChange = function(item){
    if(item){
      DebugService.log("Hay item", item);
      if(item.slug!==''){
        var oldCity = $rootScope.selectedCity;
        $rootScope.selectedCity = _.findWhere($rootScope.cities, {'slug': item.slug});
        DebugService.log("Cambiando a ciudad " + $rootScope.selectedCity.name);
        //Cambia de ciudad si es diferente a la anterior
        if(oldCity != $rootScope.selectedCity){
          $state.go('city', {'city_slug': $rootScope.selectedCity.slug});
        }
      }
    }
  };
})
.run(function($rootScope) {
  angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
});