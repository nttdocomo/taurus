/**
 * @author nttdocomo
 */
define(function(require) {
	var Panel = require("../../src/tab/panel"),
		$body = $("#main");
	new Panel({
		width: 450,
        activeTab: 0,
        defaults :{
            bodyPadding: 10
        },
        items: [{
            html: "My content was added during construction.", 
            title: 'Short Text'
        },{
            html: "Long My content was added during construction.",
            title: 'Long Text'
        }/*,{
            title: 'Long Text',
            loader: {
                url: 'ajax1.htm',
                contentType: 'html',
                loadMask: true
            }
        }*/],
		renderTo : $body
	});
});
