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
    var objectProperties = []
    var arrayProperties = []
    var propertyClassesMap = {}
    var objectClass = function () {
      var i = 0
      var ln = objectProperties.length
      var property

      for (; i < ln; i++) {
        property = objectProperties[i]
        this[property] = new propertyClassesMap[property]
      }

      ln = arrayProperties.length

      for (i = 0; i < ln; i++) {
        property = arrayProperties[i]
        this[property] = object[property].slice()
      }
    }
    var key, value, constructor

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        value = object[key]

        if (value) {
          constructor = value.constructor

          if (constructor === Object) {
            objectProperties.push(key)
            propertyClassesMap[key] = Object.classify(value)
          } else if (constructor === Array) {
            arrayProperties.push(key)
          }
        }
      }
    }

    objectClass.prototype = object

    return objectClass
  }
}))
