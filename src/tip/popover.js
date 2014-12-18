define(function(require){
	var Tip = require('./toolTip');
	return Tip.extend({
		className:'popover',
		tpl:'<div class="arrow"></div><%if(title){%><h3 class="popover-title"><%=title%></h3><%}%><div class="popover-content"><%=content%></div>',
		getTplData:function(){
			return {
				title:this.title,
				content:this.content
			}
		},

	    // @private
	    getAnchorAlign: function() {
	        switch (this.anchor) {
		        case 'top':
		            return {
		            	"my" : "center top+10",
						"at" : "center bottom",
		            };
		        case 'left':
		            return {
		            	"my" : "left+10 center",
						"at" : "right center",
						"collision" : "none none"
		            };
		        case 'right':
		            return {
		            	"my" : "right+10 center",
						"at" : "left center",
		            };
		        default:
		            return {
		            	"my" : "center bottom+10",
						"at" : "center top",
		            };
	        }
	    }
	})
})