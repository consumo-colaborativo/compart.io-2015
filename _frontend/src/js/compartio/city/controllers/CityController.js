angular.module('Compartio.City')
  .controller('CityCtrl', function(
        $rootScope,
        $scope,
        $location,
        $state,
        $stateParams,
        DebugService,
        CitiesModel
    ) { 
        var cityc = this;
        //Si no hay cities $rootScope.cities, las carga y despues asigna $rootScopescope.selectedCity segun la state
        if($rootScope.cities.length==0){
        	CitiesModel.all().then(function(cities){
        		$rootScope.cities = cities;
        		$rootScope.selectedCity = _.findWhere($rootScope.cities, {'slug': $stateParams.city_slug});
        	});
        }


        //main.currentUser = null;
        // $rootScope.citySlug=$stateParams.city_slug;
        // DebugService.log(":::"+$rootScope.citySlug);
        // CitiesModel.all().then(function(cities){
        // 	console.log(cities);
        // });

    }
    
);