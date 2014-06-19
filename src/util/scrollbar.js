/**
 * @author nttdocomo
 */
define(function(require){
	var Base = require('../view/base');
	return taurus.view('taurus.util.Scrollbar',Base.extend({
		tpl:'<div class="track"><div class="thumb"></div></div>',
		wheel:40,
		iScroll:0,
		lockscroll : true,
		sDirection:'top',
		trackSize : 0,
		thumbSize:0,
		offsetBottom:0,
		iMouse : {},
		iPosition:{},
		isHorizontal:false,
		scrollInvert:false,
		childEls:{
			thumb:'.thumb',
			track:'.track'
		},
		className:'scrollbar',
		initialize:function(){
			Base.prototype.initialize.apply(this,arguments)
			this.posiLabel = this.isHorizontal ? "left" : "top"
			this.oViewport.css({
				'overflow':'hidden',
				'position':'relative'
			})
			this.oContent.css({
				'position':'absolute'
			})
			this.update()
			this.setEvents()
		},
		setEvents:function(){
			this.thumb.on( 'mousedown', $.proxy(this,'start'));
            this.track.on( 'mouseup', $.proxy(this,'drag'));
			if(window.addEventListener )
            {
                this.oViewport[0].addEventListener( 'DOMMouseScroll', _.bind(this.onWheel,this), false );
                this.oViewport[0].addEventListener( 'mousewheel', _.bind(this.onWheel,this), false );
                this.oViewport[0].addEventListener( 'MozMousePixelScroll', function( event ){
                    event.preventDefault();
                }, false);
            }
            else
            {
                this.oViewport[0].onmousewheel = _.bind(this.onWheel,this);
            }
            this.$el.on('mouseenter',_.bind(this.onMouseEnter,this)).on('mouseleave',_.bind(this.onMouseLeave,this))
			//this.oViewport.on('scroll', _.bind(this.wheel,this))
		},
		start:function(){
			this.mousePosition = this.isHorizontal ? event.pageX : event.pageY;
            this.thumbPosition = parseInt(this.thumb.css(this.posiLabel), 10) || 0;
            $( document ).on( 'mousemove', $.proxy(this,'drag') );
            $( document ).on( 'mouseup', $.proxy(this,'end') );
            this.thumb.on( 'mouseup', $.proxy(this,'end') );
		},
		drag:function(){
			this.mousePositionNew   = this.isHorizontal ? event.pageX : event.pageY;
            this.thumbPositionDelta = this.mousePositionNew - this.mousePosition;
            if(this.scrollInvert){
                this.thumbPositionDelta = this.mousePosition - this.mousePositionNew;
            }
	        this.thumbPositionNew = Math.min((this.trackSize - this.thumbSize), Math.max(0, this.thumbPosition + this.thumbPositionDelta));
	        this.contentPosition  = this.thumbPositionNew * this.trackRatio;
	        this.thumb.css(this.posiLabel, this.thumbPositionNew);
	        this.oContent.css(this.posiLabel, -this.contentPosition);
		},
		end:function(){
			$("body").removeClass("noSelect");
            $(document).off("mousemove", $.proxy(this,'drag'));
            $(document).off("mouseup", $.proxy(this,'end'));
            this.thumb.off("mouseup", $.proxy(this,'end'));
            document.ontouchmove = document.ontouchend = null;
        },
		onMouseEnter:function(){
			this.opacity(1)
			return this;
		},
		onMouseLeave:function(){
			this.opacity(0.5);
			return this;
		},
		opacity:function(value){
			this.thumb.css('opacity',value);
		},
		update:function(){
			this.contentSize = this.oContent.height();
			this.viewportSize = this.oViewport.height();
			this.contentRatio = this.viewportSize / this.contentSize;
			this.trackSize = this.viewportSize || this.trackSize;
			this.thumbSize = Math.min(this.trackSize, Math.max(0, ((this.trackSize * this.contentRatio) || this.thumbSize)));
			this.trackRatio = this.contentSize / this.trackSize;
			if(this.thumbSize < this.trackSize){
				this.show();
				this.opacity(0.5);
			} else {
				this.hide();
			}
			this.setSize();
		},
		setSize:function(){
			this.thumb.css( 'height', this.thumbSize );
			//console.log(this.oContent.position().top)
			if((this.oContent.offset().top + this.contentSize) < (this.oViewport.offset().top + this.viewportSize)){
				this.oContent.css('top',0);
				//this.oContent.css('top',this.viewportSize - this.contentSize);
				this.thumb.css( this.sDirection, this.trackSize - this.thumbSize);
			}
			//this.oContent.css( this.sDirection, -this.iScroll );
		},
		onWheel:function(event){
			var oEvent = event || window.event,
				iDelta = oEvent.wheelDelta ? oEvent.wheelDelta / 120 : -oEvent.detail / 3;

            this.iScroll -= iDelta * this.wheel;
            this.iScroll = Math.min( ( this.contentSize - this.viewportSize ), Math.max( 0, this.iScroll ));
            if(this.iScroll >= 0){
		        this.thumb.css( this.sDirection, this.iScroll / this.trackRatio);
		        if(this.iScroll / this.trackRatio + this.thumbSize + this.offsetBottom >= this.trackSize){
		        	this.trigger('bottom');
		        }
		        this.oContent.css( this.sDirection, -this.iScroll );
            }

            if( this.lockscroll || ( this.iScroll !== ( this.contentSize - this.viewportSize ) && this.iScroll !== 0 ) )
            {
                oEvent = $.event.fix( oEvent );
                oEvent.preventDefault();
            }
		}
	}));
});
