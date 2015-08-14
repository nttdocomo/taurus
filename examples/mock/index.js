/**
 * @author nttdocomo
 */
define(function(require) {
	var Text = require("../../src/form/field/text"),
	RadioGroup = require("../../src/form/radioGroup"),
	CheckboxGroup = require("../../src/form/checkboxGroup"),
	FieldSet = require("../../src/form/fieldSet"),
	$body = $("#main"),
	Number = require("../../src/form/field/number"),
	Panel = require("../../src/form/panel"),
	Alert = require("../../src/tip/alert"),
	DateType = require("../../src/form/field/date"),
	chance = require('chance'),
	DateTime = require("../../src/form/field/datetime");
	require('jquery.mockjax');
	$.mockjax({
		url: '/restful/fortune',
		responseTime: 750,
		responseText: {
			status: 'success',
			fortune: chance.sentence({words: 5})
			//fortune: 'Are you a turtle?'
		}
	});
	$.getJSON('/restful/fortune', function(response) {
		if ( response.status == 'success') {
			$('#fortune').html( 'Your fortune is: ' + response.fortune );
		} else {
			$('#fortune').html( 'Things do not look good, no fortune was told' );
		}
	});
});