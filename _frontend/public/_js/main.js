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
// 	Variables:
//		cities: Listado de ciudades
//		selectedCity: Ciudad seleccionada
// Compartio.city
// Compartio.home




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
						url: '/:city_slug',
						views:{
							'header':{
								templateUrl: '/partials/partial-header.html'
							},
							'content': {
								controller: 'CityCtrl',
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
      console.log("Hay item", item);
      if(item['slug']!=''){
        var oldCity = $rootScope.selectedCity;
        $rootScope.selectedCity = _.findWhere($rootScope.cities, {'slug': item['slug']});
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
.run(function($rootScope, $state) {
  angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
  $rootScope.$on('$stateChangeStart', function(event, toState, fromState){
    console.log(toState.name==="city"?"YRHA":"");
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
angular.module('Compartio.Common')
	.constant('DEBUG', {
		'active': true
	})
	.service('DebugService', function(DEBUG) {
			var service = this;
			service.log = function(txt){
				var currentdate = new Date(),
				txtdate = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + ". ";
				if(DEBUG.active){
					console.log("%c"+txtdate+"%s", "color: blue", txt);
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
// angular.module('Compartio.Common')
// 	.service('CityService', function() {
// 		var service = this;
		
// 	});

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