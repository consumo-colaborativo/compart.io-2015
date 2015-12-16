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

