/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('./panel');
	var Table = require('../view/tableBody');
	var Header = require('../grid/header');
	var Pagination = require('../grid/pagination');
	var Spinner = require('../spinner/wave');
	return taurus.view('taurus.panel.Table',Base.extend({
		pager:true,
		className:'panel panel-default grid',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			/*this.collection.on('sync',function(){
				this.html();
			},this);*/
		},
		getTplData:function(){
			return $.extend(Base.prototype.getTplData.apply(this,arguments),{
				content:''
			});
		},
		html:function(){
			this.$el.find('.panel-body').empty();
			var height = this.height;
			this.height = null;
			var html = Base.prototype.html.apply(this,arguments);
			new Header($.extend({
				columns:this.columns,
				renderTo:this.$el.find('.panel-body')
			}));
			new Table($.extend({
				height:height,
				collection:this.collection,
				columns:this.columns,
				renderTo:this.$el.find('.panel-body')
			}));
			if(this.pager){
				new Pagination({
					uiClass:'panel-footer',
					collection:this.collection,
					renderTo:this.$el
				});
			}
			return html;
		}
	}));
});