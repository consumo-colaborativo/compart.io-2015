angular.module('Compartio.Common')
  .controller('MainCtrl', function($scope, $location) { //, LoginService
    var main = this;
    main.currentUser = null;
    console.log("MainCtrl");

    // $scope.$on('onCurrentUserId', function (ctx, id) {
    //     main.currentUser = LoginService.getCurrentUser();
    // });

    // main.logout = function() {
    //     LoginService.logout();
    //     main.currentUser = null;
    // };
}
);