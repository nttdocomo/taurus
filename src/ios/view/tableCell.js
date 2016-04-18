(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../view/base","underscore"], function(Base,NavBar,NavItem,_){
		    	return (root.myModule = factory(Base));
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
	    root.myModule = factory(root.postal);
	}
}(this, function(Base,_) {
	return Base.extend({
		tagName:'li',
		initialize:function(){
			var me = this;
			Base.prototype.initialize.apply(me,arguments)
		},
		getTpl:function(){
			return '<a href="#" class="item-link item-content"><div class="item-inner"><div class="item-title"><%=cellForRowAtIndexPath%></div></div></a>'
		},
		cellForRowAtIndexPath:function(model){
			var me = this;
			return _.map(me.columns,function(column){
				if(column.renderer){
					return column.renderer(me.model.get(column.dataIndex))
				}
				return me.model.get(column.dataIndex)
			}).join('')
		},
		getTplData:function(){
			return {
				cellForRowAtIndexPath:this.cellForRowAtIndexPath()
			}
		}
	})
}));
