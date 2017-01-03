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
  Object.classify = function (object) {
    var objectProperties = []
    var arrayProperties = []
    var propertyClassesMap = {}
    var objectClass = function () {
      var i = 0
      var ln = objectProperties.length
      var property
      var Klass

      for (; i < ln; i++) {
        property = objectProperties[i]
        Klass = propertyClassesMap[property]
        this[property] = new Klass()
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
