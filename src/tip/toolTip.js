define(function(require){
	var Tip = require('./tip');
	DateUtil = require('../lang/date');
	return Tip.extend({

	    /**
	     * @cfg {Number} showDelay
	     * Delay in milliseconds before the tooltip displays after the mouse enters the target element.
	     */
	    showDelay: 500,
	    autoHide: true,
	    renderTo:$(document.body),
	    hideAction: 'hide',
		initialize:function(){
	        var me = this;
	        Tip.prototype.initialize.apply(this,arguments);
	        me.lastActive = new Date();
	        me.setTarget(me.target);
	        me.origAnchor = me.anchor;
		},

    	_timerNames: {},
	    // @private
	    clearTimer: function (name) {
	        var me = this,
	            names = me._timerNames,
	            propName = names[name] || (names[name] = name + 'Timer'),
	            timer = me[propName];

	        if (timer) {
	            clearTimeout(timer);
	            me[propName] = null;
	        }
	    },

	    // @private
	    delayShow: function (trackMouse) {
	        // When delaying, cache the XY coords of the mouse when this method was invoked, NOT when the deferred
	        // show is called because the mouse could then be in a completely different location. Only cache the
	        // coords when trackMouse is false.
	        //
	        // Note that the delayShow call could be coming from a caller which would internally be setting trackMouse
	        // (e.g., Ext.chart.Tip:showTip()). Because of this, the caller will pass along the original value for
	        // trackMouse (i.e., the value passed to the component constructor) to the delayShow method.
	        // See EXTJSIV-11292.
	        var me = this,
	            xy = me.el && (trackMouse === false || !me.trackMouse) && me.getTargetXY();

	        if (me.hidden && !me.showTimer) {
	            if (DateUtil.getElapsed(me.lastActive) < me.quickShowInterval) {
	                me.show();
	            } else {
	                me.showTimer = _.delay(_.bind(me.showFromDelay,me,[xy]), me.showDelay);
	            }
	        }
	        else if (!me.hidden && me.autoHide !== false) {
	            me.show(xy);
	        }
	    },

	    // @private
	    delayHide: function() {
	        var me = this;

	        if (!me.hidden && !me.hideTimer) {
	            me.hideTimer = _.delay(_.bind(me[me.hideAction],me), me.hideDelay);
	        }
	    },

	    getSize:function(){
	    	return {
	    		width:this.target.outerWidth()
	    	}
	    },

	    // @private
	    getAnchorAlign: function() {
	        switch (this.anchor) {
		        case 'top':
		            return {
		            	"my" : "center top",
						"at" : "center bottom",
		            };
		        case 'left':
		            return {
		            	"my" : "left center",
						"at" : "right center",
						"collision" : "none none"
		            };
		        case 'right':
		            return {
		            	"my" : "right center",
						"at" : "left center",
		            };
		        default:
		            return {
		            	"my" : "center bottom",
						"at" : "center top",
		            };
	        }
	    },

	    getAlignToXY:function(el, position, offsets, local){

	    },

	    getTargetXY:function(){
	    	var me = this, xy;
	    	if (me.anchor) {
	    		xy = (me.anchorToTarget && !me.trackMouse) ? me.getAlignToXY(me.anchorTarget, me.getAnchorAlign()) : me.targetXY;
	    	}
	    },
		getTplData:function(){
			return {
				text:this.text,
				anchor:this.anchor
			}
		},

	    // @private
	    onTargetEnter: function(e) {
	        var me = this,
	            t;

	        me.triggerElement = true;
            me.triggerEvent = e;
            me.clearTimer('hide');
            //me.targetXY = e.getXY();
            me.delayShow();
	    },

	    // @private
	    onTargetOut: function(e) {
	        var me = this,
	            triggerEl = me.triggerElement,
	            // If we don't have a delegate, then the target is set
	            // to true, so set it to the main target.
	            target = triggerEl === true ? me.target : triggerEl;

	        // If disabled, moving within the current target, ignore the mouseout
	        // e.within is the only correct way to determine this.
	        if (me.disabled || !triggerEl || target.has(e.target).length) {
	            return;
	        }
	        if (me.showTimer) {
	            me.clearTimer('show');
	            me.triggerElement = null;
	        }
	        if (me.autoHide !== false) {
	            me.delayHide();
	        }
	    },

	    /**
	     * Binds this ToolTip to the specified element. The tooltip will be displayed when the mouse moves over the element.
	     * @param {String/HTMLElement/Ext.dom.Element} t The Element, HTMLElement, or ID of an element to bind to
	     */
	    setTarget: function(target) {
	        var me = this,
	            t = taurus.get(target),
	            tg;

	        if (me.target) {
	            tg = taurus.get(target);
	            tg.off({
	            	mouseenter: _.bind(me.onTargetEnter,me),
	            	mouseleave: _.bind(me.onTargetOut,me)
	            })
	        }

	        me.target = t;
	        if (t) {
	            t.on({
	            	mouseenter: _.bind(me.onTargetEnter,me),
	            	mouseleave: _.bind(me.onTargetOut,me)
	            })
	        }
	        if (me.anchor) {
	            me.anchorTarget = me.target;
	        }
	    },

	    /**
	     * Shows this tooltip at the current event target XY position.
	     */
	    show: function (xy) {
	        var me = this;

	        // Show this Component first, so that sizing can be calculated
	        // pre-show it off screen so that the el will have dimensions
	        Tip.prototype.show.apply(this,arguments);
	        if (this.hidden === false) {
	            if (me.anchor) {
	                me.anchor = me.origAnchor;
	            }

	            if (!me.calledFromShowAt) {
	                // If the caller was this.showFromDelay(), the XY coords may have been cached.
	                //me.showAt(xy || me.getTargetXY());
	                me.showBy(me.target, me.getAnchorAlign());
	                me.$el.css('opacity',1);
	            }

	            /*if (me.anchor) {
	                me.syncAnchor();
	                me.anchorEl.show();
	            } else {
	                me.anchorEl.hide();
	            }*/
	        }
	    },
    
	    showFromDelay: function (xy) {
	        this.fromDelayShow = true;
	        this.show(xy);
	        delete this.fromDelayShow;
	    }
	})
})