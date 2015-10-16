(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/base"], function(Base){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				var Base = require('../../view/base');
				return factory(Base);
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../view/base")));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base) {
	return Base.extend({
		className:'navbar',
		tpl:'<div class="left toolbar"></div><h1><%=title%></h1><div class="right toolbar">1</div>',
		getTargetEl:function(item){
			return this.$el.find('.'+item.side);
		},
		getTplData:function(){
			return {
				title:this.title
			}
		}
	})
}));