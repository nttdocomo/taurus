/**
 * @author nttdocomo
 */
define(function(require){
	var vsprintf = require('./util/sprintf').vsprintf;
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
});
