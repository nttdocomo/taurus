/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	var Dropdown = Base.extend({
		tpl:'<%=html%>',
		type : 'warning',
		tagName:'ul',
		className:'dropdown-menu',
		dismissable : false,
		text : '',
		hideDelay : 1000,
		initialize:function(){
			this.$el.css('top',0);
			Base.prototype.initialize.apply(this,arguments);
		},
		getTplData : function() {
			return {
				html:_.map(this.menus,function(item){
					if(item.menus){
						item.menus = (new Dropdown({
							menus:item.menus
						})).html();
						item.cls = ' class = "dropdown-submenu"'
					} else {
						item.menus = '';
						item.cls = ""
					}
					return _.template('<li<%=cls%> role="presentation"><a role="menuitem" tabindex="-1" href="<%=href%>"><%=text%><%=menus%></a></li>',$.extend({
						href:''
					},item));
				}).join('')
			};
		}
	});
	return Dropdown;
});
