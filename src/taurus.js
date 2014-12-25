/**
 * @author nttdocomo
 */
define(function(require) {
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
			console.log(el)
			console.log(el.offset())
			console.log(taurus.$body.scrollLeft())
			return el.offset().left - taurus.$body.scrollLeft()
		}
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
})