function decorate(Clazz, decorators){
  // ç»‘å®šè£…é¥°è€…å€™é€‰é›†
  Clazz.decorators = decorators;

  // æ¸å¿ƒdecorateæ–¹æ³•
  Clazz.decorate = function(decorator){
    var Decorator = function(){},
        overrides = this.decorators[decorator],
        list = this.decoratorList,
        i, newobj;

    if(list.indexOf(decorator) == -1){

      this.decoratorList.push(decorator);

      Decorator.prototype = this.prototype;
      newobj = new Decorator();
      newobj.parent = Decorator.prototype;
      for(i in overrides){
        if(overrides.hasOwnProperty(i)){
          newobj[i] = overrides[i];
        }
      }
      return newobj;
    }
  };
  Clazz.prototype.decorate = function(decorator){
    var Decorator = function(){},
        overrides = this.constructor.decorators[decorator],
        list = this.decoratorList,
        i, newobj;

    if(list.indexOf(decorator) == -1){

      this.decoratorList.push(decorator);

      Decorator.prototype = this;
      newobj = new Decorator();
      newobj.parent = Decorator.prototype;
      for(i in overrides){
        if(overrides.hasOwnProperty(i)){
          newobj[i] = overrides[i];
        }
      }
      return newobj;
    }
  };

  // æ¸å¿ƒundecorateæ–¹æ³•
  Clazz.prototype.undecorate = function(decorator){
    var list = this.decoratorList,
        decoratorObj = Clazz.decorators[decorator],
        decoratedMethods = [],
        iterator = this,
        len = list.length,
        i, methodLength;

    for(i in decoratorObj){
      decoratedMethods.push(i);
    }

    while(len-- >= 0){
      if(list[len] == decorator){
        this.decoratorList.splice(len, 1);
        for(i = 0, methodLength = decoratedMethods.length; i < methodLength; i++){
          delete iterator[decoratedMethods[i]];
          var prevProto = Object.getPrototypeof(iterator);
          delete prevProto[decoratedMethods[i]];
          Object.setPrototypeof(iterator, prevProto);
        }
        this.parent = iterator;
        break;
      }
      iterator = iterator.parent;
    }
    return this;
  };

  Clazz.prototype.undecorate2 = function(decorator){
    var list = this.decoratorList,
        decoratorObj = Clazz.decorators[decorator],
        Decorator = function(){},
        afterCursor = this, prevCursor = this.parent,
        len = list.length,
        i, newObj;

    while(len-- >= 0){
      if(list[len] == decorator){
        this.decoratorList.splice(len, 1);

        if(afterCursor){
          for(i in afterCursor){
            if(afterCursor.hasOwnProperty(i) && !(i in decoratorObj) && (i != 'parent')){
              prevCursor[i] = afterCursor[i];
            }
          }
        }

        Decorator.prototype = prevCursor;
        break;
      }
      afterCursor = prevCursor;
      prevCursor = prevCursor.parent;
    }

    if((list.length === 0) || (len === list.length)){
      // å¦‚æžœæ‰€æœ‰çš„decoratoréƒ½è¢«æ¸…æŽ‰äº†æˆ–è€…æ¸…æŽ‰çš„æ˜¯æœ«å°¾çš„decoratorï¼Œç›´æŽ¥è¿”å›žç•™ä¸‹çš„mergeè¿‡çš„prevCursor
      newObj = prevCursor;
    }else{
      // å¦‚æžœè¿˜æœ‰decoratorï¼Œå†mixä¸Šå½“å‰å¯¹è±¡çš„å¯¹è±¡å±žæ€§
      newObj = new Decorator();
      for(i in this){
        if(this.hasOwnProperty(i) && (i != 'parent')){
          newObj[i] = this[i];
        }
      }
      // parentæŒ‡å‘mergeåŽçš„prevCursor
      newObj.parent = prevCursor;
    }
    return newObj;
  };
}

// è£…é¥°å™¨
var decorators = {
  'mushroom': {
    getHeight: function(){
      return this.parent.getHeight() + 10;
    },
    getBlood: function(){
      return this.parent.getBlood() + 1;
    }
  },
  'flower': {
    getColor: function(){
      return 'white';
    },
    attack: function(){
      return 'è¶…çº§çŽ›ä¸½åç«åŠ›å¼¹ï¼';
    }
  }
};
