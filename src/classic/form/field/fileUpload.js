/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./file','taurus','underscore','i18n','fine-uploader'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./file'),require('taurus'),require('underscore'),require('i18n'),require('fine-uploader'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./file'),require('taurus'),require('underscore'),require('i18n'),require('fine-uploader'));
	}
}(this, function(File,taurus,_,i18n) {
	return File.extend({
        addFiles:function(data, params, endpoint){
            var me = this;
            if (data) {
                _.each(data,function(idx, fileContainer){
                    if (me.isFileOrInput(fileContainer)) {
                        processFileOrInput(fileContainer);
                    }
                })
            }
        },
        isFile:function(maybeFile){
            return window.File && Object.prototype.toString.call(maybeFile) === "[object File]";
        },
        isFileOrInput:function(maybeFileOrInput){
            return me.isFile(maybeFileOrInput) || me.isInput(maybeFileOrInput);
        },
        isInput:function(maybeInput){
            return _.isElement(maybeInput)
        },
        _onInputChange:function(e){
            var me = this,input = e.target
            me.addFiles(input)
        }
	});
}));
