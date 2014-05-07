/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	require('../view/column');
	return taurus.view('taurus.grid.Header',Base.extend({
		tpl:'<table class="table"><thead><tr><%=items%></tr></thead></table>',
		className:'header-ct',
		html:function(){
			return Base.prototype.html.call(this,{
				'items':_.map(this.columns,function(item){
					return _.template('<th<%=width%>><div class="column-header-inner"><%=text%></div></th>',{
						text:item.text,
						width:item.width ? ' style="width:'+item.width+'px"':''
					});
				}).join('')
			});
		},
		resetColumsWidth:function(){
			var header = this.$el.find('.column-header');
			_.each(this.columns,function(column,i){
				header.eq(i).css('width',column.width+'px');
			});
		}
	}));
});
