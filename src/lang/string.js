/**
 * @author nttdocomo
 */
 (function (root, factory) {
    if(typeof define === "function") {
        if(define.amd){
            define(['taurus'], factory);
        }
        if(define.cmd){
            define(function(require, exports, module){
                return factory(require('taurus'));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory(require('taurus'));
    }
}(this, function(taurus) {
	var formatRe = /\{(\d+)\}/g,escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g;
	var string = $.extend({}, String.prototype, {
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
	})
	taurus.augmentObject('taurus.String.prototype', string)
	string.escapeRegex = function(string) {
		return string.replace(escapeRegexRe, "\\$1");
	},
	string.htmlEncode = function(string) {
		return document.createElement('a').appendChild(document.createTextNode(string)).parentNode.innerHTML.replace(/(")/g,'&quot;');
	}
	return string
}));