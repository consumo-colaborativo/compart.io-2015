angular.module('Compartio.City')
  .controller('CityCtrl', function(
        $rootScope,
        $scope,
        $location,
        $state,
        $stateParams,
        DebugService,
        CitiesModel,
        CategoriesModel,
        GivesModel
    ) { 
        var city = this;

        //Carga las ciudades (cacheadas) y asigna la que concide con el slug a $rootScope.selectedCity;
        $rootScope.cities = [];
        CitiesModel.all().then(function(cities){
    		$rootScope.cities = cities;
            //Añade el item completo de la ciudad al rootScope.
    		var selectedCity = _.findWhere($rootScope.cities, {'slug': $stateParams.city_slug});
            // Si está en la lista, lo asigna, si no, vuelve a la home
            if(typeof(selectedCity) !== 'undefined'){
                $rootScope.selectedCity = selectedCity;
                city.getGives();
            } else {
                $state.go('home');
            }
    	});

        //Categories
        $rootScope.categories = [];
        CategoriesModel.all().then(function(categories){
            $rootScope.categories = categories;
        });

        //Gives ALL
        city.gives = [];
        city.getGives = function(){
            //Aquí ejecuta la función según el state
            //state == city
            if($state.current.name === 'city'){
                GivesModel.allFromCity($rootScope.selectedCity.slug).then(function(gives){
                    DebugService.log("GivesModel.allFromCity: ", gives);
                    city.gives = gives;
                    // $scope.gives = gives;
                });
            }
            //state == city_search
            if($state.current.name === 'city_search'){
                GivesModel.searchFromCity($rootScope.selectedCity.slug, $stateParams.search_string).then(function(gives){
                    DebugService.log("GivesModel.searchFromCity: "+$stateParams.search_string, gives);
                    city.gives = gives;
                    // $scope.gives = gives;
                });
            }
            //state == city_category
            if($state.current.name === 'city_category'){
                GivesModel.categoryFromCity($rootScope.selectedCity.slug, $stateParams.category_slug).then(function(gives){
                    DebugService.log("GivesModel.categoryFromCity: "+$stateParams.category_slug, gives);
                    city.gives = gives;
                    // $scope.gives = gives;
                });
            }
            //state == city_search_and_category
            if($state.current.name === 'city_search_and_category'){
                GivesModel.searchAndCategoryFromCity($rootScope.selectedCity.slug, $stateParams.search_string, $stateParams.category_slug).then(function(gives){
                    DebugService.log("GivesModel.categoryFromCity: "+ $stateParams.search_string+","+$stateParams.category_slug, gives);
                    city.gives = gives;
                    // $scope.gives = gives;
                });
            }
        };



    }
    
);