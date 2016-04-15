/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./trigger','../../taurus','underscore','../../fine-uploader'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./trigger'),require('../../taurus'),require('underscore'),require('../../fine-uploader'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./trigger'),require('../../taurus'),require('underscore'),require('../../fine-uploader'));
	}
}(this, function(Trigger,taurus,_) {
	return Trigger.extend({
		iconTpl:'<i id="<%=id%>-btnIconEl" class="<%=_hasIconCls%>" style="<%if(iconUrl){%>background-image:url(<%=iconUrl%>);<%}%>"></i>',
		buttonText : 'Browse...',
		_hasIconCls: taurus.baseCSSPrefix + 'btn-icon',
		childEls : {
			'fileInputEl' : '#fileInputEl',
			'inputEl' : '.form-control',
			'buttonEl' : '#buttonEl',
			'spinnerEl' : '.spinner',
			'cancelEl' : '.qq-upload-cancel',
			'btnIconEl':'[id$="btnIconEl"]'
		},
		events : {
			'change #fileInputEl' : 'onFileChange',
			'click .qq-upload-cancel' : 'cancel'
		},
		initialize : function(options) {
			Trigger.prototype.initialize.apply(this, [options]);
		},
		didIconStateChange: function(old, current) {
	        var currentEmpty = _.isEmpty(current);
	        return _.isEmpty(old) ? !currentEmpty : currentEmpty;
	    },
		/**
		 * Gets the markup to be inserted into the subTplMarkup.
		 */
		getTriggerMarkup : function() {
			return _.template((this.buttonOnly ? '' : '<span id="<%=id%>" class="input-group-btn <%=cls%>">') + '<div id="buttonEl" class="btn btn-primary' + (this.buttonOnly ? ' <%=cls%>' : '') + '" <%if(disabled){%> disabled="disabled"<%}%>><%=icon%><%=text%></div>' + (this.buttonOnly ? '' : '</span>'))({
				id : 'buttonEl',
				cls : taurus.baseCSSPrefix + 'form-file-btn',
				text : this.buttonText,
				icon:this.renderIcon({
					id:this.id,
					iconUrl:this.iconUrl,
					_hasIconCls:this._hasIconCls
				}),
				disabled : this.disabled
			});
		},

	    renderIcon: function(values) {
	        return _.template(this.iconTpl)(values);
	    },

		/**
		 * Sets the background image (inline style) of the button. This method also changes the value of the {@link #icon}
		 * config internally.
		 * @param {String} icon The path to an image to display in the button
		 * @return {Ext.button.Button} this
		 */
		setIcon: function(icon) {
		    icon = icon || '';
		    var me = this,
		        btnIconEl = me.btnIconEl,
		        oldIcon = me.icon || '';

		    me.icon = icon;
		    if (icon !== oldIcon) {
		        if (btnIconEl) {
		            btnIconEl.css('background-image', icon ? 'url(' + icon + ')': '');
		            me._syncHasIconCls();
		            if (me.didIconStateChange(oldIcon, icon)) {
		                me.updateLayout();
		            }
		        }
		        me.trigger('iconchange', me, oldIcon, icon);
		    }
		    return me;
		},
		afterRender:function(){
			Trigger.prototype.afterRender.apply(this,arguments);
			this.initFineUploader();
			if(this.buttonOnly){
				this.inputEl.hide();
			}
		},
        didIconStateChange: function(old, current) {
            var currentEmpty = _.isEmpty(current);
            return _.isEmpty(old) ? !currentEmpty : currentEmpty;
        },
		initFineUploader:function(){
			var me = this;
			me.uploader = new qq.FineUploaderBasic(_.extend({
				button:me.buttonEl.get(0),
				callbacks:{
					onComplete:function(id,name,responseJSON,xhr){
						me.trigger('complete',id,name,responseJSON,xhr)
					}
				}
			},this.fineUploaderOptions));
		},
		_syncHasIconCls: function() {
            var me = this,
                btnEl = me.btnEl,
                hasIconCls = me._hasIconCls;

            if (btnEl) {
                btnEl[me._hasIcon() ? 'addCls' : 'removeCls']([
                    hasIconCls,
                    hasIconCls + '-' + me.iconAlign
                ]);
            }
        }
	});
}));