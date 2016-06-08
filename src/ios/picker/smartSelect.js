(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../page/page","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../page/page'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../page/page"),require('underscore')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,_) {
	return Base.extend({
		title:'',
		className:'page page-on-right smart-select-page',
		tpl:'<div class="page-content"><div class="list-block"><ul></ul></div></div>',
		childEls:{
			'listBlock':'.list-block > ul'
		},
		getTargetEl:function(){
			return this.listBlock
		},
		delegateEvents:function(events){
			var me = this,events = events || {};
			events['change :'+(me.multiSelect ? 'checkbox':'radio')] = function(e){
				var record = me.collection.at($(e.target).parents('li').index())
				me.trigger('itemclick',e,record)
			}
			Base.prototype.delegateEvents.call(this,events)
		}
	})
}));
