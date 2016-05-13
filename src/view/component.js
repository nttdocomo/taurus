/**
 * @author nttdocomo
 */
 (function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['../state/stateful','underscore','taurus','backbone','../lang/number','../mixins','../jquery.ui.position'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('../state/stateful'),require('underscore'),require('taurus'),require('backbone'),require('../lang/number'),require('../mixins'),require('../jquery.ui.position'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('../state/stateful'),require('underscore'),require('taurus'),require('backbone'),require('../lang/number'),require('../mixins'),require('../jquery.ui.position'));
	}
}(this, function(Stateful,_,taurus,Backbone) {
	return Backbone.View.extend({
		isRendered : false,
		doc : taurus.$doc,
		_ensureElement : function() {
			if (!this.el) {
				var attrs = _.extend({}, _.result(this, 'attributes'));
				if (this.id)
					attrs.id = _.result(this, 'id');
				else
					this.id = attrs.id = _.result(this, 'cid');
				if (this.className)
					attrs['class'] = _.result(this, 'className');
				var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
				this.setElement($el, false);
			} else {
				this.setElement(_.result(this, 'el'), false);
			}
		},
		addClass:function(cls){
			this.$el.addClass(cls)
		},
	    disable:function(){
	    	var me = this;
	    	if (!me.disabled) {
	    		if (me.rendered) {
	                me.onDisable();
	            } else {
	                me.disableOnRender = true;
	            }
	    	}
	    	me.$el.attr('disabled',true);
	    	me.disabled = true;
	    },
	    enable:function(){
	    	var me = this;
	    	me.$el.attr('disabled',false);
	    	if(me.disabled){
	    		if (!me.hasOwnProperty('disabled')) {
	    			me.disabled = false;
	    		}
	    	}
	    },
		getRefOwner: function () {
	        var me = this;

	        // Look for both ownerCt (classic toolkit) and parent (modern toolkit)
	        // Look for ownerCmp before floatParent for scenarios like a button menu inside a floating window.
	        return me.ownerCt || me.parent || me.$initParent || me.ownerCmp || me.floatParent;
	    },
		initCls: function() {
            var me = this,
                cls = [me.baseCls];/*,
                targetCls = me.getComponentLayout().targetCls;

            if (targetCls) {
                cls.push(targetCls);
            }

            //<deprecated since=0.99>
            if (Ext.isDefined(me.cmpCls)) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn('Ext.Component: cmpCls has been deprecated. Please use componentCls.');
                }
                me.componentCls = me.cmpCls;
                delete me.cmpCls;
            }
            //</deprecated>

            if (me.componentCls) {
                cls.push(me.componentCls);
            } else {
                me.componentCls = me.baseCls;
            }*/

            return cls;
        },
		setElement: function(element) {
			var cls = this.initCls();

      		this.undelegateEvents();
			this._setElement(element);

            this.$el.addClass(cls.join(' '));
			return this;
		},

	    /**
	     * Retrieves the `id` of this component. Will auto-generate an `id` if one has not already been set.
	     * @return {String}
	     */
	    getId: function() {
	        var me = this,
	            xtype;

	        // If we have no id, attempt to gather it from our configuration.
	        // Autogenerate it if none was configured.
	        if (!(me.id || (me.id = me.initialConfig.id))) {
	            xtype = me.getXType();
	            if (xtype) {
	                xtype = xtype.replace(Ext.Component.INVALID_ID_CHARS_Re, '-');
	            } else {
	                xtype = Ext.name.toLowerCase() + '-comp';
	            }
	            me.id = xtype + '-' + me.getAutoId();
	        }
	        return me.id;
	    },

	    /**
	     * Gets the xtype for this component as registered with {@link Ext.ComponentManager}. For a list of all available
	     * xtypes, see the {@link Ext.Component} header. Example usage:
	     *
	     *     var t = new Ext.form.field.Text();
	     *     alert(t.getXType());  // alerts 'textfield'
	     *
	     * @return {String} The xtype
	     */
	    getXType: function() {
	        return this.xtype;
	    },
		initialize : function(options) {
			var me = this;
			this.initialConfig = options;
			_.extend(this, options);
			this.initComponent();
			if (me.style) {
				me.initialStyle = me.style;
				me.$el.css(me.style);
			}
			//Stateful.prototype.initialize.apply(this,arguments);
		},
		initComponent:function(){
			/*
			 * if has selector then render, for let the user see the ui as soon as possible
			 */
			if (this.renderTo) {
				this.render(this.renderTo, this.operation);
			}
			if (this.autoShow && !this.isContained) {
	            this.show();
	        }
			this.$el.data('component', this);
			this.on(this.listeners);
			if (this.cls) {
	            this.$el.addClass(this.cls);
	        }
	        this.delegateEvents();
		},

        /**
         * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
         * @private
         */
        getTargetEl: function() {
            return this.frameBody || this.$el;
        },
		initItems : function() {
			var me = this, items = me.items;
			me.items = [];
			if (items) {
				if (!_.isArray(items)) {
					items = [items];
				}

				me.add(items);
			}
		},

	    /**
	     * Method to determine whether this Component is currently disabled.
	     * @return {Boolean} the disabled state of this Component.
	     */
	    isDisabled : function() {
	        return this.disabled;
	    },

	    /**
	     * Returns `true` if this component is visible.
	     *
	     * @param {Boolean} [deep=false] Pass `true` to interrogate the visibility status of all parent Containers to
	     * determine whether this Component is truly visible to the user.
	     *
	     * Generally, to determine whether a Component is hidden, the no argument form is needed. For example when creating
	     * dynamically laid out UIs in a hidden Container before showing them.
	     *
	     * @return {Boolean} `true` if this component is visible, `false` otherwise.
	     *
	     * @since 1.1.0
	     */
	    isVisible: function(deep) {
	        var me = this,
	            hidden = !this.$el.is(':visible');

	        /*if (me.hidden || !me.rendered || me.isDestroyed) {
	            hidden = true;
	        } else if (deep) {
	            hidden = me.isHierarchicallyHidden();
	        }*/

	        return !hidden;
	    },
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events/*, this.listeners*/);
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		getTplData : function(data) {
			return _.extend({
				id : this.cid
			},data);
		},

	    /**
	     * Allows addition of behavior to the disable operation.
	     * After calling the superclass's `onDisable`, the Component will be disabled.
	     *
	     * @template
	     * @protected
	     */
	    onDisable: function () {
	    },
		onShow:function(){

		},

	    setLocalXY: function(x, y) {
	        this.$el.css({ top: y, left: x });
	    },

	    /**
	     * Sets the page XY position of the component. To set the left and top instead, use {@link #setPosition}.
	     * This method fires the {@link #event-move} event.
	     * @param {Number/Number[]} x The new x position or an array of `[x,y]`.
	     * @param {Number} [y] The new y position.
	     * @param {Boolean/Object} [animate] True to animate the Component into its new position. You may also pass an
	     * animation configuration.
	     * @return {Ext.Component} this
	     */
	    setPagePosition: function(x, y, animate) {
	        var me = this,
	            p,
	            floatParentBox;

	        me.setPosition(x, y, animate);

	        return me;
	    },

	    /**
	     * @member Ext.Component
	     * Sets the left and top of the component. To set the page XY position instead, use {@link Ext.Component#setPagePosition setPagePosition}. This
	     * method fires the {@link #event-move} event.
	     * @param {Number/Number[]/Object} x The new left, an array of `[x,y]`, or animation config object containing `x` and `y` properties.
	     * @param {Number} [y] The new top.
	     * @param {Boolean/Object} [animate] If `true`, the Component is _animated_ into its new position. You may also pass an
	     * animation configuration.
	     * @return {Ext.Component} this
	     */
	    setPosition: function(x, y, animate) {
	        var me = this;
	        me.setLocalXY(x, y);
	        return me;
	    },
		show : function() {
			var me = this;
            //me.beforeShow();
			me.$el.show();
			me.trigger('show',this);
			me.hidden = false;
			me.onShow()
			return me;
		},
		showAt : function(x, y, animate) {
			var me = this;

	        // Not rendered, then animating to a position is meaningless,
	        // just set the x,y position and allow show's processing to work.
	        if (!me.rendered && (me.autoRender || me.floating)) {
	            me.x = x;
	            me.y = y;
	            return me.show();
	        }
	        if (me.floating) {
	            me.setPosition(x, y, animate);
	        } else {
	            me.setPagePosition(x, y, animate);
	        }
	        return me.show();
		},

	    /**
	     * Shows this component by the specified {@link Ext.Component Component} or {@link Ext.dom.Element Element}.
	     * Used when this component is {@link #floating}.
	     * @param {Ext.Component/Ext.dom.Element} component The {@link Ext.Component} or {@link Ext.dom.Element} to show the component by.
	     * @param {String} [position] Alignment position as used by {@link Ext.util.Positionable#getAlignToXY}.
	     * Defaults to `{@link #defaultAlign}`. See {@link #alignTo} for possible values.
	     * @param {Number[]} [offsets] Alignment offsets as used by {@link Ext.util.Positionable#getAlignToXY}. See {@link #alignTo} for possible values.
	     * @return {Ext.Component} this
	     */
	    showBy: function(cmp, pos, off) {
	        var me = this;

	        //<debug>
	        /*if (!me.floating) {
	            Ext.log.warn('Using showBy on a non-floating component');
	        }*/
	        //</debug>

	        /*if (me.floating && cmp) {
	            me.alignTarget = cmp;

	            if (pos) {
	                me.defaultAlign = pos;
	            }

	            if (off) {
	                me.alignOffset = off;
	            }*/
            if (!me.isVisible()) {
            	me.show();
	        }

            // Could have been vetoed.
            if (!me.hidden) {
                me.alignTo(cmp, pos || me.defaultAlign, off || me.alignOffset);
            }
	        //}

	        return me;
	    },
		hide : function() {
			this.$el.hide();
			return this;
		},
		render : function(renderTo, operation) {
			this.operation = operation || "append";
			renderTo = renderTo || this.renderTo || $(document.body);
			/*run html brfore append el because the el must has html*/
			$(renderTo)[this.operation](this.$el);
			if(this.isRendered){
				return this;
			}
			this.renderHtml();
			this.isRendered = true;
			this.rendered = true;
			this.setSize(this.width, this.height);
			return this;
		},
		renderHtml : function(data) {
			this.inserHtml(data)
			var el = document.createElement('div');
			if (this.uiClass) {
				this.$el.addClass(this.uiClass);
			}
			el.appendChild(this.el.cloneNode(true));
			this.afterRender();
			return el.innerHTML;
		},
		setUI:function(){
			var classes = me.addClsWithUI(uiCls, true);
		},
		addClsWithUI:function(classes, skip){
			var clsArray = [];
			for (; i < length; i++) {
		        cls = classes[i];
		        clsArray = clsArray.concat(me.addUIClsToElement(cls));
		    }
		    return clsArray;
		},
		/**
	     * Method which adds a specified UI + `uiCls` to the components element. Can be overridden
	     * to add the UI to more than just the component's element.
	     * @param {String} uiCls The UI class to add to the element.
	     * @protected
	     */
	    addUIClsToElement: function (uiCls) {
	        var me = this,
	            baseClsUI = me.baseCls + '-' + me.ui + '-' + uiCls,
	            result = [ Ext.baseCSSPrefix + uiCls, me.baseCls + '-' + uiCls, baseClsUI ],
	            childEls, childElName, el, suffix;

	        if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
	            // Loop through each frame element, and if they are defined add the ui:
	            baseClsUI += '-';
	            childEls = me.getChildEls();

	            for (childElName in childEls) {
	                suffix = childEls[childElName].frame;
	                if (suffix && suffix !== true) {
	                    el = me[childElName];
	                    if (el) {
	                        el.addCls(baseClsUI + suffix);
	                    }
	                }
	            }
	        }

	        return result;
	    },
		inserHtml:function(data){
			var html = '';
			if(this.innerHtml){
				this.el.innerHTML = this.innerHtml;
			} else {
				data = data || this.getTplData();
				if(data){
					html = this.tpl ? _.template(this.tpl)(data || this) : "";
				}
			}
			if(this.html){
				html = this.html + html;
			}
			this.$el.html(html)
		},
		$html : function(options) {
			return $(this.renderHtml());
		},
		afterRender : function() {
			this.applyChildEls();
			if (this.contentEl) {
				var contentEl = $('#' + this.contentEl);
				this.getContentTarget().append(contentEl);
			}
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend({},this.childEls, childEls);
			for (var k in childEls) {
				this[k] = this.$el.find(childEls[k]);
			}
		},
		getHeight : function() {
			return this.$el.height();
		},
		getWidth:function(){
			return this.$el.width();
		},
		getOuterHeight : function() {
			return this.$el.outerHeight();
		},
		getOuterWidth : function() {
			return this.$el.outerWidth();
		},
		setSize : function(width, height) {
			var me = this;

			// support for standard size objects
			if (width && typeof width == 'object') {
				height = width.height;
				width = width.width;
			}

			// Constrain within configured maxima
			if ( typeof width == 'number') {
				me.width = taurus.Number.constrain(width, me.minWidth, me.maxWidth);
			} else if (width === null) {
				delete me.width;
			}

			if ( typeof height == 'number') {
				me.height = taurus.Number.constrain(height, me.minHeight, me.maxHeight);
			} else if (height === null) {
				delete me.height;
			}
			this.updateLayout();
		},
		updateLayout : function() {
			var me = this, width = me.width, height = me.height;
			if (typeof width == 'number') {
				me.setWidth(width);
			}
			if (typeof height == 'number') {
				me.setHeight(height);
			}
		},
		setHeight : function(height) {
			return this.$el.css('height', height);
		},
		setWidth : function(width) {
			var borderWidth = parseInt(this.$el.css('borderLeftWidth').replace('px', '')) + parseInt(this.$el.css('borderLeftWidth').replace('px', ''));
			if(!_.isNaN(borderWidth)){
				width = width - borderWidth;
			}
			return this.$el.width(width);
		},
		alignTo : function(element, position, offsets) {

			// element may be a Component, so first attempt to use its el to align to.
			// When aligning to an Element's X,Y position, we must use setPagePosition which disregards any floatParent
			this.$el.css({
				position : 'absolute'
			});
			this.$el.position($.extend({
				"of" : element.$el || element
			}, position));
			//this.setPagePosition(this.$el.getAlignToXY(element.$el || element, position, offsets));
			return this;
		},
		undelegateEvents : function(useDefault) {
			if (useDefault) {
				Backbone.View.prototype.undelegateEvents.apply(this, arguments);
			}
		},
		getItemContainer : function() {
			return this.$el;
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
						item = me.lookupComponent(item);
						if (item) {
							items[i] = item;
						}
						delete item.initOwnerCt;
					}
				}
			}/*
			 _.each(items, function(item, i) {
			 if ( item instanceof Backbone.View) {
			 me.onAdd(item, i, len);
			 }
			 var cmp = me.lookupComponent(item);
			 if (cmp) {
			 items[i] = new cmp(_.omit(item, 'cls'));
			 me.onAdd(items[i], i, len);
			 }
			 });*/
			return items;
		},
		lookupComponent : function(cmp) {
			var Cls;
			if (_.has(cmp, 'cls')) {
				Cls = cmp['cls'];
			} else {
				Cls = this.defaultType;
			}
			if(Cls){
				return new Cls($.extend(_.omit(cmp, 'cls'),{
					//renderTo:this.getItemContainer(cmp)
				}));
			}
			return false;
		},
		onAdd : function(item, pos, len) {
		},
		onAdded:function(container){
			this.ownerCt = container;
		},
		getLayout:function(){
			return this.layout;
		},
		add : function() {
			var me = this, args = Array.prototype.slice.apply(arguments), index = ( typeof args[0] == 'number') ? args.shift() : -1, layout = me.getLayout(),addingArray, items, i, length, item, pos, ret;

			if (args.length == 1 && _.isArray(args[0])) {
				items = args[0];
				addingArray = true;
			} else {
				items = args;
			};
			ret = items = me.prepareItems(items, true);
			length = items.length;

			if (!addingArray && length == 1) {
				ret = items[0];
			}

			for ( i = 0; i < length; i++) {
				item = items[i];

				pos = (index < 0) ? me.items.length : (index + i);

				if (item.floating) {
					me.floatingItems.add(item);
					item.onAdded(me, pos);
				} else {
					me.items.splice(pos, 0, item);
					item.onAdded(me, pos);
					me.onAdd(item, pos);
					layout && layout.onAdd(item, pos);
				}
			}
			//me.items = items;
			me.updateLayout()
			me.updateItems();
			return ret;
			/*var me = this, len = this.items.length;
			 _.each(this.items, function(item, i) {
			 me.getItemContainer().append(item.render().$el);
			 });
			 this.afterRender();*/
		},
		removeItem:function(component, autoDestroy){
	        var me = this,
	            c = me.getComponent(component);
	        me.doRemove(c,autoDestroy);
			me.updateItems();
			return c;
		},
		doRemove:function(component,doDestroy){
			var me = this,
			doDestroy = doDestroy === true || (doDestroy !== false && this.autoDestroy),
			isDestroying = component.destroying || doDestroy,
			index = _.indexOf(me.items,component);
			me.items.splice(index,1)
			component.onRemoved(isDestroying);
		},
		onRemoved:function(destroying){
			if(destroying){
				this.remove()
			}
		},
		updateItems:function(){
			var me = this;
			_.each(this.items,function(item){
				item.render(me.getTargetEl(item))
			})
		},
		insert : function(index, comp) {
			var compIdx;
			if (comp) {
				compIdx = _.indexOf(this.items,comp);
				if (compIdx !== -1) {
					return this.move(compIdx, index);
				}
			}
			return this.add(index, comp);
		},
		remove : function() {
			this.components && _.each(this.components, function(item, i) {
				item.remove();
			});
			return Backbone.View.prototype.remove.apply(this, arguments);
		},

		// @private
		getContentTarget : function() {
			return this.$el;
		},

		/**
		 * Returns the value of {@link #itemId} assigned to this component, or when that
		 * is not set, returns the value of {@link #id}.
		 * @return {String}
		 */
		getItemId : function() {
			return this.cid;
		},
		getComponent : function(comp) {
			if (_.isObject(comp)) {
				comp = comp.getItemId();
			}

			var c = _.find(this.items, function(item) {
				return item.cid == comp;
			}) || this.items[comp];

			// Only allow finding by index on the main items container
			if (!c && typeof comp != 'number') {
				c = this.floatingItems.get(comp);
			}

			return c;
		},
		up: function (selector, limit) {
			return this.$el.parentsUntil(selector).parent().data('component');
		}
	},{
		INVALID_ID_CHARS_Re: /[\.,\s]/g,
		updateLayout:function(){}
	}).mixins(Stateful);
}));
