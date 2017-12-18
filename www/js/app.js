// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.map','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })


    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html',
         
        }
      }
    })


    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

.state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

  .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
	
	
	  .state('tabs.search', {
      url: '/search',
      views: {
        'map-tab' : {
          templateUrl: 'templates/search.html',
          controller: 'MapCtrl'
        }
      }
    })
	
	
    
$urlRouterProvider.otherwise('/tab/home');

})



.controller('CalendarController',['$scope','$http','$state',function($scope,$http,$state) {
/*js/data.json*/

  /*http://vps271106.ovh.net/~tunifilm/web/app_dev.php/api/listfilm*/
$http.get('js/data.json').success(function(data){
  $scope.calendar = data.calendar;

$scope.doRefresh =function() {
$http.get('js/data.json').success(function(data) {
$scope.calendar = data.calendar;
$scope.$broadcast('scroll.refreshComplete'); 
        });
      }

  $scope.toggleStar=function(item)
  { item.star=!item.star;}

});

}])

.controller('ListController',['$scope','$http','$state',function($scope,$http,$state) {
/*js/data.json*/

/*http://vps271106.ovh.net/~tunifilm/web/app_dev.php/api/listfilm*/
$http.get('js/data.json').success(function(data){
$scope.films = data.films;

$scope.whichfilm=$state.params.aId;

$scope.doRefresh =function() {
$http.get('js/data.json').success(function(data) {
$scope.films = data.films;
$scope.$broadcast('scroll.refreshComplete'); 
        });
      }



  $scope.toggleStar=function(item)
  {

    item.star=!item.star;
  }

});

}
]);
