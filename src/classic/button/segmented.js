define(function(require){
	var Base = require('../view/base'),
	Manager = require('../manager');
	return Base.extend({
		xtype: 'segmentedbutton',
		className:'segmented-button btn-group',
		defaultType: 'button',
		itemsCount:0,
		allowToggle:true,
		allowMultiple:false,
		allowDepress:false,
		add : function() {
			var me = this, args = Array.prototype.slice.apply(arguments), index = ( typeof args[0] == 'number') ? args.shift() : -1, layout = me.getLayout(),addingArray, items, i, length, item, pos, ret;

			if (args.length == 1 && _.isArray(args[0])) {
				items = args[0];
				addingArray = true;
			} else {
				items = args;
			};
			ret = items = me.prepareItems(items, true, me.afterAdd);
			/*var me = this, len = this.items.length;
			 _.each(this.items, function(item, i) {
			 me.getItemContainer().append(item.render().$el);
			 });
			 this.afterRender();*/
		},
		afterAdd:function(){
			var me = this,items = me.items,
			//layout = me.getLayout(),
			length = items.length;

			/*if (!addingArray && length == 1) {
				ret = items[0];
			}*/

			for ( i = 0; i < length; i++) {
				item = items[i];

				//pos = (index < 0) ? me.items.length : (index + i);

				
				item.onAdded(me);
				//me.onAdd(item, pos);
				//layout && layout.onAdd(item, pos);
			}
			me.items = items;
			this.updateItems();
		},
		getAllowToggle:function(){
			var internalName = this.$configPrefixed ? prefixedName : name;
            return this[internalName];
		},
		lookupComponent: function(comp,callback) {
	        if (!(comp instanceof Backbone.View)) {
	            if (typeof comp === 'string') {
	                //comp = Ext.ComponentManager.get(comp);
	            } else {
	                /*comp = */Manager.create(comp, this.defaultType,callback);       
	            }
	        }
	        //return comp;
	    },
		onAdd : function(item, pos, len) {
			var me = this;
			me.itemsCount++;
			me.items.splice(pos,1,item);
			item.on('toggle',me._onItemToggle,me);
			if (me.allowToggle) {
	            item.enableToggle = true;
	            if (!me.allowMultiple) {
	                item.toggleGroup = me.getId();
	                item.allowDepress = me.allowDepress;
	            }
	        }
			return this.itemsCount === len;
		},
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
						/*if (item) {
							items[i] = item;
						}
						delete item.initOwnerCt;*/
					}
				}
			}
			me.items = items;
			return items;
		},

        /**
         * Handles the "toggle" event of the child buttons.
         * @private
         * @param {Ext.button.Button} button
         * @param {Boolean} pressed
         */
        _onItemToggle: function(button, pressed) {
            /*if (this._isApplyingValue) {
                return;
            }
            var me = this,
                Array = Ext.Array,
                allowMultiple = me.allowMultiple,
                buttonValue = (button.value != null) ? button.value : me.items.indexOf(button),
                value = me.getValue(),
                valueIndex;

            if (allowMultiple) {
                valueIndex = Array.indexOf(value, buttonValue);
            }

            if (pressed) {
                if (allowMultiple) {
                    if (valueIndex === -1) {
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

            me.setValue(value);*/

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
		}*/
	})
})