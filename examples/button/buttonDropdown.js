/**
 * @author nttdocomo
 */
(function() {
	$LAB.script("/src/sea.js", "/src/jquery.js", "/src/underscore.js","/src/modernizr.js").wait().script("/src/backbone.js", "/src/taurus.js").wait(function() {
		seajs.config({
			alias : {
				'position' : 'jquery.ui.position.js',
				'scrollIntoView' : 'jquery.scrollIntoView.js',
				'jqDnR' : 'jqDnR.js'
			},
			base : 'http://battle.ship.com/src/',
			charset : 'utf-8'
		});

		// 将 jQuery 暴露到全局
		seajs.modify('jquery', function(require, exports) {
			window.jQuery = window.$ = exports
		});
		seajs.modify('jqDnR', function(require, exports, module) {
			module.exports = $.fn.jqDnR
		});
		var $doc = $(document.body);
		var collection = new Backbone.Collection([{
			name : "Tim",
			age : 5
		}, {
			name : "Ida",
			age : 26
		}, {
			name : "Rob",
			age : 55
		}])
		seajs.use("../../src/button/buttonDropdown.js", function(Button) {
			var table = new Button({
	            collection:collection,
				displayField: 'name',
	            renderTo:$doc
			});
		})
	})
})()