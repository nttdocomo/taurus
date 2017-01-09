/**
 * @author nttdocomo
 */
(function (root, factory) {
	if(typeof define === "function") {
		if(define.amd){
			define(['underscore'], factory);
		}
		if(define.cmd){
			define(function(require, exports, module){
				return factory(require('underscore'));
			})
		}
	} else if(typeof module === "object" && module.exports) {
		module.exports = factory(require('underscore'));
	}
}(this, function(_){
	var arrayProto = Array.prototype
  var arraySlice = arrayProto.slice
	return {
		relayEvents: function(origin, events, prefix) {
      var me = this
      var len = events.length
      var i = 0
      var oldName, newName
      var relayers = {}

      if(!_.isArray(events)) {
        for (i in events) {
          newName = events[i];
          relayers[i] = me.createRelayer(newName);
        }
      } else {
        for (; i < len; i++) {
          oldName = events[i];

          // Build up the listener hash.
          relayers[oldName] = me.createRelayer(prefix ? prefix + oldName : oldName);
        }
      }
      // Add the relaying listeners as ManagedListeners so that they are removed when this.clearListeners is called (usually when _this_ is destroyed)
      // Explicitly pass options as undefined so that the listener does not get an extra options param
      // which then has to be sliced off in the relayer.
      // me.on(origin, relayers, null, null, undefined);
      origin.on(relayers)
      // relayed events are always destroyable.
      //return new ListenerRemover(me, origin, relayers);
  	},

    /**
    * @private
    * Creates an event handling function which re-fires the event from this object as the passed event name.
    * @param {String} newName The name under which to re-fire the passed parameters.
    * @param {Array} beginEnd (optional) The caller can specify on which indices to slice.
    * @return {Function}
    */
    createRelayer: function(newName, beginEnd) {
      var me = this;
      return function() {
        var arg = arraySlice.call(arguments, 0)
        arg = (beginEnd ? arraySlice.apply(arg, beginEnd) : arg)
        arg.splice(0, 0, newName)
        return me.trigger.apply(me, arg);
      };
    }
	}
}))