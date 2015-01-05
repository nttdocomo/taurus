/**
 * @author nttdocomo
 */
define(function(require){
	var Panel = require('./panel');
	var Table = require('../view/table');
	var Header = require('../grid/header/container');
	var Pagination = require('../grid/pagination');
	var Spinner = require('../spinner/wave');
	return Panel.extend({
		pager:false,
		className:'panel panel-default grid',
		applyChildEls:function(childEls){
			childEls = $.extend({
				'headEl' : '.panel-heading',
				'bodyEl' : '.panel-body',
				'frameBody' : '.panel-body'
			}, childEls);
			Panel.prototype.applyChildEls.call(this,childEls);
		},
		initComponent:function(options){
			var me = this,
			viewConfig,
            headerCtCfg = me.columns || [],
            view,
            i, len,
            columns, viewScroller;

            if (_.isArray(headerCtCfg)) {
                headerCtCfg = {
                    items: headerCtCfg
                };
            }

            _.extend(headerCtCfg, {
                grid: me/*,
                forceFit: me.forceFit,
                sortable: me.sortableColumns,
                enableColumnMove: me.enableColumnMove,
                enableColumnResize: me.enableColumnResize,
                columnLines: me.columnLines,
                sealed: me.sealedColumns*/
            });

            if (me.hideHeaders) {
                headerCtCfg.height = 0;
                // don't set the hidden property, we still need these to layout
                headerCtCfg.hiddenHeaders = true;
            }
            me.headerCt = new Header(headerCtCfg);
            me.items = [me.headerCt];

			/*this.table = new Table($.extend(options,{
				collection:this.collection,
				columns:this.columns,
				sortable:this.sortable,
				renderTo:this.$el.find('.panel-body')
			}));*/
			viewConfig = _.extend({
                // TableView injects the view reference into this grid so that we have a reference as early as possible
                // and Features need a reference to the grid.
                // For these reasons, we configure a reference to this grid into the View
                grid: me,
                renderTo:me.bodyEl,
                collection:me.collection,
                ownerGrid: me.ownerGrid,
                headerCt: me.headerCt,
                panel: me,
                emptyText: me.emptyText || ''
            }, me.viewConfig);

            me.items.push(_.extend({
            	cls:Table
            },viewConfig));
			Panel.prototype.initComponent.apply(this,[options]);


			if(this.collection instanceof Backbone.PageableCollection){
				this.$el.addClass('has-pager');
				this.paging = new Pagination({
					uiClass:'panel-footer',
					collection:this.collection,
					renderTo:this.$el
				});
				this.$el.css({
					'padding-bottom':this.paging.$el.outerHeight()
				})
			}

			/*if(this.pager){
				new Pagination({
					uiClass:'panel-footer',
					collection:this.collection,
					renderTo:this.$el
				});
			}
			var top = 0,not_last_child = this.$el.find('.panel-body > div:not(:last-child)');
			not_last_child.each(function(key,item){
				top += $(item).outerHeight();
			});
			this.$el.find('.panel-body').css('padding-top',top);
			this.$el.find('.panel-body > div:first-child').css('margin-top',-1*top);*/
			/*if(this.pager){
				this.collection.pager();
			}else{
				this.collection.fetch();
			}
			this.collection.on('sync',function(){
				this.html();
			},this);*/
			var headElHeight = me.headEl.outerHeight();
			me.$el.css('padding-top',headElHeight+'px');
			me.headEl.css('margin-top','-' + headElHeight+'px')
			if (me.hideHeaders) {
                me.bodyEl.css('padding-top',0)
            }
		},
		getTplData:function(){
			return $.extend(Panel.prototype.getTplData.apply(this,arguments),{
				content:''
			});
		},
		getFullWidth:function(){
			var columns = this.columns,headers = this.$el.find('.header-ct th'),len = columns.length,i=fullWidth=0;
			for (; i < len; i++) {
	            var column = columns[i],header = headers.eq(i);
	            // use headers getDesiredWidth if its there
	            if (column.flex) {
	                fullWidth += header.width() || 0;
	            // if injected a diff cmp use getWidth
	            } else {
	                fullWidth += column.width;
	            }
	        }
	        return fullWidth;
		},

	    getVisibleColumnManager: function() {
	        return this.columns;
	    },
		html:function(){
			this.$el.find('.panel-body').empty();
			var html = Panel.prototype.html.apply(this,arguments);
			return html;
		}
	});
});