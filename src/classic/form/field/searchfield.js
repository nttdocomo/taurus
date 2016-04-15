/**
 * @author nttdocomo
 */
define(function(require){
	var Trigger = require("./trigger");
	return Trigger.extend({
		triggerTpl: '<span class="input-group-btn"><button class="btn form-trigger btn-default" type="button"><span class="halflings search" data-name="search" data-type="" data-prefix="halflings" data-utf="E003"></span></button></span>'
	});
});