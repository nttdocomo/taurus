/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('./date');

	function padLeft(s, l, c) {
		if (l < s.length)
			return s;
		else
			return Array(l - s.length + 1).join(c || ' ') + s;
	}

	function UTCDate() {
		return new Date(Date.UTC.apply(Date, arguments));
	}

	return Base.extend({
		tpl : '<ul><li class="collapse in"><div class="datepicker"><div class="datepicker-days"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div><div class="datepicker-years"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div></div></li><li class="picker-switch accordion-toggle"><a><i class="halflings time"></i></a></li><li class="collapse"><div class="timepicker"></div></li></ul>',
		hourTemplate : '<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>',
		minuteTemplate : '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
		secondTemplate : '<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>',
		timeIcon : 'halflings calendar',
		dateIcon : 'halflings time',
		viewMode : 0,
		pick12HourFormat : false,
		pickSeconds : true,
		fillHtml : function() {
			Base.prototype.fillHtml.apply(this, arguments);
			this.$el.find('.timepicker').html(this.getTimeTemplate());
			this.fillHours();
			this.fillMinutes();
			this.fillSeconds();
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .accordion-toggle' : 'togglePicker',
				'click [data-action]' : 'doAction'
			});
			Base.prototype.delegateEvents.call(this, events);
		},
		actions : {
			incrementHours : function(e) {
				this.date.hour(this.date.hour() + 1);
				//this._date.setUTCHours(this._date.getUTCHours() + 1);
			},

			incrementMinutes : function(e) {
				this.date.minute(this.date.minute() + 1);
				//this._date.setUTCMinutes(this._date.getUTCMinutes() + 1);
			},

			incrementSeconds : function(e) {
				this.date.second(this.date.second() + 1);
				//this._date.setUTCSeconds(this._date.getUTCSeconds() + 1);
			},

			decrementHours : function(e) {
				this.date.hour(this.date.hour() - 1);
				//this._date.setUTCHours(this._date.getUTCHours() - 1);
			},

			decrementMinutes : function(e) {
				this.date.minute(this.date.minute() - 1);
				//this._date.setUTCMinutes(this._date.getUTCMinutes() - 1);
			},

			decrementSeconds : function(e) {
				this.date.second(this.date.second() - 1);
				//this._date.setUTCSeconds(this._date.getUTCSeconds() - 1);
			},

			togglePeriod : function(e) {
				var hour = this.date.hour();
				if (hour >= 12)
					hour -= 12;
				else
					hour += 12;
				this.date.hour(hour);
			},

			showPicker : function() {
				this.$el.find('.timepicker > div:not(.timepicker-picker)').hide();
				this.$el.find('.timepicker .timepicker-picker').show();
			},

			showHours : function() {
				this.$el.find('.timepicker .timepicker-picker').hide();
				this.$el.find('.timepicker .timepicker-hours').show();
			},

			showMinutes : function() {
				this.$el.find('.timepicker .timepicker-picker').hide();
				this.$el.find('.timepicker .timepicker-minutes').show();
			},

			showSeconds : function() {
				this.$el.find('.timepicker .timepicker-picker').hide();
				this.$el.find('.timepicker .timepicker-seconds').show();
			},

			selectHour : function(e) {
				var tgt = $(e.target);
				var value = parseInt(tgt.text(), 10);
				if (this.pick12HourFormat) {
					var current = this.date.hour();
					if (current >= 12) {
						if (value != 12)
							value = (value + 12) % 24;
					} else {
						if (value === 12)
							value = 0;
						else
							value = value % 12;
					}
				}
				this.date.hour(value);
				this.actions.showPicker.call(this);
			},

			selectMinute : function(e) {
				var tgt = $(e.target);
				var value = parseInt(tgt.text(), 10);
				this.date.minute(value);
				this.actions.showPicker.call(this);
			},

			selectSecond : function(e) {
				var tgt = $(e.target);
				var value = parseInt(tgt.text(), 10);
				this.date.second(value);
				this.actions.showPicker.call(this);
			}
		},
		doAction : function(e) {
			e.stopPropagation();
			e.preventDefault();
			if (!this.date)
				this.date = moment('1970-00-00',this.format);
			var action = $(e.currentTarget).data('action');
			var rv = this.actions[action].apply(this, arguments);
			this.setValue();
			this.fillTime();
			//this.notifyChange();
			return rv;
		},

		fillHours : function() {
			var table = this.$el.find('.timepicker .timepicker-hours table');
			table.parent().hide();
			var html = '';
			if (this.pick12HourFormat) {
				var current = 1;
				for (var i = 0; i < 3; i += 1) {
					html += '<tr>';
					for (var j = 0; j < 4; j += 1) {
						var c = current.toString();
						html += '<td class="hour">' + padLeft(c, 2, '0') + '</td>';
						current++;
					}
					html += '</tr>'
				}
			} else {
				var current = 0;
				for (var i = 0; i < 6; i += 1) {
					html += '<tr>';
					for (var j = 0; j < 4; j += 1) {
						var c = current.toString();
						html += '<td class="hour">' + padLeft(c, 2, '0') + '</td>';
						current++;
					}
					html += '</tr>'
				}
			}
			table.html(html);
		},

		fillMinutes : function() {
			var table = this.$el.find('.timepicker .timepicker-minutes table');
			table.parent().hide();
			var html = '';
			var current = 0;
			for (var i = 0; i < 5; i++) {
				html += '<tr>';
				for (var j = 0; j < 4; j += 1) {
					var c = current.toString();
					html += '<td class="minute">' + padLeft(c, 2, '0') + '</td>';
					current += 3;
				}
				html += '</tr>';
			}
			table.html(html);
		},

		fillSeconds : function() {
			var table = this.$el.find('.timepicker .timepicker-seconds table');
			table.parent().hide();
			var html = '';
			var current = 0;
			for (var i = 0; i < 5; i++) {
				html += '<tr>';
				for (var j = 0; j < 4; j += 1) {
					var c = current.toString();
					html += '<td class="second">' + padLeft(c, 2, '0') + '</td>';
					current += 3;
				}
				html += '</tr>';
			}
			table.html(html);
		},

		fillTime : function() {
			if (!this.date)
				return;
			var timeComponents = this.$el.find('.timepicker span[data-time-component]');
			var table = timeComponents.closest('table');
			var is12HourFormat = this.pick12HourFormat;
			var hour = this.date.hour();
			var period = 'AM';
			if (is12HourFormat) {
				if (hour >= 12)
					period = 'PM';
				if (hour === 0)
					hour = 12;
				else if (hour != 12)
					hour = hour % 12;
				this.$el.find('.timepicker [data-action=togglePeriod]').text(period);
			}
			hour = padLeft(hour.toString(), 2, '0');
			var minute = padLeft(this.date.minute().toString(), 2, '0');
			var second = padLeft(this.date.second().toString(), 2, '0');
			timeComponents.filter('[data-time-component=hours]').text(hour);
			timeComponents.filter('[data-time-component=minutes]').text(minute);
			timeComponents.filter('[data-time-component=seconds]').text(second);
		},
		fill : function() {
			Base.prototype.fill.apply(this, arguments);
			this.fillTime();
		},
		update : function() {
			this.date = moment(this.pickerField.inputEl && this.pickerField.getValue('value') ? this.pickerField.getValue('value') : '');
			this.viewDate = this.date;
			this.fill();
		},
		getTimeTemplate : function() {
			var is12Hours = this.pick12HourFormat, showSeconds = this.pickSeconds;
			return ('<div class="timepicker-picker">' + '<table class="table-condensed"' + ( is12Hours ? ' data-hour-format="12"' : '') + '>' + '<tr>' + '<td><a href="#" class="btn" data-action="incrementHours"><i class="halflings chevron-up"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="incrementMinutes"><i class="halflings chevron-up"></i></a></td>' + ( showSeconds ? '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="incrementSeconds"><i class="halflings chevron-up"></i></a></td>' : '') + ( is12Hours ? '<td class="separator"></td>' : '') + '</tr>' + '<tr>' + '<td>' + this.hourTemplate + '</td> ' + '<td class="separator">:</td>' + '<td>' + this.minuteTemplate + '</td> ' + ( showSeconds ? '<td class="separator">:</td>' + '<td>' + this.secondTemplate + '</td>' : '') + ( is12Hours ? '<td class="separator"></td>' + '<td>' + '<button type="button" class="btn btn-primary" data-action="togglePeriod"></button>' + '</td>' : '') + '</tr>' + '<tr>' + '<td><a href="#" class="btn" data-action="decrementHours"><i class="halflings chevron-down"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="decrementMinutes"><i class="halflings chevron-down"></i></a></td>' + ( showSeconds ? '<td class="separator"></td>' + '<td><a href="#" class="btn" data-action="decrementSeconds"><i class="halflings chevron-down"></i></a></td>' : '') + ( is12Hours ? '<td class="separator"></td>' : '') + '</tr>' + '</table>' + '</div>' + '<div class="timepicker-hours" data-action="selectHour">' + '<table class="table-condensed">' + '</table>' + '</div>' + '<div class="timepicker-minutes" data-action="selectMinute">' + '<table class="table-condensed">' + '</table>' + '</div>' + ( showSeconds ? '<div class="timepicker-seconds" data-action="selectSecond">' + '<table class="table-condensed">' + '</table>' + '</div>' : '')
			);
		},
		togglePicker : function(e) {
			e.stopPropagation();
			var $this = $(e.currentTarget);
			var $parent = $this.closest('ul');
			var expanded = $parent.find('.collapse.in');
			var closed = $parent.find('.collapse:not(.in)');

			if (expanded && expanded.length) {
				var collapseData = expanded.data('collapse');
				if (collapseData && collapseData.transitioning)
					return;
				expanded.hide().removeClass('in');
				closed.show().addClass('in');
				console.log($this);
				$this.find('i').toggleClass(this.timeIcon + ' ' + this.dateIcon);
				this.$el.find('.add-on i').toggleClass(this.timeIcon + ' ' + this.dateIcon);
			}
		}
	});
});
