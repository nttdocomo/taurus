(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/component",'../button/barButtonItem',"underscore"], function(Base,BarButtonItem,_){
		    	return (root.myModule = factory(Base,BarButtonItem,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../view/component'),require('../button/barButtonItem'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/component"),require('../button/barButtonItem'),require('underscore')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,BarButtonItem,_) {
	return Base.extend({
		className:'navbar-inner',
		tpl:'<div class="left"></div><div class="center"><%=title%></div><div class="right"></div>',
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(me,arguments);
			/*len = me.items.length,topItem = this.items[len-1];*/
      if(me.item.has('backBarButtonItem')){
  			me.backBarButtonItem = new BarButtonItem(_.extend({
  				renderTo:me.$el.find('.left')
  			},me.item.get('backBarButtonItem')))
      }
		},
		getTargetEl:function(item){
			return this.$el;
		},
		getTplData:function(){
			//var me = this,len = me.items.length,topItem = this.items[len-1];
			return {
				title:this.item.get('title')
			}
		}
	})
}));
