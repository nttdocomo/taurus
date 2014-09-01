/**
 * @author nttdocomo
 */
define(function(require) {
	require('../taurus');
	require('../lang/number');
	require('../jquery.ui.position');
	return taurus.view("taurus.views.Base", Backbone.View.extend({
		isRendered : false,
		doc : taurus.$doc,
		_ensureElement : function() {
			if (!this.el) {
				var attrs = _.extend({}, _.result(this, 'attributes'));
				if (this.id)
					attrs.id = _.result(this, 'id');
				else
					attrs.id = _.result(this, 'cid');
				if (this.className)
					attrs['class'] = _.result(this, 'className');
				var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
				this.setElement($el, false);
			} else {
				this.setElement(_.result(this, 'el'), false);
			}
		},
		initialize : function(options) {
			this.initialConfig = options;
			_.extend(this, options);
			/*
			 * if has selector then render, for let the user see the ui as soon as possible
			 */
			if (this.renderTo) {
				this.render(this.renderTo, this.operation);
			}
			this.$el.data('component', this);
			this.on(this.listeners);
			this.setSize(this.width, this.height);
			if (this.cls) {
	            this.$el.addClass(this.cls);
	        }
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
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events/*, this.listeners*/);
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		getTplData : function() {
			return {
				id : this.cid
			};
		},
		show : function() {
			this.$el.show();
			return this;
		},
		hide : function() {
			this.$el.hide();
			return this;
		},
		render : function(renderTo, operation) {
			this.operation = operation || "append";
			renderTo = renderTo || this.renderTo;
			/*run html brfore append el because the el must has html*/
			if (renderTo) {
				$(renderTo)[this.operation](this.$el);
			}
			this.html();
			this.isRendered = true;
			return this;
		},
		html : function(data) {
			if(this.innerHtml){
				this.el.innerHTML = this.innerHtml;
			} else {
				this.$el.html(this.tpl ? _.template(this.tpl, (data || this.getTplData() || this)) : "");
			}
			
			var el = document.createElement('div');
			if (this.uiClass) {
				this.$el.addClass(this.uiClass);
			}
			el.appendChild(this.el.cloneNode(true));
			this.afterRender();
			var height = this.height;
			if (height) {
				this.$el.css('height', height);
			}
			this.initItems();
			return el.innerHTML;
		},
		$html : function(options) {
			return $(this.html());
		},
		afterRender : function() {
			this.applyChildEls();
			if (this.contentEl) {
				var contentEl = $('#' + this.contentEl);
				this.getContentTarget().append(contentEl);
			}
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend(this.childEls, childEls);
			for (var k in childEls) {
				this[k] = this.$el.find(childEls[k]);
			}
		},
		getHeight : function() {
			return this.$el.height();
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
			if (this.width) {
				this.setWidth(this.width);
			}
			if (this.height) {
				this.setHeight(this.height);
			}
		},
		setHeight : function(height) {
			return this.$el.css('height', height);
		},
		setWidth : function(width) {
			var borderWidth = parseInt(this.$el.css('borderLeftWidth').replace('px', '')) + parseInt(this.$el.css('borderLeftWidth').replace('px', ''));
			return this.$el.width(width - borderWidth);
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
						item = me.lookupComponent(item);
						if (item) {
							items[i] = item;
						}
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
					renderTo:this.getItemContainer()
				}));
			}
			return false;
		},
		onAdd : function(item, pos, len) {
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
					//item.onAdded(me, pos);
					me.onAdd(item, pos);
					layout && layout.onAdd(item, pos);
				}
			}
			return ret;
			/*var me = this, len = this.items.length;
			 _.each(this.items, function(item, i) {
			 me.getItemContainer().append(item.render().$el);
			 });
			 this.afterRender();*/
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
		}
	}));
});
