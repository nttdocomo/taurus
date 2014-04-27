/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base'),
		dragTarget;
	$(document).on('mouseenter','.' + taurus.baseCSSPrefix + 'slider-thumb',function(e){
		$(e.target).addClass(taurus.baseCSSPrefix + 'slider-thumb-over')
	}).on('mouseleave','.' + taurus.baseCSSPrefix + 'slider-thumb',function(e){
		$(e.target).removeClass(taurus.baseCSSPrefix + 'slider-thumb-over')
	}).on('mousedown','.' + taurus.baseCSSPrefix + 'slider-thumb',function(e){
		var target = dragTarget = $(e.target),
			thumb = target.data('component');
		$(document).on('mousemove',function(e){
			target.css('left', e.pageX - target.parent().offset().left)
			thumb.onDrag(e)
			/*if(left < 100){
				var x = (e.pageX - target.parent().offset().left)/target.parent().width();
				console.log(x)
				if(x < 0){
					x = 0
				}
				if(x > 1){
					x = 1
				}
				x = x*100
				target.css('left', x + '%')
			}*/
		})
	}).on('mouseup',function(e){
		$(document).off('mousemove')
		if(dragTarget){
			var thumb = dragTarget.data('component');
		}
		//slider.onGragEnd()
	}).on('click','.g-slider', function(e){
		console.log('click');
		thumb = $(e.currentTarget).find('.' + taurus.baseCSSPrefix + 'slider-thumb').data('component')
		thumb.$el.css('left', e.pageX - thumb.$el.parent().offset().left)
		thumb.onDrag(e)
	})
	return taurus.view("taurus.slider.Thumb", Base.extend({
		topZIndex: 10000,
		className: taurus.baseCSSPrefix + 'slider-thumb',
		initialize:function(config){
			Base.prototype.initialize.apply(this,arguments)
			/**
	         * @property {Ext.slider.MultiSlider} slider
	         * The slider this thumb is contained within
	         */
	        $.extend(this, config || {}, {
	        	/**
	             * @cfg {Boolean} constrain True to constrain the thumb so that it cannot overlap its siblings
	             */
	            constrain: false
	        });
		},
	    /**
	     * Renders the thumb into a slider
	     */
	    render: function() {
	        var me = Base.prototype.render.apply(this,arguments)
	        this.getElConfig()
	        return me
	    },
	    getValueFromTracker:function(e){
	        var slider = this.slider,
	            trackPoint = slider.getTrackpoint(this.$el.position());

	        // If dragged out of range, value will be undefined
	        if (trackPoint !== undefined) {
	            return slider.reversePixelValue(trackPoint);
	        }
	    	//return e.pageX - this.$el.parent().offset().left
	    },
	    getElConfig: function() {
	        var me = this,
	            slider = me.slider,
	            style = {};
	        console.log(me.value)
	        style[slider.vertical ? 'bottom' : 'left'] = slider.calculateThumbPosition(slider.normalizeValue(me.value)) + '%';
	        this.$el.css(style)
	        slider.trigger('change', this.value, this)
	        return {
	            style: style,
	            id  : this.id,
	            cls : this.cls
	        };
	    },
	    html:function(){
	    	var el = document.createElement('div');
			el.appendChild(this.el.cloneNode(true))
			return el.innerHTML
	    },
	    move:function(v){
	        var el = this.$el,
	            styleProp = this.slider.vertical ? 'bottom' : 'left',
	            to,
	            from;
	
	        v += '%';
	        el.css(styleProp,v);
	    },
	    onDrag:function(e){
	    	var me       = this,
	            slider   = me.slider,
	            index    = me.index,
	            newValue = me.getValueFromTracker(e);
	        console.log([index,newValue].join(':'))
            slider.setValue(index, newValue, false);
	    }
	}))
})