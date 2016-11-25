app.controller('mygroupsCtrl', function($rootScope,$state,$scope) {
  $scope.viewLoaded = false;
  
    if($rootScope.hasnoGroup){
           $scope.viewLoaded = !$scope.viewLoaded;
                      $state.go('dashboard.newgroup');
                  }
                      
  
  
  
  

  
  
  
});
 