define(function(require) {
	var formatRe = /\{(\d+)\}/g,escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;
	taurus.augmentObject('taurus.String.prototype', $.extend({}, String.prototype, {
		format : function(format) {
			var args = aries.Array.toArray(arguments, 1);
			return format.replace(formatRe, function(m, i) {
				return args[i];
			});
		},

		/**
		 * Escapes the passed string for use in a regular expression
		 * @param {String} string
		 * @return {String}
		 */
		escapeRegex : function(string) {
			return string.replace(escapeRegexRe, "\\$1");
		}
	}))
	taurus.String.escapeRegex = function(string) {
		return string.replace(escapeRegexRe, "\\$1");
	}
})
