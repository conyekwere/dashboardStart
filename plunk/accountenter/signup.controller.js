app.controller('signupCtrl', function($rootScope,$scope,$state) {
 
 

 $scope.loading = false;
 
 

 
 
 
  $scope.login = function () {
    
  
     
     if($scope.email =="test@gmail.com" && $scope.password =="test"   ){
        $scope.loading = !$scope.loading;
          $state.go('dashboard.mygroups');
          $rootScope.loggedIn= true;
        
     }
     
 
     
     else{
       $scope.error = 'Username or password is incorrect';
       $scope.loading =  $scope.loading;
       
     }
 

 
  };
  
  
  
  
  
  
  
});
 
 
 
 