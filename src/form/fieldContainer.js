/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(["./label"], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        return factory(require('./label'));
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("./label"));
	} else {
		root.myModule = factory();
	}
}(this, function(Base) {
	return Base.extend({
		fieldSubTpl:'',
		uiClass:'form-fieldcontainer',
		direction:'row',
		getTargetEl: function() {
            return this.frameBody || this.$el.find('>div');
        },
        render:function(){
        	this.$el.addClass('form-fieldcontainer-' + this.direction)
        	Base.prototype.render.apply(this,arguments)
        }
	});
}));
