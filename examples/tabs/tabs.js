/**
 * @author nttdocomo
 */
define(function(require) {
	var Panel = require("../../src/tab/panel.js"),
		$body = $("#main");
	new Panel({
		width: 450,
        activeTab: 0,
        defaults :{
            bodyPadding: 10
        },
        items: [{
            contentEl:'script', 
            title: 'Short Text',
            closable: true
        },{
            contentEl:'markup', 
            title: 'Long Text'
        }],
		renderTo : $body
	});new Panel({
		width: 450,
        activeTab: 0,
        defaults :{
            bodyPadding: 10
        },
        items: [{
            innerHtml: "My content was added during construction.", 
            title: 'Short Text'
        },{
            title: 'Long Text',
            loader: {
                url: 'ajax1.htm',
                contentType: 'html',
                loadMask: true
            }
        }],
		renderTo : $body
	});
});
