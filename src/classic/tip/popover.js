/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./toolTip'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./toolTip'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./toolTip'));
	}
}(this, function(Tip){
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
}));