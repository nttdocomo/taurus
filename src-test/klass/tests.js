QUnit.config.autostart = false;

seajs.use([
	'./klass',
	'./noNameSpace'
], function(namespace,noNameSpace) {
	QUnit.init();
	QUnit.test( "first navbar item", function( assert ) {
		assert.ok( "object" == typeof namespace, "Passed! The mod is object" );
		assert.ok( "1" == namespace.a, "Passed! The mod.a is 1" );
		assert.ok( "object" == typeof a.b.c, "Passed! The namespace.a.b is object" );
		assert.ok( "1" == a.b.c.a, "Passed! The namespace.a.b.a is 1" );
	});
	QUnit.test( "first navbar item", function( assert ) {
		assert.ok( "object" == typeof noNameSpace, "Passed! The mod is object" );
		assert.ok( "2" == noNameSpace.a, "Passed! The mod.a is 2" );
	});
});