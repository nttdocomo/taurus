(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/component",'./navBarInner',"underscore"], function(Base,BarButtonItem,_){
		    	return (root.myModule = factory(Base,BarButtonItem,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../view/component'),require('./navBarInner'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/component"),require('./navBarInner'),require('underscore')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,NavBarInner,_) {
	return Base.extend({
		className:'navbar',
		//tpl:'<div class="navbar-inner"><div class="left"></div><div class="center"><%=title%></div><div class="right"></div></div>',
		initialize:function(){
			var me = this,len,topItem;
			Base.prototype.initialize.apply(me,arguments)
			/*len = me.items.length,topItem = this.items[len-1];
			me.backBarButtonItem = new BarButtonItem(_.extend({
				renderTo:me.$el.find('.left')
			},topItem.get('backBarButtonItem')))*/
		},
		getTargetEl:function(item){
			return this.$el;
		},
		getTplData:function(){
			//var me = this,len = me.items.length,topItem = this.items[len-1];
			return {
				title:'asasd'//topItem.get('title')
			}
		},
		setActiveItem:function(item){
			this.items.push(item)
			var nextNavBarInner = new NavBarInner({
				item:item,
				renderTo:this.$el
			})
		}
	})
}));
