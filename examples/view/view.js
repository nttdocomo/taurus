/**
 * @author nttdocomo
 */
(function() {
	$LAB.script("/src/sea.js", "/src/jquery.js", "/src/underscore.js").wait().script("/src/backbone.js", "/src/taurus.js").wait(function() {
		seajs.config({
			base : 'http://battle.ship.com/src/',
			charset : 'utf-8'
		});

		// 将 jQuery 暴露到全局
		seajs.modify('jquery', function(require, exports) {
			window.jQuery = window.$ = exports
		});
		var $doc = $(document.body);
		var myData = [
	        {'company':'3m Co', 'price': 71.72,'change': 0.02},
	        {'company':'Alcoa Inc', 'price': 29.01,'change': 0.42},
	        {'company':'Altria Group Inc', 'price': 83.81,'change': 0.28},
	        {'company':'American Express Company', 'price': 52.55,'change': 0.01},
	        {'company':'American International Group, Inc.', 'price': 64.13,'change': 0.31},
	        {'company':'AT&T Inc.', 'price': 31.61,'change': -0.48},
	        {'company':'Boeing Co.', 'price': 75.43,'change': 0.53}
	    ];
	    var collection = new Backbone.Collection(myData);
		seajs.use(["../../src/view/base.js","../../src/view/view.js"], function(Base,View) {
			taurus.augmentString('taurus.templates.ux.views.view', '<%=company%>');
			var ViewItem = taurus.view('taurus.ux.views.View',Base.extend({
			}))
			var table = new View({
				view:ViewItem,
	            collection:collection,
	            renderTo:$doc
			});
		})
	})
})()