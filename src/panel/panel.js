/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	var Spinner = require('../spinner/wave');
	return taurus.view('taurus.panel.Base',Base.extend({
		autoHeight:false,
		header:true,
		referTo:$(window),
		tpl:'<%if(header){%><div class="panel-heading"><%=tool%><h3 class="panel-title"><%=title%></h3></div><%}%><div class="panel-body"><%=content%></div>',
		className:'panel panel-default',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments);
			if(this.header){
				this.$el.addClass('has-header');
			}
		},
		getTplData : function() {
			return {
				header:this.header,
				title:this.title,
				content:this.loading ? (new Spinner({
					renderTo:this.$el
				})).html() : this.content,
				tool:this.refreshable ? '<a href="" class="pull-right halflings refresh" data-name="refresh" data-type="" data-prefix="halflings" data-utf="E031"></a>':''
			};
		},
		delegateEvents:function(events){
			var events = $.extend(events || {}, this.events/*, this.listeners*/);
			if(this.refreshable){
				events['click .refresh'] = 'refresh'
			}
			Base.prototype.delegateEvents.call(this, events)
		},
		refresh:function(){
			this.onRefresh && this.onRefresh();
			return false;
		}
	}));
});
