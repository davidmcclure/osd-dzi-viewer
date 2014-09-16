

var Backbone = require('backbone');
var $ = require('jquery');
var Router = require('./router');
Backbone.$ = $;


$(function() {
  new Router();
  Backbone.history.start();
});
