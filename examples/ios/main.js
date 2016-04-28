(function (root, factory) {
	if(typeof define === "function") {
	  	if(define.amd){
		    // Now we're wrapping the factory and assigning the return
		    // value to the root (window) and returning it as well to
		    // the AMD loader.
		    define(["../../src/ios/bar/navBar","../../src/ios/page/pages",'../../src/ios/view/table','../../src/ios/form/form','../../src/ios/form/switch',"backbone","underscore",'chance'], function(NavBar,Pages,Table,Form,Switch,Backbone,_,chance){
		    	return (root.myModule = factory(NavBar,Pages,Table,Backbone,_,chance));
		    });
		}
	  	if(define.cmd){
	  		define(function(require, exports, module){
				return factory(require,require('../../src/ios/bar/navBar'),require('../../src/ios/page/pages'),require('../../src/ios/view/table'),require('../../src/ios/form/form'),require('../../src/ios/form/switch'),require('backbone'),require('underscore'),require('chance'));
			})
	  	}
	} else if(typeof module === "object" && module.exports) {
	    // I've not encountered a need for this yet, since I haven't
	    // run into a scenario where plain modules depend on CommonJS
	    // *and* I happen to be loading in a CJS browser environment
	    // but I'm including it for the sake of being thorough
	    module.exports = (root.myModule = factory(require('../../src/ios/bar/navBar'),require('../../src/ios/page/pages'),require('../../src/ios/view/table'),require('../../src/ios/form/form'),require('../../src/ios/form/switch'),require("backbone"),require('underscore'),require('chance')));
	} else {
	    root.myModule = factory(root.postal);
	}
}(this, function(require,NavBar,Pages,Table,Form,Switch,Backbone,_,chance) {
	var Router = Backbone.Router.extend({
		routes: {
			"*action":"index"
		},
		constructor:function(options){
			var me = this;
			me.on('route',me.storeRoute);
			me.history = [];
			Backbone.Router.prototype.constructor.call(me,options)
		},
		initialize : function() {
			var me = this;
			$(document).on('click', 'a',function(e){
				var me = this,referer_url = location.pathname,
				href = $(this).attr('href'),
				parentPage = $(this).parents('.page'),
				protocol = this.protocol + '//';
				if (href.slice(protocol.length) !== protocol) {
					e.preventDefault();
					if(parentPage.hasClass('page-from-right-to-center') || parentPage.hasClass('page-from-left-to-center') || parentPage.hasClass('page-from-center-to-right') || parentPage.hasClass('page-from-center-to-left')){
						return false;
					}
					Backbone.history.navigate(href, true);
			    }
				return false;
			})
			me.navBar = new NavBar({
				renderTo:$('.view')
			})
			me.pages = new Pages({
				renderTo:$('.view')
			})
			me.navBar.on('back',function(){
				me.previous()
				me.pages.back();
			})
		},
		storeRoute:function(){
			this.history.push(Backbone.history.fragment)
		},
		previous:function(){
			var me = this;
			if(this.history.length > 1){
				me.navigate(me.history[me.history.length-2], false)
				me.history.pop();
			}
		},
	    index:function(){
	    	var me = this;
	    	require.async(['../../src/ios/page/page'],function(Page){
	    		var cells = [],match;
	    		for (var i = chance.natural({min: 2, max: 20}) - 1; i >= 0; i--) {
	    			cells[i] = {
						text:chance.word()
					}
					if(chance.bool()){
						match = chance.url().match(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/)
						cells[i].href = [match[4],match[6]].join('')
					}
					if(chance.bool()){
						cells[i].image = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTQ1MTEwYWEzMiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NDUxMTBhYTMyIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxNC41IiB5PSIzNi41Ij42NHg2NDwvdGV4dD48L2c+PC9nPjwvc3ZnPg=='
					}
	    		}
	    		var item,deps = [];
	    		if(chance.bool()){
	    			item = {
						cls:Table,
						collection:new Backbone.Collection(cells),
						columns:[{
							dataIndex:'text'
						}]
					};
	    		} else {
	    			item = {
						cls:Form,
						items:[{
							cls:Switch
						}]
					};
	    		}
	    		var page = new Page({
	    			title:chance.word(),
	    			items:[{
						cls:Form,
						items:[{
							cls:Switch,
							name:chance.word(),
							fieldLabel:chance.word()
						}]
					}]
	    		})
	    		me.setActivePage(page)
	    	})
	    },
		setActivePage:function(page){
			var me = this;
			me.activePage = page;
			me.navBar.pushItem({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
				title:page.title/*,
				backBarButtonItem:{
					title:'取消'
				}*/
			})
			me.pages.pushItem(page)
		}
	})
	new Router();
	Backbone.history.start({pushState: true, root: location.pathname});
}));
