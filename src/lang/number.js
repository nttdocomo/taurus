/**
 * @class Ext.Number
 *
 * A collection of useful static methods to deal with numbers
 * @singleton
 */
define(function() {
	var me = this,
	isToFixedBroken = (0.9).toFixed() !== '1',
	math = Math;
	return taurus.Number = {
		constrain: function(number, min, max) {
			var x = parseFloat(number);
		
			// Watch out for NaN in Chrome 18
			// V8bug: http://code.google.com/p/v8/issues/detail?id=2056
		
			// Operators are faster than Math.min/max. See http://jsperf.com/number-constrain
			// ... and (x < Nan) || (x < undefined) == false
			// ... same for (x > NaN) || (x > undefined)
			// so if min or max are undefined or NaN, we never return them... sadly, this
			// is not true of null (but even Math.max(-1,null)==0 and isNaN(null)==false)
			return (x < min) ? min : ((x > max) ? max : x);
		},
		toFixed: isToFixedBroken ? function(value, precision) {
            precision = precision || 0;
            var pow = math.pow(10, precision);
            return (math.round(value * pow) / pow).toFixed(precision);
        } : function(value, precision) {
            return value.toFixed(precision);
        },
        snapInRange : function(value, increment, minValue, maxValue) {
            var tween;

            // default minValue to zero
            minValue = (minValue || 0);

            // If value is undefined, or less than minValue, use minValue
            if (value === undefined || value < minValue) {
                return minValue;
            }

            // Calculate how many snap points from the minValue the passed value is.
            if (increment && (tween = ((value - minValue) % increment))) {
                value -= tween;
                tween *= 2;
                if (tween >= increment) {
                    value += increment;
                }
            }

            // If constraining within a maximum, ensure the maximum is on a snap point
            if (maxValue !== undefined) {
                if (value > (maxValue = this.snapInRange(maxValue, increment, minValue))) {
                    value = maxValue;
                }
            }

            return value;
        },
	}
})