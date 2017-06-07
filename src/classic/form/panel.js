/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../panel/panel', '../button/button','./base','underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../panel/panel'),require('../button/button'),require('./base'),require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../panel/panel'),require('../button/button'),require('./base'),require('underscore'));
	}
}(this, function(Panel,Button,BaseForm,_){
	return Panel.extend({
		disabled:false,
		childEls:{
			'body':'.panel-body'
		},
		/*tpl:'<div class="panel-heading"><%=tool%><h4 class="panel-title"><%=title%></h4></div><div class="panel-body"><%=content%></div><div class="panel-footer"></div>',*/
		initialize:function(){
			Panel.prototype.initialize.apply(this,arguments);
		},
		initComponent:function(){
			var items = this.items;
			delete this.items;
			Panel.prototype.initComponent.apply(this,arguments);
			this.form = this.createForm(items);
			this.renderButttons();
			if(this.inline){
				this.form.$el.addClass('form-inline');
			}
		},
		createForm:function(items){
			delete this.initialConfig.width;
			return new BaseForm({
				owner:this,
				renderTo:this.body,
				items:items,
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
		afterRender : function() {
			this._super.apply(this, arguments);
			this.footer = $('<div class="panel-footer"></div>').appendTo(this.$el)
		},
		renderButttons:function(){
      var me = this
      var footer = me.footer
      me.buttons = _.map(me.buttons, function(button){
      	if(typeof(button.handler) === 'string'){
      		button.handler = me[button.handler]
      	}
      	if(button.handler){
      		button.handler = _.bind(button.handler, me)
      	}
      	
        var btn = new Button(button)
        btn.render(footer)
        return btn
      })
			/*return _.template('<%_.each(buttons,function(button){%><<%if(button.href){%>a href="<%=button.href%>"<%}else{%>button<%}%> class="btn<%if(button){%> <%=button.className%><%}%>"<%if(button.disabled){%> disabled="disabled"<%}%>><%=button.text%></<%if(button.href){%>a<%}else{%>button<%}%>><%})%>')({
				buttons:this.buttons
			});*/
		},

	    /**
	     * This is a proxy for the underlying BasicForm's {@link Ext.form.Basic#submit} call.
	     * @param {Object} options The options to pass to the action (see {@link Ext.form.Basic#submit} and
	     * {@link Ext.form.Basic#doAction} for details)
	     */
	    submit: function(options) {
	        this.form.submit(options);
	    }
	});
}));