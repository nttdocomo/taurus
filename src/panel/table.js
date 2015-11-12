/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./panel','../view/table','../grid/header/container','../grid/pagination','backbone-pageable','underscore','../taurus'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./panel'),require('../view/table'),require('../grid/header/container'),require('../grid/pagination'),require('backbone-pageable'),require('underscore'),require('../taurus'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./panel'),require('../view/table'),require('../grid/header/container'),require('../grid/pagination'),require('backbone-pageable'),require('underscore'),require('../taurus'));
	}
}(this, function(Panel,Table,Header,Pagination,PageableCollection,_,taurus){
	return Panel.extend({
		pager:false,
		className:'panel panel-default grid',
		hiddenHeaderCtCls: 'grid-header-ct-hidden',
		colLinesCls: taurus.baseCSSPrefix + 'grid-with-col-lines',
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
            me.features = me.features || [];
            if (!_.isArray(me.features)) {
                me.features = [me.features];
            }

            _.extend(headerCtCfg, {
                grid: me,
                columnLines: me.columnLines/*,
                forceFit: me.forceFit,
                sortable: me.sortableColumns,
                enableColumnMove: me.enableColumnMove,
                enableColumnResize: me.enableColumnResize,
                sealed: me.sealedColumns*/
            });

            if (me.hideHeaders) {
                headerCtCfg.height = 0;
                // don't set the hidden property, we still need these to layout
                headerCtCfg.hiddenHeaders = true;
            }
            me.headerCt = new Header(headerCtCfg);
            me.items = [me.headerCt];
            //me.items = [me.headerCt];
            //me.columnManager = me.headerCt.columnManager;

			/*this.table = new Table($.extend(options,{
				collection:this.collection,
				columns:this.columns,
				sortable:this.sortable,
				renderTo:this.$el.find('.panel-body')
			}));*/
			if (me.hideHeaders) {
                me.headerCt.addClass(me.hiddenHeaderCtCls);
                me.addClass(me.hiddenHeaderCls);
            }
			me.viewConfig = me.viewConfig || {};
			/*viewConfig = _.extend({
                // TableView injects the view reference into this grid so that we have a reference as early as possible
                // and Features need a reference to the grid.
                // For these reasons, we configure a reference to this grid into the View
                grid: me,
                cls:Table,
                renderTo:me.bodyEl,
                collection:me.collection,
                ownerGrid: me.ownerGrid,
                headerCt: me.headerCt,
                panel: me,
                emptyText: me.emptyText || ''
            }, me.viewConfig);*/

            if (!me.hasView) {
            	view = me.getView();
            }

            me.items.push(view);
			Panel.prototype.initComponent.apply(this,[options]);

            /*if (me.hideHeaders) {
                headerCtCfg.setHeight(0);
                // don't set the hidden property, we still need these to layout
                headerCtCfg.hiddenHeaders = true;
            }*/

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
		},
		updateLayout:function(){
			Panel.prototype.updateLayout.apply(this,arguments);
			var me = this,paging,height;
			if(me.collection instanceof PageableCollection && me.pager){
				me.$el.addClass('has-pager');
				paging = me.paging = new Pagination({
					uiClass:'panel-footer',
					collection:me.collection,
					renderTo:me.$el
				});
			}
            me.collection.on('sync',me.updateLayout,me)
		},
		updateLayout:function(){
			var me = this,height;
			if(me.paging){
				height = me.paging.$el.outerHeight()
				me.$el.css({
					'padding-bottom':height
				})
				me.paging.$el.css({
					'margin-bottom':-1*height
				})
			}
		},
		applyState:function(state){
			var me = this,
			columns = state.columns;
			if (columns) {
	            me.headerCt.applyColumnsState(columns);
	        }
		},

	    getColumnManager: function() {
	        return this.columnManager;
	    },

	    getVisibleColumnManager: function() {
	        return this.visibleColumnManager;
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
		getView:function(){
			var me = this,
            scroll, scrollable, viewConfig;
            if (!me.view) {
            	viewConfig = me.viewConfig;
            	viewConfig = _.extend({
	                // TableView injects the view reference into this grid so that we have a reference as early as possible
	                // and Features need a reference to the grid.
	                // For these reasons, we configure a reference to this grid into the View
	                grid: me,
	                cls:Table,
	                renderTo:me.bodyEl,
	                collection:me.collection,
	                ownerGrid: me.ownerGrid,
                	columnLines: me.columnLines,
	                headerCt: me.headerCt,
	                panel: me,
	                features: me.features,
	                emptyText: me.emptyText || ''
	            }, me.viewConfig);

				taurus.create(viewConfig);

				me.view.on({
	                uievent: me.processEvent,
	                scope: me
	            });
            }
            return me.view;
		},

	    /**
	     * @private
	     * Processes UI events from the view. Propagates them to whatever internal Components need to process them.
	     * @param {String} type Event type, eg 'click'
	     * @param {Ext.view.Table} view TableView Component
	     * @param {HTMLElement} cell Cell HTMLElement the event took place within
	     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
	     * @param {Number} cellIndex Cell index within the row
	     * @param {Ext.event.Event} e Original event
	     */
	    processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
	        var header = e.position.column;

	        if (header) {
	            return header.processEvent.apply(header, arguments);
	        }
	    },
		renderHtml:function(){
			this.$el.find('.panel-body').empty();
			var html = Panel.prototype.renderHtml.apply(this,arguments);
			return html;
		}
	});
}));