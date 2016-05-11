(function (root, factory) {
  if(typeof define === "function") {
      if(define.amd){
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["./backbone",'../../form/field/checkbox','../../classic/form/checkboxManager',"underscore"], function(Base,_){
          return (root.myModule = factory(Base));
        });
    }
      if(define.cmd){
        define(function(require, exports, module){
        return factory(require('../view/listItem'),require('../../form/field/checkbox'),require('../../classic/form/checkboxManager'),require('underscore'));
      })
      }
  } else if(typeof module === "object" && module.exports) {
      // I've not encountered a need for this yet, since I haven't
      // run into a scenario where plain modules depend on CommonJS
      // *and* I happen to be loading in a CJS browser environment
      // but I'm including it for the sake of being thorough
      module.exports = (root.myModule = factory(require("../view/listItem"),require('../../form/field/checkbox'),require('../../classic/form/checkboxManager'),require('underscore')));
  } else {
      root.myModule = factory(root.postal);
  }
}(this, function(Backbone) {

  // The super method takes two parameters: a method name
  // and an array of arguments to pass to the overridden method.
  // This is to optimize for the common case of passing 'arguments'.
  function _super(methodName, args) {

    // Keep track of how far up the prototype chain we have traversed,
    // in order to handle nested calls to _super.
    this._superCallObjects || (this._superCallObjects = {});
    var currentObject = this._superCallObjects[methodName] || this,
        parentObject  = findSuper(methodName, currentObject);
    this._superCallObjects[methodName] = parentObject;

    var result = parentObject[methodName].apply(this, args || []);
    delete this._superCallObjects[methodName];
    return result;
  }

  // Find the next object up the prototype chain that has a
  // different implementation of the method.
  function findSuper(methodName, childObject) {
    var object = childObject;
    while (object[methodName] === childObject[methodName]) {
      object = object.constructor.__super__;
    }
    return object;
  }

  _.each(["Model", "Collection", "View", "Router"], function(klass) {
    Backbone[klass].prototype._super = _super;
  });

}));