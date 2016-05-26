// Don't forget to prevent automatic test execution if your test runner of
// choice is one of the more excitable frameworks.
QUnit.config.autostart = false;

// file: test/main.js
seajs.use([
	'../src/backbone',
	'../src/view/base',
	'../src/classic/panel/panel',
	'../src/classic/form/field/base',
	'../src/classic/form/field/comboBox',
	'../src/classic/view/boundList'
], function(Backbone,Base,Panel,BaseField,ComboBox,BoundList
	/* remember: the test modules don't export anything */) {
	var shadowEl = $('<div></div>')
	var base = new Base({
		renderTo:$(document.body)
	}),
	panel = new Panel({
		collapsible: true,
		renderTo:shadowEl
	})

	// All the test files have been loaded, and all the tests have been
	// defined--we're ready to start testing!
	QUnit.init();
	QUnit.test( "base", function( assert ) {
		assert.ok( undefined !== base.$el, "base has a $el" );
		assert.ok( true === base.isRendered, "base isRendered is not true" );
		base.setSize(20,10)
		assert.ok( 20 == base.getWidth(), "base width is not correcr" );
		assert.ok( 10 == base.getHeight(), "base height is correcr" );
		base.setHeight(20)
		assert.ok( 20 == base.getHeight(), "base width is correcr after set height" );
		base.setWidth(30)
		assert.ok( 30 == base.getWidth(), "base width is correcr after set width" );
		base.$el.css('position','absolute')
		base.showAt(10,10)
		assert.ok( 10 == base.$el.position().left, "base position left is not correct" );
		assert.ok( 10 == base.$el.position().top, "base position top is not correct" );
		base.remove();
	});
	QUnit.test( "form field base", function( assert ) {
		var baseField = new BaseField({
			renderTo:$(document.body)
		});
		assert.ok( '' === baseField.valueToRaw(''), "valueToRaw return a not empty string" );
		assert.ok( '1' === baseField.valueToRaw('1'), "valueToRaw return is not equal to '1'" );
		assert.ok( '1' === baseField.valueToRaw(1), "valueToRaw return is not equal to '1'" );
		baseField.remove();
	});

	QUnit.test( "panel collapsible", function( assert ) {
		panel.toggleCollapse({target:panel.$el.find('.tool-collapse-top')})
		assert.ok( true == panel.collapsed, "panel is not collapsed" );
		panel.toggleCollapse({target:panel.$el.find('.tool-expand-bottom')})
		assert.ok( false == panel.collapsed, "panel is not expanded" );
		var event = jQuery.Event('click');//模拟出发代理事件
		event.target = panel.$el.find('.tool-collapse-top')[0];
		panel.$el.trigger(event)
		assert.ok( true == panel.collapsed, "panel is not collapsed" );
		event = jQuery.Event('click');
		event.target = panel.$el.find('.tool-expand-bottom')[0];
		panel.$el.trigger(event)
		assert.ok( false == panel.collapsed, "panel is not expanded" );
	});
	QUnit.test( "BoundList", function( assert ) {
		var collection = new Backbone.Collection([{
			name:'a',
			value:'0'
		},{
			name:'b',
			value:'1'
		}]),
		boundList = new BoundList({
			displayField : 'name',
			collection : collection
		}),
		result,
		event = $.Event('click',{
			target : boundList.$el.find('a').get(1)
		});
		boundList.on({
			'itemclick': function(record){
				result = record
			}
		});
		boundList.$el.trigger(event);
		assert.ok( collection.at(0) == boundList.getRecord(boundList.$el.find('a').eq(0)), "getRecord return a not correct result" );
		assert.ok( collection.at(1) == result, "select a not correct result" );
		boundList.remove();
		boundList = undefined;
		collection = undefined;
		event = undefined;
	});
	QUnit.test( "ComboBox", function( assert ) {
		assert.expect( 5 );
		var done = assert.async(5),collection = new Backbone.Collection([{
			name:'aaaa',
			value:'0'
		},{
			name:'bbbb',
			value:'1'
		},{
			name:'aabb',
			value:'2'
		}]),
		$el = $('<div></div>'),
		comboBox = new ComboBox({
			queryDelay:10,
			renderTo:$el,
			displayField : 'name',
			valueField:'value',
			queryMode : 'local',
			collection : collection
		}),
		event = $.Event('keyup',{
			target : comboBox.inputEl.get(0),
			keyCode:65//8
		}),
		test1 = function(){
			comboBox.inputEl.val('a')
			//触发一个普通输入
			comboBox.$el.trigger(event);
			setTimeout(function() {
			    assert.equal(comboBox.getPicker().collection.length, 2, "Input was focused" );
			    done();
			    test2();
			},11);
		},
		test2 = function(){
			//测试a和b
			comboBox.inputEl.val('ab')
			event.keyCode = 46;
			comboBox.$el.trigger(event);
			setTimeout(function() {
			    assert.equal(comboBox.getPicker().collection.length, 1, "Input was focused" );
			    done();
			    test3();
			},11);
		},
		test3 = function(){
			//测试a和b
			comboBox.inputEl.val('abc')
			event.keyCode = 46;
			comboBox.$el.trigger(event);
			setTimeout(function() {
				console.log(comboBox.getPicker().collection)
			    assert.equal(comboBox.getPicker().collection.length, 0, "Input was focused" );
			    done();
			    test4();
			},11);
		},
		test4 = function(){
			//测试a和b
			comboBox.inputEl.val('b')
			event.keyCode = 66;
			comboBox.$el.trigger(event);
			setTimeout(function() {
			    assert.equal(comboBox.getPicker().collection.length, 2, "Input was focused" );
			    done();
			    test5()
			},11);
		},
		test5 = function(){
			//测试a和b
			comboBox.inputEl.val('')
			event.keyCode = 46;
			comboBox.$el.trigger(event);
			setTimeout(function() {
			    assert.equal(comboBox.value, null, "当输入框的值是空时，值重置为null" );
			    done();
			},11);
		};
		test1();
	});
});
