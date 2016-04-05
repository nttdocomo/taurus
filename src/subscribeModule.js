(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(function(){
          return (root.SubscribeModule = factory());
        });
    }
    if(define.cmd){
        define(function(require, exports, module){
            return (root.SubscribeModule = factory());
        })
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.SubscribeModule = factory());
    } else {
        root.SubscribeModule = factory();
    }
}(this, function(require, exports, module){
    var events = {};
    return {
      subscribe : function(type,klass){
        if(!events[type]){
            events[type] = klass;
        }
      },
      unsubscribe:function(type){
          if(!events[type] || !type ){
              return false;
          }
          if(!!events[type]){
              events[type] = {};
              return true;
          }
          return false;
      },
      fire:function(type){
          if(events[type]){
              return events[type];
          }
      }
    }
}));
