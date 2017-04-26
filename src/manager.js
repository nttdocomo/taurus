define(function(require){
	var Class = require('class')
	var Backbone = require('./backbone')
	return new (Class.extend({
		init: function(config) {
	        _.extend(this, config || {});
	        this.all = {};
	        this.references = {};
	        this.onAvailableCallbacks = {};
	    },
    
	    /**
	     * Creates a new Component from the specified config object using the config object's
	     * `xtype` to determine the class to instantiate.
	     *
	     * @param {Object} config A configuration object for the Component you wish to create.
	     * @param {String} [defaultType] The `xtype` to use if the config object does not
	     * contain a `xtype`. (Optional if the config contains a `xtype`).
	     * @return {Ext.Component} The newly instantiated Component.
	     */
	    create: function (config, defaultType,callback) {
	        if (typeof config == 'string') {
	            return Ext.widget(config);
	        }
	        if (config instanceof Backbone.View) {
	            return config;
	        }
	        
	        /*if ('xclass' in config) {
	            return Ext.create(config.xclass, config);
	        }*/

	        //return Ext.widget(config.xtype || defaultType, config);
	        // require.async(config.xtype || defaultType,function(className){
	        	callback(new defaultType(config));
	        // })
	    },

	    /**
	     * Returns an item by id.
	     * @param {String} id The id of the item
	     * @return {Object} The item, undefined if not found.
	     */
	    get: function(id) {
	        return this.all[id];
	    }
	}))
})