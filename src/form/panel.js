/**
 * @author nttdocomo
 */
define(function(require){
	var Panel = require('../panel/panel'), BaseForm = require('./base');
	return taurus.view("taurus.form.Panel", Panel.extend({
		disabled:false,
		/*tpl:'<div class="panel-heading"><%=tool%><h4 class="panel-title"><%=title%></h4></div><div class="panel-body"><%=content%></div><div class="panel-footer"></div>',*/
		initialize:function(){
			Panel.prototype.initialize.apply(this,arguments);
			this.form = this.createForm();
			this.renderButttons();
			if(this.inline){
				this.form.$el.addClass('form-inline');
			}
		},
		createForm:function(){
			delete this.initialConfig.width;
			return new BaseForm({
				owner:this,
				//renderTo:this.$el.find('.panel-body'),
				operation:'prepend'
			});
		},

	    /**
	     * Provides access to the {@link Ext.form.Basic Form} which this Panel contains.
	     * @return {Ext.form.Basic} The {@link Ext.form.Basic Form} which this Panel contains.
	     */
	    getForm: function() {
	        return this.form;
	    },
		confirm:function(){
			if(!this.disabled){
				this.form.submit();
				Panel.prototype.confirm.apply(this,arguments);
			};
			return false;
		},
		delegateEvents:function(events){
			var events = events || {};
			_.each(this.buttons,function(button,i){
				events['click .panel-footer > button:eq('+i+')'] = button.handler;
			});
			Panel.prototype.delegateEvents.call(this, events);
		},
		html:function(){
			this.tpl += '<div class="panel-footer"><%=buttons%></div>';
			return Panel.prototype.html.apply(this,arguments);
		},
		getTplData:function(){
			return $.extend(Panel.prototype.getTplData.apply(this,arguments),{
				buttons:this.renderButttons()
			});
		},
		renderButttons:function(){
			return _.template('<%_.each(buttons,function(button){%><button class="btn<%if(button){%> <%=button.className%><%}%>"<%if(disabled){%> disabled="disabled"<%}%>><%=button.text%></button>\n<%})%>', $.extend({
				buttons:this.buttons
			}, {
				disabled : this.disabled
			}));
		},

	    /**
	     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#submit} call.
	     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#submit} and
	     * {@link Ext.form.Basic#doAction} for details)
	     */
	    submit: function(options) {
	        this.form.submit(options);
	    }
	}));
});
