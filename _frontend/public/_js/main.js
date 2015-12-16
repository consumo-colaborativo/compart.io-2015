/*jslint browser:true */
/*global $, jQuery*/
/*(function ($) {
  "use strict";
  //  ____  ____   __  ____  ____   __   _  _  __ _ 
	// (    \(  _ \ /  \(  _ \(    \ /  \ / )( \(  ( \
	//  ) D ( )   /(  O )) __/ ) D ((  O )\ /\ //    /
	// (____/(__\_) \__/(__)  (____/ \__/ (_/\_)\_)__)
	//

	$(dropdownInicia);

	function dropdownInicia(){
		// Cierra popup al clickar fuera
		$('html').click(function() {
			$('.select.open').removeClass('open');
		});

		$('.select:not(.disabled)').click(function(e){
			console.log("abriendo");

			e.stopPropagation();
			e.preventDefault();
			var select = $(e.target).parents('.select');
			// var drop = $(e.target).parent().find('.dropdown');
			if(select.hasClass("open")){
				select.removeClass("open");
			} else {
				$('.select.open').removeClass('open');
				select.addClass("open");
				//Scroll
				$(this).find(".nano").nanoScroller();
			}
		});
		//Coloca el seleccionado en el desplegable y rellena el input
		$('.select .dropdown li:not(.link) a').click(function(e){
			//e.preventDefault();
			var slug = $(e.target).attr('href');
			var text = $(e.target).text();
			$(e.target).parents('.select').addClass('selected');
			$(e.target).parents('.select').find('.button a').html(text+'<span></span>');
			$(e.target).parents('.select').find('input').val(slug);
			$(e.target).parents('.select').find('form').submit();
		});

	}
}(jQuery));
function dropdownChange(){
	console.log("j2j2j2j2");
}*/
/*jslint browser:true */
/*global $, jQuery*/
(function ($) {
  "use strict";
  if(1==2){

		var cg_anchocaja=150; //Mínimo bloque de ancho. Cada caja puede ser 150 o 150+8+150;
		var cg_gutter=8; //Separación entre cajas

		$(document).ready(function() {
			// Nested
			$("#container").nested({
			  minWidth: cg_anchocaja,
			  gutter: cg_gutter
			});

			//SVG
			$('#container>.box').each(function(index, el) {
				$(el).bocadillo();
			});
		});
	}
}(jQuery));
/*jslint browser:true */
/*global $, jQuery*/
(function ($) {
  "use strict";
	// Home
	if($('body#home').length>0){
  	$('.popupvideo').magnificPopup({type:'iframe'});
	}
}(jQuery));
//Modulos
// Compartio
// Compartio.common
// 	
// Compartio.city
// Compartio.home
// Variables de $rootScope:
//		cities: Listado de ciudades
//		selectedCity: Ciudad seleccionada
//		categories: Listdo de categorias
//		selectedCategorySlug: Slug de categoría activa si la hay




var compartioModule = angular.module('Compartio',
	[
		'ui.router',
		'angular-storage',
		'Compartio.Common',
		'Compartio.City'

		//'ngRoute',
		//'ngAnimate',
		//'firebase',
		//'ngMessages',
		//'Angello.Common',
		//'Angello.Dashboard',
		//'Angello.Login',
		//'Angello.Storyboard',
		//'Angello.User',
		//'auth0',
		//'angular-jwt',
		//'angular-storage'
	]);

