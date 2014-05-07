/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return taurus.view('taurus.views.TableCell',Base.extend({
		tpl:'<div class="grid-cell-inner"><%=text%></div>',
		tagName:'td',
		html:function(data){
			var me = this,text,column = me.column;
			if(!column.dataIndex && !column.renderer){
				text = '';
			}
			if(column.renderer && _.isFunction(column.renderer)){
				if(!column.dataIndex){
					text = column.renderer.call(me,data,data)
				} else{
					text = column.renderer.call(me,data[column.dataIndex],data)
				}
			} else {
				text = data[column.dataIndex]
			}
			return Base.prototype.html.apply(this,[{'text':text}]);
		},
		getItemContainer:function(){
			return this.$el.find('.grid-cell-inner')
		},
		afterRender : function() {
			this.items = this.column.items
			Base.prototype.afterRender.apply(this,arguments)
		}
	}))
})
