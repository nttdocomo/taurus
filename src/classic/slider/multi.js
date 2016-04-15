/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../form/field/base')
	require('../lang/number')
	require('../util/format')
	var Thumb = require('./thumb')
	return taurus.view("taurus.slider.Multi", Base.extend({
		childEls: {
			'endEl':'',
			'innerEl':'.'+taurus.baseCSSPrefix+'slider-inner',
			'inputEl':'.'+taurus.baseCSSPrefix+'slider'
		},
		increment: 0,
		useTips : true,
		/**
	     * @cfg {Boolean} vertical
	     * Orient the Slider vertically rather than horizontally.
	     */
	    vertical: false,
	    /**
	     * @cfg {Number} minValue
	     * The minimum value for the Slider.
	     */
	    minValue: 0,
	
	    /**
	     * @cfg {Number} maxValue
	     * The maximum value for the Slider.
	     */
	    maxValue: 100,
		fieldSubTpl:['<div id="<%=id%>" class="' + taurus.baseCSSPrefix + 'slider <%=fieldCls%> <%=vertical%>" aria-valuemin="<%=minValue%>" aria-valuemax="<%=maxValue%>" aria-valuenow="{value}" aria-valuetext="{value}">',
            '<div id="<%=cmpId%>-endEl" class="' + taurus.baseCSSPrefix + 'slider-end" role="presentation">',
                '<div id="<%=cmpId%>-innerEl" class="' + taurus.baseCSSPrefix + 'slider-inner" role="presentation">',
                    '',
                '</div>',
            '</div>',
        '</div>'].join(''),
        addThumb:function(value){
        	this.thumbs.push(value);
        },
	    /**
	     * @private
	     * Given a value within this Slider's range, calculates a Thumb's percentage CSS position to map that value.
	     */
	    calculateThumbPosition : function(v) {
	        return (v - this.minValue) / (this.maxValue - this.minValue) * 100;
	    },
        initialize:function(){
        	this.thumbs = [];
        	Base.prototype.initialize.apply(this,arguments)
        },
        initValue:function(){
        	var me = this,
        		extValue = taurus.value,
	        	values = extValue(me.values, [extValue(me.value, extValue(me.minValue, 0))]),
	        	i = 0,
	            len = values.length;
            for (; i < len; i++) {
	            me.addThumb(values[i]);
	        }
        },
        getRatio : function() {
	        var me = this,
	            trackLength = this.vertical ? this.innerEl.height() : this.innerEl.width(),
	            valueRange = this.maxValue - this.minValue;
	        return valueRange === 0 ? trackLength : (trackLength / valueRange);
	    },
        // private override
	    getSubTplData : function() {
	        var me = this;
	        return $.extend(Base.prototype.getSubTplData.apply(this,arguments), {
	            vertical: me.vertical ? taurus.baseCSSPrefix + 'slider-vert' : taurus.baseCSSPrefix + 'slider-horz',
	            minValue: me.minValue,
	            maxValue: me.maxValue,
	            value: me.value/*,
	            thumbs:this.renderThumbs()*/
	        });
	    },
	    getTrackpoint:function(xy){
	        var me = this,
	            result,
	            positionProperty,
	            sliderTrack = me.innerEl,
	            trackLength;
	
	        if (me.vertical) {
	            positionProperty = 'top';
	            trackLength = sliderTrack.height();
	        } else {
	            positionProperty = 'left';
	            trackLength = sliderTrack.width();
	        }
	        result = taurus.Number.constrain(xy[positionProperty], 0, trackLength);
	        return me.vertical ? trackLength - result : result;
	    },
		html : function() {
			var me = this, data = {
				inputId : this.cid,
				fieldLabel : this.fieldLabel,
				field : this.getSubTplMarkup()
			}
			taurus.form.Label.prototype.html.apply(this, [data])
		},
	    /**
	     * @private
	     * Returns a snapped, constrained value when given a desired value
	     * @param {Number} value Raw number value
	     * @return {Number} The raw value rounded to the correct d.p. and constrained within the set max and min values
	     */
	    normalizeValue : function(v) {
	        var me = this,
	            Num = taurus.Number,
	            snapFn = Num[me.zeroBasedSnapping ? 'snap' : 'snapInRange'];
	
	        v = snapFn.call(Num, v, me.increment, me.minValue, me.maxValue);
	        v = taurus.util.Format.round(v, me.decimalPrecision);
	        v = taurus.Number.constrain(v, me.minValue, me.maxValue);
	        return v;
	    },
	    afterRender:function(){
	    	Base.prototype.afterRender.apply(this,arguments)
	    	this.renderThumbs()
	    },
		renderThumbs:function(){
        	var me = this,
        		extValue = taurus.value,
	        	values = extValue(me.values, [extValue(me.value, extValue(me.minValue, 0))]),
	        	i = 0,
	            len = values.length;
	         this.thumbs = [];
		    _.each(values,function(value,i){
                me.thumbs.push(new Thumb({
                	attributes  :{
                		id : me.cid + '-thumb-' + i
                	},
	                value       : value,
	                slider      : me,
	                index       : i,
	                constrain   : me.constrainThumbs,
                	renderTo    :me.innerEl
                }))
		    })
		},
		reversePixelValue : function(pos) {
	        return this.minValue + (pos / this.getRatio());
	    },
		setValue:function(index, value, animate, changeComplete){
			var thumbValue = value
			console.log(value)
			value = this.normalizeValue(value);
			console.log(value)
			thumb = this.thumbs[index];
			thumb.move(this.calculateThumbPosition(value))
			if(value !== thumb.value){
				thumb.value = value;
				this.trigger('change', value, thumb);
			}
		}
	}))
})