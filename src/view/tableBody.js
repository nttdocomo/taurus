/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./scrollable');
	return taurus.view('taurus.view.TableBody',Base.extend({
		hasScrollbar:true,
		className:'grid-body',
		tpl:'<table class="table"><tbody><%=tbody%></tbody></table>',
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
		getColumnsWidth:function(){
			return this.$el.find(' > table > tbody > tr:eq(0) td').map(function(i,td){
				return $(td).width();
			});
		},
		onMouseDown:function(e){
			var target = $(e.target).parents('tr').addClass('mousedown'),doc = $(e.currentTarget);
			var onMouseMove = _.throttle(function(e){
				var previous = target.prev(),moveTo = null,offset,next;
				while (previous.length) {
					offset = previous.offset();
					if (e.pageY <= offset.top + previous.height()) {
						moveTo = previous;
					}
					previous = previous.prev();
				}
				if (moveTo != null) {
					target.insertBefore(moveTo);
					return false;
				}
				next = target.next();
				while (next.length) {
					offset = next.offset();
					if (e.pageY >= offset.top) {
						moveTo = next;
					}
					next = next.next();
				}
				if (moveTo != null) {
					target.insertAfter(moveTo);
					return false;
				}
				return false;
			},100);
			var onMouseUp = function(e){
				target.removeClass('mousedown');
				doc.off('mousemove',onMouseMove).off('mouseup',onMouseUp);
				return false;
			};
			doc.on('mousemove',onMouseMove).on('mouseup',onMouseUp);
			return false;
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
						return _.template('<td role="gridcell"><div class="grid-cell-inner"><%=value%></div></td>',{
							value:value
						});
					}).join('')+'</tr>';
				}).join('')
			});
		}
	}));
});
