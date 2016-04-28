(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/base","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../view/base'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/base"),require('underscore')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,_) {
	return Base.extend({
		title:'',
		className:'page page-on-right',
		tpl:'<div class="page-content"></div>',
		childEls:{
			'content':'.page-content'
		},
		getTargetEl:function(){
			return this.content
		},
		slideInToView:function(){
			var me = this,animateClass = 'page-from-right-to-center';
			setTimeout(function() {
				me.$el.addClass(animateClass).removeClass('page-on-right');
            }, 0);
			me.$el.one("webkitAnimationEnd, OAnimationEnd, MSAnimationEnd, animationend",function(){
				me.$el.removeClass(animateClass).addClass('page-on-center');
			})
		},
		slideLeftToCenterIntoToView:function(){
			var me = this,animateClass = 'page-from-left-to-center';
			setTimeout(function() {
				me.$el.addClass(animateClass).removeClass('page-on-left');
            }, 0);
			me.$el.one("webkitAnimationEnd, OAnimationEnd, MSAnimationEnd, animationend",function(){
				me.$el.removeClass(animateClass).addClass('page-on-center');
			})
		},
		slideCenterToRightOutToView:function(){
			var me = this,animateClass = 'page-from-center-to-right';
			setTimeout(function() {
				me.$el.addClass(animateClass).removeClass('page-on-center');
            }, 0);
			me.$el.one("webkitAnimationEnd, OAnimationEnd, MSAnimationEnd, animationend",function(){
				me.$el.removeClass(animateClass).addClass('page-on-right').remove();
			})
		},
		slideCenterToLeftOutToView:function(){
			var me = this,animateClass = 'page-from-center-to-left';
			setTimeout(function() {
				me.$el.addClass(animateClass).removeClass('page-on-center');
            }, 0);
			me.$el.one("webkitAnimationEnd, OAnimationEnd, MSAnimationEnd, animationend",function(){
				me.$el.removeClass(animateClass).addClass('page-on-left');
			})
		}
	})
}));
