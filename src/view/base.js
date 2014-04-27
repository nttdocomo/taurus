/**
 * @author nttdocomo
 */
define(function(require) {
	require('../taurus');
	require('../jquery.ui.position');
	return taurus.view("taurus.views.Base", Backbone.View.extend({
		isRendered : false,
		doc:taurus.$doc,
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
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events/*, this.listeners*/);
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		getTplData : function() {
			return {};
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
			var html = this._html = this.el.innerHTML = this.tpl ? _.template(this.tpl, (data || this.getTplData() || this)) : "";
			var el = document.createElement('div');
			if(this.uiClass){
				this.$el.addClass(this.uiClass);
			}
			el.appendChild(this.el.cloneNode(true));
			this.afterRender();
			var height = this.height;
			if(height){
				this.$el.css('height',height);
			}
			if (this.items) {
				this.prepareItems();
			}
			return el.innerHTML;
		},
		$html : function(options) {
			return $(this.html());
		},
		afterRender : function() {
			this.applyChildEls();
		},
		applyChildEls : function(childEls) {
			var childEls = $.extend(this.childEls,childEls);
			for (var k in childEls) {
				this[k] = this.$el.find(childEls[k]);
			}
		},
		getHeight : function() {
			return this.$el.height();
		},
		setHeight : function(height) {
			return this.$el.css('height',height);
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
		prepareItems : function() {
			var me = this, items = this.items.concat([]), len = items.length;
			this.items = [];
			_.each(items, function(item, i) {
				if ( item instanceof Backbone.View) {
					me.onAdd(item, i, len);
				}
				if(_.has(item, 'cls')){
					me.onAdd(new item['cls'](_.omit(item, 'cls')), i, len);
				} else {
					require.async(taurus.itemPathPrefix + taurus.util.lowercase(item.xtype).replace(/\./ig, '/'), function(cls) {
						delete item.className;
						me.model && me.model.get(item.displayField);
						if (me.model && !item.value) {
							item.value = me.model.get(item.name);
						}
						me.onAdd(new cls(item), i, len);
					});
				}
			});
		},
		onAdd : function(item, pos, len) {
			this.items[pos] = item;
			if (this.items.length == len) {
				this.add();
			}
		},
		add : function() {
			var me = this, len = this.items.length;
			_.each(this.items, function(item, i) {
				me.getItemContainer().append(item.render().$el);
			});
			this.afterRender();
		},
		remove : function() {
			this.components && _.each(this.components, function(item, i) {
				item.remove();
			});
			return Backbone.View.prototype.remove.apply(this, arguments);
		}
	}));
});
