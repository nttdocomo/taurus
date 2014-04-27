/**
 * @author nttdocomo
 */
define(function() {
	taurus.augmentObject('taurus.Date', {
		parse : function(input, format, strict) {
			var p = taurus.Date.parseFunctions;
			if (p[format] == null) {
				taurus.Date.createParser(format);
			}
			return p[format](input, _.isUndefined(strict) ? strict : utilDate.useStrict);
		},
		isDate : function(i) {
			return toString.call(i) === "[object Date]"
		},
		getAge : function(date,format) {
			if(!date)
				return 0;
			var birthDate;
			if(_.isString(date)){
				birthDate = this.parseDate(date,format)
			}
			if(_.isNumber(date)){
				birthDate = new Date(date)
			}
			var today = new Date();
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		parseFormat : function(format) {
			var separator = format.match(/[.\/-].*?/), parts = format.split(/\W+/);
			if (!separator || !parts || parts.length == 0) {
				throw new Error("Invalid date format.");
			}
			return {
				separator : separator,
				parts : parts
			};
		},
		formatDate : function(date, format) {
			if(!date){
				return "-"
			}
			if (_.isNumber(date)) {
				date = new Date(date)
			}
			if (_.isString(format)) {
				format = this.parseFormat(format)
			}
			var val = {
				d : date.getDate(),
				m : date.getMonth() + 1,
				yy : date.getFullYear().toString().substring(2),
				yyyy : date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		parseDate : function(date, format) {
			if (_.isString(format)) {
				format = this.parseFormat(format)
			}
			if (_.isString(date)) {
				var parts = date.split(format.separator), date = new Date(1970, 1, 1, 0, 0, 0), val;
				if (parts.length == format.parts.length) {
					for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
						val = parseInt(parts[i], 10) || 1;
						switch(format.parts[i]) {
							case 'dd':
							case 'd':
								date.setDate(val);
								break;
							case 'mm':
							case 'm':
								date.setMonth(val - 1);
								break;
							case 'yy':
								date.setFullYear(2000 + val);
								break;
							case 'yyyy':
								date.setFullYear(val);
								break;
						}
					}
				}
			}
			if (_.isNumber(date)) {
				date = new Date(date);
			}
			if (!date) {
				date = new Date();
			}
			return date;
		}
	})
})
