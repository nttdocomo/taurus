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
			define(["../view/boundList","../moment",'../backbone'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
		        return factory(require("../view/boundList"),require("../moment"),require('../backbone'));
		     })
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require("../view/boundList"),require("../moment"),require('../backbone'));
	} else {
		root.myModule = factory();
	}
}(this, function(Base,moment,Backbone) {
	return Base.extend({
		initDate:'2008-01-01',
		displayField: 'disp'
	},{
		/**
         * @private
         * Creates the internal {@link Ext.data.Store} that contains the available times. The store
         * is loaded with all possible times, and it is later filtered to hide those times outside
         * the minValue/maxValue.
         */
        createStore: function(format, increment) {
            var initDate = this.prototype.initDate,
                times = [],
                min = moment(initDate),
                max = moment(initDate).add(24*60-1,'m');

            while(min <= max){
            	var value = min.clone();
                times.push({
                    disp: value.format(format),
                    date: value
                });
                min.add(increment, 'm')
            }

            return new Backbone.Collection(times);
        }
	});
}));
