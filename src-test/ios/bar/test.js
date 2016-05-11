// Don't forget to prevent automatic test execution if your test runner of
// choice is one of the more excitable frameworks.
QUnit.config.autostart = false;

// file: test/main.js
seajs.use([
	'ios/bar/navBar'
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
	QUnit.init();
	QUnit.test( "first navbar item", function( assert ) {
		assert.ok( 1 == navBar.items.length, "Passed! The navBar's items length is 1" );
		assert.ok( '信息' == navBar.items[0].title, "Passed!" );
		assert.ok( '信息' == navBar.activeItem.title, "Passed!" );
		assert.ok( undefined == navBar.activeItem.backBarButtonItem, "Passed!" );
	});
	QUnit.test( "navbar push item", function( assert ) {
		navBar.pushItem({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			title:'item2'/*,
			backBarButtonItem:{
				title:'取消'
			}*/
		})
		assert.ok( 2 == navBar.items.length, "Passed!" );
		assert.ok( 'item2' == navBar.activeItem.title, "Passed!" );
		assert.ok( '信息' == navBar.prevItem.title, "Passed!" );
		assert.ok( undefined !== navBar.activeItem.backBarButtonItem, "Passed!" );
		assert.ok( '信息' == navBar.activeItem.backBarButtonItem.title, "Passed!" );
	});
	QUnit.test( "backBarButton is click", function( assert ) {
		navBar.activeItem.backBarButtonItem.$el.trigger('click')
		assert.ok( 1 == navBar.items.length, "Passed!" );
		assert.ok( null == navBar.prevItem, "Passed!" );
	});
});