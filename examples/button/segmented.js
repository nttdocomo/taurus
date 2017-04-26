/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	Segmented = require("../../src/classic/button/segmented");
	var $body = $(document.body);

	new Segmented({
		renderTo: $body,
		value: 2,
		items: [{
	    text: 'Segment Item 1',
	    value: 1
		},{
	    text: 'Segment Item 2',
	    value: 2
		},{
	    text: 'Segment Item 3',
	    value: 3
		}],
		listeners: {
      toggle: function(container, button, pressed) {
        console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
        console.log(container.getValue())
      }
    }
	});
})