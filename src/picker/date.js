/**
 * @author nttdocomo
 */
define(function(require) {
	var Base = require('../view/base');
	require('../jquery.ui.position');
	require("../lang/date");
	require("moment");
	return Base.extend({
		tpl : '<ul><li class="collapse in"><div class="datepicker"><div class="datepicker-days"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div><div class="datepicker-years"><table class="table-condensed"><thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"/></th></tr></thead><tbody><tr><td colspan="7"></td></tr></tbody></table></div></div></li></ul>',
		className : 'bootstrap-datetimepicker-widget dropdown-menu',
		timeIcon:'halflings uni-calendar',
		dateIcon : 'halflings time',
		viewMode : 0,
		modes : [{
			clsName : 'days',
			navFnc : 'Month',
			navStep : 1
		}, {
			clsName : 'months',
			navFnc : 'FullYear',
			navStep : 1
		}, {
			clsName : 'years',
			navFnc : 'FullYear',
			navStep : 10
		}],
		dates : {
			days : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		initialize : function(options) {
			Base.prototype.initialize.apply(this, arguments);
			this.weekStart = this.weekStart || 0;
			this.fillHtml();
			this.update();
			this.showMode();
		},
		fillHtml:function(){
			this.fillDow();
			this.fillMonths();
		},
		delegateEvents : function(events) {
			var events = $.extend(events || {}, this.events, {
				'click .switch' : function() {
					this.showMode(1);
				},
				'click .prev,.next' : function(e) {
					this.viewDate.year(this.viewDate.year() + this.modes[this.viewMode].navStep * (e.currentTarget.className == 'prev' ? -1 : 1));
					//this.viewDate['set' + this.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate['get' + this.modes[this.viewMode].navFnc].call(this.viewDate) + this.modes[this.viewMode].navStep * (e.currentTarget.className == 'prev' ? -1 : 1));
					this.fill();
				},
				'click td' : function(e) {
					var target = $(e.target);
					if (target.is('.day')) {
						var day = parseInt(target.text(), 10) || 1;
						var month = this.viewDate.month();
						if (target.is('.old')) {
							month -= 1;
						} else if (target.is('.new')) {
							month += 1;
						}
						var year = this.viewDate.year();
						this.date = moment([year, month, day, 0, 0, 0, 0]);
						this.viewDate = moment([year, month, day, 0, 0, 0, 0]);
						this.fill();
						this.setValue();
						this.pickerField.inputEl.trigger({
							type : 'changeDate',
							date : this.date
						});
						this.trigger('itemclick', e);
					}
				},
				'click span' : function(e) {
					var target = $(e.target);
					if (target.is('.month')) {
						var month = target.parent().find('span').index(target);
						this.viewDate.month(month);
					} else {
						var year = parseInt(target.text(), 10) || 0;
						this.viewDate.year(year);
					}
					this.showMode(-1);
					this.fill();
				}
			});
			Base.prototype.delegateEvents.call(this, events);
		},
		setValue : function() {
			this.pickerField.setValue(this.date);
			/*if (!this.isInput) {
			 if (this.component) {
			 this.element.find('input').prop('value', formated);
			 }
			 this.element.data('date', formated);
			 } else {
			 this.element.prop('value', formated);
			 }*/
		},
		fillDow : function() {
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">' + this.dates.daysMin[(dowCnt++) % 7] + '</th>';
			}
			html += '</tr>';
			return html;
			this.$el.find('.datepicker-days thead').append(html);
		},
		fillMonths : function() {
			var html = '', i = 0;
			while (i < 12) {
				html += '<span class="month">' + this.dates.monthsShort[i++] + '</span>';
			}
			this.$el.find('.datepicker-months td').append(html);
		},
		fill : function() {
			var d = new Date(this.viewDate), year = d.getFullYear(), month = d.getMonth(), currentDate = this.date.valueOf();
			this.$el.find('.datepicker-days th:eq(1)').text(this.dates.months[month] + ' ' + year);
			var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0), day = this.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getMonth() < month) {
					clsName += ' old';
				} else if (prevMonth.getMonth() > month) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				html.push('<td class="day' + clsName + '">' + prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate() + 1);
			}
			this.$el.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.dayOfYear();

			var months = this.$el.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getMonth()).addClass('active');
			}

			html = '';
			year = parseInt(year / 10, 10) * 10;
			var yearCont = this.$el.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).end().find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year' + (i == -1 || i == 10 ? ' old' : '') + (currentYear == year ? ' active' : '') + '">' + year + '</span>';
				year += 1;
			}
			yearCont.html(html);
		},
		update : function() {
			this.date = moment(this.pickerField.inputEl && this.pickerField.getValue('value') ? this.pickerField.getValue('value') : taurus.Date.formatDate(new Date(), this.format), this.format);
			this.viewDate = this.date;
			this.fill();
		},
		isLeapYear : function(year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth : function(year, month) {
			return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		showMode : function(dir) {
			if (dir) {
				this.viewMode = Math.max(0, Math.min(2, this.viewMode + dir));
			}
			this.$el.find('.datepicker > div').hide().filter('.datepicker-' + this.modes[this.viewMode].clsName).show();
		}
	});
});
