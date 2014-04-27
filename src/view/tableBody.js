/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./scrollable');
	return taurus.view('taurus.view.TableBody',Base.extend({
		hasScrollbar:true,
		className:'grid-body',
		tpl:'<table class="table"><tbody><%=thead%><%=tbody%></tbody></table>',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			this.collection.on('sync',function(){
				this.html();
			},this);
		},
		getTplData:function(){
			var columns = this.columns;
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				thead:'<tr>'+_.map(this.columns,function(column){
					var w = column.width ? 'width:'+column.width+'px;' : '';
					return '<td role="gridcell" style="height:0px;'+w+'"></td>';
				}).join('') + '</tr>',
				tbody:this.collection.map(function(model){
					var item = model.toJSON();
					return '<tr>'+_.map(columns,function(column,i){
						var value = item[column.dataIndex];
						if(column.renderer){
							value = column.renderer(item[column.dataIndex],item);
						}
						return _.template('<td><div class="grid-cell-inner"><%=value%></div></td>',{
							value:value
						});
					}).join('')+'</tr>';
				}).join('')
			});
		}
	}));
});
