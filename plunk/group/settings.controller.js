app.controller('settingsCtrl', function($rootScope,$scope,$state) {
  
  
 $scope.disabledLast = false;
    
     $scope.disabledName = false;
    
  
    
    
    $scope.openName = function() {
        $scope.disabledName = !$scope.disabledName;
        $scope.editName = "joh";
    }
    
      
      $scope.openLast = function() {
        $scope.disabledLast = !$scope.disabledLast;
    }
    
});
 
 
