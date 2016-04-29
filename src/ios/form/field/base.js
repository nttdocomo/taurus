(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../../view/base","../../../classic/form/field/field","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../../view/base'),require('../../../classic/form/field/field'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../../view/base"),require('../../../classic/form/field/field'),require('underscore')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(Base,Field,_) {
	return Base.extend({
		tagName:'li',
		childEls:{
			'itemInner':'.item-inner',
		},
		initialize:function(){
			var me = this;
			this._super.apply(me,arguments)
		},
		getTpl:function(){
			return '<div class="item-content"><%if(image){%><div class="item-media"><img class="img" src="<%=image%>"/></div><%}%><div class="item-inner"><div class="item-title"><%=fieldLabel%></div><%=itemInput%></div></div>'
		},
		getTplData:function(){
			var me = this;
			return {
				fieldLabel:me.fieldLabel,
				image:null
			}
		}
	}).mixins(Field)
}));
