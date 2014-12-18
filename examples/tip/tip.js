/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	var Tip = require("../../src/tip/toolTip"),
	Popover = require("../../src/tip/popover"),
	Button = require("../../src/button/button"),
	$body = $(document.body);
	var button1 = new Button({
		renderTo : $body,
		text:chance.word()
	});
	var button2 = new Button({
		renderTo : $body,
		text:chance.word()
	});
	var button3 = new Button({
		renderTo : $body,
		text:chance.word()
	});
	var button4 = new Button({
		renderTo : $body,
		text:chance.word()
	});
	var button5 = new Button({
		renderTo : $body,
		text:chance.word()
	});
	new Tip({
		target: button1,
		text: 'My Tip Title'
	})
	new Tip({
		target: button2,
		text: 'My Tip Title',
		anchor:'top'
	})
	new Tip({
		target: button3,
		text: 'My Tip Title',
		anchor:'right'
	})
	new Tip({
		target: button4,
		text: 'My Tip Title',
		anchor:'bottom'
	})
	new Popover({
		target: button5,
		title: chance.sentence({words: 3}),
		content:'<p>'+chance.paragraph()+'</p>'
	})
})