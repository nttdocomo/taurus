define(function(require){
	var Base = require('./view/base');
	return taurus.view("taurus.ProgressBar", Base.extend({
		baseCls: 'progress',
		tpl:['<div class="progress">',
		'<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:<%=percentage%>;">',
		'<span class="<%=baseCls%>-text"><%=text%></span>',
		'</div></div>'].join(''),
		getTplData:function(){
			var me = this;
	        return $.extend(Base.prototype.getTplData.apply(this,arguments), {
	        	baseCls:me.baseCls,
	            text : me.text || '&#160;',
	            percentage : me.value ? me.value * 100 : 0
	        });
		},
		render:function(){
			var me = Base.prototype.render.apply(this,arguments);
			me.bar = me.$el.find('.progress-bar')
			if (me.textEl) {
	            me.textEl = me.$el.find(me.textEl);
	            me.updateText(me.text);
	        }
	        // Inline text display
	        else {
	            // This produces a composite w/2 el's (which is why we cannot use childEls or
	            // renderSelectors):
	            me.textEl = me.$el.find('.' + me.baseCls + '-text');
	        }
	        return me
		},
		updateProgress:function(value, text, animate){
	        var me = this,
	            oldValue = me.value;
	
	        me.value = value || 0;
	        if (text) {
	            me.updateText(text);
	        }
	        //if (me.rendered && !me.isDestroyed) {
            if (animate === true || (animate !== false && me.animate)) {
                me.bar.stop();
                me.bar.animate($.extend({
                    width: (me.value * 100) + '%'
                }, me.animate));
            } else {
                me.bar.css('width', (me.value * 100) + '%');
            }
	        //}
	        me.trigger('update', me, me.value, text);
	        return me;
		},
		updateText:function(text){
	        this.text = text;
	        //if (this.rendered) {
	            this.textEl.text(this.text);
	        //}
	        return this;
		}
	}))
})
