/**
 * @author nttdocomo
 */
/* # Example usage
 *
 * 		@example
 *		new taurus.form.field.Text({
 * 			name: 'name',
 * 			fieldLabel: 'Name',
 * 			inputType: 'password'
 * 		})
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../view/boundList', 'moment', 'backbone'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../view/boundList'), require('moment'), require('backbone'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../view/boundList'), require('moment'), require('backbone'))
  } else {
    root.myModule = factory()
  }
}(this, function (Base, moment, Backbone) {
  return Base.extend({
    initDate: '2008-01-01',
    displayField: 'disp',

    initComponent: function () {
      var me = this,
        initDate = me.initDate

      // Set up absolute min and max for the entire day
      me.absMin = moment(initDate),
      me.absMax = moment(initDate).add(24 * 60 - 1, 'm')
      this.collection.on('reset', _.bind(this.refresh, this))

      // Updates the range filter's filterFn according to our configured min and max
      me.updateList()

      Base.prototype.initComponent.apply(this, arguments)
    },
    refresh: function () {
      var me = this
      me.renderHtml()
      // this.$el.css('height','auto')
      me.trigger('refresh')
    },

    /**
     * Set the {@link #minValue} and update the list of available times. This must be a Date object (only the time
     * fields will be used); no parsing of String values will be done.
     * @param {Date} value
     */
    setMinValue: function (value) {
      this.minValue = value
      this.updateList()
    },
    updateList: function () {
      var me = this,
        min = me.minValue || me.absMin,
        max = me.maxValue || me.absMax
      this.collection.reset(this.collection.filter(function (item) {
        // console.log(item)
        return item.get('date').isAfter(min) && item.get('date').isBefore(max)
      }))
    }
  }, {
    /**
         * @private
         * Creates the internal {@link Ext.data.Store} that contains the available times. The store
         * is loaded with all possible times, and it is later filtered to hide those times outside
         * the minValue/maxValue.
         */
    createStore: function (format, increment) {
      var initDate = this.prototype.initDate,
        times = [],
        min = moment(initDate),
        max = moment(initDate).add(24 * 60 - 1, 'm')

      while(min <= max){
        var value = min.clone()
        times.push({
          disp: value.format(format),
          date: value
        })
        min.add(increment, 'm')
      }

      return new Backbone.Collection(times)
    }
  })
}))