compartioModule.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		
		//
		$stateProvider
				.state('home', {
						url: '/',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'HomeCtrl',
								templateUrl: '/partials/partial-home.html'
							},
						}
				})
				
				.state('city', {
						url: '/:city_slug/gives',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'CityCtrl as city',
								templateUrl: '/partials/partial-city.html'
							},
						}
				}).state('city_search', {
						url: '/:city_slug/gives/search/:search_string',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'CityCtrl as city',
								templateUrl: '/partials/partial-city.html'
							},
						}
				}).state('city_category', {
						url: '/:city_slug/gives/category/:category_slug',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'CityCtrl as city',
								templateUrl: '/partials/partial-city.html'
							},
						}
				}).state('city_search_and_category', {
						url: '/:city_slug/gives/category/:category_slug/search/:search_string',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'CityCtrl as city',
								templateUrl: '/partials/partial-city.html'
							},
						}
				});
				/*
				.state('recommended_eje', {
						url: '/recommended/{eje_id}',
						views:{
							'content': {
								controller: 'conRecommendedWalksWalkCtrl',
								templateUrl: window.location.pathname+'partial/con_recommendedwalks_walk'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// },
						}
				})
				.state('recommended_eje.plegado', {
						url: '/_',
						views:{
							'content': {
								controller: 'conRecommendedWalksWalkCtrl',
								templateUrl: window.location.pathname+'partial/con_recommendedwalks_walk'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// },
						}
				})
				.state('zois', {
						url: '/zones',
						views:{
							'content': {
								controller: 'conZoisCtrl',
								templateUrl: window.location.pathname+'partial/con_zois'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// },
						}
				})
				.state('zois_zoi', {
						url: '/zones/{zoi_slug}',
						views:{
							'content': {
								controller: 'conZoiCtrl',
								templateUrl: window.location.pathname+'partial/con_zois_zoi'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// },
						}
				})
				.state('zois_zoi.plegado', {
						url: '/_',
						views:{
							'content': {
								controller: 'conZoiCtrl',
								templateUrl: window.location.pathname+'partial/con_zois_zoi'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// },
						}
				})
				.state('pois_poi', {
						url: '/places/{poi_slug}',
						views:{
							'content': {
								controller: 'conPoiCtrl',
								templateUrl: window.location.pathname+'partial/con_pois_poi'
							},
							// 'map': {
							// 	controller: 'mapPoiCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_pois_poi'
							// },
						}
				})
				.state('pois_poi.plegado', {
						url: '/_',
						views:{
							'content': {
								controller: 'conPoiCtrl',
								templateUrl: window.location.pathname+'partial/con_pois_poi'
							},
							// 'map': {
							// 	controller: 'mapPoiCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_pois_poi'
							// },
						}
				})
				// .state('login', {
				// 		url: '/login',
				// 		views:{
				// 			'content': {
				// 				controller: 'conLoginCtrl',
				// 				templateUrl: window.location.pathname+'../login'
				// 			},
				// 			// 'map': {
				// 			// 	controller: 'mapGeneralCtrl',
				// 			// 	templateUrl: window.location.pathname+'partial/map_general'
				// 			// }
				// 		}
				// })
				// .state('register', {
				// 		url: '/register',
				// 		views:{
				// 			'content': {
				// 				controller: 'conRegisterCtrl',
				// 				templateUrl: window.location.pathname+'../register'
				// 			},
				// 			// 'map': {
				// 			// 	controller: 'mapGeneralCtrl',
				// 			// 	templateUrl: window.location.pathname+'partial/map_general'
				// 			// }
				// 		}
				// })
				.state('favorites', {
						url: '/favs',
						views:{
							'content': {
								controller: 'conFavoritesCtrl',
								templateUrl: window.location.pathname+'partial/con_favorites'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('favorites.plegado', {
						url: '/_',
						views:{
							'content': {
								controller: 'conFavoritesCtrl',
								templateUrl: window.location.pathname+'partial/con_favorites'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('favorites.addzoi', {
						url: '/zoi/{zoi_id}',
						views:{
							'content': {
								controller: 'conFavoritesCtrl',
								templateUrl: window.location.pathname+'partial/con_favorites'
							},
						}
				})
				.state('favorites.addpoi', {
						url: '/poi/{poi_id}',
						views:{
							'content': {
								controller: 'conFavoritesCtrl',
								templateUrl: window.location.pathname+'partial/con_favorites'
							},
						}
				})
				.state('favorites.addeje', {
						url: '/eje/{eje_id}',
						views:{
							'content': {
								controller: 'conFavoritesCtrl',
								templateUrl: window.location.pathname+'partial/con_favorites'
							},
						}
				})
				.state('makewalk', {
						url: '/makewalk',
						views:{
							'content': {
								controller: 'conMakeWalkCtrl',
								templateUrl: window.location.pathname+'partial/con_makewalk'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('makewalk.plegado', {
						url: '/_',
						views:{
							'content': {
								controller: 'conMakeWalkCtrl',
								templateUrl: window.location.pathname+'partial/con_makewalk'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('walk', {
						url: '/walk/{walk_id}',
						views:{
							'content': {
								controller: 'conWalkCtrl',
								templateUrl: window.location.pathname+'partial/con_walk'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})



					//  ____  _  _  ____  ____  ____  __ _   __   __   
					// (  __)( \/ )(_  _)(  __)(  _ \(  ( \ / _\ (  )  
					//  ) _)  )  (   )(   ) _)  )   //    //    \/ (_/\
					// (____)(_/\_) (__) (____)(__\_)\_)__)\_/\_/\____/





				.state('app', {
						url: '/app',
						views:{
							'content': {
								controller: 'sinprogramacionCtrl',
								templateUrl: window.location.pathname+'partial/ext_app'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('info', {
						url: '/info',
						views:{
							'content': {
								controller: 'sinprogramacionCtrl',
								templateUrl: window.location.pathname+'partial/ext_info'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('legal', {
						url: '/legal',
						views:{
							'content': {
								controller: 'sinprogramacionCtrl',
								templateUrl: window.location.pathname+'partial/ext_legal'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})
				.state('contact', {
						url: '/contact',
						views:{
							'content': {
								controller: 'sinprogramacionCtrl',
								templateUrl: window.location.pathname+'partial/ext_contact'
							},
							// 'map': {
							// 	controller: 'mapGeneralCtrl',
							// 	templateUrl: window.location.pathname+'partial/map_general'
							// }
						}
				})

				// .state('favs', {
				//     url: '/favs',
				//     views:{
				//   //   	'content': {
						//   //   templateUrl: 'partial/con_favs.html'
						//   // },
						//   // 'map': {
						//   //   templateUrl: 'partial/map_favs.html'
						//   // },
				//     }
				// });
		*/
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
});


