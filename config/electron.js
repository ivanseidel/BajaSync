'use strict';
var TAG = 'config.electron';

// Wait electron to be ready
var start = function (app, next){
  // Wait Electron initialization
  eApp.on('ready', function (a, b){
    next && next()
  })
}

module.exports = start
