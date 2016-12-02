(function(global, undefined) {
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
	function getDeps(dependencies){
		var deps = [];
		for (var i = 0; i < dependencies.length; i++) {
			deps.push(require(dependencies[i]))
		}
		return deps
    };
	d('taurus',{
		version: "2.2.0",
		createNameSpace:d,
		klass:function(namespace,dependencies,definition){
	    	var mod,args = arguments;
	    	if(args.length == 2){
	    		definition = dependencies;
	    		dependencies = namespace;
	    	}
			if(typeof define === "function") {
				if(define.amd){
					mod = define(dependencies, definition)
					if(args.length == 3){
						d(namespace,mod);
					}
				}
				if(define.cmd){
					define(dependencies,function(require, exports, module){
						var getDeps = function(dependencies){
							var deps = [];
							for (var i = 0; i < dependencies.length; i++) {
								deps.push(require(dependencies[i]))
							}
							return deps
					    }
					    mod = definition.apply(global,getDeps(dependencies))
						if(args.length == 3){
							d(namespace,mod);
						}
						return mod;
					})
				}
			} else if(typeof module === "object" && module.exports) {
				module.exports = definition.apply(global,getDeps(dependencies));
			}
		},
		async:function(deps,callback){
			var async;
			if(typeof require !== 'undefined'){
				async = require;
			} else {
				async = seajs.use;
			}
			async(deps,callback);
		}
	})
})(this);
