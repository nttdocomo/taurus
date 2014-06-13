/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./panel');
	var Table = require('../view/tableBody');
	var Header = require('../grid/header/container');
	var Pagination = require('../grid/pagination');
	var Spinner = require('../spinner/wave');
	return taurus.view('taurus.panel.Table',Base.extend({
		pager:false,
		className:'panel panel-default grid',
		initialize:function(options){
			var me = this, height = options.height;
			options.height = null;
			this.collection.on('sync',function(){
				me.headerCt.setColumnsWidth(me.table.getColumnsWidth());
			},this);
			if(!options.width){
				taurus.$win.on('resize',function(){
					me.headerCt.setColumnsWidth(me.table.getColumnsWidth());
				});
			}
			Base.prototype.initialize.apply(this,[options]);
			var headerCtCfg = this.columns;
			if(this.pager){
				this.collection.pager();
			}else{
				this.collection.length || this.collection.fetch();
			}
			if (_.isArray(headerCtCfg)) {
                headerCtCfg = {
                    items: headerCtCfg
                };
            }
            // Create our HeaderCOntainer from the generated configuration
            if (!this.headerCt) {
                this.headerCt = new Header($.extend(headerCtCfg,{
                	renderTo:this.$el.find('.panel-body')
                }));
            }
			this.table = new Table($.extend({
				collection:this.collection,
				columns:this.columns,
				sortable:this.sortable,
				renderTo:this.$el.find('.panel-body'),
				height:height ? height - this.$el.height() : undefined
			}));
			if(this.pager){
				this.$el.addClass('has-pager');
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
			this.$el.find('.panel-body > div:first-child').css('margin-top',-1*top);
			this.headerCt.setColumnsWidth(me.table.getColumnsWidth());
			/*this.collection.on('sync',function(){
				this.html();
			},this);*/
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
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
		html:function(){
			this.$el.find('.panel-body').empty();
			var html = Base.prototype.html.apply(this,arguments);
			return html;
		}
	}));
});