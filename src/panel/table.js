/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./panel');
	var Table = require('../view/table');
	var Header = require('../grid/header/container');
	var Pagination = require('../grid/pagination');
	var Spinner = require('../spinner/wave');
	return taurus.view('taurus.panel.Table',Base.extend({
		pager:false,
		className:'panel panel-default grid',
		initialize:function(options){
			var me = this;
			Base.prototype.initialize.apply(this,[options]);
			this.table = new Table($.extend(options,{
				collection:this.collection,
				columns:this.columns,
				sortable:this.sortable,
				renderTo:this.$el.find('.panel-body')
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
			/*if(this.pager){
				this.collection.pager();
			}else{
				this.collection.fetch();
			}
			this.collection.on('sync',function(){
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