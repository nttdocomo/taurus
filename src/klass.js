(function(global, undefined) {

    // Avoid conflicting when `sea.js` is loaded multiple times
    if (global.klass) {
        return
    }

    var klass = global.klass = {
        // The current version of Sea.js being used
        version: "2.2.0"
    }

    var getDeps = function(dependencies){
		var deps = [];
		for (var i = 0; i < dependencies.length; i++) {
			deps.push(require(dependencies[i]))
		}
		return deps
    }

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

    klass.define = function(namespace,dependencies,definition){
    	var mod;
		if(typeof define === "function") {
			if(define.amd){
				mod = define(dependencies, definition)
				d(namespace,mod);
			}
			if(define.cmd){
				define(function(require, exports, module){
					var getDeps = function(dependencies){
						var deps = [];
						for (var i = 0; i < dependencies.length; i++) {
							deps.push(require(dependencies[i]))
						}
						return deps
				    }
				    mod = definition.apply(global,getDeps(dependencies))
					d(namespace,mod);
					return mod;
				})
			}
		} else if(typeof module === "object" && module.exports) {
			module.exports = definition.apply(global,getDeps(dependencies));
		}
	}
})(this);