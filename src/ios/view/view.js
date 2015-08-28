(function (root, factory) {
	if(typeof define === "function" && define.amd) {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/base"], function(postal){
		    	return (root.myModule = factory(postal));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				var postal = require('../../view/base');
				return factory(postal);
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/base")));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(Base) {
	return Base.extend({
		tpl:''
	})
}));