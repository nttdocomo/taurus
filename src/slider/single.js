/**
 * @author nttdocomo
 */
define(function(require){
	var Multi = require('./multi')
	return taurus.view("taurus.slider.Single", Multi.extend({
		/**
	     * Programmatically sets the value of the Slider. Ensures that the value is constrained within the minValue and
	     * maxValue.
	     * @param {Number} value The value to set the slider to. (This will be constrained within minValue and maxValue)
	     * @param {Boolean} [animate] Turn on or off animation
	     */
	    setValue: function(value, animate) {
	        var args = arguments,
	            len  = args.length;
	
	        // this is to maintain backwards compatiblity for sliders with only one thunb. Usually you must pass the thumb
	        // index to setValue, but if we only have one thumb we inject the index here first if given the multi-slider
	        // signature without the required index. The index will always be 0 for a single slider
	        if (len == 1 || (len <= 3 && typeof args[1] != 'number')) {
	            args = _.toArray(args);
	            args.unshift(0);
	        }
	        return Multi.prototype.setValue.apply(this,args);
	    }
	}))
})