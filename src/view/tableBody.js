/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	return taurus.view('taurus.view.TableBody',Base.extend({
		hasScrollbar:true,
		tagName:'tbody',
		tpl:'<%=tbody%>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.collection.on('sync',function(){
				this.renderHtml();
			},this);
			this.collection.on('reset',function(){
				this.renderHtml();
			},this);
			this.collection.on('sort',function(){
				this.renderHtml();
			},this);
			this.collection.on('remove',function(){
				this.renderHtml();
			},this);
			if(this.sortable){
				taurus.$doc.on('mousedown',_.bind(this.onMouseDown,this));
			}
		},
		getTplData:function(){
			var columns = this.columns,me = this;
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				tbody:this.collection.map(function(model){
					var item = model.toJSON();
					return _.template((me.rowTemplate || '<tr>')+_.map(columns,function(column,i){
						var value = item[column.dataIndex];
						if(column.renderer){
							value = column.renderer(item[column.dataIndex],item);
						}
						return _.template('<td role="gridcell"><%=value%></td>',{
							value:value
						});
					}).join('')+'</tr>',item);
				}).join('')
			});
		}
	}));
});
