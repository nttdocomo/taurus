/**
 * @author nttdocomo
 */
(function (root, factory) {
    if(typeof define === "function") {
        if(define.amd){
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(['../lang/string'], factory);
        }
        if(define.cmd){
            define(function(require, exports, module){
                return (root.Class = factory(require('../lang/string')));
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory(require('../lang/string')));
    } else {
        root.Class = factory();
    }
}(this, function(string){
  return {
	/**
     * Rounds the passed number to the required decimal precision.
     * @param {Number/String} value The numeric value to round.
     * @param {Number} precision The number of decimal places to which to round the first parameter's value.
     * @return {Number} The rounded value.
     */
    round : function(value, precision) {
      var result = Number(value);
      if (typeof precision == 'number') {
        precision = Math.pow(10, precision);
        result = Math.round(value * precision) / precision;
      }
      return result;
    },
    htmlEncode: string.htmlEncode
  }
}))
