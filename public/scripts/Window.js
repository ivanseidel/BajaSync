angular.module('Window', [

])

// Manage windows
.service('WindowService', function ($rootScope) {

  var service = this;

  service.windows = [];

  // Subscribe for changes
  service.subscribe = function (scope, callback){
    if(!scope || !callback)
      return console.error('Cannot subscribe with invalid scope and callback!');

    var handler = $rootScope.$on('WindowService:update', callback);
    scope.$on('$destroy', handler);
  }

  // Adds a window to the window list
  service.open = function (win){
    if(!win)
      return;

    // Check if window is already included
    if(service.windows.indexOf(win) >= 0)
      return;

    // Append window
    service.windows.push(win);

    $rootScope.$emit('WindowService:update');
  }

  // Close a window
  service.close = function (win){
    // Check if window exists
    var idx = service.windows.indexOf(win)
    if(idx < 0)
      return;

    // Remove element from the list
    service.windows.splice(idx, 1);

    $rootScope.$emit('WindowService:update');
  }

})
