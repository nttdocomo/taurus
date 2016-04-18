(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/base","../bar/navBar","../model/navItem","underscore"], function(Base,NavBar,NavItem,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../view/base'),require('../bar/navBar'),require('../model/navItem'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/base"),require('../bar/navBar'),require('../model/navItem'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(Base,NavBar,NavItem,_) {
	return Base.extend({
		className:'pages',
		tpl:'<div class="page"><div class="page-content"></div></div>',
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(me,arguments)
			/*me.navigationBar = new NavBar({
				renderTo:this.$el,
				view:me,
				items:[me.navigationItem.clone()]
			})*/
			me.navigationItem = new NavItem(me.navigationItem)
			this.$el.addClass('navbar-through')
		}
	})
}));
