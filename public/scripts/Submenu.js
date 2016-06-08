angular.module('Submenu', [

])

// Manage windows
.service('SubmenuService', function ($rootScope) {

  var service = this;

  service.submenus = [];

  // Subscribe for changes
  service.subscribe = function (scope, callback){
    if(!scope || !callback)
      return console.error('Cannot subscribe with invalid scope and callback!');

    var handler = $rootScope.$on('SubmenuService:update', callback);
    scope.$on('$destroy', handler);
  }

  // Adds a window to the window list
  service.open = function (menu){
    if(!menu)
      return;

    // Defaults to closed
    menu.open = menu.open || false;

    // Check if window is already included
    if(service.submenus.indexOf(menu) >= 0)
      return;

    // Append window
    service.submenus.push(menu);

    $rootScope.$emit('SubmenuService:update');
  }

  // Close a window
  service.close = function (win){
    // Check if window exists
    var idx = service.submenus.indexOf(menu)
    if(idx < 0)
      return;

    // Remove element from the list
    service.submenus.splice(idx, 1);

    $rootScope.$emit('SubmenuService:update');
  }

})
