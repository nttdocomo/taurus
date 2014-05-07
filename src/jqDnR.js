/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $Version: 2007.08.19 +r2
 */

(function($) {
	/*$.fn.jqDrag = function(h) {
		return i(this, h, 'd');
	};
	$.fn.jqResize = function(h) {
		return i(this, h, 'r');
	};*/
	$.jqDnR = {
		dnr : {},
		e : 0,
		drag : function(v) {
			if(M.k == 'd')
				E.css({
					left : M.X + v.pageX - M.pX,
					top : M.Y + v.pageY - M.pY
				});
			else{
				if(E.attr('data-resize-type') == 'x'){
					E.css({
						width : Math.max(v.pageX - M.pX + M.W, 0)
					});
				} else {
					E.css({
						width : Math.max(v.pageX - M.pX + M.W, 0),
						height : Math.max(v.pageY - M.pY + M.H, 0)
					});
				}
			}
			return false;
		},
		stop : function() {
			$(document).off('mousemove',J.drag).off('mouseup', J.stop);
		}
	};
	var J = $.jqDnR, M = J.dnr, E = J.e, i = function(e, h, k) {
		return e.each(function() {
			h = (h) ? $(h, e) : e;
			console.log(h.selector)
		});
	}, f = function(k) {
		return parseInt(E.css(k)) || false;
	};
	var onDrag = function(type){
		return function(v) {
			var d = v.data, p = {};
			E = $(v.currentTarget).closest('.draggable');
			if(type=='r'){
				E = $('.resizable')
			}
			// attempt utilization of dimensions plugin to fix IE issues
			if(E.css('position') != 'relative') {
				try {E.position(p);
				} catch(e) {
				}
			}
			M = {
				X : p.left || f('left') || 0,
				Y : p.top || f('top') || 0,
				W : f('width') || E[0].scrollWidth || 0,
				H : f('height') || E[0].scrollHeight || 0,
				pX : v.pageX,
				pY : v.pageY,
				k : type
			};
			$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
			return false;
		}
	}
	$(document).on('mousedown', '.resizable-handle',onDrag('r'))
	$(document).on('mousedown', '.draggable-handle', onDrag('d'));
})(jQuery);
