app.controller('newgroupCtrl', function($rootScope,$scope,$state, $modal) {
  $scope.viewLoaded = false;
  
    if(!$rootScope.hasnoGroup){
      
      $scope.viewLoaded = !$scope.loading;
                      
                      $state.go('dashboard.mygroups');
                  }
                  
                  
  
});
 
 
