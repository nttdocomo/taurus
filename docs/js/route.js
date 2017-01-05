define(function(require){
	var Backbone = require('backbone')
	var Router = Backbone.Router.extend({
    routes: {
        ''                 : 'index',
        'text'            : 'text',
        '*error'           : 'error'
    },
    text: function(actions) {
        console.log("首页渲染")
    },
    index: function(actions) {
      require.async(['./index'], function(Page) {
        new Page()
      })
    }
  });
  return Router;
})