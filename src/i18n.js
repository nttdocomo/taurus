/**
 * @author nttdocomo
 */
 (function (root, factory) {
 	var locale = (navigator.language || navigator.browserLanguage).toLowerCase();
	if(typeof define === "function") {
		if(define.amd){
			define(['./util/sprintf','i18n/'+locale], function(sprintf,locales){
				return factory(sprintf,locales,locale)
			});
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('./util/sprintf'),require('i18n/{locale}'),locale,require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('./util/sprintf'),require('i18n/'+locale),locale,require('underscore'));
	}
}(this, function(sprintf,locales,locale){
	var vsprintf = sprintf.vsprintf,
	i18n = function(opt){
		var self = this;
	
		// Put into dev or production mode
		//this.devMode = process.env.NODE_ENV !== "production";
	
		// Copy over options
		for (var prop in opt) {
			this[prop] = opt[prop];
		}
	
		// implicitly read all locales
		// if it's an array of locale names, read in the data
		/*if (opt.locales && _.isArray(opt.locales)) {
			this.locales = {};
	
			_.each(opt.locales,function(locale) {
				self.readFile(locale);
			});
	
			this.defaultLocale = this.locale = locale;
		}*/
		this.defaultLocale = this.locale = locale;
	}
	i18n.prototype = {
		defaultLocale: "en-us",
		extension: ".json",
		directory: "./i18n",
		cookiename: "lang",

		__: function() {
			var msg = this.translate(locale, arguments[0]);
	
			if (arguments.length > 1) {
				msg = vsprintf(msg, Array.prototype.slice.call(arguments, 1));
			}
	
			return msg;
		},
		// read locale file, translate a msg and write to fs if new
		translate: function(locale, singular, plural) {
			if (!locale || !locales) {
				if (this.devMode) {
					console.warn("WARN: No locale found. Using the default (" +
						this.defaultLocale + ") as current locale");
				}
	
				locale = this.defaultLocale;
	
				this.initLocale(locale, {});
			}
	
			if (!locales[singular]) {
				locales[singular] = plural ?
					{ one: singular, other: plural } :
					singular;
	
				if (this.devMode) {
					this.writeFile(locale);
				}
			}
	
			return locales[singular];
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
	return new i18n
}));
