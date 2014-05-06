/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
define(function(require) {
	require("../label");
	return taurus.view("taurus.form.field.Base", taurus.form.Label.extend({
		inputType : 'text',
		readOnly:false,
		editable:true,
		/**
	     * @cfg {Boolean} submitValue
	     * Setting this to false will prevent the field from being {@link Ext.form.Basic#submit submitted} even when it is
	     * not disabled.
	     */
	    submitValue: true,
		fieldCls : taurus.baseCSSPrefix + 'form-field',
		invalidText : 'The value in this field is invalid',
		checkChangeBuffer : 50,
		fieldSubTpl:'<input id="<%=id%>" type="<%=type%>" class="form-control <%=fieldCls%>"<%if(typeof(placeholder) !== "undefined"){%> placeholder="<%=placeholder%>"<%}%><%if(typeof(value) !== "undefined"){%> value="<%=value%>"<%}%><%if(typeof(checked) !== "undefined"){%> checked="<%=checked%>"<%}%> />',
		checkChangeEvents : !Modernizr.hasEvent('dragdrop',document.createElement('input')) && (!document.documentMode || document.documentMode < 9) ? ['change', 'propertychange'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop'],
		/**
		 * @private
		 */
		suspendCheckChange : 0,
		validateOnChange : true,
		disable:function(){
			this.inputEl.prop('disabled',true);
			this.inputEl.addClass('disabled');
		},
		enable:function(){
			this.inputEl.prop('disabled',false);
			this.inputEl.removeClass('disabled');
		},
		getName : function() {
			return this.name;
		},
		render : function() {
			this.initField();
			var me = taurus.form.Label.prototype.render.apply(this, arguments);
			return me;
		},
		initField:function(){
			this.initValue();
		},
		initValue : function() {
			this.originalValue = this.lastValue = this.value;
			if(!_.isUndefined(this.value)) this.setValue(this.value);
		},
		rawToValue : function(rawValue) {
			return rawValue;
		},
		processRawValue : function(value) {
			return value;
		},
		// private override to use getSubmitValue() as a convenience
	    getSubmitData: function() {
	        var me = this,
	            data = null,
	            val;
	        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
	            val = me.getSubmitValue();
	            if (val !== null) {
	                data = {};
	                data[me.getName()] = val;
	            }
	        }
	        return data;
	    },
		getSubmitValue:function(){
			return this.getValue();
		},
		getValue : function() {
			var me = this, val = me.rawToValue(me.processRawValue(me.getRawValue()));
			me.value = val;
			return val;
		},
		getRawValue : function() {
			var v = (this.inputEl ? this.inputEl.val() : taurus.value(this.rawValue, ''));
			this.rawValue = v;
			return v;
		},
		delegateEvents : function(events) {
			var events = events || {}, me = this;
			_.each(this.checkChangeEvents, function(item) {
				events[item + ' #'+me.inputId] = taurus.util.throttle(me.checkChange, me.checkChangeBuffer, me);
			});
			events = $.extend({}, this.events, events);
			taurus.form.Label.prototype.delegateEvents.apply(this, [events]);
		},
		isFileUpload: function() {
	        return this.inputType === 'file';
	    },
		setValue : function(value) {
			this.setRawValue(this.valueToRaw(value));
			this.value = value;
			this.checkChange();
			return this;
		},
		setRawValue : function(value) {
			this.rawValue = value;
			this.inputEl && this.inputEl.val(value);
		},
		checkChange : function() {
			var newVal = this.getValue(), oldVal = this.lastValue;
			if (!_.isEqual(newVal, oldVal)) {
				this.lastValue = newVal;
				this.trigger('change', newVal, oldVal);
				this.onChange(newVal, oldVal);
			}
		},
		valueToRaw : function(value) {
			return '' + value ? value : "";
		},
		html : function() {
			var me = this, data = {
				inputId : this.cid,
				fieldLabel : this.fieldLabel,
				field : this.getSubTplMarkup()
			};
			taurus.form.Label.prototype.html.apply(this, [data]);
		},

	    /**
	     * Returns the input id for this field. If none was specified via the {@link #inputId} config, then an id will be
	     * automatically generated.
	     */
	    getInputId: function() {
	        return this.inputId || (this.inputId = this.cid + '-inputEl');
	    },
		/**
	     * Gets the markup to be inserted into the outer template's bodyEl. For fields this is the actual input element.
	     */
	    getSubTplMarkup: function() {
	        return _.template(this.fieldSubTpl,this.getSubTplData());
	    },
	    /**
	     * Creates and returns the data object to be used when rendering the {@link #fieldSubTpl}.
	     * @return {Object} The template data
	     * @template
	     */
	    getSubTplData: function() {
	        var me = this,
	            type = me.inputType,
	            inputId = me.getInputId(),
	            data;
	        
	        data = $.extend({
	            id         : inputId,
	            cmpId      : me.cid,
	            name       : me.name || inputId,
	            disabled   : me.disabled,
	            readOnly   : me.readOnly,
	            value      : me.getRawValue(),
	            type       : type,
	            fieldCls   : me.fieldCls,
	            fieldStyle : me.getInputStyle(),
	            tabIdx     : me.tabIndex,
	            typeCls    : 'form-' + (type === 'password' ? 'text' : type)
	        }, me.subTplData);
	
	        //me.getInsertionRenderData(data, me.subTplInsertions);
	
	        return data;
	    },
		getFieldHtml : function() {
			var div = document.createElement("div");
			div.appendChild((new Backbone.View({
				id : 'inputEl',
				className:(this.readOnly || !this.editable) ? 'trigger-noedit form-control':'form-control',
				attributes : {
					style:this.getInputStyle(),
					type : this.inputType,
					value : this.value
				},
				tagName : this.editable ? 'input':'div'
			})).render().el);
			return div.innerHTML;
		},
		getInputStyle:function(){
			var style = '';
			if(this.labelAlign){
				style += 'margin-bottom:0px;';
			}
			return style
		},
		getControlsStyle:function(){
			var controlsStyle = taurus.form.Label.prototype.getControlsStyle.apply(this,arguments);
			if(this.width){
				controlsStyle += 'width:'+this.width+'px;';
			}
			delete this.width;
			return controlsStyle;
		},
		isValid : function() {
			return this.validateValue(this.processRawValue(this.getRawValue()));
		},
		validateValue:function(value){
	        var me = this,
	            errors = me.getErrors(value),
	            isValid = _.isEmpty(errors);
	        if (!me.preventMark) {
	            if (isValid) {
	                me.clearInvalid();
	            } else {
	                me.markInvalid(errors);
	            }
	        }
	
	        return isValid;
		},
		clearInvalid : function() {
	        // Clear the message and fire the 'valid' event
	        this.unsetActiveError();
	        if (this.hasActiveError()) {
	        	this.renderActiveError();
	        }
	    },
		markInvalid:function(errors){
			var oldMsg = this.getActiveError();
			this.setActiveErrors($.makeArray(errors));
			if (oldMsg !== this.getActiveError()) {
				this.renderActiveError();
	        }
		},
		onChange : function(newVal, oldVal) {
			if (this.validateOnChange) {
				this.validate();
			}
			//this.checkDirty();
		},
		getErrors : function(value) {
			return [];
		},
		afterRender:function(){
			taurus.form.Label.prototype.afterRender.apply(this,arguments);
		},
		validate : function() {
			var me = this, isValid = me.isValid();
			if (isValid !== me.wasValid) {
				me.wasValid = isValid;
				me.trigger('validitychange', isValid);
			}
			return isValid;
		}
	}));
});
