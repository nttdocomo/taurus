// Don't forget to prevent automatic test execution if your test runner of
// choice is one of the more excitable frameworks.
QUnit.config.autostart = false;

// file: test/main.js
seajs.use([
	'./ios/bar/test'
], function(NavBar
	/* remember: the test modules don't export anything */) {
	var shadowEl = $('<div></div>');
	var navBar = new NavBar({
		items:[{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			title:'信息'
		}],
		renderTo:shadowEl
	})

	// All the test files have been loaded, and all the tests have been
	// defined--we're ready to start testing!
	QUnit.test( "hello test", function( assert ) {
		assert.ok( 1 == navBar.items.length, "Passed!" );
	});
	QUnit.init();
});