angular.module('Compartio.Common', []);

angular.module('Compartio.City', ['Compartio.Common']);
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
.run(function($rootScope, $state, DebugService) {
  //Dropdown
  angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
  $rootScope.$on('$stateChangeStart', function(event, toState, fromState){
    DebugService.log("Cambiando de estado : "  + fromState.name + " a "+ toState.name);
  });
});
angular.module('Compartio.Common')
	.directive("dropdown", function(
		$rootScope,
		DebugService
		) {
	return {
		restrict: "E",
		templateUrl: "partials/directive-dropdown.html",
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@",
			callback: "&" //función con un argumento args
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;
			DebugService.log("Selected "+scope.selected);
			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
				scope.listVisible = false;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};
			//Para cuando clicka fuera, se manda cerrar
			$rootScope.$on("documentClicked", function(inner, target) {
				if (!$(target[0]).is(".select.open") && $(target[0]).parents(".select.open").length === 0)
					scope.$apply(function() {
						scope.listVisible = false;
					});
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
				//Si tiene callback, lo ejecuta
				scope.callback({item: value});
			});
		}
	};
});
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
// angular.module('Compartio.Common')
// 	.service('DataService', function(CitiesModel, CategoriesModel) {
// 			var service = this;
// 			service.cities = 
// 			service.citiesGetAll = function (){

// 			}

// 	});

angular.module('Compartio.Common')
	.constant('DEBUG', {
		'active': true
	})
	.service('DebugService', function(DEBUG) {
			var service = this;
			service.log = function(txt){
				var currentdate = new Date(),
				txtdate = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "-" + currentdate.getMilliseconds() +". ";
				if(DEBUG.active){
					console.log("%c"+txtdate+"%s", "color: blue", txt);
					for (var i=1; i < arguments.length; i++) {
						console.log(arguments[i]);
			    }
				}
			};

	});

/*angular.module('Compartio.Common')
    //.constant('CURRENT_BACKEND', 'node')
    .constant('CURRENT_BACKEND', 'firebase')
    .service('EndpointConfigService', function($rootScope, CURRENT_BACKEND) {
        var service = this,
            endpointMap = {
                firebase: { URI: 'https://compartiotest.firebaseio.com/', root: '', format: '.json' },
                node: { URI: 'http://localhost:4000/', root: 'api/clients/', format: ''}
            },
            currentEndpoint = endpointMap[CURRENT_BACKEND],
            backend = CURRENT_BACKEND;

        service.getUrl = function(model) {
            return currentEndpoint.URI + currentEndpoint.root + model;
        };

        service.getUrlForId = function(model, id) {
            return service.getUrl(model) + id + currentEndpoint.format;
        };

        service.getCurrentBackend = function() {
            return backend;
        };

        service.getCurrentFormat = function() {
            return currentEndpoint.format;
        };

        service.getCurrentURI = function() {
            return currentEndpoint.URI;
        };

        $rootScope.$on('onCurrentUserId', function(event, id){
            userId = id;
        });
    });
*/
angular.module('Compartio.Common')
	.service('ErrorService', function(DEBUG) {
			var service = this;
			service.log = function(txt){
				var currentdate = new Date(),
				txtdate = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "-" + currentdate.getMilliseconds() +". ";
				if(DEBUG.active){
					console.log("%c"+txtdate+"%s", "color: red", txt);
					for (var i=1; i < arguments.length; i++) {
						console.log(arguments[i]);
			    }
				}
			};

	});

angular.module('Compartio.Common')
  .controller('HomeCtrl', function(
        $rootScope,
        $scope,
        $location,
        DebugService
        //, LoginService
    ) { 
        var home = this;
        //main.currentUser = null;
        DebugService.log("Entering HomeCtrl");
        $rootScope.selectedCity = {slug:''};
    }
    
);
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