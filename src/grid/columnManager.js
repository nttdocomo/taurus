define(function(require){
	var Class = require('../class'),
	_ = require('underscore');
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

	    /**
	     * Get a leaf level header by index regardless of what the nesting
	     * structure is.
	     * @param {String} id The id
	     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist.
	     */
	    getHeaderById: function(id) {
	        var columns = this.getColumns(),
	            len = columns.length,
	            i, header;
	            
	        for (i = 0; i < len; ++i) {
	            header = columns[i];
	            if (header.getItemId() === id) {
	                return header;
	            }
	        }
	        return null;
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
})