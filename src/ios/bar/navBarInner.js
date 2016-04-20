(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/component",'../button/barButtonItem','util/transitionEvent',"underscore","jquery.transform"], function(Base,BarButtonItem,_){
		    	return (root.myModule = factory(Base,BarButtonItem,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../view/component'),require('../button/barButtonItem'),require('util/transitionEvent'),require('underscore'),require('jquery.transform'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/component"),require('../button/barButtonItem'),require('util/transitionEvent'),require('underscore'),require('jquery.transform')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,BarButtonItem,transitionEvent,_) {
	return Base.extend({
		className:'navbar-inner navbar-on-right',
		tpl:'<div class="left"></div><div class="center"><%=title%></div><div class="right"></div>',
		childEls:{
			'left':'.left',
			'center':'.center'
		},
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(me,arguments);
			/*len = me.items.length,topItem = this.items[len-1];*/
			if(me.item.backBarButtonItem){
				me.backBarButtonItem = new BarButtonItem(_.extend({
					renderTo:me.$el.find('.left')
				},me.item.backBarButtonItem))
			}
		},
		getTargetEl:function(item){
			return this.$el;
		},
		getTplData:function(){
			//var me = this,len = me.items.length,topItem = this.items[len-1];
			return {
				title:this.item.title
			}
		},
		slideOutToView:function(){
			var me = this,animateClass = 'navbar-from-center-to-left',
			navbarLeftOffset = me.left.find('.bar-button-item > span').offset(),
			navbarCenterOffset = me.center.addClass('sliding').offset(),
			offset = navbarLeftOffset.left - navbarCenterOffset.left;
			console.log(navbarLeftOffset)
			console.log(navbarCenterOffset)
			console.log(offset)
			me.$el.addClass(animateClass);
			me.center.css({
				'transform':'translate3d('+[offset + 'px', '0', '0'].join()+')',
			})
			me.center.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){
				me.$el.removeClass(animateClass).addClass('navbar-on-left');
			})
		},
		slideInToView:function(){
			var me = this,animateClass = 'navbar-from-right-to-center'/*,
			navbarLeftOffset = me.left.find('.bar-button-item > span').offset(),
			navbarCenterOffset = me.center.addClass('sliding').offset(),
			offset = navbarLeftOffset.left - navbarCenterOffset.left*/;
			me.center.addClass('sliding')
			me.left.addClass('sliding')
			me.$el.removeClass('navbar-on-right').addClass(animateClass);
			me.center.css({
				'transform':'translate3d('+['0', '0', '0'].join()+')',
			})
			me.center.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){
				me.$el.removeClass(animateClass).addClass('navbar-on-center');
			})
		}
	})
}));
