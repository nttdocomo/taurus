/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require("../view/base");
	var ActiveErrors = require("../view/activeErrors");
	taurus.view("taurus.form.Label", Base.extend({
		tpl:'<%if(fieldLabel){%><label class="control-label" for="<%=inputId%>"<%if(labelStyle){%> style="<%=labelStyle%>"<%}%>><%=fieldLabel%></label><%}%><div style="<%=controlsStyle%>"><%=field%></div>',
		className : "form-group",
		labelWidth : 100,
		labelAlign : 'left',
		labelPad : 5,
		showLabel:true,
		childEls: {
			'inputEl' : '.form-control'
		},
		getLabelStyle : function() {
			var labelPad = this.labelPad, labelStyle = '';
			if (this.labelAlign === 'top') {
				labelStyle = 'margin-bottom:' + labelPad + 'px;';
			} else {
				this.$el.addClass('form-group-horizontal');
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
				controlsStyle = 'padding-left:15px;margin-left:'+(this.labelWidth + 5)+'px;';
			}
			return controlsStyle;
		},
		html : function(data) {
			$.extend(data, {
				labelStyle : this.getLabelStyle(),
				controlsStyle : this.getControlsStyle()
			});
			Base.prototype.html.call(this, data)
		},
		unsetActiveError: function() {
	        delete this.activeError;
	        delete this.activeErrors;
	        this.renderActiveError();
	    },
		setActiveErrors: function(errors) {
	        errors = $.makeArray(errors);
	        this.activeError = errors[0];
	        this.activeErrors = errors;
	        this.activeError = (new ActiveErrors).html(errors);
	        this.renderActiveError();
	    },
		renderActiveError:function(){
			var activeError = this.getActiveError();
			if(this.$el.hasClass('has-error')){
				this.bodyEl.find('.help-block').remove();
			}
			if(activeError !== this.lastActiveError){
	            this.trigger('errorchange', activeError);
	            this.lastActiveError = activeError;
			}
			if(activeError){
				this.bodyEl.append(activeError);
				this.$el.addClass('has-error');
			} else {
				this.$el.removeClass('has-error');
			}
		},
		hasActiveError: function() {
	        return !!this.getActiveError();
	    },
		getActiveError : function() {
			return this.activeError || '';
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend(childEls || {}, {
				'bodyEl' : '> div'
			});
			Base.prototype.applyChildEls.call(this, childEls);
		}
	}));
});
