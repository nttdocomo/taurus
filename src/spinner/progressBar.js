/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../view/base'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../view/base'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../view/base'))
  }
}(this, function (Base) {
  var queue = (function () {
    var pending = []

    function next () {
      var fn = pending.shift()
      if (fn) {
        fn(next)
      }
    }

    return function (fn) {
      pending.push(fn)
      if (pending.length == 1) next()
    }
  })()
  return Base.extend({
    isTrickle: true,
    trickleSpeed: 500,
    speed: 350,
    minimum: 0.08,
    status: null,
    tpl: '<div class="progress-bar"></div>',
    baseCls: taurus.baseCSSPrefix + 'progress',
    //className: 'progress',
    childEls: {
      'progressBar': '.progress-bar'
    },
    /**
	   	* (Internal) returns the correct CSS for changing the bar's
	   	* position given an n percentage, and speed and ease from Settings
	   	*/
    barPositionCSS: function (n, speed, ease) {
      var me = this,barCSS

      if (me.positionUsing === 'translate3d') {
        barCSS = { transform: 'translate3d(' + me.toBarPerc(n) + '%,0,0)' }
      } else if (me.positionUsing === 'translate') {
        barCSS = { transform: 'translate(' + me.toBarPerc(n) + '%,0)' }
      } else {
        barCSS = { 'margin-left': me.toBarPerc(n) + '%' }
      }

      barCSS.transition = 'all ' + speed + 'ms ' + ease

      return barCSS
    },
    clamp: function (n, min, max) {
      if (n < min) return min
      if (n > max) return max
      return n
    },
    done: function (force) {
      var me = this
      if (!force && !me.status) return this

      return me.inc(0.3 + 0.5 * Math.random()).set(1)
    },
    getPositioningCSS: function () {
      // Sniff on document.body.style
      var bodyStyle = document.body.style

      // Sniff prefixes
      var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
        ('MozTransform' in bodyStyle) ? 'Moz' :
          ('msTransform' in bodyStyle) ? 'ms' :
            ('OTransform' in bodyStyle) ? 'O' : ''

      if (vendorPrefix + 'Perspective' in bodyStyle) {
        // Modern browsers with 3D support, e.g. Webkit, IE10
        return 'translate3d'
      } else if (vendorPrefix + 'Transform' in bodyStyle) {
        // Browsers without 3D support, e.g. IE9
        return 'translate'
      } else {
        // Browsers without translate() support, e.g. IE7-8
        return 'margin'
      }
    },
    inc: function (amount) {
      var me = this,n = me.status

      if (!n) {
        return me.start()
      } else if (n > 1) {
        return
      } else {
        if (typeof amount !== 'number') {
          if (n >= 0 && n < 0.25) {
            // Start out between 3 - 6% increments
            amount = (Math.random() * (5 - 3 + 1) + 3) / 100
          } else if (n >= 0.25 && n < 0.65) {
            // increment between 0 - 3%
            amount = (Math.random() * 3) / 100
          } else if (n >= 0.65 && n < 0.9) {
            // increment between 0 - 2%
            amount = (Math.random() * 2) / 100
          } else if (n >= 0.9 && n < 0.99) {
            // finally, increment it .5 %
            amount = 0.005
          } else {
            // after 99%, don't increment:
            amount = 0
          }
        }

        n = me.clamp(n + amount, 0, 0.994)
        return me.set(n)
      }
      return me
    },
    isStarted: function () {
      return typeof this.status === 'number'
    },
    show: function () {
      this.$el.css('opacity', 1)
      this._super.apply(this, arguments)
    },
    start: function () {
      var me = this,work
      if (!me.status) {
        me.set(0)
      }
      work = function () {
        setTimeout(function () {
          if (!me.status) return
          me.trickle()
          work()
        }, me.trickleSpeed)
      }
      if (me.isTrickle) work()
    },
    set: function (n) {
      var me = this
      started = me.isStarted()

      n = me.clamp(n, me.minimum, 1)
      me.status = (n === 1 ? null : n)

      var progress = me.$el,
        bar = me.progressBar,
        speed = me.speed,
        ease = me.easing

      progress.get(0).offsetWidth /* Repaint */

      queue(function (next) {
        // Set positionUsing if it hasn't already been set
        if (me.positionUsing === '') me.positionUsing = me.getPositioningCSS()

        // Add transition
        bar.css(me.barPositionCSS(n, speed, ease))

        if (n === 1) {
          // Fade out
          progress.css({
            transition: 'none',
            opacity: 1
          })
          progress.get(0).offsetWidth /* Repaint */

          setTimeout(function () {
            progress.css({
              transition: 'all ' + speed + 'ms linear',
              opacity: 0
            })
            setTimeout(function () {
              me.hide()
              next()
            }, speed)
          }, speed)
        } else {
          setTimeout(next, speed)
        }
      })
      return me
    },
    /**
	    * (Internal) converts a percentage (`0..1`) to a bar translateX
	    * percentage (`-100%..0%`).
	    */
    toBarPerc: function (n) {
      return (-1 + n) * 100
    },
    trickle: function () {
      return this.inc()
    }
  })
}))
