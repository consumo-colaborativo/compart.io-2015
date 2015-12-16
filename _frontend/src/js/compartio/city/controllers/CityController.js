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
                city.getCategories();
                city.getGives();
            } else {
                $state.go('home');
            }
    	});

        //Categories
        //city.categories = [];
        city.getCategories = function(){
            CategoriesModel.all($rootScope.selectedCity.slug).then(function(categories){
                DebugService.log("Categoriás de "+$rootScope.selectedCity.name+":", categories);
                $rootScope.categories = categories;
            });
        };

        //Gives ALL
        city.gives = [];
        city.getGives = function(){
            //Aquí ejecuta la función según el state
            //state == city
            if($state.current.name === 'city'){
                city.getGivesCity();
            }
            //state == city_search
            if($state.current.name === 'city_search'){
                city.getGivesSearch();
            }
            //state == city_category
            if($state.current.name === 'city_category'){
                city.getGivesCategory();
            }
            //state == city_search_and_category
            if($state.current.name === 'city_search_and_category'){
                city.getGivesCategoryAndSearch();
            }
        };
        city.getGivesCity = function(){
            DebugService.log("Está en ciudad");
            GivesModel.allFromCity($rootScope.selectedCity.slug).then(function(gives){
                DebugService.log("GivesModel.allFromCity: ", gives);
                city.gives = gives;
                // $scope.gives = gives;
            });
        };
        city.getGivesSearch = function(){
            console.log($rootScope.selectedCity.slug, $stateParams.search_string);
            GivesModel.searchFromCity($rootScope.selectedCity.slug, $stateParams.search_string).then(function(gives){
                DebugService.log("GivesModel.searchFromCity: "+$stateParams.search_string, gives);
                $rootScope.searchInput = $stateParams.search_string;
                city.gives = gives;
                // $scope.gives = gives;
            });
        };
        city.getGivesCategory = function(){
            $rootScope.selectedCategorySlug = $stateParams.category_slug;
            DebugService.log("Categoría: "+$rootScope.selectedCategorySlug);
            GivesModel.categoryFromCity($rootScope.selectedCity.slug, $stateParams.category_slug).then(function(gives){
                DebugService.log("GivesModel.categoryFromCity: "+$stateParams.category_slug, gives);
                city.gives = gives;
                // $scope.gives = gives;
            });
        };
        city.getGivesCategoryAndSearch = function(){
            GivesModel.searchAndCategoryFromCity($rootScope.selectedCity.slug, $stateParams.search_string, $stateParams.category_slug).then(function(gives){
                DebugService.log("GivesModel.categoryFromCity: "+ $stateParams.search_string+","+$stateParams.category_slug, gives);
                city.gives = gives;
                // $scope.gives = gives;
            });
        };

        //Se ejecuta cuando cambia el imput
        $rootScope.searchUpdate = function(){

            if(this.searchInput){
                // SI ES CATEGORIA //@TODO
                $state.go('city_search', {city_slug: $rootScope.selectedCity.slug, search_string: this.searchInput}, {notify: false});
                $stateParams.search_string = this.searchInput;
                city.getGivesSearch();
            } else {
                 //$rootScope.searchInput="";
                 $state.go('city', {city_slug: $rootScope.selectedCity.slug}, {notify: false});
                 $stateParams.search_string = this.searchInput;
                 city.getGivesCity();
            }
            DebugService.log("Buscando: "+this.searchInput);
        };



    }
    
);