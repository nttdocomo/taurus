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
		items:[],
		//tpl:'<div class="navbar-inner"><div class="left"></div><div class="center"><%=title%></div><div class="right"></div></div>',
		initialize:function(){
			var me = this,len,topItem;
			Base.prototype.initialize.apply(me,arguments)
			var len = me.items.length,topItem;
			if(len){
				topItem = me.items[len-1];
				me.items[len-1] = me.initItem(topItem);
				me.setActiveItem(me.items[len-1])
			}
		},
		back:function(){
			var me = this,
			activeItem = me.activeItem,
			len = me.items.length,
			backItem = me.items[len-2];
			activeItem.slideCenterToRightOutToView()
			me.prevItem.slideLeftToCenterIntoToView()
			me.activeItem = me.prevItem;
			me.items.pop();
			len = me.items.length;
			if(len > 1){
				me.prevItem = me.items[len-2]
				me.prevItem.$el.prependTo(me.$el)
			} else {
				me.prevItem = null;
			}
			me.trigger('back')
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
		initItem:function(item){
			var me = this,activeItem = me.activeItem,
			len = me.items.length,topItem = me.items[len-1];
			if(activeItem){
				activeItem.slideCenterToLeftOutToView()
				if(!item.backBarButtonItem){
					item.backBarButtonItem = {}
				}
				if(!item.backBarButtonItem.title){
					item.backBarButtonItem.title = topItem.title;
				}
			}
			var navBarInner = new NavBarInner($.extend({
				renderTo:me.$el,
				navBar:me
			},item))
			return navBarInner;
		},
		pushItem:function(item){
			var me = this;
			me.items.push(me.setActiveItem(me.initItem(item)))
		},
		setActiveItem:function(item){
			var me = this,activeItem = me.activeItem;
			item.slideInToView();
			if(me.prevItem){
				me.prevItem.$el.detach();
			}
			me.prevItem = activeItem;
			me.activeItem = item;
			return item;
		}
	})
}));
