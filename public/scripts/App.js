angular.module('BajaSync', [
  'Baja',

  'Window',
  'Submenu',

  'ngMaterial',
  'ngAnimate',
	'ui.router',
  'ngFx',
])

// Configure theme
.config( function ($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '700'
    })
    .accentPalette('pink')
})

.config( function ($stateProvider, $urlRouterProvider) {
  // Setup routes
  $stateProvider
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: '/views/dashboard.html',
    controller: 'DashboardCtrl',
	});

	// $urlRouterProvider.otherwise('/dashboard')
})


.controller('AppCtrl', function ($timeout, $scope, WindowService, SubmenuService,
  BajaWindowModelos, BajaMenuSensors) {

  // Add Windows to main window
  WindowService.open(BajaWindowModelos);
  WindowService.open(Object.assign({}, BajaWindowModelos));

  // Add Submenus to menu window
  SubmenuService.open(BajaMenuSensors);
  SubmenuService.open(Object.assign({}, BajaMenuSensors));
  SubmenuService.open(Object.assign({}, BajaMenuSensors));
  
  $scope._loaded = false;

  $timeout(function (){
    $scope._loaded = true;
  }, 1000);

})


.controller('WindowCtrl', function ($scope, WindowService) {

  console.log('WindowCtrl');

  $scope.windows = null;

  WindowService.subscribe($scope, updateWindows)

  updateWindows();

  function updateWindows(){
    $scope.windows = WindowService.windows;
  }
})


.controller('SubmenuCtrl', function ($scope, SubmenuService) {

  console.log('SubmenuCtrl');

  $scope.submenus = null;

  SubmenuService.subscribe($scope, updateSubmenus)

  updateSubmenus();

  function updateSubmenus(){
    $scope.submenus = SubmenuService.submenus;
  }
})
