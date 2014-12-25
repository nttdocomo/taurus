/**
 * @author nttdocomo
 */
define(function(require) {
	var Menu = require('./menu'),
	Base = require('../view/base');
	return Menu.extend({
		isNav:true,
		className:'nav navbar-nav',
		initialize:function(){
	        Base.prototype.initialize.apply(this,arguments);
	        $(document).on('mousedown',_.bind(this.deactivateActiveItem,this))
		}
	});
});
