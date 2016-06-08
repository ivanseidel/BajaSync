'use strict';
var TAG = 'App';

var electron = require('electron')

const BrowserWindow = electron.BrowserWindow

exports.init = function (){

  // Quit when all windows are closed.
  eApp.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      eApp.quit()
    }
  })

  // Open MainWindow on Activate
  eApp.on('activate', app.controllers.MainWindow.launch)

  // By Default, open Main Window on init
  app.controllers.MainWindow.launch();
}
