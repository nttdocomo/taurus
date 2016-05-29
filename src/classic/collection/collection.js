(function (root, factory) {
   if(typeof define === "function") {
       if(define.amd){
           define(['backbone','backbone-super'], factory);
       }
       if(define.cmd){
           define(['backbone','backbone-super'],function(require, exports, module){
               return factory(require('backbone'),require('backbone-super'));
           })
       }
   } else if(typeof module === "object" && module.exports) {
       module.exports = factory(require('backbone'),require('backbone-super'));
   }
}(this,function(Backbone){
    return Backbone.Collection.extend({
        isLoading:false,
        initialize:function(){
            var me = this;
            me._super.apply(me,arguments);
            me.on({
                'request':function(model, xhr, options){
                    me.isLoading = true
                },
                'sync':function(model, xhr, options){
                    me.isLoading = false
                }
            })
        }
    })
}))
