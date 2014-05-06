/**
 * @author nttdocomo
 */
define(function(require){
	var Panel = require('../panel/panel');
	require('./base');
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
		prepareItems:function(){},
		createForm:function(){
			delete this.initialConfig.width;
			return new taurus.form.Base($.extend(this.initialConfig,{
				renderTo:this.$el.find('.panel-body'),
				operation:'prepend'
			}));
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
				events['click .form-actions > button:eq('+i+')'] = button.handler;
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
			return _.template('<%_.each(buttons,function(button){%><button class="btn<%if(button){%> <%=button.className%><%}%>"<%if(disabled){%> disabled="disabled"<%}%>><%=button.text%></button><%})%>', $.extend({
				buttons:this.buttons
			}, {
				disabled : this.disabled
			}));
		}
	}));
});
