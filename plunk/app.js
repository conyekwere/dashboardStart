var app = angular.module('app', ['ui.router','ngAnimate','ui.bootstrap']);



app.config(function($stateProvider, $urlRouterProvider){
  
     $urlRouterProvider.otherwise('accountenter/login');
    
    $stateProvider
    
        
        .state('account-enter', {
                url: '/accountenter',
                templateUrl: 'accountenter/accountenter.view.html',
          controller: function($rootScope) {
                // $rootScope.email = "test@gmail.com";
                // $rootScope.password = "test";
            }
                
              
            })
            
             .state('account-enter.login', {
                url: '/login',
                  controller: 'loginCtrl',
                templateUrl: 'accountenter/login.html'
               
            })
            
             .state('account-enter.signup', {
                url: '/signup',
                 controller: 'signupCtrl',
                templateUrl: 'accountenter/signup.html'
               
            })
             .state('dashboard', {
                url: '/mygroups',
                templateUrl: 'dashboard/dashboard.view.html',
                controller: function($rootScope,$state,$scope) {
                  
                  
                              $scope.isActive = false;
                              $scope.menuClick = function() {
                                $scope.isActive = !$scope.isActive;
                              };
                              
                              
                              
                   

                      },
                      resolve: {
                        "check":function($rootScope,$state) {
                    
                    if(!$rootScope.loggedIn){
                       $state.go('account-enter.login');
                      } 
                 
                          } 
                       }  
              
            })
            .state('dashboard.newgroup', {
                url: '/newgroup',
                templateUrl: 'dashboard/newgroup.html',
                controller: 'newgroupCtrl'
                
              
            })
            .state('dashboard.mygroups', {
                url: '/mygroups',
                templateUrl: 'dashboard/mygroups.html',
                
                  controller: 'mygroupsCtrl'
              
            })
            
            .state('dashboard.myaccount', {
                url: '/myaccount',
                templateUrl: 'dashboard/myaccount.html',
                
                 controller: 'myaccountCtrl'
              
            })
            
             .state('dashboard.newsboard', {
                url: '/newsboard',
                templateUrl: 'dashboard/newsboard.html',
                
                 controller: 'newboardCtrl'
              
            })
            
  
});
  


app.run(function($rootScope){ });



app.controller('mainCtrl', function($rootScope,$scope,$state, $modal) {
  
  
   $rootScope.hasnoGroup = true;
  

 
   $scope.addnewgroupOpen = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'addnewGroup.html',
      controller: 'ModalInstanceCtrl',
      size: size
      
        }); 
  };
  
});
 
 
app.controller('ModalInstanceCtrl', function ($rootScope,$scope,$state, $modalInstance) {

 
 $scope.loadAccept = false;
      $scope.addGroup = function () {
      
        
         $rootScope.hasnoGroup = false;
            $scope.loadAccept = !$scope.loadAccept;
         
           $state.go('dashboard.mygroups');
            $modalInstance.dismiss('cancel');

  };


  $scope.cancelcreateGroup = function () {
      $scope.loadAccept = !$scope.loadAccept;
    $modalInstance.dismiss('cancel');
  
  };
    
});
 
 
 
  
 



app.directive('uiSrefIf', function($compile) {
  return {
    scope: {
      val: '@uiSrefVal',
      if: '=uiSrefIf'
    },
    link: function($scope, $element, $attrs) {
      $element.removeAttr('ui-sref-if');
      $compile($element)($scope);
      
      $scope.$watch('if', function(bool) {
        if (bool) {
          $element.attr('ui-sref', $scope.val);
        } else {
          $element.removeAttr('ui-sref');
          $element.removeAttr('href');
        }
        $compile($element)($scope);
      });
    }
  };
});


app.directive('realTimeCurrency', function ($filter, $locale) {
    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    var filterFunc = function (value) {
        return $filter('currency')(value);
    };

    function getCaretPosition(input){
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            // Curse you IE
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos){
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; // Input's hidden
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            // Curse you IE
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    
    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, modelCtrl) {    
            modelCtrl.$formatters.push(filterFunc);
            modelCtrl.$parsers.push(function (newViewValue) {
                var oldModelValue = modelCtrl.$modelValue;
                var newModelValue = toNumber(newViewValue);
                modelCtrl.$viewValue = filterFunc(newModelValue);
                var pos = getCaretPosition(elem[0]);
                elem.val(modelCtrl.$viewValue);
                var newPos = pos + modelCtrl.$viewValue.length -
                                   newViewValue.length;
                if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
                    newPos -= 3;
                }
                setCaretPosition(elem[0], newPos);
                return newModelValue;
            });
        }
    };
});

 