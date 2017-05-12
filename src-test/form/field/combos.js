"use strict";
(function (root, factory) {
    if(typeof define === "function"){
        if(define.amd) {
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../../../src/backbone','../../../src/underscore','../../../src/classic/form/field/comboBox'],function(Base,StoreHolder){
              return (root.Class = factory(Base,StoreHolder));
            });
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/comboBox')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../../../src/backbone'),require('../../../src/underscore'),require('../../../src/classic/form/field/comboBox')));
    } else {
        root.Class = factory();
    }
}(this, function(Backbone,_,ComboBox) {
    var run = function() {
		QUnit.test("ComboBox", function( assert ) {
			assert.expect( 6 );
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
			$el = $('<div></div>').appendTo(document.body),
			comboBox = new ComboBox({
				queryDelay:1,
				renderTo:$el,
				emptyText:'emptyText',
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
				},2);
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
				},2);
			},
			test3 = function(){
				//测试a和b
				comboBox.inputEl.val('abc')
				event.keyCode = 46;
				comboBox.$el.trigger(event);
				setTimeout(function() {
				    assert.equal(comboBox.getPicker().collection.length, 0, "Input was focused" );
				    done();
				    test4();
				},2);
			},
			test4 = function(){
				//测试a和b
				comboBox.inputEl.val('b')
				event.keyCode = 66;
				comboBox.$el.trigger(event);
				setTimeout(function() {
				    assert.equal(comboBox.getPicker().collection.length, 2, "当输入b时，筛选后的集合长度为2" );
				    done();
				    test5()
				},2);
			},
			test5 = function(){
				//测试a和b
				comboBox.inputEl.val('')
				event.keyCode = 46;
				comboBox.$el.trigger(event);
				setTimeout(function() {
				    assert.equal(comboBox.value, null, "当输入框的值是空时，值重置为null" );
					assert.equal(comboBox.picker.$el.is(':hidden'), true, "当输入框的值是空时，下拉框收起" );
				    done();
				    comboBox.remove();
				},2);
			};
			test1();
		});
		QUnit.test("Single ComboBox", function( assert ) {
			var collection = new Backbone.Collection([{
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
				queryDelay:1,
				renderTo:$el,
				emptyText:'emptyText',
				displayField : 'name',
				valueField:'value',
				queryMode : 'local',
				collection : collection
			}),
			event = $.Event('click',{
				target : comboBox.triggerEl.get(0)
			}),
			picker,
			listEvent;
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "当点击下拉按钮时，显示下拉框" );
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), true, "当点击下拉按钮时，隐藏下拉框" );
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "当点击下拉按钮时，显示下拉框" );
			picker = comboBox.getPicker();
			listEvent = $.Event('click',{
				target : picker.$el.find('a').get(0)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.equal(comboBox.value, '0', "当点击下拉框第一个选项时" );
			assert.equal(comboBox.getPicker().$el.is(':hidden'), true, "当点击下拉框时，隐藏下拉框" );
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "当点击下拉按钮时，显示下拉框" );
			listEvent = $.Event('click',{
				target : picker.$el.find('a').get(1)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.equal(comboBox.value, '1', "当点击下拉框第二个选项时" );
			listEvent = $.Event('click',{
				target : picker.$el.find('a').get(2)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.equal(comboBox.value, '2', "当点击下拉框第三个选项时" );
			//comboBox.getPicker().remove();
			//comboBox.remove();
		});
		QUnit.test("MultiSelect ComboBox", function( assert ) {
			var collection = new Backbone.Collection([{
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
				queryDelay:1,
				renderTo:$el,
				emptyText:'emptyText',
				displayField : 'name',
				valueField:'value',
				queryMode : 'local',
				collection : collection,
				multiSelect:true
			}),
			event = $.Event('click',{
				target : comboBox.triggerEl.get(0)
			}),
			picker,
			listEvent;
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "当点击下拉按钮时，显示下拉框" );
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), true, "当点击下拉按钮时，隐藏下拉框" );
			comboBox.$el.trigger(event);
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "当点击下拉按钮时，显示下拉框" );
			picker = comboBox.getPicker();
			listEvent = $.Event('click',{
				target : picker.$el.find('a').eq(0).get(0)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			listEvent = $.Event('click',{
				target : picker.$el.find('a').eq(1).get(0)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.ok(_.isEqual(comboBox.value, ['0','1']), "当点击下拉框第一，二个选项时" );
			assert.equal(comboBox.getPicker().$el.is(':hidden'), false, "多选时下拉框不收起" );//因为是多选，所以在点击下拉框元素进行选择时下拉框不会收起
			listEvent = $.Event('click',{
				target : picker.$el.find('a').eq(1).get(0)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.ok(_.isEqual(comboBox.value, ['0']), "当再次点击下拉框第一个选项时，取消选择" );
			listEvent = $.Event('click',{
				target : picker.$el.find('a').eq(0).get(0)
			});
			comboBox.getPicker().$el.trigger(listEvent);
			assert.ok(_.isEqual(comboBox.value, []), "当再次点击下拉框第一个选项时，取消选择，值为空数组" );
			comboBox.getPicker().remove();
			comboBox.remove();
		});
    };
    return {run: run}
}));
