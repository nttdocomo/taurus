/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./button', '../../taurus', 'underscore', 'fine-uploader'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./button'), require('../../taurus'), require('underscore'), require('fine-uploader'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./button'), require('../../taurus'), require('underscore'), require('fine-uploader'))
  }
}(this, function (Button, taurus, _, qq) {
  return Button.extend({
    tagName: 'div',
    tpl: '<%if(split){%><button><%}%><%if(iconBeforeText){%><%=icon%><%}%><span><%=text%></span><%if(menu){%> <span class="caret"></span><%}%><%if(split)%><%%>',
    afterRender: function () {
      var me = this
      me._super.apply(me, arguments)
      me.initFineUploader()
    },
    applyChildEls : function(childEls) {
      var childEls = $.extend(this.childEls, childEls);
      childEls['textEl'] = 'span';
      this._super.call(this,childEls);
    },
    setText: function(text){
      this.text = text
      this.textEl.text(text)
    },
    initFineUploader: function () {
      var me = this
      var button = document.createElement('div')
      me.uploader = new qq.FineUploaderBasic(_.extend({
        button: me.el,
        multiple: false,
        request: {
          endpoint: '/uploads'
        },
        callbacks: {
          onComplete: function (id, name, responseJSON, xhr) {
            me.trigger('complete', id, name, responseJSON, xhr)
          },
          onProgress: function (id, name, uploadedBytes, totalBytes) {
            console.log(arguments)
            me.onProgress(id, name, uploadedBytes, totalBytes)
          }
        }
      }, this.fineUploaderOptions))
    } /*,
        _onInputChange:function(e){
            var me = this,input = $(e.target)
            me.uploader.addFiles(e.target)
        }*/
  })
}))
