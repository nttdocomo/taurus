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
        initFineUploader:function(){
            var me = this,
            button = document.createElement('div');
            me.uploader = new qq.FineUploaderBasic(_.extend({
                button:button,
                multiple:false,
                request:{
                    endpoint:'/uploads'
                },
                callbacks:{
                    onComplete:function(id,name,responseJSON,xhr){
                        me.trigger('complete',id,name,responseJSON,xhr)
                    },
                    onProgress:function(id,name,uploadedBytes,totalBytes){
                        console.log(arguments)
                        me.onProgress(id,name,uploadedBytes,totalBytes)
                    }
                }
            },this.fineUploaderOptions));
        },
        _onInputChange:function(e){
            var me = this,input = $(e.target)
            me.uploader.addFiles(e.target)
        }
	});
}));
