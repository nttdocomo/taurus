(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../src/ios/page/page","../../src/ios/view/table","backbone","underscore","chance"], function(Base,_){
		    	return (root.myModule = factory(Base,_));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require('../../src/ios/page/page'),require('../../src/ios/view/table'),require('backbone'),require('underscore'),require('chance'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require("../../src/ios/page/page"),require('../../src/ios/view/table'),require('backbone'),require('underscore'),require('chance')));
	} else {
	    root.myModule = factory(root.Base);
	}
}(this, function(Base,Table,Backbone,_,chance) {
	var collection = new Backbone.Collection([{
		text:chance.word()
	},{
		text:chance.word()
	},{
		text:chance.word()
	},{
		text:chance.word()
	}])
	return Base.extend({
		title:'',
		items:[{
			cls:Table,
			collection:collection,
			columns:[{
				dataIndex:'text'
			}]
		}],
		tpl:'<div class="page-content"></div>',
		childEls:{
			'content':'.page-content'
		},
		getTargetEl:function(){
			return this.content
		}
	})
}));
