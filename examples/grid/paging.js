/**
 * @author nttdocomo
 */
define(function(require) {
	require('backbone');
	var Panel = require("../../src/panel/panel.js");
	var Table = require("../../src/panel/table.js");
	var $body = $("#main");
	var Collection = Backbone.Collection.extend({
		model : Backbone.Model,
		perPage : 8,
		currentPage : 1,
		pager : function(options) {
			var self = this, disp = this.perPage, start = (self.currentPage - 1) * disp, stop = start + disp;
			if (!this.origModels) {
				this.origModels = this.models;
			}
			this.models = this.origModels.slice();
			this.reset(this.models.slice(start, stop));
		},

		nextPage : function(options) {
			if (this.currentPage < this.information.totalPages) {
				this.currentPage = ++this.currentPage;
				this.pager(options);
			}
		},

		previousPage : function(options) {
			if (this.currentPage > 1) {
				this.currentPage = --this.currentPage;
				this.pager(options);
			}
		},
		info : function() {
			var me = this, info = {}, totalRecords = me.origModels.length, totalPages = Math.ceil(totalRecords / me.perPage);
			info = {
				totalUnfilteredRecords : totalRecords,
				totalRecords : totalRecords,
				currentPage : me.currentPage,
				perPage : me.perPage,
				totalPages : totalPages,
				lastPage : totalPages,
				previous : false,
				next : false,
				startRecord : totalRecords === 0 ? 0 : (me.currentPage - 1) * me.perPage + 1,
				endRecord : Math.min(totalRecords, me.currentPage * me.perPage)
			};
			if (me.currentPage > 1) {
				me.previous = self.currentPage - 1;
			}
			if (me.currentPage < info.totalPages) {
				info.next = me.currentPage + 1;
			}
			info.pageSet = me.setPagination(info);
			me.information = info;
			return info;
		},

		// setPagination also is an internal function that shouldn't be called directly.
		// It will create an array containing the pages right before and right after the
		// actual page.
		setPagination : function(info) {

			var pages = [], i = 0, l = 0;

			// How many adjacent pages should be shown on each side?
			var ADJACENTx2 = this.pagesInRange * 2, LASTPAGE = Math.ceil(info.totalRecords / info.perPage);

			if (LASTPAGE > 1) {

				// not enough pages to bother breaking it up
				if (LASTPAGE <= (1 + ADJACENTx2)) {
					for ( i = 1, l = LASTPAGE; i <= l; i++) {
						pages.push(i);
					}
				}

				// enough pages to hide some
				else {

					//close to beginning; only hide later pages
					if (info.currentPage <= (this.pagesInRange + 1)) {
						for ( i = 1, l = 2 + ADJACENTx2; i < l; i++) {
							pages.push(i);
						}
					}

					// in middle; hide some front and some back
					else if (LASTPAGE - this.pagesInRange > info.currentPage && info.currentPage > this.pagesInRange) {
						for ( i = info.currentPage - this.pagesInRange; i <= info.currentPage + this.pagesInRange; i++) {
							pages.push(i);
						}
					}

					// close to end; only hide early pages
					else {
						for ( i = LASTPAGE - ADJACENTx2; i <= LASTPAGE; i++) {
							pages.push(i);
						}
					}
				}

			}

			return pages;

		}
	}), collection = new Collection([{
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
		pager:true,
		loading : true,
		refreshable : true,
		height : 350,
		width : 600,
		title : 'Array Grid',
		columns : [{
			text : 'Company',
			flex : 1,
			sortable : false,
			dataIndex : 'company'
		}, {
			text : 'Price',
			flex : 1,
			sortable : false,
			dataIndex : 'price'
		}, {
			text : 'Change',
			width : 75,
			sortable : false,
			dataIndex : 'change'
		}, {
			text : '% Change',
			width : 95,
			sortable : false,
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
});
