/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./backbone', 'class', './backbone-super'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./backbone'), require('class'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./backbone'), require('class'));
	}
}(this, function(Backbone, Class, inherits){
  var mix = function mix(parent){
    return new MixinBuilder(parent)
  }
  var MixinBuilder = function(){
    function MixinBuilder(parent){
      
    }
  }
}))
