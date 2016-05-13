/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./trigger','taurus','underscore','../../../i18n'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./trigger'),require('taurus'),require('underscore'),require('../../../i18n'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./trigger'),require('taurus'),require('underscore'),require('../../../i18n'));
	}
}(this, function(Trigger,taurus,_,i18n) {
	return Trigger.extend({
		iconTpl:'<i id="<%=id%>-btnIconEl" class="<%=_hasIconCls%>" style="<%if(iconUrl){%>background-image:url(<%=iconUrl%>);<%}%>"></i>',
		buttonText : i18n.__('Browse...'),
        inputType:'file',
		_hasIconCls: taurus.baseCSSPrefix + 'btn-icon',
		childEls : {
			'fileInputEl' : '#buttonEl > input',
			'inputEl' : '.form-control',
			'buttonEl' : '#buttonEl',
			'spinnerEl' : '.spinner',
			'cancelEl' : '.qq-upload-cancel',
			'btnIconEl':'[id$="btnIconEl"]'
		},
		events : {
			'change #fileInputEl' : 'onFileChange',
    		'change #buttonEl > input' : '_onInputChange',
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
            var me = this;
			return _.template((me.buttonOnly ? '' : '<span id="<%=id%>" class="input-group-btn <%=cls%>">') + '<div id="buttonEl" class="btn btn-primary' + (me.buttonOnly ? ' <%=cls%>' : '') + '" <%if(disabled){%> disabled="disabled"<%}%>><%=icon%><%=text%>'+(me.buttonOnly ? me.fieldSubTpl:'')+'</div>' + (me.buttonOnly ? '' : '</span>'))({
				id : 'buttonEl',
				cls : taurus.baseCSSPrefix + 'form-file-btn',
				text : me.buttonText,
				type : me.inputType,
				fieldCls : me.fieldCls,
				readOnly : me.readOnly || !me.editable,
				icon:me.renderIcon({
					id:me.id,
					iconUrl:me.iconUrl,
					_hasIconCls:me._hasIconCls
				}),
				disabled : me.disabled
			});
		},
        _onInputChange:function(e){
            var me = this,file = e.target.files[0],
            fr = new FileReader();
            fr.onload = function(){
                console.log(arguments)
                if(file.type == 'image/jpeg'){
                    me.$el.append('<img src="'+fr.result+'">');
                }
                //me.$el.append('<img src="'+fr.result+'">');
            };
            //fr.readAsText(file);
            if(file.type == 'image/jpeg'){
                fr.readAsDataURL(file);
            } else {
                fr.readAsText(file);
            }
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
            var me = this;
			me._super.apply(me,arguments);
			me.initFineUploader();
			/*if(me.buttonOnly){
				me.inputEl.hide();
			}*/
		},
        didIconStateChange: function(old, current) {
            var currentEmpty = _.isEmpty(current);
            return _.isEmpty(old) ? !currentEmpty : currentEmpty;
        },
		initFineUploader:function(){
			var me = this;
			/*me.uploader = new qq.FineUploaderBasic(_.extend({
				button:me.buttonEl.get(0),
                autoUpload:false,
                multiple:false,
                request:{
                    endpoint:'/uploads'
                },
				callbacks:{
					onComplete:function(id,name,responseJSON,xhr){
                        console.log(me.buttonEl.find('input').get(0))
						me.trigger('complete',id,name,responseJSON,xhr)
					},
                    onProgress:function(id,name,uploadedBytes,totalBytes){
                        console.log(arguments)
                    }
				}
			},this.fineUploaderOptions));*/
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
