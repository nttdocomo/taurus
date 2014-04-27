/**
 * @author nttdocomo
 */
(function() {
	$LAB.script("/src/sea.js", "/src/jquery.js", "/src/underscore.js", "/src/modernizr.js").wait().script("/src/backbone.js", "/src/taurus.js").wait(function() {
		seajs.config({
			alias : {
				'position' : 'jquery.ui.position.js',
				'scrollIntoView' : 'jquery.scrollIntoView.js',
			},
			base : 'http://battle.ship.com/src/',
			charset : 'utf-8'
		});

		// 将 jQuery 暴露到全局
		seajs.modify('jquery', function(require, exports) {
			window.jQuery = window.$ = exports
		});
		// 将 jQuery Cookie 插件自动包装成 CMD 接口
		seajs.modify('position', function(require, exports, module) {
			module.exports = $.position
		})
		seajs.modify('scrollIntoView', function(require, exports, module) {
			module.exports = $.fn.scrollIntoView
		})
		var $body = $("#main");
		var $doc = $(document.body),panel;
		var store = new Backbone.Collection;
		store.url = '/resources/city.json';
		var length = new Backbone.Collection([{
			name : "10年(120期)",
			age : 120
		}, {
			name : "20年(240期)",
			age : 240
		}, {
			name : "30年(360期)",
			age : 360
		}]);
		var collection = new Backbone.Collection([{
			name : "12年07月06日利率(85折)",
			age : 5.57
		}]);
		$doc.on('click','[data-trigger="modal"]',function(){
			seajs.use("../../src/form/panel.js", function() {
				if(!panel){
					panel = new taurus.form.Panel({
						title:'111111111',
						renderTo : $(document.body),
						items:[{
							className: 'form.field.Text',
							name : 'name',
							fieldLabel : 'name'
						},{
							className: 'form.field.ComboBox',
							name : 'country',
							queryMode:'local',
							displayField: 'name',
							valueField:'age',
							fieldLabel : 'country',
							collection:collection
						},{
							className: 'form.field.Date',
							name : 'date',
							format:'yyyy-mm-dd',
							fieldLabel : 'date'
						},{
							className: 'form.field.Number',
							name : 'number',
							fieldLabel : '贷款额度'
						},{
							className: 'form.field.Hidden',
							name : 'aa',
							fieldLabel : 'aa'
						}]
					});
				}
				panel.show();
			})
		})
		var model = new Backbone.Model({
			'name':'aaaaaaaaa',
			'country':26,
			'date':1357374631169,
			'number':1,
		})
		seajs.use("../../src/form/base.js", function() {
			new taurus.form.Base({
				renderTo : $body,
				model : model,
				items:[{
					xtype: 'form.field.Text',
					name : 'name',
					fieldLabel : 'name'
				},{
					xtype: 'form.field.ComboBox',
					name : 'country',
					queryMode:'local',
					displayField: 'name',
					valueField:'age',
					fieldLabel : '商业贷款利率',
					collection:collection
				},{
					xtype: 'form.field.ComboBox',
					name : 'length',
					queryMode:'local',
					displayField: 'name',
					valueField:'age',
					fieldLabel : '贷款期限',
					collection:length
				},{
					xtype: 'form.field.Date',
					name : 'date',
					fieldLabel : 'date'
				},{
					xtype: 'form.field.Number',
					name : 'number',
					fieldLabel : '贷款额度'
				}]
			});
		})
	})
})()