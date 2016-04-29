// Don't forget to prevent automatic test execution if your test runner of
// choice is one of the more excitable frameworks.
QUnit.config.autostart = false;

// file: test/main.js
seajs.use([
	'../src/view/base'
], function(Base
	/* remember: the test modules don't export anything */) {
	var base = new Base({
		renderTo:$(document.body)
	});

	// All the test files have been loaded, and all the tests have been
	// defined--we're ready to start testing!
	QUnit.init();
	QUnit.test( "base init", function( assert ) {
		assert.ok( undefined !== base.$el, "base has a $el" );
		assert.ok( true === base.isRendered, "base isRendered is not true" );
	});
	QUnit.test( "base setSize", function( assert ) {
		base.setSize(20,10)
		assert.ok( 20 == base.getWidth(), "base width is not correcr" );
		assert.ok( 10 == base.getHeight(), "base height is correcr" );
	});
	QUnit.test( "base setSize", function( assert ) {
		base.setHeight(20)
		assert.ok( 20 == base.getHeight(), "base width is correcr after set height" );
	});
	QUnit.test( "base setSize", function( assert ) {
		base.setWidth(30)
		assert.ok( 30 == base.getWidth(), "base width is correcr after set width" );
	});
	QUnit.test( "base showAt", function( assert ) {
		base.$el.css('position','absolute')
		base.showAt(10,10)
		assert.ok( 10 == base.$el.position().left, "base width is correcr after set width" );
		assert.ok( 10 == base.$el.position().top, "base width is correcr after set width" );
	});
	/*QUnit.test( "base showAt", function( assert ) {
		function fmoney(s, n) {
			n = n > 0 && n <= 20 ? n : 2;
			s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1],
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			}
			return (t.split("").reverse().join("") + "." + r).replace(/(^\-),(.*)/,'$1$2');
		}
		assert.ok( '-900.00' == fmoney(-900), "base width is correcr after set width" );
		assert.ok( '-900.00' == fmoney(-900.0), "base width is correcr after set width" );
		assert.ok( '100.00' == fmoney(100), "base width is correcr after set width" );
		assert.ok( '1,000.00' == fmoney(1000), "base width is correcr after set width" );
		assert.ok( '-1,000.00' == fmoney(-1000), "base width is correcr after set width" );
		assert.ok( '10,000,000.00' == fmoney(10000000), "base width is correcr after set width" );
		assert.ok( '-100,000.00' == fmoney(-100000), "base width is correcr after set width" );
	});*/
});