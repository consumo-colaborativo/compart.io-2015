angular.module('Compartio.Common')
  .controller('HomeCtrl', function($scope, $location) { //, LoginService
    var main = this;
    main.currentUser = null;
    console.log("HomeCtrl");
    // $scope.$on('onCurrentUserId', function (ctx, id) {
    //     main.currentUser = LoginService.getCurrentUser();
    // });

    // main.logout = function() {
    //     LoginService.logout();
    //     main.currentUser = null;
    // };
	}
);