/**
 * @author nttdocomo
 */
/**
 * @author nttdocomo
 */
define(function(require) {
	require("backbone");
	Segmented = require("../../src/button/segmented");
	var $body = $(document.body);

	new Segmented({
		renderTo: $body,
		items: [{
		    text: 'Segment Item 1'
		},{
		    text: 'Segment Item 2'
		},{
		    text: 'Segment Item 3'
		}],
		listeners: {
            toggle: function(container, button, pressed) {
                 console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
            }
       }
	});
})