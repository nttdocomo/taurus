/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['./picker','../../view/boundList','underscore','backbone','../../../util/storeHolder','../../../selection/dataViewModel','../../collection/collection','../../../lang/event','jquery.scrollIntoView'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./picker'),require('../../view/boundList'),require('underscore'),require('backbone'),require('../../../util/storeHolder'), require('../../../selection/dataViewModel'), require('../../collection/collection'), require('../../../lang/event'),require('jquery.scrollIntoView'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./picker'),require('../../view/boundList'),require('underscore'),require('backbone'),require('../../../util/storeHolder'), require('../../../selection/dataViewModel'), require('../../collection/collection'),require('../../../lang/event'),require('jquery.scrollIntoView'));
	}
}(this, function(Picker,BoundList,_,Backbone,StoreHolder, DataViewModel, Collection) {
	return Picker.extend({
		allQuery: '',
		/**
     * @private
     */
    clearValueOnEmpty: true,
		delimiter : ', ',
		forceSelection: false,
		isExpanded : false,
		autoSelect: true,
		autoSelectLast: true,
		queryDelay:1000,
		queryMode : 'remote',
		queryParam : 'query',
		triggerAction: 'all',
		allQuery:'',
		triggerTpl : '<div class="input-group-btn"><button class="btn form-trigger btn-default" type="button"<%if(disabled){%> disabled="<%=disabled%>"<%}%>><span class="caret"></span></button></div>',
		initialize : function() {
			Picker.prototype.initialize.apply(this, arguments);
			//this.collection.on('reset',_.bind(this.expand,this));
		},
		initComponent: function(){
			this.bindStore(this.collection);
			this._super();
		},
		initField : function() {
			//this.displayTpl = this.getDisplayTpl();
			if (this.beforeInitField) {
				this.beforeInitField.apply(this, arguments);
			}
			if (this.collection) {
				if (!(this.collection instanceof Backbone.Collection)) {
					this.collection = new this.collection;
				}
				if (this.value && !_.isObject(this.value) && !this.collection.length) {
					this.collection.fetch({
						success : _.bind(Picker.prototype.initField, this)
					});
				} else {
					Picker.prototype.initField.apply(this, arguments);
				}
			}
		},
		afterQuery : function() {
			var me = this;
			if (me.collection.length) {
				if (me.typeAhead) {
					me.doTypeAhead();
				}
			}
		},
		getPickerWidth:function(){
			return this.triggerWrap.width()
		},
		alignPicker : function() {
			this.picker.setWidth(this.getPickerWidth());
			var me = this, picker = me.getPicker(), position, heightAbove = taurus.getPositionAbove(this.$el), heightBelow = taurus.getPositionBelow(this.$el), height = picker.getHeight();
			space = heightBelow;
			position = {
				"my" : "left top",
				"at" : "left bottom"
			};
			if (height > space - 5 && heightBelow < heightAbove) {
				space = heightAbove;
				position = {
					"my" : "left bottom",
					"at" : "left top"
				};
			}

			// Allow the picker to height itself naturally.
			/*if (picker.height) {
			 delete picker.height;
			 picker.updateLayout();
			 }*/
			if (picker.$el.height() > space - 5) {
				picker.setHeight(space - 5);
				// have some leeway so we aren't flush against
			}
			// Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
			me.doAlign(position);
			//Picker.prototype.alignPicker.apply(this,arguments);
		},
		assertValue: function() {
			var me = this
			var rawValue = me.getRawValue()
			var lastRecords = me.lastSelectedRecords
			var preventChange = false
			var rec
			if (me.forceSelection) {
				if (me.multiSelect) {} else {
					rec = me.findRecordByDisplay(rawValue);
					if (!rec) {
            if (lastRecords && (!me.allowBlank || me.rawValue)) {
                rec = lastRecords;
            } 
            // if we have a custom displayTpl it's likely that findRecordByDisplay won't
            // find the value based on RawValue, so we give it another try using the data
            // stored in displayTplData if there is any.
            else if (me.displayTplData && me.displayTplData.length) {
                rec = me.findRecordByValue(me.displayTplData[0][me.valueField]);
            }
          } 
          if (rec) {
            me.setValue(rec);
            me.trigger('select', rec);
          } else if (!preventChange) {
            if (lastRecords) {
              delete me.lastSelectedRecords;
            }
            // We need to reset any value that could have been set in the dom before or during a store load
            // for remote combos.  If we don't reset this, then ComboBox#getValue() will think that the value
            // has changed and will then set `undefined` as the .value for forceSelection combos.  This then
            // gets changed AGAIN to `null`, which will get set into the model field for editors. This is BAD.
            me.setRawValue('');
          }
				}
			}
		},
		delegateEvents : function(events) {
			var me = this,events = $.extend(events || {}, {
				'keyup input' : _.throttle(me.onKeyUp, me.queryDelay)
			});
			if (!me.editable) {
				events = $.extend(events, {
					'click input' : 'onTriggerClick'
				});
			}
			//Backbone.View.prototype.delegateEvents.call(this, events);
			Picker.prototype.delegateEvents.call(me, events);
		},

		doTypeAhead : function() {
			if (this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE) {
				this.onTypeAhead();
			}
		},
		doAutoSelect : function() {
			var me = this
			var value = me.getValue()
			var picker = me.picker
			var collection = me.collection
			var lastSelected, itemNode, selectionModel
			if (value) {
				value = $.makeArray(value);
			} else {
				value = [];
			}
			if(picker && me.autoSelect && collection.length > 0){
				if (me.autoSelectLast) {
					selectionModel = picker.getSelectionModel()
					lastSelected = selectionModel.lastSelected
					if (lastSelected && selectionModel.selected.length && collection.indexOf(lastSelected) > -1) {
            itemNode = lastSelected;
          }
				}
				picker.getNavigationModel().setPosition(itemNode)
			}
			/*
			lastSelected = this.collection.filter(function(model) {
				return _.indexOf(value,model.get(me.valueField)) > -1;
			});
			_.each(lastSelected,function(item){
				itemNode = picker.getNode(item);
				if (itemNode.length) {
					picker.highlightItem(itemNode);
					itemNode.scrollintoview(false);
				}
			});
			if (picker && me.autoSelect && me.collection.length > 0) {
				// Highlight the last selected item and scroll it into view
				lastSelected = picker.getSelectionModel().lastSelected;
				itemNode = picker.getNode(lastSelected || 0);
				if (itemNode) {
					picker.highlightItem(itemNode);
					itemNode.scrollintoview(false);
				}
			}*/
		},

		doLocalQuery : function(queryString) {
			var me = this, rawValue = queryString, collection;

			// Filter the Store according to the updated filter
			if(queryString){
				collection = me.collection.filter(function(model) {
					return model.get(me.displayField).indexOf(me.getRawValue()) > -1;
				});
			} else {
				collection = me.collection.clone().models;
			}

			// Expand after adjusting the filter unless there are no matches
			var picker = me.getPicker()
			if (collection.length || me.getPicker().emptyText) {
				me.expand();
			} else {
				me.collapse();
			}
			picker.collection.reset(collection);

			me.afterQuery();
		},
		doQuery : function(queryString, forceAll, rawQuery) {
			var me = this, isLocalMode = me.queryMode === 'local', collection = me.collection;
			/*if(!queryString){
				return false;
			}*/
			if (isLocalMode) {
				me.doLocalQuery(queryString);
				/*if(!collection.length){
					collection.fetch({
						success:function(){
							me.expand()
						}
					})
				} else {
					//if (!this.multiSelect){
						this.doLocalQuery(queryString);
					//}
				}*/
			} else {
				me.doRemoteQuery(queryString);
			}
		},
		doRemoteQuery : function(queryString) {
			var me = this, collection = me.collection;
			if(!queryString){
				return false;
			}
			var picker = me.getPicker()
			collection.fetch({
				data : this.getParams(queryString),
				success : function() {
					picker.collection.reset(collection.models);
					//me.doLocalQuery(queryString);
					if (!me.multiSelect){
						//me.doLocalQuery(queryString);
					}
				},
				reset:true
			});
			me.expand();
			/*if (!collection.length) {
				collection.fetch({
					data : this.getParams(),
					success : function() {
						me.doLocalQuery(queryString);
					}
				});
			} else {
				this.expand();
				if (!me.multiSelect){
					me.doLocalQuery(queryString);
				}
			}*/
		},
		findRecordByDisplay: function(value) {
			var result = this.collection.find(function(model){
				return model.get(this.displayValue) === value
			})
			return result;
		},
		getParams : function(queryString) {
			var params = {}, param = this.queryParam;

			if (queryString) {
				params[param] = queryString;
			}
			return params;
		},

    getStoreListeners: function(store) {

      // Don't bother with listeners on the dummy store that is provided for an unconfigured ComboBox
      // prior to a real store arriving from a ViewModel. Nothing is ever going to be fired.
      /*if (!store.isEmptyStore) {
        var me = this,
        result = {
          datachanged: me.onDataChanged,
          load: me.onLoad,
          exception: me.onException,
          update: me.onStoreUpdate,
          remove: me.checkValueOnChange
        };

        // If we are doing remote filtering, then mutating the store's filters should not
        // result in a re-evaluation of whether the current value is still present in the store.
        if (!store.getRemoteFilter()) {
          result.filterchange = me.checkValueOnChange;
        }

        return result;
      }*/
    },
		getValue : function() {
			return this.value;
		},
		completeEdit: function() {
			var me = this
			me.assertValue();
		},
		createPicker : function() {
			var me = this,picker = me.picker = new BoundList($.extend({
				selectionModel: me.pickerSelectionModel,
				floating: true,
				displayField : me.displayField,
				collection : me.collection.clone()
			}, me.listConfig));
			picker.on({
				'itemclick': me.onItemClick,
				'refresh': _.bind(me.onListRefresh,me)
			}, me);
			//this.doAutoSelect();
			return picker;
		},
		getDisplayTpl : function() {
			if (this.displayTpl) {
				return this.displayTpl;
			}
			return '<%_.each(value,function(item,index){%><%=item.' + this.displayField + '%><%if(index < value.length - 1){%>' + this.delimiter + '<%}%><%})%>';
		},
		getDisplayValue : function() {
			return _.template(this.getDisplayTpl())({
				value : this.displayTplData
			});
		},/**
     * Gets data for each record to be used for constructing the display value with
     * the {@link #displayTpl}. This may be overridden to provide access to associated records.
     * @param {Ext.data.Model} record The record.
     * @return {Object} The data to be passed for each record to the {@link #displayTpl}.
     *
     * @protected
     */
    getRecordDisplayData: function(record) {
      return record.toJSON();
    },
		load : function(options) {
			var success = options.success, me = this;
			options.success = function() {
				me.triggerEl.removeAttr('disabled');
				success && success.apply(me, arguments);
			};
			me.collection.fetch(options);
			me.triggerEl.attr('disabled', 'disabled');
		},
		onBindStore: function(){
			var me = this
			var store = me.collection
			me.valueCollection = new Collection();
			me.valueCollection.on({
				'beginupdate': me.onValueCollectionBeginUpdate,
				'endupdate': me.onValueCollectionEndUpdate,
			}, me)
			me.pickerSelectionModel = new DataViewModel({
        mode: me.multiSelect ? 'SIMPLE' : 'SINGLE',
        // There are situations when a row is selected on mousedown but then the mouse is dragged to another row
        // and released.  In these situations, the event target for the click event won't be the row where the mouse
        // was released but the boundview.  The view will then determine that it should fire a container click, and
        // the DataViewModel will then deselect all prior selections. Setting `deselectOnContainerClick` here will
        // prevent the model from deselecting.
        ordered: true,
        deselectOnContainerClick: false,
        enableInitialSelection: false,
        pruneRemoved: false,
        selected: me.valueCollection,
        store: store/*,
        listeners: {
            scope: me,
            lastselectedchanged: me.updateBindSelection
        }*/
    	});
    	console.log(me.pickerSelectionModel)
		},
		onItemClick : function(e, record) {
			var me = this, valueField = me.valueField, picker = me.getPicker(), value = me.value, lastSelected;
			if (value) {
				value = $.makeArray(value);
			} else {
				value = [];
			}
			var index = _.indexOf(value, record.get(me.valueField));
			if (!me.multiSelect){
				lastSelected = me.collection.find(function(item) {
					return value[0] == item.get(me.valueField);
				}, me);
				picker.onItemDeselect(lastSelected);
			}
			if (index != -1 && me.multiSelect) {
				value.splice(index, 1);
				picker.onItemDeselect(record);
			} else {
				value.push(record.get(me.valueField));
				picker.onItemSelect(record);
			}
			var selection = me.collection.filter(function(item) {
				return _.contains(value, item.get(me.valueField));
			}, me);
			if (!me.multiSelect && selection.length) {
				if (_.find(selection, function(item) {
					return record.get(valueField) === item.get(valueField);
				})) {
					me.trigger('select', record);
					me.setValue(record);
					me.collapse();
				};
			} else {
				me.addValue(selection);
			}
			return false;
			//Picker.prototype.onItemClick.apply(this,arguments);
		},
		onKeyUp : function(e) {
			var me = this,key = e.getKey(),
			isDelete = key === e.BACKSPACE || key === e.DELETE,
			rawValue = me.inputEl.val(),
			len = rawValue.length;
			//if (!e.isSpecialKey() && key !== 229) {
			this.doQuery(this.getRawValue(), false, true);
			if (!len && (!key || isDelete)) {
				// This portion of code may end up calling setValue will check for change. But since
                // it's come from field mutations, we need to respect the checkChangeBuffer, so
                // we suspend checks here, it will be handled by callParent
                ++me.suspendCheckChange;
                // Essentially a silent setValue.
                // Clear our value, and the tplData used to construct a mathing raw value.
                if (!me.multiSelect) {
                    me.value = null;
                    me.displayTplData = undefined;
                }
				/*if(clearValueOnEmpty){

				}*/
				me.collapse();
        --me.suspendCheckChange;
			}
			me._super.apply(this,arguments);
			//}
		},

		onListRefresh : function() {
			// Picker will be aligned during the expand call
			if (!this.expanding) {
				this.alignPicker();
			}
			this.doAutoSelect();
			//this.syncSelection();
		},
		onTriggerClick : function() {
			var me = this;
			if (me.isExpanded) {
				me.collapse();
			} else {
        if (me.triggerAction === 'all') {
            me.doQuery(me.allQuery, true);
        } else if (me.triggerAction === 'last') {
            me.doQuery(me.lastQuery, true);
        } else {
            me.doQuery(me.getRawValue(), false, true);
        }

			}
			me.inputEl.focus();
		},

		onTypeAhead : function() {
			var me = this, displayField = me.displayField, record = me.collection.find(function(model) {
				return model.get(displayField).indexOf(me.getRawValue()) > -1;
			}), boundList = me.getPicker(), newValue, len, selStart;

			if (record) {
				newValue = record.get(displayField);
				len = newValue.length;
				selStart = me.getRawValue().length;

				boundList.highlightItem(boundList.getNode(record));

				if (selStart !== 0 && selStart !== len) {
					me.setRawValue(newValue);
					me.selectText(selStart, newValue.length);
				}
			}
		},
		onValueCollectionBeginUpdate:function(){},
		onValueCollectionEndUpdate: function() {
      var me = this
      var selectedRecords = me.valueCollection.models
      me.updateBindSelection(me.pickerSelectionModel, selectedRecords);
      /*var store = me.store
      var selectedRecord = selectedRecords[0]
      var selectionCount = selectedRecords.length

      me.updateBindSelection(me.pickerSelectionModel, selectedRecords);

      if (me.isSelectionUpdating()) {
        return;
      }

      Ext.suspendLayouts();

      me.lastSelection = selectedRecords;
      if (selectionCount) {
        // Track the last selection with a value (non blank) for use in
        // assertValue
        me.lastSelectedRecords = selectedRecords;
      }*/

      me.updateValue();

      // If we have selected a value, and it's not possible to select any more values
      // or, we are configured to hide the picker each time, then collapse the picker.
      /*if (selectionCount && ((!me.multiSelect && store.contains(selectedRecord)) || me.collapseOnSelect || !store.getCount())) {
        me.updatingValue = true;
        me.collapse();
        me.updatingValue = false;
      }
      Ext.resumeLayouts(true);
      if (!me.suspendCheckChange) {
        if (!me.multiSelect) {
          selectedRecords = selectedRecord;
        }
        me.fireEvent('select', me, selectedRecords);
      }*/
    },

    updateBindSelection: function(selModel, selection) {
      var me = this,
          selected = null;

      if (!me.ignoreNextSelection) {
        me.ignoreNextSelection = true;
        if (selection.length) {
          selected = selModel.getLastSelected();
          me.hasHadSelection = true;
        }
        if (me.hasHadSelection) {
          me.setSelection(selected);
        }
        me.ignoreNextSelection = false;
      }
    },
    setSelection:function(selected){
    	this.selection = selected
    },
		addValue: function(value){
			if(value !== null){
				this.doSetValue(value, true)
			}
		},
		setValue : function(value) {
			var me = this;
			if (value != null) {
	            return me.doSetValue(value);
	        }
	        // Clearing is a special, simpler case.
	        else {
	            return me.doSetValue(null);
	        }
		},
		doSetValue:function(value, add){
			var me = this
			var displayField = me.displayField
			var Model = me.collection.model
			var valueField = me.valueField || displayField
			var forceSelection = me.forceSelection
			var selModel = me.pickerSelectionModel
			var matchedRecords = []
      var valueArray = []
			var processedValue = []
			var displayTplData = []
			var displayIsValue = me.displayField === me.valueField
			var displayTplData = me.displayTplData || (me.displayTplData = [])
			var lastSelection = me.lastSelection
			var model, record, displayValue, valueChanged
			displayTplData.length = 0
			if (_.isUndefined(value)) {
				return Picker.prototype.setValue.apply(me, value);
			}
			if (_.isString(value) && value == '') {
				return Picker.prototype.setValue.apply(me, [value]);
			}
			value = add ? $.makeArray(me.value).concat(value) : $.makeArray(value);
			for ( i = 0, len = value.length; i < len; i++) {
				record = value[i];
				if(!record || !(record instanceof Backbone.Model)){
					record = me.findRecordByValue(key = record);

	        // The value might be in a new record created from an unknown value (if !me.forceSelection).
	        // Or it could be a picked record which is filtered out of the main store.
	        // Or it could be a setValue(record) passed to an empty store with autoLoadOnValue and aded above.
	        if (!record) {
	          record = me.valueCollection.find(function(model){
	          	return model.get(me.valueField) === key
	          });
	        }
				}
				// record was not found, this could happen because
        // store is not loaded or they set a value not in the store
        if (!record) {
          // If we are allowing insertion of values not represented in the Store, then push the value and
          // create a new record to push as a display value for use by the displayTpl
          if (!forceSelection) {
              
            // We are allowing added values to create their own records.
            // Only if the value is not empty.
            if (!record && value[i]) {
              dataObj = {};
              dataObj[me.displayField] = value[i];
              if (me.valueField && me.displayField !== me.valueField) {
                  dataObj[me.valueField] = value[i];
              }
              record = new Model(dataObj);
            }
          }
          // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
          else if (me.valueNotFoundRecord) {
            record = me.valueNotFoundRecord;
          }
        }
        // record found, select it.
        if (record) {
          matchedRecords.push(record);
          valueArray.push(record.get(me.valueField));
        }
				/*val = value[i]
				if ((_.isString(val) || _.isNumber(val) || _.isObject(val)) && me.collection.length) {
					if (_.isString(val) || _.isNumber(val)) {
						record = me.collection.find(function(model) {
							return model.get(valueField) == val;
						});
					}
					if (_.isObject(val)) {
						record = me.collection.find(function(model) {
							var value;
							if ( val instanceof Backbone.Model) {
								value = val.get(valueField);
							} else {
								value = val[valueField];
							}
							return model.get(valueField) == value;
						});
					}
				} else {
					record = val;
				}
				if (record) {
					me.lastSelectedRecords = record
					if ( record instanceof Backbone.Model) {
						record = record.toJSON();
					}
					displayTplData.push(record);
					processedValue.push(record[valueField]);
					me.updateValue();
				} else {

				}*/
			}
			// If the same set of records are selected, this setValue has been a no-op
      if (lastSelection) {
        len = lastSelection.length;
        if (len === matchedRecords.length) {
          for (i = 0; !valueChanged && i < len; i++) {
            if (_.indexOf(me.lastSelection, matchedRecords[i]) === -1) {
              valueChanged = true;
            }
          }
        } else {
          valueChanged = true;
        }
      } else {
        valueChanged = matchedRecords.length;
      }
      if (valueChanged) {
        // beginUpdate which means we only want to notify this.onValueCollectionEndUpdate after it's all changed.
        //me.suspendEvent('select');
        me.valueCollection.beginUpdate();
        if (matchedRecords.length) {
          selModel.select(matchedRecords, false);
        } else {
          selModel.deselectAll();
        }
        me.valueCollection.endUpdate();
        //me.resumeEvent('select');
      } else {
        me.updateValue();
      }
			/*me.displayTplData = displayTplData;
			me.value = processedValue.length ? me.multiSelect ? _.uniq(processedValue) : processedValue[0] || '' : value ? value : '';
			if(_.isArray(me.value)){
				if(!me.multiSelect){
					me.value = me.value[0]
				}
			}
			me.applyEmptyText();*/
			return Picker.prototype.setValue.apply(this, [this.value]);
		},
		updateValue:function(){
			var me = this
			var valueArray = []
			var selectedRecords = me.valueCollection.models
      var inputEl = me.inputEl
      displayTplData = me.displayTplData || (me.displayTplData = [])
      var displayValue
			/*if (inputEl && me.emptyText && !_.isEmpty(me.value)) {
        inputEl.removeClass(me.emptyCls);
      }*/
      displayTplData.length = 0;
      for (i = 0; i < len; i++) {
        record = selectedRecords[i];
        displayTplData.push(me.getRecordDisplayData(record));

        // There might be the bogus "value not found" record if forceSelect was set. Do not include this in the value.
        if (record !== me.valueNotFoundRecord) {
          valueArray.push(record.get(me.valueField));
        }
      }
      me.displayTplData = displayTplData;
      displayValue = me.getDisplayValue();
      me.setRawValue(displayValue);
      me.refreshEmptyText();
      me.checkChange();
      
      if (inputEl && me.typeAhead && me.hasFocus) {
        // if typeahead is configured, deselect any partials
        me.selectText(displayValue.length);
      }
		},
		clearValue : function() {
			this.setValue(null);
		},

    /**
     * Finds the record by searching values in the {@link #valueField}.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or `false`.
     */
    findRecordByValue: function(value) {
    	var me = this
      var result = this.collection.find(function(model){
      	return model.get(me.valueField) === value
      })
      var ret = false

      // If there are duplicate keys, tested behaviour is to return the *first* match.
      if (result) {
          ret = result;
      }
      return ret;
    },
		getSubTplData : function() {
			var me = this,
			displayValue = me.getDisplayValue(),
			data = me._super.apply(this, arguments);
			if(displayValue){
				data.value = displayValue;
			}
			return data;
		},

	    getSubmitValue: function() {
	        var value = this.getValue();
	        // If the value is null/undefined, we still return an empty string. If we
	        // don't, the field will never get posted to the server since nulls are ignored.
	        if(_.isNumber(value)){
	        	return value
	        }
	        if (_.isEmpty(value)) {
	            value = '';
	        }
	        return value;
	    },
		valueToRaw : function(value) {
			return Picker.prototype.valueToRaw.apply(this, [this.getDisplayValue()]);
		}
	}).mixins(StoreHolder);
}));
