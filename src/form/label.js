/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../view/base','../view/activeErrors'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../view/base'),require('../view/activeErrors'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../view/base'),require('../view/activeErrors'));
	}
}(this, function(Base,ActiveErrors) {
	return Base.extend({
		tpl:'<%if(fieldLabel){%><label class="control-label"<%if(inputId){%> for="<%=inputId%>"<%}%><%if(labelStyle){%> style="<%=labelStyle%>"<%}%>><%if(typeof beforeLabelTextTpl !== "undefined"){%><%=beforeLabelTextTpl%><%}%><%=fieldLabel%><%if(labelSeparator){%><%=labelSeparator%><%}%></label><%}%><div style="<%=controlsStyle%>" id="<%=id%>-bodyEl"><%=field%></div><%if(fieldLabel){%><%}%><%if(renderError){%><div class="help-block" id="<%=id%>-errorEl" style="<%=controlsStyle%>"></div><%}%>',
		className : "form-group",
		labelWidth : 100,
		labelAlign : 'left',
		labelPad : 5,
		msgTarget : 'qtip',
		showLabel:true,
		labelSeparator : ':',
		childEls:{
			'inputEl' : '.form-control'
		},
		getLabelStyle : function() {
			var labelPad = this.labelPad, labelStyle = '';
			if (this.labelAlign === 'top') {
				labelStyle = 'margin-bottom:' + labelPad + 'px;';
			} else {
				if(this.fieldLabel){
					this.$el.addClass('form-group-horizontal');
				}
				if (this.labelWidth) {
					labelStyle = 'width:' + this.labelWidth + 'px;';
				}
				labelStyle += 'margin-right:' + labelPad + 'px;float:left;text-align:right;';
			}
			return labelStyle;
		},
		getControlsStyle:function(){
			var controlsStyle='';
			if (this.labelAlign !== 'top' && this.fieldLabel) {
				controlsStyle = 'margin-left:'+(this.labelWidth + 5)+'px;';
			}
			return controlsStyle;
		},
		getTplData : function(data) {
			var me = this,
			sideError = (me.msgTarget === 'side'),
            underError = (me.msgTarget === 'under');
			data = $.extend({
				field:'',
				inputId : me.cid,
				fieldLabel : me.fieldLabel,
				labelStyle : me.getLabelStyle(),
				controlsStyle : me.getControlsStyle(),
				renderError: sideError || underError,
				labelSeparator: me.labelSeparator,
				beforeLabelTextTpl:me.beforeLabelTextTpl
			},data);
			return Base.prototype.getTplData.call(me, data)
		},
		unsetActiveError: function() {
	        delete this.activeError;
	        delete this.activeErrors;
	        this.renderActiveError();
	    },
	    setActiveError: function(msg) {
           this.setActiveErrors(msg);
        },
		setActiveErrors: function(errors) {
	        errors = $.makeArray(errors);
	        this.activeError = errors[0];
	        this.activeErrors = errors;
	        this.activeError = (new ActiveErrors({})).renderHtml(errors.length ? [errors[0]]:[]);
	        this.renderActiveError();
	    },

	    /**
	     * Tells whether the field currently has an active error message. This does not trigger validation on its own, it
	     * merely looks for any message that the component may already hold.
	     * @return {Boolean}
	     */
	    hasActiveError: function() {
	        return !!this.getActiveError();
	    },
		renderActiveError:function(){
			var activeError = this.getActiveError(),
			sideError = this.msgTarget === 'side',
            underError = this.msgTarget === 'under',
            renderError = sideError || underError;
			/*if(this.$el.hasClass('has-error')){
				this.bodyEl.find('.help-block').remove();
			}*/
			if(activeError !== this.lastActiveError){
	            this.trigger('errorchange', activeError);
	            this.lastActiveError = activeError;
			}
			if(activeError && renderError){
				this.$el.addClass('has-error');
			} else {
				this.$el.removeClass('has-error');
			}
			this.errorEl.html(activeError);
		},
		hasActiveError: function() {
	        return !!this.getActiveError();
	    },

	    /**
	     * Gets an Array of any active error messages currently applied to the field. This does not trigger validation on
	     * its own, it merely returns any messages that the component may already hold.
	     * @return {String[]} The active error messages on the component; if there are no errors, an empty Array is
	     * returned.
	     */
	    getActiveErrors: function() {
	        return this.activeErrors || [];
	    },
		getActiveError : function() {
			return this.activeError || '';
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend(childEls || {}, {
				'bodyEl' : '>[id$="bodyEl"]',
				'errorEl' : '>[id$="errorEl"]'
			});
			Base.prototype.applyChildEls.call(this, childEls);
		},

	    /**
	     * Returns the label for the field. Defaults to simply returning the {@link #fieldLabel} config. Can be overridden
	     * to provide a custom generated label.
	     * @template
	     * @return {String} The configured field label, or empty string if not defined
	     */
	    getFieldLabel: function() {
	        return this.trimLabelSeparator();
	    },

	    /**
	     * Returns the trimmed label by slicing off the label separator character. Can be overridden.
	     * @return {String} The trimmed field label, or empty string if not defined
	     */
	    trimLabelSeparator: function() {
	        var me = this,
	            separator = me.labelSeparator,
	            label = me.fieldLabel || '',
	            lastChar = label.substr(label.length - 1);

	        // if the last char is the same as the label separator then slice it off otherwise just return label value
	        return lastChar === separator ? label.slice(0, -1) : label;
	    }
	});
}));
