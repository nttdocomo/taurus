/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		var Panel = __webpack_require__(2),
			Table = __webpack_require__(3),
			$body = $("#main"),
			Collection = Backbone.PageableCollection.extend({
				//url: "json/pageable-territories.json",
				mode: "client",
				state: {
					pageSize: 10000
				}
			}),
			collection = new Collection([{
			'company' : '3m Co',
			'price' : 71.72,
			'change' : 0.02,
			'pctChange' : 0.03,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Alcoa Inc',
			'price' : 29.01,
			'change' : 0.42,
			'pctChange' : 1.47,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Altria Group Inc',
			'price' : 83.81,
			'change' : 0.28,
			'pctChange' : 0.34,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'American Express Company',
			'price' : 52.55,
			'change' : 0.01,
			'pctChange' : 0.02,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'American International Group, Inc.',
			'price' : 64.13,
			'change' : 0.31,
			'pctChange' : 0.49,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'AT&T Inc.',
			'price' : 31.61,
			'change' : -0.48,
			'pctChange' : -1.54,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Boeing Co.',
			'price' : 75.43,
			'change' : 0.53,
			'pctChange' : 0.71,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Caterpillar Inc.',
			'price' : 67.27,
			'change' : 0.92,
			'pctChange' : 1.39,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Citigroup, Inc.',
			'price' : 49.37,
			'change' : 0.02,
			'pctChange' : 0.04,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'E.I. du Pont de Nemours and Company',
			'price' : 40.48,
			'change' : 0.51,
			'pctChange' : 1.28,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Exxon Mobil Corp',
			'price' : 68.1,
			'change' : -0.43,
			'pctChange' : -0.64,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'General Electric Company',
			'price' : 34.14,
			'change' : -0.08,
			'pctChange' : -0.23,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'General Motors Corporation',
			'price' : 30.27,
			'change' : 1.09,
			'pctChange' : 3.74,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Hewlett-Packard Co.',
			'price' : 36.53,
			'change' : -0.03,
			'pctChange' : -0.08,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Honeywell Intl Inc',
			'price' : 38.77,
			'change' : 0.05,
			'pctChange' : 0.13,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Intel Corporation',
			'price' : 19.88,
			'change' : 0.31,
			'pctChange' : 1.58,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'International Business Machines',
			'price' : 81.41,
			'change' : 0.44,
			'pctChange' : 0.54,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Johnson & Johnson',
			'price' : 64.72,
			'change' : 0.06,
			'pctChange' : 0.09,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'JP Morgan & Chase & Co',
			'price' : 45.73,
			'change' : 0.07,
			'pctChange' : 0.15,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'McDonald\'s Corporation',
			'price' : 36.76,
			'change' : 0.86,
			'pctChange' : 2.40,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Merck & Co., Inc.',
			'price' : 40.96,
			'change' : 0.41,
			'pctChange' : 1.01,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Microsoft Corporation',
			'price' : 25.84,
			'change' : 0.14,
			'pctChange' : 0.54,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Pfizer Inc',
			'price' : 27.96,
			'change' : 0.4,
			'pctChange' : 1.45,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'The Coca-Cola Company',
			'price' : 45.07,
			'change' : 0.26,
			'pctChange' : 0.58,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'The Home Depot, Inc.',
			'price' : 34.64,
			'change' : 0.35,
			'pctChange' : 1.02,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'The Procter & Gamble Company',
			'price' : 61.91,
			'change' : 0.01,
			'pctChange' : 0.02,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'United Technologies Corporation',
			'price' : 63.26,
			'change' : 0.55,
			'pctChange' : 0.88,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Verizon Communications',
			'price' : 35.57,
			'change' : 0.39,
			'pctChange' : 1.11,
			'lastChange' : '9/1 12:00am'
		}, {
			'company' : 'Wal-Mart Stores, Inc.',
			'price' : 45.45,
			'change' : 0.73,
			'pctChange' : 1.63,
			'lastChange' : '9/1 12:00am'
		}]);
		new Table({
			hideHeaders:true,
			loading : true,
			refreshable : true,
			collapsible: true,
			height : 350,
			width : 600,
			title : 'Array Grid',
			columns : [{
				text : 'Company',
				flex : 1,
				sortable : false,
				dataIndex : 'company',
				renderer:function(value){
					return value;
				}
			}, {
				text : 'Price',
				flex : 1,
				sortable : true,
				dataIndex : 'price'
			}, {
				text : 'Change',
				width : 85,
				sortable : true,
				dataIndex : 'change'
			}, {
				text : '% Change',
				width : 105,
				sortable : true,
				dataIndex : 'pctChange'
			}, {
				text : 'Last Change',
				width : 105,
				sortable : false,
				dataIndex : 'lastChange'
			}],
			collection : collection,
			renderTo : $body
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Base = __webpack_require__(4);
		var Spinner = __webpack_require__(5);
		return taurus.view('taurus.panel.Base',Base.extend({
			autoHeight:false,
			header:true,
			referTo:$(window),
			tpl:'<%if(header){%><div class="panel-heading"><h4 class="panel-title"><%=title%></h4></div><%}%><div class="panel-body"><%=content%></div>',
			className:'panel panel-default',
			events:{
				'click .refresh' : 'refresh',
				'click .tool-collapse-top, .tool-expand-bottom' : 'toggleCollapse'
			},
			initialize:function(){
				Base.prototype.initialize.apply(this,arguments);
				if(this.title){
					this.$el.addClass('has-header');
				}
			},
			getTplData : function() {
				return {
					header:this.title,
					title:this.collapsible ? this.title + '<span class="tool-collapse-top"></span>' : this.title,
					content:this.loading ? (new Spinner({
						renderTo:this.$el
					})).html() : this.content,
					tool:this.refreshable ? '<a href="" class="pull-right halflings refresh" data-name="refresh" data-type="" data-prefix="halflings" data-utf="E031"></a>':''
				};
			},

		    /**
		     * Shortcut for performing an {@link #method-expand} or {@link #method-collapse} based on the current state of the panel.
		     * @return {Ext.panel.Panel} this
		     */
		    toggleCollapse: function(e) {
		        this.collapsed ? this.expand() : this.collapse();
		    	$(e.target).toggleClass('tool-collapse-top').toggleClass('tool-expand-bottom');
		    	this.$el.toggleClass('collapsed');
		    	return false;
		    },
		    expand:function(){
		    	this.collapsed = false;
		    	this.setHeight(this.height)
		    },
		    collapse:function(){
		    	this.collapsed = true;
		    	this.setHeight('')
		    },
			refresh:function(){
				this.onRefresh && this.onRefresh();
				return false;
			},
			getItemContainer : function() {
				return Base.prototype.getItemContainer.apply(this,arguments).find('.panel-body');
			}
		}));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Panel = __webpack_require__(2);
		var Table = __webpack_require__(6);
		var Header = __webpack_require__(7);
		var Pagination = __webpack_require__(8);
		var Spinner = __webpack_require__(5);
		return Panel.extend({
			pager:false,
			className:'panel panel-default grid',
			applyChildEls:function(childEls){
				childEls = $.extend({
					'headEl' : '.panel-heading',
					'bodyEl' : '.panel-body',
					'frameBody' : '.panel-body'
				}, childEls);
				Panel.prototype.applyChildEls.call(this,childEls);
			},
			initComponent:function(options){
				var me = this,
				viewConfig,
	            headerCtCfg = me.columns || [],
	            view,
	            i, len,
	            columns, viewScroller;

	            if (_.isArray(headerCtCfg)) {
	                headerCtCfg = {
	                    items: headerCtCfg
	                };
	            }

	            _.extend(headerCtCfg, {
	                grid: me/*,
	                forceFit: me.forceFit,
	                sortable: me.sortableColumns,
	                enableColumnMove: me.enableColumnMove,
	                enableColumnResize: me.enableColumnResize,
	                columnLines: me.columnLines,
	                sealed: me.sealedColumns*/
	            });

	            if (me.hideHeaders) {
	                headerCtCfg.height = 0;
	                // don't set the hidden property, we still need these to layout
	                headerCtCfg.hiddenHeaders = true;
	            }
	            me.headerCt = new Header(headerCtCfg);
	            me.items = [me.headerCt];

				/*this.table = new Table($.extend(options,{
					collection:this.collection,
					columns:this.columns,
					sortable:this.sortable,
					renderTo:this.$el.find('.panel-body')
				}));*/
				viewConfig = _.extend({
	                // TableView injects the view reference into this grid so that we have a reference as early as possible
	                // and Features need a reference to the grid.
	                // For these reasons, we configure a reference to this grid into the View
	                grid: me,
	                renderTo:me.bodyEl,
	                collection:me.collection,
	                ownerGrid: me.ownerGrid,
	                headerCt: me.headerCt,
	                panel: me,
	                emptyText: me.emptyText || ''
	            }, me.viewConfig);

	            me.items.push(_.extend({
	            	cls:Table
	            },viewConfig));
				Panel.prototype.initComponent.apply(this,[options]);


				if(this.collection instanceof Backbone.PageableCollection){
					this.$el.addClass('has-pager');
					this.paging = new Pagination({
						uiClass:'panel-footer',
						collection:this.collection,
						renderTo:this.$el
					});
					this.$el.css({
						'padding-bottom':this.paging.$el.outerHeight()
					})
				}

				/*if(this.pager){
					new Pagination({
						uiClass:'panel-footer',
						collection:this.collection,
						renderTo:this.$el
					});
				}
				var top = 0,not_last_child = this.$el.find('.panel-body > div:not(:last-child)');
				not_last_child.each(function(key,item){
					top += $(item).outerHeight();
				});
				this.$el.find('.panel-body').css('padding-top',top);
				this.$el.find('.panel-body > div:first-child').css('margin-top',-1*top);*/
				/*if(this.pager){
					this.collection.pager();
				}else{
					this.collection.fetch();
				}
				this.collection.on('sync',function(){
					this.html();
				},this);*/
				var headElHeight = me.headEl.outerHeight();
				me.$el.css('padding-top',headElHeight+'px');
				me.headEl.css('margin-top','-' + headElHeight+'px')
				if (me.hideHeaders) {
	                me.bodyEl.css('padding-top',0)
	            }
			},
			getTplData:function(){
				return $.extend(Panel.prototype.getTplData.apply(this,arguments),{
					content:''
				});
			},
			getFullWidth:function(){
				var columns = this.columns,headers = this.$el.find('.header-ct th'),len = columns.length,i=fullWidth=0;
				for (; i < len; i++) {
		            var column = columns[i],header = headers.eq(i);
		            // use headers getDesiredWidth if its there
		            if (column.flex) {
		                fullWidth += header.width() || 0;
		            // if injected a diff cmp use getWidth
		            } else {
		                fullWidth += column.width;
		            }
		        }
		        return fullWidth;
			},

		    getVisibleColumnManager: function() {
		        return this.columns;
		    },
			html:function(){
				this.$el.find('.panel-body').empty();
				var html = Panel.prototype.html.apply(this,arguments);
				return html;
			}
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		__webpack_require__(9);
		__webpack_require__(10);
		return taurus.view("taurus.views.Base", Backbone.View.extend({
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
				this.initialConfig = options;
				_.extend(this, options);
				this.initComponent()
			},
			initComponent:function(){
				/*
				 * if has selector then render, for let the user see the ui as soon as possible
				 */
				this.setSize(this.width, this.height);
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
			getTplData : function() {
				return {
					id : this.cid
				};
			},
			show : function() {
				this.$el.show();
				this.trigger('show',this);
				this.hidden = false;
				return this;
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
				this.html();
				this.isRendered = true;
				this.rendered = true;
				return this;
			},
			html : function(data) {
				this.inserHtml(data)
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
			inserHtml:function(data){
				if(this.innerHtml){
					this.el.innerHTML = this.innerHtml;
				} else {
					data = data || this.getTplData();
					if(!data){
						this.$el.html("");
					} else {
						this.$el.html(this.tpl ? _.template(this.tpl, (data || this.getTplData() || this)) : "");
					}
				}
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
						//renderTo:this.getItemContainer()
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
						//me.items.splice(pos, 0, item);
						item.onAdded(me, pos);
						me.onAdd(item, pos);
						layout && layout.onAdd(item, pos);
					}
				}
				me.items = items;
				this.updateItems();
				return ret;
				/*var me = this, len = this.items.length;
				 _.each(this.items, function(item, i) {
				 me.getItemContainer().append(item.render().$el);
				 });
				 this.afterRender();*/
			},
			updateItems:function(){
				var me = this;
				_.each(this.items,function(item){
					item.render(me.getTargetEl())
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
			}
		},{
			INVALID_ID_CHARS_Re: /[\.,\s]/g
		}));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Base = __webpack_require__(4);
		return taurus.view('taurus.spinner.Wave',Base.extend({
			tpl:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div>',
			className:'spinner wave'
		}))
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Base = __webpack_require__(4);
		var Thead = __webpack_require__(11);
		var TableBody = __webpack_require__(12);
		return Base.extend({
			header:true,
			tpl:'<div class="grid-item-container"><table><%=rows%></table></div>',
			rowTpl:['<tr>',
	            '<%=cell%>',
	        '</tr>'].join(''),
	        cellTpl: [
		        '<td class="<%=tdCls%>" <%=tdAttr%> style="<%if(tdStyle){%><%=tdStyle%><%}%>" tabindex="-1">',
		            '<div class="grid-cell-inner" ',
		                'style="text-align:<%=align%>;<%if(style){%><%=style%><%}%>"><%=value%></div>',
		        '</td>'].join(''),
			className:'grid-view',

		    // Private properties used during the row and cell render process.
		    // They are allocated here on the prototype, and cleared/re-used to avoid GC churn during repeated rendering.
		    rowValues: {
		        itemClasses: [],
		        rowClasses: []
		    },
		    cellValues: {
		        classes: [
		            taurus.baseCSSPrefix + 'grid-cell ' + taurus.baseCSSPrefix + 'grid-td' // for styles shared between cell and rowwrap
		        ]
		    },
			initialize:function(config){
		        // Adjust our base class if we are inside a TreePanel
		        if (config.grid.isTree) {
		            config.baseCls = taurus.baseCSSPrefix + 'tree-view';
		        }
				Base.prototype.initialize.apply(this,arguments);
			},
			initComponent:function(){
		        var me = this;

		        if (me.columnLines) {
		            me.addCls(me.grid.colLinesCls);
		        }
		        if (me.rowLines) {
		            me.addCls(me.grid.rowLinesCls);
		        }

		        /**
		         * @private
		         * @property {Ext.dom.Fly} body
		         * A flyweight Ext.Element which encapsulates a reference to the view's main row containing element.
		         * *Note that the `dom` reference will not be present until the first data refresh*
		         */
		        //me.body = new Ext.dom.Fly();
		        //me.body.id = me.id + 'gridBody';

		        // If trackOver has been turned off, null out the overCls because documented behaviour
		        // in AbstractView is to turn trackOver on if overItemCls is set.
		        if (!me.trackOver) {
		            me.overItemCls = null;
		        }

		        me.headerCt.view = me;

		        // Features need a reference to the grid.
		        // Grid needs an immediate reference to its view so that the view can reliably be got from the grid during initialization
		        me.grid.view = me;
		        me.initFeatures(me.grid);

		        //me.itemSelector = me.getItemSelector();
		        //me.all = new Ext.view.NodeCache(me);

		        Base.prototype.initComponent.apply(this,arguments);
		        me.collection.on('sync',_.bind(me.reset,me));
		        me.collection.on('reset',_.bind(me.reset,me));
		        $(window).on('resize',function(){
		        	me.headerCt.setColumnsWidth(me.getCellsWidth())
		        });
				/*var me = this, headerCtCfg = this.columns;
				if(this.header){
					if (_.isArray(headerCtCfg)) {
		                headerCtCfg = {
		                    items: headerCtCfg
		                };
		            }
		            new Thead($.extend(headerCtCfg,{
		            	renderTo:this.$el
		            }))
				}
				me.collection.on('reset',_.bind(this.reset,this));*/
				/*this.table = new TableBody($.extend({
					collection:this.collection,
					columns:this.columns,
					rowTemplate:this.rowTemplate,
					sortable:this.sortable,
					renderTo:this.$el
				}));*/
			},
			afterRender:function(){
				Base.prototype.afterRender.apply(this,arguments);
				this.headerCt.setColumnsWidth(this.getCellsWidth())
			},
			getCellsWidth:function(){
				var cells = this.$el.find('tr:eq(0) > td');
				return _.map(cells,function(cell){
					return $(cell).innerWidth();
				})
			},
			initFeatures:function(grid){
		        /*var me = this,
		            i,
		            features,
		            feature,
		            len;

		        // Row container element emitted by tpl
		        me.tpl             = Ext.XTemplate.getTpl(this, 'tpl');

		        // The rowTpl emits a <div>
		        me.rowTpl          = Ext.XTemplate.getTpl(this, 'rowTpl');
		        me.addRowTpl(Ext.XTemplate.getTpl(this, 'outerRowTpl'));

		        // Each cell is emitted by the cellTpl
		        me.cellTpl        = Ext.XTemplate.getTpl(this, 'cellTpl');

		        me.featuresMC = new Ext.util.MixedCollection();
		        features = me.features = me.constructFeatures();
		        len = features ? features.length : 0;
		        for (i = 0; i < len; i++) {
		            feature = features[i];

		            // inject a reference to view and grid - Features need both
		            feature.view = me;
		            feature.grid = grid;
		            me.featuresMC.add(feature);
		            feature.init(grid);
		        }*/
			},
			getTplData:function(){
				return {
					//THead:this.renderTHead(),
					rows:this.renderRows(this.collection.toJSON())
				}
			},
			renderRows:function(rows, viewStartIndex){
		        var rowValues = this.rowValues,
		            rowCount = rows.length,
		            html = '',
		            i;

		        rowValues.view = this;
		        viewStartIndex = viewStartIndex || 0;
		        //rowValues.columns = columns;
		        for (i = 0; i < rowCount; i++, viewStartIndex++) {
		            rowValues.itemClasses.length = rowValues.rowClasses.length = 0;
		            html += this.renderRow(rows[i], i, viewStartIndex);
		        }

		        // Dereference objects since rowValues is a persistent on our prototype
		        rowValues.view = rowValues.columns = rowValues.record = null;
		        return html;
			},
			renderRow:function(record, recordIndex, rowIndex){
				var me = this,
				columns,
				rowValues = me.rowValues;
				rowValues.record = record
				if (!rowValues.columns) {
		            columns = rowValues.columns = me.ownerCt.getVisibleColumnManager()//.getColumns();
		        } else {
		        	columns = rowValues.columns;
		        }
				return _.template(this.rowTpl,_.extend(rowValues,{
					cell:me.renderCells(columns, record, recordIndex, rowIndex)
				},me.tableValues));
			},
			renderCells:function(columns,record,recordIndex,rowIndex){
				var me = this;
				return _.map(columns,function(column,i){
					return me.renderCell(column, record, recordIndex,rowIndex,i)
				}).join('')
			},
			renderCell:function(column, record, recordIndex, rowIndex, columnIndex){
				var me = this,
				cellValues = me.cellValues,
				classes = cellValues.classes,
				fieldValue = record[column.dataIndex];
				cellValues.align = column.align;
				cellValues.column = column;
				cellValues.tdCls = cellValues.tdStyle = cellValues.tdAttr = cellValues.style = "";
				if(column.cellWidth){
					cellValues.tdStyle = 'width:'+column.cellWidth+'px;';
					cellValues.style = 'width:'+column.cellWidth+'px;';
				}
				if (column.renderer && column.renderer.call) {
		            fullIndex = me.ownerCt.columnManager.getHeaderIndex(column);
		            value = column.renderer.call(column.usingDefaultRenderer ? column : column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, fullIndex, me.dataSource, me);
		            if (cellValues.css) {
		                // This warning attribute is used by the compat layer
		                // TODO: remove when compat layer becomes deprecated
		                record.cssWarning = true;
		                cellValues.tdCls += ' ' + cellValues.css;
		                cellValues.css = null;
		            }

		            // Add any tdCls which was added to the cellValues by the renderer.
		            if (cellValues.tdCls) {
		                classes[clsInsertPoint++] = cellValues.tdCls;
		            }
		        } else {
		            value = fieldValue;
		        }
		        cellValues.tdCls = classes.join(' ');
				cellValues.value = (value == null || value === '') ? column.emptyCellText : value;
				return _.template(this.cellTpl,_.extend(cellValues));
			},
			renderTHead:function(){
		        var headers = this.headerFns,
		            len, i;

		        if (headers) {
		            for (i = 0, len = headers.length; i < len; ++i) {
		                headers[i].call(this, values, out, parent);
		            }
		        }
			},
			reset:function(){
				this.html();
			},
			childEls:{
				'gridBody':'.grid-body',
				'gridTable':'.grid-table',
				'gridHeader':'.grid-header',
				'gridTableCell':'.grid-table tr:eq(0) td',
				'gridTableHeader':'.grid-table tr:eq(0) th',
				'gridTableHeaderCell':'.grid-header tr th',
				'gridResizeMarker':'.grid-resize-marker'
			}
		})
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		var Base = __webpack_require__(4),
		Column = __webpack_require__(13),
		ColumnManager = __webpack_require__(14);
		return Base.extend({
			className : 'grid-header-ct',
			defaultType : Column,
			events:{
				'click .column-header':'onHeaderCtEvent'
			},
			initComponent : function() {
				var me = this;
		        me.headerCounter = 0;
		        me.plugins = me.plugins || [];
		        me.defaults = me.defaults || {};

		        if (!me.isGroupHeader) {
	                me.isRootHeader = true;

		            me.columnManager = new ColumnManager(false, me);
		            me.visibleColumnManager = new ColumnManager(true, me);
		            if (me.grid) {
		                me.grid.columnManager = me.columnManager;
		                me.grid.visibleColumnManager = me.visibleColumnManager;
		            }
		            if(me.hiddenHeaders){
		            	me.$el.css('display','none');
		            }
	            }
				Base.prototype.initComponent.apply(this, arguments);
			},

		    /**
		     * Returns an array of all columns which appear in the grid's View. This goes down to the leaf column header
		     * level, and does not return **grouped** headers which contain sub headers.
		     *
		     * It includes hidden headers even though they are not rendered. This is for collection of menu items for the column hide/show menu.
		     *
		     * Headers which have a hidden ancestor have a `hiddenAncestor: true` property injected so that descendants are known to be hidden without interrogating
		     * that header's ownerCt axis for a hidden ancestor.
		     * @returns {Array}
		     */
		    getGridColumns: function(/* private - used in recursion*/inResult, hiddenAncestor) {
		        if (!inResult && this.gridDataColumns) {
		            return this.gridDataColumns;
		        }

		        var me = this,
		            result = inResult || [],
		            items, i, len, item,
		            lastVisibleColumn;

		        hiddenAncestor = hiddenAncestor || me.hidden;
		        if (me.items) {
		            items = me.items.items;

		            // An ActionColumn (Columns extend HeaderContainer) may have an items *array* being the action items that it renders.
		            if (items) {
		                for (i = 0, len = items.length; i < len; i++) {
		                    item = items[i];
		                    if (item.isGroupHeader) {
		                        // Group headers will need a visibleIndex for if/when they're removed from their owner.
		                        // See Ext.layout.container.Container#moveItemBefore.
		                        item.visibleIndex = result.length;
		                        item.getGridColumns(result, hiddenAncestor);
		                    } else {
		                        item.hiddenAncestor = hiddenAncestor;
		                        result.push(item);
		                    }
		                }
		            }
		        }
		        if (!inResult) {
		            me.gridDataColumns = result;
		        }

		        // If top level, correct first and last visible column flags
		        if (!inResult && len) {
		            // Set firstVisible and lastVisible flags
		            for (i = 0, len = result.length; i < len; i++) {
		                item = result[i];

		                // The column index within all (visible AND hidden) leaf level columns.
		                // Used as the cellIndex in TableView's cell renderer call
		                item.fullColumnIndex = i;
		                item.isFirstVisible = item.isLastVisible = false;
		                if (!(item.hidden || item.hiddenAncestor)) {
		                    if (!lastVisibleColumn) {
		                        item.isFirstVisible = true;
		                    }
		                    lastVisibleColumn = item;
		                }
		            }
		            // If we haven't hidden all columns, tag the last visible one encountered
		            if (lastVisibleColumn) {
		                lastVisibleColumn.isLastVisible = true;
		            }
		        }

		        return result;
		    },

		    getHeaderElByEvent: function(e) {
		        return $(e.currentTarget);
		    },

		    /**
		     * Returns an array of the **visible** columns in the grid. This goes down to the lowest column header
		     * level, and does not return **grouped** headers which contain sub headers.
		     * @returns {Array}
		     */
		    getVisibleGridColumns: function() {
		        var me = this,
		            allColumns, rootHeader,
		            result, len, i, column;

		        if (me.gridVisibleColumns) {
		            return me.gridVisibleColumns;
		        }

		        allColumns = me.getGridColumns();
		        rootHeader = me.getRootHeaderCt();
		        result = [];
		        len = allColumns.length;

		        // Use an inline check instead of ComponentQuery filtering for better performance for
		        // repeated grid row rendering - as in buffered rendering.
		        for (i = 0; i < len; i++) {
		            column = allColumns[i];

		            if (!column.hidden && !column.isColumnHidden(rootHeader)) {
		                result[result.length] = column;
		            }
		        }

		        me.gridVisibleColumns = result;

		        return result;
		    },

		    onHeaderCtEvent: function(e, t) {
		        var me = this,
		            headerEl = me.getHeaderElByEvent(e),
		            header,
		            targetEl,
		            allColumns = me.getGridColumns(),
		            len = allColumns.length,
		            activeHeader;

		        if (me.longPressFired) {
		            // if we just showed the menu as a result of a longpress, do not process
		            // the click event and sort the column.
		            me.longPressFired = false;
		            return;
		        }

		        if (headerEl/* && !me.ddLock*/) {
		            header = headerEl.data('component');
		            if (header) {
		            	activeHeader = header.onTitleElClick(e, targetEl, me.sortOnClick);
		                /*targetEl = header[header.clickTargetName];
		                // If there's no possibility that the mouseEvent was on child header items,
		                // or it was definitely in our titleEl, then process it
		                if ((!header.isGroupHeader && !header.isContainer) || e.within(targetEl)) {
		                    if (e.type === 'click' || e.type === 'tap') {
		                        // The header decides which header to activate on click
		                        // on Touch, anywhere in the splitter zone activates
		                        // the left header.
		                        activeHeader = header.onTitleElClick(e, targetEl, me.sortOnClick);
		                        if (activeHeader) {
		                            me.onHeaderTriggerClick(activeHeader, e, Ext.supports.Touch ? activeHeader.el : activeHeader.triggerEl);
		                        } else {
		                            me.onHeaderClick(header, e, t);
		                        }
		                    }
		                    else if (e.type === 'contextmenu') {
		                        me.onHeaderContextMenu(header, e, t);
		                    } else if (e.type === 'dblclick' && header.resizable) {
		                        header.onTitleElDblClick(e, targetEl.dom);
		                    }
		                }*/
		            }
		        };
		        for (i = 0; i < len; i++) {
		            column = allColumns[i];

		            column.setSortState();
		        }
		    },
			setColumnsWidth:function(widths){
				var headers = this.$el.find('.column-header');
				headers.each(function(i,header){
					$(header).width(widths[i]);
				});
			},
			/*setSize:function(){
				var width = this.$el.width(), items = this.items, headers = this.$el.find('.column-header'), fullWidth = 0;
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i], header = headers.eq(i);
					if (!item.flex) {
						fullWidth += item.width;
						header.width(item.width);
					}
				}
				flexWidth = width - fullWidth;
				var flexItems = _.filter(items, function(item) {
					return item.flex;
				});
				flexWidth = flexWidth / flexItems.length;
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i], header = headers.eq(i);
					if (item.flex) {
						header.width(flexWidth);
					}
				}
			},*/
			getGridColumns:function(){
				var result = [];
				this.$el.find('.column-header').each(function(i,item){
					result.push($(this).data('component'));
				});
				return result;
			},

			// invoked internally by a header when not using triStateSorting
			clearOtherSortStates : function(activeHeader) {
				var headers = this.getGridColumns(), headersLn = headers.length, i = 0;

				for (; i < headersLn; i++) {
					if (headers[i] !== activeHeader && headers[i].sortable) {
						// unset the sortstate and dont recurse
						headers[i].setSortState(null, true);
					}
				}
			}
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		var Base = __webpack_require__(4),
		i18n = __webpack_require__(15);
		return taurus.view('taurus.view.Pagination', Base.extend({
			//tpl:'<ul><li<% if (currentPage <= firstPage) { %> class="disabled"<%}%>><a href="#">Prev</a></li><% for(p=1;p<=totalPages;p++){%><li<% if (currentPage == p) { %> class="disabled"<% } %>><a href="#"><%= p %></a></li><%}%><li<% if (currentPage == totalPages) { %> class="disabled"<%}%>><a href="#">Next</a></li></ul>',
			tpl:'<%=fastBackward%><%=backward%><span><%=pageDesc%></span><%=forward%><%=fastForward%>',
			tagName:'div',
			className:'pagination',
			events:{
				'click .backward':function(){
					this.collection.hasPreviousPage() && this.collection.getPreviousPage();
				},
				'click .forward':function(){
					this.collection.hasNextPage() && this.collection.getNextPage();
				},
				'click .fast-backward':function(){
					this.collection.getPage(1);
				},
				'click .fast-forward':function(){
					this.collection.getPage(this.collection.state.totalPages);
				}
			},
			initialize : function() {
				Base.prototype.initialize.apply(this,arguments);
				this.collection.on('sync', this.html, this);
				this.collection.on('reset', this.html, this);
			},
			delegateEvents:function(){
				var events = $.extend({}, this.events, {
					'click a' : 'onPagerClick'
				});
				Base.prototype.delegateEvents.call(this, events);
			},
			onPagerClick:function(e){
				var target = $(e.target),isActive = !target.parent('li').hasClass('disabled'),page;
				if(isActive){
					page = target.text();
					if(/\d/.test(page)){
						this.collection.goTo(page);
					}
					if(page.toLowerCase() == 'prev'){
						this.collection.requestPreviousPage();
					}
					if(page.toLowerCase() == 'next'){
						this.collection.requestNextPage();
					}
				}
				return false;
			},
			html:function(){
				if(this.collection.length){
					var info = this.collection.state;
					return Base.prototype.html.call(this,$.extend({
						fastBackward : '<a href="" class="halflings fast-backward" data-name="fast-backward" data-type="" data-prefix="halflings" data-utf="E070"></a>',
						backward : '<a href="" class="halflings backward" data-name="backward" data-type="" data-prefix="halflings" data-utf="E071"></a>',
						fastForward : '<a href="" class="halflings fast-forward" data-name="fast-forward" data-type="" data-prefix="halflings" data-utf="E076"></a>',
						forward : '<a href="" class="halflings forward" data-name="forward" data-type="" data-prefix="halflings" data-utf="E077"></a>',
						pageDesc:i18n.__("Page %d of %d",info.currentPage,info.totalPages),
						totalPages:0
					},info));
				}
				return '';
			}
		}));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		if(!$.browser){
			$.browser = {};
			$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
			$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
			$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
			$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		}
		$.each(['BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'], function() {
			if (document.body.style[this] !== undefined)
				$.support.borderRadius = true;
			return (!$.support.borderRadius);
		});
		var doc = document, win = window;
		var subfixs = ['s', 'm', 'h', '天', '年'];
		var divisors = [1000, 60, 60, 24, 365];
		function d(a, b) {
			var c = window, d = a.split(".");
			for (var e = 0, f = d.length; e < f; e++) {
				var g = d[e];
				typeof c[g] == "undefined" && (c[g] = {}), c = c[g]
			}
			if (b)
				for (var i in b)
				c[i] = b[i];
			return c
		};
		d("taurus", {
			itemPathPrefix:'',
			baseCSSPrefix : "g-",
			BLANK_IMAGE_URL : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
			copyTo : function(dest, source, names, usePrototypeKeys) {
				if ( typeof names == "string") {
					names = names.split(/[,;\s]/);
				}
				var n, nLen = names.length, name;
				for ( n = 0; n < nLen; n++) {
					name = names[n];
					if (usePrototypeKeys || source.hasOwnProperty(name)) {
						dest[name] = source[name];
					}
				}
				return dest;
			},
			emptyFn : function() {
			},
			expando : false,
			filter : function(a, b, c) {
				var d;
				if ($.isArray(a)) {
					var e = [];
					for (var f = 0, g = a.length; f < g; ++f) {
						d = c ? b.call(c, a[f], f, a) : b(a[f], f, a);
						if (!d) {
							continue;
						}
						e.push(a[f]);
					}
					return e;
				}
				if (jQuery.isPlainObject(a)) {
					var h = {};
					for (var i in a) {
						d = c ? b.call(c, i, a[i], a) : b(i, a[i], a);
						if (!d) {
							continue;
						}
						h[i] = a[i];
					}
					return h;
				}
			},
			outerHtml : function(el) {
				var div = document.createElement("div");
				div.appendChild(el);
				return div.innerHTML;
			},
			isDefined : function(value) {
				return typeof value !== "undefined";
			},

			/**
			 * Returns true if the passed value is empty, false otherwise. The value is deemed to be empty if it is either:
			 *
			 * - `null`
			 * - `undefined`
			 * - a zero-length array
			 * - a zero-length string (Unless the `allowEmptyString` parameter is set to `true`)
			 *
			 * @param {Object} value The value to test
			 * @param {Boolean} allowEmptyString (optional) true to allow empty strings (defaults to false)
			 * @return {Boolean}
			 * @markdown
			 */
			isEmpty : function(value, allowEmptyString) {
				return (value === null) || (value === undefined) || ( allowEmptyString ? value === '' : false) || ($.isArray(value) && value.length === 0);
			},
			isSSL : function() {
				return taurus.proto === "https";
			},
			mixin : function(oldProps, newProps) {
				for (var key in newProps) {
					if ( typeof oldProps[key] == 'undefined') {
						oldProps[key] = newProps[key]
					}
				}
			},
			name : "taurus",
			proto : "https",
			provide : d,
			reduce : function(a, b, c) {
				return $.each(a, function(a, d) {
					b = c(b, a, d)
				}), b
			},
			$win : $(window),
			$doc : $(document),
			$body : $(document.body),
			at : function(a, b) {
				var c = a.split("."), d = b || window;
				while (c.length > 0) {
					d = d[c.shift()];
					if ( typeof d == "undefined") {
						return undefined;
					}
				}
				return d;
			},
			bind : function(E, D) {
				return function() {
					return D.apply(E, arguments)
				}
			},
			userAgent : navigator.userAgent.toLowerCase(),
			value : function(value, defaultValue, allowBlank) {
				return taurus.isEmpty(value, allowBlank) ? defaultValue : value;
			},
			getPositionBelow:function(el){
				return $(window).height() - taurus.getPositionAbove(el) - el.height()
			},
			getPositionAbove:function(el){
				return el.offset().top - $(window).scrollTop();
			},
			getPositionRight:function(el){
				return $(window).width() - taurus.getPositionLeft(el) - el.width()
			},
			getPositionLeft:function(el){
				return el.offset().left - taurus.$body.scrollLeft()
			},
			get:function(cmp){
				if(cmp instanceof Backbone.View){
					return cmp.$el
				}
				return cmp
			},
		});
		/*(function() {
			var check = function(regex) {
				return regex.test(taurus.userAgent);
			}, isIE = (function() {
				return jQuery.browser.msie
			})(), isIE6 = function() {
				return jQuery.browser.msie && jQuery.browser.version == "6.0"
			}(), isIE7 = function() {
				return jQuery.browser.msie && jQuery.browser.version == "7.0"
			}(), isIE8 = function() {
				return jQuery.browser.msie && jQuery.browser.version == "8.0"
			}(), isWebKit = check(/webkit/), isGecko = !isWebKit && check(/gecko/);
		})()*/
		taurus.augmentObject = function(H, I) {
			var K;
			if ($.type(H) !== 'string') {
				K = H;
			} else {
				K = taurus.augmentString(H, {})
			}
			for (var G in I) {
				K[G] = I[G]
			}
			return K
		};
		taurus.aug = function() {
			return taurus.augmentObject.apply({}, arguments)
		};
		taurus.augmentString = function(L, J) {
			var K = window;
			var I = L.split(".");
			for (var H = 0, G = I.length; H < G; ++H) {
				K = K[I[H]] = K[I[H]] || (( typeof I[H + 1] !== "undefined") ? {} : J)
			}
			return K
		};
		taurus.klass = function(name, prop) {
			var K = prop || Class.extend();
			var E = taurus.augmentString(name, K);
			var g = name.split(".").pop();
			E._namespace = name;
			E._name = g;
			E.mixin = function(mixins) {
				for (name in mixins) {
					var c = mixins[name].prototype;
					taurus.mixin(this.prototype, c);
					if (!this.prototype.mixins) {
						this.prototype.mixins = {}
					}
					this.prototype.mixins[name] = mixins[name]
				}
				return this;
			}
			return E
		};
		taurus.view = function(name, cls) {
			var C = taurus.klass(name, cls);
			return C
		};
		taurus.parseString = function(L){
			var K = window;
			var I = L.split(".");
			for (var H = 0, G = I.length; H < G; H++) {
				K = K[I[H]]
				if(typeof I[H + 1] === "undefined" || typeof K === "undefined"){
					break;
				}
			}
			return K
		}
		taurus.views = {};
		taurus.views._setDefaultTemplate = function(C, D, S) {
			var name = D.replace("taurus", "taurus.templates").toLowerCase();
			var template;
			if (template = taurus.parseString(name)) {
				C.template(template)
			} else {
				var S = S ? S.__super__.constructor : C.__super__.constructor;
				if (S.namespace)
					taurus.views._setDefaultTemplate(C, S.namespace, S)
			}
		};
		var F = /_(.)/g;
		taurus.augmentObject('taurus.util', {
			capitalize : function(str) {
				return str.charAt(0).toUpperCase() + str.substr(1)
			},
			lowercase:function(str){
				return str.charAt(0).toLowerCase() + str.substr(1)
			},
			camelize : function(str) {
				return str.replace(F, function(I, J) {
					return J.toUpperCase()
				})
			},
			getTimeDiff : function(difference, index) {
				var index = index || 0, divisor = divisors[index], difference = difference;
				if (difference >= divisor) {
					return taurus.util.getTimeDiff(difference / divisor, index + 1);
				} else {
					return Math.floor(difference) + subfixs[index > 0 ? index - 1 : index];
				}
			},
			diff : function(a, b, c) {
				var d = {};
				if (!jQuery.isPlainObject(a) || !jQuery.isPlainObject(b)) {
					throw new Error("util.diff currently supports only single-level object comparison");
				}
				for (var e in a) {
					c ? c(a[e], b[e]) || (d[e] = [a[e], b[e]]) : a[e] !== b[e] && (d[e] = [a[e], b[e]]);
				}
				for (var e in b) {
					d[e] || ( c ? c(b[e], a[e]) || (d[e] = [a[e], b[e]]) : a[e] !== b[e] && (d[e] = [a[e], b[e]]));
				}
				return d;
			},
			underscore : function(H) {
				if (H.toUpperCase() === H) {
					return H
				}
				return H.replace(/([a-zA-Z0-9])([A-Z])/g, function(I, K, J) {
					return (K + "_" + J)
				}).toLowerCase()
			},
			throttle : function throttle(fn, delay, context) {
				var timer = null, me = context;
				return function() {
					var context = me || this, args = arguments;
					clearTimeout(timer);
					timer = setTimeout(function() {
						fn.apply(context, args);
					}, delay);
				};
			}
		});
		taurus.augmentObject('taurus.String', {
			format : function(format) {
				var args = taurus.Array.toArray(arguments, 1);
				return format.replace(formatRe, function(m, i) {
					return args[i];
				});
			}
		});
		taurus.Class = function(options) {
			if (this.initialize)
				this.initialize.apply(this, arguments);
		};
		taurus.Class.extend = Backbone.View.extend;
		taurus.augmentObject('$.support',{
			borderRadius:false
		})
		taurus.augmentObject('$.fn', {
			addClsOnOver : function(className, testFn, scope) {
				var me = this, dom = me.dom, hasTest = _.isFunction(testFn);

				me.hover(function() {
					if (hasTest && testFn.call(scope || me, me) === false) {
						return;
					}
					me.addClass(className);
				}, function() {
					me.removeClass(className);
				});
				return me;
			},

			/**
			 * Sets up event handlers to add and remove a css class when the mouse is down and then up on this element (a click effect)
			 * @param {String} className The class to add
			 * @param {Function} [testFn] A test function to execute before adding the class. The passed parameter
			 * will be the Element instance. If this functions returns false, the class will not be added.
			 * @param {Object} [scope] The scope to execute the testFn in.
			 * @return {Ext.dom.Element} this
			 */
			addClsOnClick : function(className, testFn, scope) {
				var me = this, dom = me.dom, hasTest = _.isFunction(testFn);

				me.on("mousedown", function() {
					if (hasTest && testFn.call(scope || me, me) === false) {
						return false;
					}
					me.addClass(className);
					var d = $(document), fn = function() {
						me.removeClass(className);
						d.off("mouseup", fn);
					};
					d.on("mouseup", fn);
				});
				return me;
			}
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @class Ext.Number
	 *
	 * A collection of useful static methods to deal with numbers
	 * @singleton
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var me = this,
		isToFixedBroken = (0.9).toFixed() !== '1',
		math = Math;
		return taurus.Number = {
			constrain: function(number, min, max) {
				var x = parseFloat(number);
			
				// Watch out for NaN in Chrome 18
				// V8bug: http://code.google.com/p/v8/issues/detail?id=2056
			
				// Operators are faster than Math.min/max. See http://jsperf.com/number-constrain
				// ... and (x < Nan) || (x < undefined) == false
				// ... same for (x > NaN) || (x > undefined)
				// so if min or max are undefined or NaN, we never return them... sadly, this
				// is not true of null (but even Math.max(-1,null)==0 and isNaN(null)==false)
				return (x < min) ? min : ((x > max) ? max : x);
			},
			toFixed: isToFixedBroken ? function(value, precision) {
	            precision = precision || 0;
	            var pow = math.pow(10, precision);
	            return (math.round(value * pow) / pow).toFixed(precision);
	        } : function(value, precision) {
	            return value.toFixed(precision);
	        },
	        snapInRange : function(value, increment, minValue, maxValue) {
	            var tween;

	            // default minValue to zero
	            minValue = (minValue || 0);

	            // If value is undefined, or less than minValue, use minValue
	            if (value === undefined || value < minValue) {
	                return minValue;
	            }

	            // Calculate how many snap points from the minValue the passed value is.
	            if (increment && (tween = ((value - minValue) % increment))) {
	                value -= tween;
	                tween *= 2;
	                if (tween >= increment) {
	                    value += increment;
	                }
	            }

	            // If constraining within a maximum, ensure the maximum is on a snap point
	            if (maxValue !== undefined) {
	                if (value > (maxValue = this.snapInRange(maxValue, increment, minValue))) {
	                    value = maxValue;
	                }
	            }

	            return value;
	        },
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Base = __webpack_require__(4);
		return taurus.view('taurus.views.TableHeader',Base.extend({
			tagName:'thead',
			tpl:'<tr><%=head%></tr>',
			html:function(){
				var html = [];
				_.each(this.items,function(column){
					html.push(_.template('<th><%=text%></th>',{
						width:column.text.width,
						text:column.text
					}))
				});
				return Base.prototype.html.apply(this,[{head:html.join('')}])
			}
		}))
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Base = __webpack_require__(4);
		return taurus.view('taurus.view.TableBody',Base.extend({
			hasScrollbar:true,
			tagName:'tbody',
			tpl:'<%=tbody%>',
			initialize:function(){
				Base.prototype.initialize.apply(this,arguments);
				this.collection.on('sync',function(){
					this.html();
				},this);
				this.collection.on('reset',function(){
					this.html();
				},this);
				this.collection.on('sort',function(){
					this.html();
				},this);
				this.collection.on('remove',function(){
					this.html();
				},this);
				if(this.sortable){
					taurus.$doc.on('mousedown',_.bind(this.onMouseDown,this));
				}
			},
			getTplData:function(){
				var columns = this.columns,me = this;
				return $.extend(Base.prototype.getTplData.apply(this,arguments),{
					tbody:this.collection.map(function(model){
						var item = model.toJSON();
						return _.template((me.rowTemplate || '<tr>')+_.map(columns,function(column,i){
							var value = item[column.dataIndex];
							if(column.renderer){
								value = column.renderer(item[column.dataIndex],item);
							}
							return _.template('<td role="gridcell"><%=value%></td>',{
								value:value
							});
						}).join('')+'</tr>',item);
					}).join('')
				});
			}
		}));
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
		var Base = __webpack_require__(4);
		return Base.extend({
			className : 'column-header',
			possibleSortStates : ['ASC', 'DESC'],
			ascSortCls : 'column-header-sort-ASC',
			descSortCls : 'column-header-sort-DESC',
			sortable:false,
			tpl : '<div id="<%=id%>-titleEl" class="column-header-inner"><span id="<%=id%>-textEl" class="column-header-text"><%=text%></span><%if(sortable){%> <span class="caret"></span><%}%></div>',
			initialize : function() {
				Base.prototype.initialize.apply(this, arguments);
			},
			/*delegateEvents : function(events) {
				var events = $.extend(events || {}, this.events, {
					'click' : 'onTitleElClick'
				});
				Base.prototype.delegateEvents.call(this, events);
			},*/

			doSort : function(state) {
				var me = this, collection = this.$el.parents('.grid').data('component').collection;
				collection.setSort(me.getSortParam(), state.toLowerCase());
				/*collection.comparator = function(chapterA, chapterB) {
					if (chapterA.get(me.getSortParam()) > chapterB.get(me.getSortParam())) {
						return state == 'ASC' ? -1 : 1;
					}
					if (chapterA.get(me.getSortParam()) < chapterB.get(me.getSortParam())) {
						return state == 'ASC' ? 1 : -1;
						;
					}
					return 0;
					// equal
				};
				collection.sort();*/
			},

			/**
			 * Returns the parameter to sort upon when sorting this header. By default this returns the dataIndex and will not
			 * need to be overriden in most cases.
			 * @return {String}
			 */
			getSortParam : function() {
				return this.dataIndex;
			},
			getTplData : function() {
				return $.extend(Base.prototype.getTplData.apply(this, arguments), {
					sortable : this.sortable,
					text : this.text
				});
			},

			// Find the topmost HeaderContainer
			getOwnerHeaderCt : function() {
				var me = this;
				return me.$el.parents('.grid-header-ct').data('component');
			},

		    isSortable: function() {
		        var sortable = this.sortable;
		        return sortable;
		    },
			onTitleElClick : function() {
				this.toggleSortState();
			},

		    sort: function(direction) {
		        var me = this,
		            grid = me.ownerCt.grid,
		            oldDirection = me.direction || -1,
		            collection = grid.collection;

		        // Maintain backward compatibility.
		        // If the grid is NOT configured with multi column sorting, then specify "replace".
		        // Only if we are doing multi column sorting do we insert it as one of a multi set.
		        // Suspend layouts in case multiple views depend upon this grid's store (eg lockable assemblies)
		        //Ext.suspendLayouts();
		        me.sorting = true;
		        collection.setSorting(me.getSortParam(), direction ? direction : oldDirection*-1, {side: "client"});
		        collection.fullCollection.sort();
		        //store.sort(me.getSortParam(), direction, grid.multiColumnSort ? 'multi' : 'replace');
		        delete me.sorting;
		        me.setSortState()
		        //Ext.resumeLayouts(true);
		    },

			toggleSortState : function() {
		        if (this.isSortable()) {
		            this.sort();
		        }
			},

			setSortState : function(state, skipClear, initial) {
				var me = this, ascCls = me.ascSortCls, descCls = me.descSortCls, ownerHeaderCt = me.getOwnerHeaderCt(), oldSortState = me.sortState,oldDirection = me.direction,
		            grid = me.ownerCt.grid,
				collection = grid.collection,direction = collection.state.sortKey == me.dataIndex ? collection.state.order : null;

				switch (direction) {
					case -1:
						me.$el.addClass(descCls);
						me.$el.removeClass(ascCls);
						break;
					case 1:
						me.$el.addClass(ascCls);
						me.$el.removeClass(descCls);
						break;
					default:
						me.$el.removeClass([ascCls, descCls].join(" "));
				}
				me.direction = direction;
				/*state = state || null;

				if (!me.sorting && oldDirection !== direction && (me.getSortParam() != null)) {
					// don't trigger a sort on the first time, we just want to update the UI
					if (state && !initial) {
						// when sorting, it will call setSortState on the header again once
						// refresh is called
						me.sorting = true;
						me.doSort(state);
						me.sorting = false;
					}
					switch (direction) {
						case -1:
							me.$el.addClass(descCls);
							me.$el.removeClass(ascCls);
							break;
						case 1:
							me.$el.addClass(ascCls);
							me.$el.removeClass(descCls);
							break;
						default:
							me.$el.removeClass([ascCls, descCls].join(" "));
					}
					me.direction = direction;
					if (ownerHeaderCt && !me.triStateSort && !skipClear) {
						ownerHeaderCt.clearOtherSortStates(me);
					}
					me.sortState = state;
					// we only want to fire the event if we have a null state when using triStateSort
					if (me.triStateSort || state != null) {
					 ownerHeaderCt.fireEvent('sortchange', ownerHeaderCt, me, state);
					 }
				}*/
			}
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var Class = __webpack_require__(16);
		return Class.extend({

		    init: function(visibleOnly, headerCt, secondHeaderCt) {
		        //<debug>
		        if (!headerCt.isRootHeader && !headerCt.isGroupHeader) {
		            Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer or group header');
		        }
		        //</debug>
		        this.headerCt = headerCt;

		        // We are managing columns for a lockable grid...
		        if (secondHeaderCt) {
		            //<debug>
		            if (!headerCt.isRootHeader && !headerCt.isGroupHeader) {
		                Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer or group header');
		            }
		            //</debug>
		            this.secondHeaderCt = secondHeaderCt;
		        }
		        this.visibleOnly = !!visibleOnly;
		    },

		    cacheColumns: function() {
		        var columns = this.getHeaderColumns(this.headerCt),
		            second = this.secondHeaderCt;
		            
		        if (second) {
		            columns = columns.concat(this.getHeaderColumns(second));
		        }
		        this.columns = columns;
		    },
			getColumns: function() {
		        if (!this.columns) {
		            this.cacheColumns();
		        }
		        return this.columns;
		    },
	    
		    getHeaderColumns: function(header) {
		        var result = this.visibleOnly ? header.getVisibleGridColumns() : header.getGridColumns();
		        return _.clone(result);
		    },
		    /**
		     * If called from a root header, returns the index of a leaf level header regardless of what the nesting
		     * structure is.
		     *
		     * If called from a group header, returns the index of a leaf level header relative to the group header.
		     *
		     * If a group header is passed, the index of the first leaf level header within it is returned.
		     *
		     * @param {Ext.grid.column.Column} header The header to find the index of
		     * @return {Number} The index of the specified column header
		     */
		    getHeaderIndex: function (header) {
		        if (header.isGroupHeader) {
		            // Get the first header for the particular group header. The .getHeaderColumns API
		            // will sort out if it's to be just visible columns or all columns.
		            header = this.getHeaderColumns(header)[0];
		        }

		        return _.indexOf(this.getColumns(), header);
		    }
		})
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		i18n = __webpack_require__(17);
		return new i18n({
			locales:[[
			'zh-cn',{
				"Page %d of %d" : "%2$d页中的第%1$d页",
				"Cancel" : "取消",
				"Confirm" : "确定"
			}]]
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var initializing = false,
	        fnTest = /xyz/.test(function() {
	            xyz;
	        }) ? /\b_super\b/ : /.*/;

	    // The base Class implementation (does nothing)
	    window.Class = function() {};

	    // Create a new Class that inherits from this class
	    Class.extend = function(prop) {
	        var _super = this.prototype;

	        // Instantiate a base class (but only create the instance,
	        // don't run the init constructor)
	        initializing = true;
	        var prototype = new this();
	        initializing = false;

	        // Copy the properties over onto the new prototype
	        for (var name in prop) {
	            // Check if we're overwriting an existing function
	            prototype[name] = typeof prop[name] == "function" &&
	                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	                (function(name, fn) {
	                    return function() {
	                        var tmp = this._super;

	                        // Add a new ._super() method that is the same method
	                        // but on the super-class
	                        this._super = _super[name];

	                        // The method only need to be bound temporarily, so we
	                        // remove it when we're done executing
	                        var ret = fn.apply(this, arguments);
	                        this._super = tmp;

	                        return ret;
	                    };
	                })(name, prop[name]) :
	                prop[name];
	        }

	        // The dummy class constructor
	        function Class() {
	            // All construction is actually done in the init method
	            if (!initializing && this.init)
	                this.init.apply(this, arguments);
	        }

	        // Populate our constructed prototype object
	        Class.prototype = prototype;

	        // Enforce the constructor to be what we expect
	        Class.prototype.constructor = Class;

	        // And make this class extendable
	        Class.extend = arguments.callee;

	        return Class;
	    };
	    return Class;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author nttdocomo
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require){
		var vsprintf = __webpack_require__(18).vsprintf;
		var i18n = function(opt){
			var self = this;
		
			// Put into dev or production mode
			//this.devMode = process.env.NODE_ENV !== "production";
		
			// Copy over options
			for (var prop in opt) {
				this[prop] = opt[prop];
			}
		
			// implicitly read all locales
			// if it's an array of locale names, read in the data
			if (opt.locales && opt.locales.forEach) {
				this.locales = {};
		
				opt.locales.forEach(function(locale) {
					self.readFile(locale);
				});
		
				this.defaultLocale = opt.locales[0][0];
			}
		}
		i18n.prototype = {
			defaultLocale: "en-us",
			extension: ".json",
			directory: "./i18n",
			cookiename: "lang",

			__: function() {
				var msg = this.translate(this.locale, arguments[0]);
		
				if (arguments.length > 1) {
					msg = vsprintf(msg, Array.prototype.slice.call(arguments, 1));
				}
		
				return msg;
			},
			// read locale file, translate a msg and write to fs if new
			translate: function(locale, singular, plural) {
				if (!locale || !this.locales[locale]) {
					if (this.devMode) {
						console.warn("WARN: No locale found. Using the default (" +
							this.defaultLocale + ") as current locale");
					}
		
					locale = this.defaultLocale;
		
					this.initLocale(locale, {});
				}
		
				if (!this.locales[locale][singular]) {
					this.locales[locale][singular] = plural ?
						{ one: singular, other: plural } :
						singular;
		
					if (this.devMode) {
						this.writeFile(locale);
					}
				}
		
				return this.locales[locale][singular];
			},
			// try reading a file
			readFile: function(locale) {
				var self = this, file = this.locateFile(locale);
				this.initLocale(locale[0], locale[1]);
				/*localeFile = require.async(file,function(localeData){
					self.initLocale(locale[0], locale[1]);
				})*/
			},

			// basic normalization of filepath
			locateFile: function(locale) {
				return this.directory + '/' + locale + this.extension;
			},
			initLocale:function(locale, data){
				if (!this.locales[locale]) {
					this.locales[locale] = data;
				}
			}
		}
		return i18n
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! sprintf.js | Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports) {
		var ctx = true ? exports : window;
		var sprintf = function() {
			if (!sprintf.cache.hasOwnProperty(arguments[0])) {
				sprintf.cache[arguments[0]] = sprintf.parse(arguments[0]);
			}
			return sprintf.format.call(null, sprintf.cache[arguments[0]], arguments);
		};

		sprintf.format = function(parse_tree, argv) {
			var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
			for ( i = 0; i < tree_length; i++) {
				node_type = get_type(parse_tree[i]);
				if (node_type === 'string') {
					output.push(parse_tree[i]);
				} else if (node_type === 'array') {
					match = parse_tree[i];
					// convenience purposes only
					if (match[2]) {// keyword argument
						arg = argv[cursor];
						for ( k = 0; k < match[2].length; k++) {
							if (!arg.hasOwnProperty(match[2][k])) {
								throw (sprintf('[sprintf] property "%s" does not exist', match[2][k]));
							}
							arg = arg[match[2][k]];
						}
					} else if (match[1]) {// positional argument (explicit)
						arg = argv[match[1]];
					} else {// positional argument (implicit)
						arg = argv[cursor++];
					}

					if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
						throw (sprintf('[sprintf] expecting number but found %s', get_type(arg)));
					}
					switch (match[8]) {
						case 'b':
							arg = arg.toString(2);
							break;
						case 'c':
							arg = String.fromCharCode(arg);
							break;
						case 'd':
							arg = parseInt(arg, 10);
							break;
						case 'e':
							arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
							break;
						case 'f':
							arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
							break;
						case 'o':
							arg = arg.toString(8);
							break;
						case 's':
							arg = (( arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
							break;
						case 'u':
							arg = arg >>> 0;
							break;
						case 'x':
							arg = arg.toString(16);
							break;
						case 'X':
							arg = arg.toString(16).toUpperCase();
							break;
					}
					arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
					pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
					pad_length = match[6] - String(arg).length;
					pad = match[6] ? str_repeat(pad_character, pad_length) : '';
					output.push(match[5] ? arg + pad : pad + arg);
				}
			}
			return output.join('');
		};

		sprintf.cache = {};

		sprintf.parse = function(fmt) {
			var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
			while (_fmt) {
				if (( match = /^[^\x25]+/.exec(_fmt)) !== null) {
					parse_tree.push(match[0]);
				} else if (( match = /^\x25{2}/.exec(_fmt)) !== null) {
					parse_tree.push('%');
				} else if (( match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
					if (match[2]) {
						arg_names |= 1;
						var field_list = [], replacement_field = match[2], field_match = [];
						if (( field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
							field_list.push(field_match[1]);
							while (( replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
								if (( field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
									field_list.push(field_match[1]);
								} else if (( field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
									field_list.push(field_match[1]);
								} else {
									throw ('[sprintf] huh?');
								}
							}
						} else {
							throw ('[sprintf] huh?');
						}
						match[2] = field_list;
					} else {
						arg_names |= 2;
					}
					if (arg_names === 3) {
						throw ('[sprintf] mixing positional and named placeholders is not (yet) supported');
					}
					parse_tree.push(match);
				} else {
					throw ('[sprintf] huh?');
				}
				_fmt = _fmt.substring(match[0].length);
			}
			return parse_tree;
		};

		var vsprintf = function(fmt, argv, _argv) {
			_argv = argv.slice(0);
			_argv.splice(0, 0, fmt);
			return sprintf.apply(null, _argv);
		};

		/**
		 * helpers
		 */
		function get_type(variable) {
			return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
		}

		function str_repeat(input, multiplier) {
			for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */
			}
			return output.join('');
		}

		/**
		 * export to either browser or node.js
		 */
		ctx.sprintf = sprintf;
		ctx.vsprintf = vsprintf;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); 

/***/ }
/******/ ]);