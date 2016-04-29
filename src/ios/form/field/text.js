(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["./base","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('./base'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("./base"),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(Base,_) {
	return Base.extend({
		getTplData:function(){
			var me = this;
			return _.extend({
				itemInput:_.template('<div class="item-input"><input type="email" name="<%=name%>" /></div>')({
					name:me.name,
					type:me.type,
				})
			},this._super.apply(me,arguments))
		}
	})
}));
