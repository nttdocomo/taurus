(function (root, factory) {
    if(typeof define === "function") {

        if(define.amd){
            // Now we're wrapping the factory and assigning the return
            // value to the root (window) and returning it as well to
            // the AMD loader.
            define(function(){
              return factory();
            });
        }

        if(define.cmd){
            define(function(require, exports, module){
                return factory();
            })
        }
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (root.Class = factory());
    } else {
        root.transitionEvent = factory();
    }
}(this, function() {
    /* From Modernizr */
    function whichTransitionEvent(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    /* Listen for a transition! */
    var transitionEvent = whichTransitionEvent();
    return whichTransitionEvent()
    /*transitionEvent && e.addEventListener(transitionEvent, function() {
        console.log('Transition complete!  This is the callback, no library needed!');
    });*/

    /*
    	The "whichTransitionEvent" can be swapped for "animation" instead of "transition" texts, as can the usage :)
    */
}))