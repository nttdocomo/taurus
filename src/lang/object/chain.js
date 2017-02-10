/*global define*/
;(function (root, factory) {
  if (typeof define === 'function') {
    if (define.amd) {
      define(factory)
    }
    if (define.cmd) {
      define(function (require, exports, module) {
        return factory()
      })
    }
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  }
}(this, function () {
  var TemplateClass = function(){};
  var chain = Object.chain = Object.create || function (prototype, propertiesObject) {
    if(prototype !== null && prototype !== Object(prototype)) {
      throw TypeError('Argument must be an object, or null');
    }
    TemplateClass.prototype = prototype || {};
    var result = new TemplateClass();
    TemplateClass.prototype = null;
    if (propertiesObject !== undefined) {
      Object.defineProperties(result, propertiesObject); 
    } 
    
    // to imitate the case of Object.create(null)
    if(prototype === null) {
       result.__proto__ = null;
    }
    return result;
  };
  Object.classify = function (object) {

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        value = object[key]

        if (value) {
          constructor = value.constructor

          if (constructor === Object) {
            object[key] = Object.classify(value)
          } else if (constructor === Array) {
            arrayProperties.push(key)
          }
        }
      }
    }

    var result = Object.chain(object)

    return result
  }
}))
