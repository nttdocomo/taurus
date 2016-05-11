(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../view/listItem","underscore"], function(Base,_){
		    	return (root.myModule = factory(Base));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../view/listItem'),require('underscore'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../view/listItem"),require('underscore')));
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
			return '<%if(href){%><a href="<%=href%>" class="item-link item-content"><%}else{%><div class="item-content"><%}%><%if(image){%><div class="item-media"><img class="img" src="<%=image%>"/></div><%}%><div class="item-inner"><div class="item-title"><%=cellForRowAtIndexPath%></div></div><%if(href){%></a><%}else{%></div><%}%>'
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
				cellForRowAtIndexPath:this.cellForRowAtIndexPath(),
				href:this.model.get('href') || false,
				image:this.model.get('image') || false,
			}
		},
		delegateEvents:function(events){
			if(!this.model.has('href')){
				_.extend(events,{
					'click a':function(){
						return false;
					}
				})
			}
			Base.prototype.delegateEvents.call(this,events)
		}
	})
}));
