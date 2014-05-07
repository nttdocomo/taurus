/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./base');
	var TableBody = require('./tableBody');
	return taurus.view('taurus.views.Table',Base.extend({
		header:true,
		tpl:'<%=header%><%=body%>',
		className:'grid-ct',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			var me = this;
			this.collection.on('sync',function(){
				me.html();
				me.setHeaderWidth()
			},this)
			$(window).on('resize',function(){
				me.setHeaderWidth()
				//me.initResizeMarkerPosition.call(me)
				me.adaptToWindowHeight()
			})
			//this.listenTo(this.collection,'change',this.renderItems)
			//this.collection.on('sync',this.renderItems,this)
			//this.collection.on('change',this.renderItems,this)
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, this.listeners);
			$(document).on('mousedown', _.bind(this.dragStart,this))
			Backbone.View.prototype.delegateEvents.call(this, events)
		},
		childEls:{
			'gridBody':'.grid-body',
			'gridTable':'.grid-table',
			'gridHeader':'.grid-header',
			'gridTableCell':'.grid-table tr:eq(0) td',
			'gridTableHeader':'.grid-table tr:eq(0) th',
			'gridTableHeaderCell':'.grid-header tr th',
			'gridResizeMarker':'.grid-resize-marker'
		},
		renderHeader:function(){
			return _.template('<div class="header-ct"><table class="grid-header"><thead><tr><%_.each(columns,function(column){%><th style="width:<% if(column.width){%><%=column.width%><%}else{%>100<%}%>px"><div class="column-header-inner"><%=column.text%></div></th><%})%></tr></thead></table></div>',{
                columns: this.columns,
                border: this.border
			})
		},
		renderBody:function(){
			var columns = this.columns;
			return _.template('<div class="grid-body"><%=tbody%></div>',{
				tbody:(new TableBody({
					collection:this.collection,
					columns:this.columns
				})).html()
				/*this.collection.map(function(item,i){
					item = item.toJSON();
					return '<tr>'+_.map(columns,function(column,i){
						var value;
						if(column.renderer){
							value = column.renderer(item[column.dataIndex],item)
						} else {
							value = item[column.dataIndex]
						}
						return _.template('<td><div class="grid-cell-inner"><%=value%></div></td>',{
							value:value
						})
					}).join('')+'</tr>';
				}).join('')*/
			})
		},
		renderDrag:function(){
			return _.template('<%_.each(columns,function(column){%><div class="grid-resize-marker"></div><%})%>',{
                columns: this.columns
			})
		},
		render:function(){
			var me = Base.prototype.render.apply(this,arguments)
			this.setHeaderWidth();
			return me;
		},
		html:function(data){
			var html = Base.prototype.html.apply(this,[{
				header:this.header ? this.renderHeader() : '',
				body:this.renderBody()/*,
				dragHandler:this.renderDrag()*/
			}]);
			return html
		},
		adaptToWindowHeight:function(){
			this.gridBody.css('max-height',$(window).height() - this.gridBody.offset().top - 20)
		}/*,
		renderItems:function(){
			var me = this,headerCtCfg = this.columns,border = this.border;
			_.each(this.items,function(item){
				item.render(me.$el)
			})
			if(!this.header){
				if (_.isArray(headerCtCfg)) {
	                headerCtCfg = {
	                    columns: headerCtCfg,
	                    border: border
	                };
	            }
	            this.header = new taurus.grid.Header(headerCtCfg);
	            this.$el.prepend(this.header.render().$el)
			}
			this.header.resetColumsWidth()
		},
		getView:function(){
			var view = new taurus.views.Table({
				collection:this.collection,
				columns:this.columns
			})
			return view
		}*/,
		applyChildEls:function(){
			Base.prototype.applyChildEls.apply(this,arguments);
			if(this.height){
				this.gridBody.css('max-height',this.height)
			}
			this.adaptToWindowHeight()
			//this.initResizeMarkerPosition();
		},
		setContainerWidth:function(){
			//this.gridTable.css('width',this.gridTable.width())
			//this.gridHeader.css('width',this.gridHeader.width())
			this.$el.css('min-width',this.gridTable.width())
		},
		setHeaderWidth:function(){
			var me = this;
			//this.gridTable.css('width','')
			this.gridTableCell.each(function(i,item){
				var width = $(item).outerWidth()
				/*if(width != parseInt($(item).css('width'))){
					$(item).css('width',width)
				}*/
				me.gridTableHeaderCell.eq(i).css('width',width)
			})
		},
		initResizeMarkerPosition:function(){
			var me = this,height = this.$el.height(),width=0;
			this.gridTableCell.each(function(i,item){
				var el = me.gridResizeMarker.eq(i);
				if(i){
					width += $(item).outerWidth();
				} else {
					width += $(item).width();
				}
				el.css({
					'left':width,
					'height':height,
					'top':0
				})
				
			})
		},
		dragStart:function(e){
			var $target = $(e.target);
			if($target.parents('#'+this.cid).length){
				if($target.is('.grid-resize-marker')){
					this.colresize = {
						X:parseInt($target.css('left')),
						pX: e.pageX,
						target:$target
					};
					$(document).on('mousemove',_.throttle(_.bind(this.dragMove,this),50)).on('mouseup',_.bind(this.dragEnd,this));
					this.noSelect(null)
				}
			}
		},
		dragMove:function(e){
			var $target = $(e.target);
			if($target.parents('#'+this.cid).length){
				this.colresize.target.css('left',this.colresize.X + e.pageX - this.colresize.pX);
			}
		},
		dragEnd:function(e){
			var $target = $(e.target);
			if($target.parents('#'+this.cid).length){
				var diff = e.pageX - this.colresize.pX,index = this.gridResizeMarker.index(this.colresize.target),
				width = this.gridTableHeader.eq(index).width();
				this.gridTableHeader.eq(index).css('width',width+diff)
				this.setHeaderWidth()
				this.initResizeMarkerPosition();
				$(document).off('mousemove').off('mouseup');
				//this.setContainerWidth();
				this.noSelect(false)
			}
		},
		noSelect : function (p) { //no select plugin by me :-)
			var prevent = (p === null) ? true : p;
			if (prevent) {
				if ($.browser.msie || $.browser.safari || $.browser.webkit) $('body').on('selectstart', function () {
					return false;
				});
				else if ($.browser.mozilla) {
					$('body').css('MozUserSelect', 'none');
					$('body').trigger('focus');
				} else if ($.browser.opera) $('body').on('mousedown', function () {
					return false;
				});
				else $('body').attr('unselectable', 'on');
			} else {
				if ($.browser.msie || $.browser.safari) $('body').off('selectstart');
				else if ($.browser.mozilla) $('body').css('MozUserSelect', 'inherit');
				else if ($.browser.opera) $('body').off('mousedown');
				else $('body').removeAttr('unselectable', 'on');
			}
		}
	}))
})
