'use strict';
var TAG = _TAG('config.models');

// Load instantly, so that files can access models directly on root scope
var modelsDirectory = __dirname + '/..' + '/models/';

app.models = {};

// Load all helpers (including the loader itself lol)
app.helpers.loader.load(modelsDirectory, app.models);

console.log(TAG, 'Loaded Models:', _.keys(app.models).join(','));

module.exports = function config(app, next){
	next();
};
