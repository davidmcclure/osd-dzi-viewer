

var $ = require('jquery');
var Router = require('./router');
var Backbone = require('backbone');
Backbone.$ = $;


$(function() {
  new Router();
  Backbone.history.start();
});
