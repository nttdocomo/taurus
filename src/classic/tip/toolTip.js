/**
 * @author nttdocomo
 */
/* global define */
(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['./tip','../../lang/date', 'taurus', 'underscore' , '../../lang/event'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('./tip'), require('../../lang/date'), require('taurus'),require('underscore'), require('../../lang/event'));
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./tip'), require('../../lang/date'), require('taurus'),require('underscore'), require('../../lang/event'));
  }
}(this, function (Tip, DateUtil, taurus, _) {
	var onDocMouseDown
  return Tip.extend({

	    /**
	     * @cfg {Number} showDelay
	     * Delay in milliseconds before the tooltip displays after the mouse enters the target element.
	     */
	    showDelay: 500,
        hideDelay: 200,
	    autoHide: true,
	    renderTo:$(document.body),
	    disabled:false,
	    hideAction: 'hide',
	  quickShowInterval: 250,
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

	    /**
	     * @private
	     */
	    clearTimers: function() {
	        var me = this;
	        me.clearTimer('show');
	        me.clearTimer('dismiss');
	        me.clearTimer('hide');
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
	        me.clearTimer('hide');
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
	          	"my" : "right center",
	          	"at" : "left center",
	          	"collision" : "none none"
	          };
	        case 'right':
	          return {
	          	"my" : "left center",
	          	"at" : "right center",
	          };
	        default:
	        	return {
	        		"my" : "center bottom-10",
	        		"at" : "center top",
	        		"collision" : "none none"
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

	    onDisable: function() {
	        Tip.prototype.onDisable.apply(this,arguments);
	        this.clearTimers();
	        //this.hide();
	    },

	    /**
	     * @private
	     */
	    doEnable: function() {
	        if (!this.destroyed) {
	            this.enable();
	        }
	    },
		/**
	     * @private
	     */
	    onDocMouseDown: function(e) {
	        var me = this;
	        if (!me.closable && !me.$el.has(e.target).length) {
	        	me.delayHide();
	            /*me.disable();
	            _.delay(_.bind(me.doEnable,me), 100);*/
	        }
	    },

	    onShow: function() {
	        var me = this;
	        me._super.apply(this,arguments)
	        onDocMouseDown = _.bind(me.onDocMouseDown,me)
	        taurus.$doc.on('mousedown', onDocMouseDown);
	    },

	    // @private
	    onTargetEnter: function(e) {
	    	console.log('mouseenter')
        var me = this,
            t;
        var newTarget
        var delegated = me.delegated
        if (delegated) {
          newTarget = e.getTarget(me.currentTarget);
        } else {
        	newTarget = me.target
	        /*if (me.target.length > 1) {
	        	me.target.each(function () {
	        		if ($(this).is(e.target)) {
	        			newTarget = $(this)
	        			return true
	        		}
	        	})
	        } else {
	        	if (!me.target.is(e.target)) {
	      			newTarget = $(e.target)
	      		}
	        }*/
        }
        if(newTarget){
        	me.currentTarget = newTarget
	        me.triggerElement = true;
          me.triggerEvent = e;
        	me.handleTargetOver(newTarget, e);
        }
        //me.targetXY = e.getXY();
	    },
	    handleTargetOver: function(){
	    	var me = this
        me.delayShow()
	    },
	    // @private
	    onTargetOut: function(e) {
	    	var me = this
	    	var triggerEl = me.triggerElement
	    	var target = e.target
        var related = e.relatedTarget
        var currentTarget = me.currentTarget
        var match;
        if(!currentTarget){
        	return
        }
        if(currentTarget.$el){
        	currentTarget = currentTarget.$el
        }
		    // search for a parent node matching the delegation selector
		    while ( target && target != document && !( match = currentTarget.is(target) ) ) {
		      target = target.parentNode;
		    }

		    // exit if no matching node has been found
		    if ( !match ) { return; }

		    // loop through the parent of the related target to make sure that it's not a child of the target
		    while ( related && related != target && related != document ) {
		      related = related.parentNode;
		    }

		    // exit if this is the case
		    if ( related == target ) { return; }
	    	console.log('onTargetOut')
		    if (me.showTimer) {
          me.clearTimer('show');
          me.triggerElement = null;
        }
        me.handleTargetOut()
        /*if (me.autoHide !== false) {
          me.delayHide();
        }
        var me = this,
            triggerEl = me.triggerElement,
            // If we don't have a delegate, then the target is set
            // to true, so set it to the main target.
            target = triggerEl === true ? me.target : triggerEl;

        // If disabled, moving within the current target, ignore the mouseout
        // e.within is the only correct way to determine this.
        if (this.currentTarget && (!$.contains(this.currentTarget.get(0), e.relatedTarget) && !this.currentTarget.is(e.relatedTarget))) {
           
	        if (me.showTimer) {
	            me.clearTimer('show');
	            me.triggerElement = null;
	        }
	        if (me.autoHide !== false) {
	            me.delayHide();
	        }
        }
        /*if (me.disabled || !triggerEl || (target.has(e.target).length && target.is(e.target))) {
            return;
        }*/
	    },

	    handleTargetOut: function() {
	        var me = this;
	        if (me.isVisible() && me.autoHide) {
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
	            if(typeof(tg) === 'string'){
		            taurus.$doc.off({
		            	mouseover: _.bind(me.onTargetEnter,me),
		            	mouseout: _.bind(me.onTargetOut,me)
		            }, tg)
	            } else {
		            tg.off({
		            	mouseover: _.bind(me.onTargetEnter,me),
		            	mouseout: _.bind(me.onTargetOut,me)
		            })
	            }
	        }

	        me.target = t;
	        if (t) {
	        	if(typeof(tg) === 'string'){
	            taurus.$doc.on({
	            	mouseover: _.bind(me.onTargetEnter,me),
	            	mouseout: _.bind(me.onTargetOut,me)
	            }, t)
	        	} else {
	            t.on({
	            	mouseover: _.bind(me.onTargetEnter,me),
	            	mouseout: _.bind(me.onTargetOut,me)
	            })
	        	}
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
	        if(!me.currentTarget && me.target){
	        	return me.showBy(me.target, me.getAnchorAlign());
	        }

	        // Show this Component first, so that sizing can be calculated
	        // pre-show it off screen so that the el will have dimensions
	        //Tip.prototype.show.apply(this,arguments);
	        me._super.apply(this, arguments);
	        me.$el.css('opacity',1);
	        /*if (this.hidden === false) {
	            if (me.anchor) {
	                me.anchor = me.origAnchor;
	            }

	            if (!me.calledFromShowAt) {
	                // If the caller was this.showFromDelay(), the XY coords may have been cached.
	                //me.showAt(xy || me.getTargetXY());
	                me.showBy(me.target, me.getAnchorAlign());
	                me.$el.css('opacity',1);
	            }

	            if (me.anchor) {
	                me.syncAnchor();
	                me.anchorEl.show();
	            } else {
	                me.anchorEl.hide();
	            }
	        }*/
	        me.realignToTarget()
	    },
	    hide: function(){
	    	var me = this
	    	me.clearTimer('dismiss');
	    	this._super()
	        taurus.$doc.off('mousedown', onDocMouseDown);
	    },
	    render: function(){
	    	this._super.apply(this, arguments)
	    	this.hide()
	    },
	    realignToTarget: function(){
	    	var me = this
        me.clearTimers()
	    	if (!me.calledFromShowAt) {
	    		if(me.target){
	    			me.alignTo(me.currentTarget, me.getAnchorAlign());
	    		}
	    	}
	    },

	    /**
	     * @inheritdoc
	     */
	    showBy: function(cmp, pos, off) {
	        var me = this;
	        me.lastActive = new Date();
	        me.clearTimers();
	        me.calledFromShowAt = true;
	        me.currentTarget = taurus.get(cmp);

	        // Only call if this is hidden. May have been called from show above.
	        if (!me.isVisible()) {
	          me._super.apply(me,arguments);
	        } else {
	          me.alignTo(cmp, pos || me.defaultAlign, off || me.alignOffset);
	        }

	        // Show may have been vetoed.
	        if (me.isVisible()) {
	            me.alignTo(cmp, pos || me.defaultAlign, off || me.alignOffset);
	        }
	        delete me.calledFromShowAt;
	    },

	    showFromDelay: function (xy) {
	        this.fromDelayShow = true;
	        this.show(xy);
	        delete this.fromDelayShow;
	    }
	})
}));
