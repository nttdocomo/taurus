/**
 * @author nttdocomo
 */
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(['../../view/base', '../../manager', 'backbone', './button', 'underscore', 'jquery'], factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory(require('../../view/base'), require('../../manager'), require('../../backbone'), require('./button'), require('underscore'), require('jquery'))
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../view/base'), require('../../manager'), require('../../backbone'), require('./button'), require('underscore'), require('jquery'))
  }
}(this, function (Base, Manager, Backbone, Button, _, $) {
	return Base.extend({
		xtype: 'segmentedbutton',
		baseCls: 'segmented-button',
		className:'btn-group',
		defaultType: Button,
		itemsCount:0,
		allowToggle:true,
		allowMultiple:false,
		allowDepress:false,
		updateItems: function(){
			this._super.apply(this, arguments)
			this.applyValue(this.value)
		},
		/*add : function() {
			var me = this, args = Array.prototype.slice.apply(arguments), index = ( typeof args[0] == 'number') ? args.shift() : -1, layout = me.getLayout(),addingArray, items, i, length, item, pos, ret;

			if (args.length == 1 && _.isArray(args[0])) {
				items = args[0];
				addingArray = true;
			} else {
				items = args;
			};
			ret = items = me.prepareItems(items, true, me.afterAdd);
		},*/
		afterAdd:function(){
			var me = this,items = me.items,
			//layout = me.getLayout(),
			length = items.length;

			/*if (!addingArray && length == 1) {
				ret = items[0];
			}*/

			/*for (var i = 0; i < length; i++) {
				item = items[i];

				//pos = (index < 0) ? me.items.length : (index + i);

				
				items[i].onAdded(me);
				//me.onAdd(item, pos);
				//layout && layout.onAdd(item, pos);
			}*/
			_.each(items, function(item){
				item.onAdded(me);
			})
			me.items = items;
			this.updateItems();
		},
		applyValue: function (value, oldValue) {
			console.log('applyValue')
			var me = this
			var allowMultiple = me.allowMultiple
			var values = _.isArray(value) ? value : (value == null) ? [] : [value]
			oldValues = _.isArray(oldValue) ? oldValue : (oldValue == null) ? [] : [oldValue];
			var ln = values.length
			me._isApplyingValue = true;
			/*for (i = 0; i < ln; i++) {
	        value = values[i];*/
	        //button = me._lookupButtonByValue(value);
	        ln = values.length;

	        //<debug>
	        if (ln > 1 && !allowMultiple) {
	            Ext.raise('Cannot set multiple values when allowMultiple is false');
	        }
	        //</debug>

	        for (i = 0; i < ln; i++) {
	            value = values[i];
	            button = me._lookupButtonByValue(value);

	            if (button) {
		          buttonValue = button.value;

		          if ((buttonValue != null) && buttonValue !== value) {
		            // button has a value, but it was matched by index.
		            // transform the index into the button value
		            values[i] = buttonValue;
		          }

		          if (!button.pressed) {
		            button.setPressed(true);
		          }
		        }
		        //<debug>
		        else {
		          // no matched button. fail.
		          Ext.raise("Invalid value '" + value + "' for segmented button: '" + me.id + "'");
		        }
	            //</debug>
	        }

	        
	        for (i = 0, ln = oldValues.length; i < ln; i++) {
	            oldValue = oldValues[i];
	            if (!_.contains(values, oldValue)) {
	                me._lookupButtonByValue(oldValue).setPressed(false);
	            }
	        }
	        //</debug>
	      //}
	      	me._isApplyingValue = false;
		},
		getAllowToggle:function(){
			var internalName = this.$configPrefixed ? prefixedName : name;
            return this[internalName];
		},
		getValue: function(){
			return this.value
		}/*,
		lookupComponent: function(comp,callback) {
	        if (!(comp instanceof Backbone.View)) {
	            if (typeof comp === 'string') {
	                //comp = Ext.ComponentManager.get(comp);
	            } else {
	                comp = Manager.create(comp, this.defaultType,callback);       
	            }
	        }
	        //return comp;
	    }*/,
		onAdd : function(item, pos, len) {
			var me = this;
			me.itemsCount++;
			//me.items.push(item);
			item.on({
				'toggle': me._onItemToggle
			}, me);
			if (me.allowToggle) {
          item.enableToggle = true;
          if (!me.allowMultiple) {
              item.toggleGroup = me.getId();
              item.allowDepress = me.allowDepress;
          }
      }
			return this.itemsCount === len;
		}/*,
		prepareItems : function(items, applyDefaults, cb) {
			if (_.isArray(items)) {
				items = items.slice();
			} else {
				items = [items];
			}
			var me = this, i = 0, len = items.length, item;
			for (; i < len; i++) {
				item = items[i];
				if (item == null) {
					items.splice(i, 1); --i; --len;
				} else {
					if ( item instanceof Backbone.View) {
						items[i] = item;
						me.onAdd(item, i, len);
					} else {
						item.initOwnerCt = me;
						//item.renderTo = me.$el;
						item = me.lookupComponent(item,(function(index){
							return function(item){
								if(me.onAdd(item,index,len)){
									cb.call(me);
								}
							}
						})(i));
						if (item) {
							items[i] = item;
						}
						delete item.initOwnerCt;
					}
				}
			}
			me.items = items;
			return items;
		}*/,
		setValue: function(value){
			var oldValue = this.value
			this.value = value
			console.log(value)
			console.log(oldValue)
			this.applyValue(value, oldValue)
		},

    /**
     * Handles the "toggle" event of the child buttons.
     * @private
     * @param {Ext.button.Button} button
     * @param {Boolean} pressed
     */
    _onItemToggle: function(button, pressed) {
      if (this._isApplyingValue) {
          return;
      }
      var me = this,
          allowMultiple = me.allowMultiple,
          buttonValue = (button.value != null) ? button.value : me.items.indexOf(button),
          value = me.getValue(),
          valueIndex;

      if (allowMultiple) {
          valueIndex = _.indexOf(value, buttonValue);
      }

      if (pressed) {
        if (allowMultiple) {
          if (valueIndex === -1) {
          	value = $.makeArray(value);
            value.push(buttonValue);
          }
        } else {
          value = buttonValue;
        }
      } else {
        if (allowMultiple) {
          if (valueIndex > -1) {
            value.splice(valueIndex, 1);
          }
        } else if (value === buttonValue) {
          value = null;
        }
      }

      me.setValue(value);

      this.trigger('toggle', this, button, pressed);
    }/*,
		lookupComponent : function(cmp) {
			var Cls;
			if (_.has(cmp, 'xtype')) {
				Cls = cmp['cls'];
			} else {
				Cls = this.defaultType;
			}
			if(Cls){
				return new Cls($.extend(_.omit(cmp, 'cls'),{
					//renderTo:this.getItemContainer()
				}));
			}
			return false;
		}*/,

    /**
     * Looks up a child button by its value
     * @private
     * @param {String/Number} value The button's value or index
     * @return {Ext.button.Button}
     */
    _lookupButtonByValue: function(value) {
      var items = this.items,
        ln = items.length,
        i = 0,
        button = null,
        buttonValue, btn;

      for (; i < ln; i++) {
        btn = items[i];
        buttonValue = btn.value;
        if ((buttonValue != null) && buttonValue === value) {
          button = btn;
          break;
        }
      }

      if (!button && typeof value === 'number') {
        // no button matched by value, assume value is an index
        button = items[value];
      }

      return button;
    }
	})
}))