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
				this.html();
			},this);
			this.collection.on('reset',function(){
				this.html();
			},this);
			this.collection.on('sort',function(){
				this.html();
			},this);
			this.collection.on('remove',function(){
				this.html();
			},this);
			if(this.sortable){
				taurus.$doc.on('mousedown',_.bind(this.onMouseDown,this));
			}
		},
		getTplData:function(){
			var columns = this.columns;
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				tbody:this.collection.map(function(model){
					var item = model.toJSON();
					return '<tr>'+_.map(columns,function(column,i){
						var value = item[column.dataIndex];
						if(column.renderer){
							value = column.renderer(item[column.dataIndex],item);
						}
						return _.template('<td role="gridcell"><%=value%></td>',{
							value:value
						});
					}).join('')+'</tr>';
				}).join('')
			});
		}
	}));
});
