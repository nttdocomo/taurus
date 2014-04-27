/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	var Single = require("../../src/slider/single");
	var $body = $("#main");
	new Single({
        renderTo: $body,
        fieldLabel : '自主广告',
        useTips: false,
        width: 214,
        value:50,
        increment: 10,
        minValue: 0,
        maxValue: 100
    });
	var single = new Single({
        renderTo: $body,
        hideLabel: true,
        useTips: false,
        width: 214,
        value:50,
        increment: 33,
        minValue: 0,
        maxValue: 100
    });
    single.on('change',function(value, thumb){
    	console.log(thumb.$el.text(value/33))
    })
})