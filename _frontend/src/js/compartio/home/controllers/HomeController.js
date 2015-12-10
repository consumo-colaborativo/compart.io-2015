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