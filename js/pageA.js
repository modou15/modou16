function pageA(element, callback){
    this.$boy = element.find(".chs-boy") ;

    this.$window = element.find(".window") ;
    this.$leftWin = this.$window.find(".window-left") ;
    this.$rightWin = this.$window.find(".window-right") ;
    this.callback = callback ;
    this.run() ;
}

pageA.prototype.openWindow = function(callback){
    var count = 1 ;
    var complete = function(){
        ++ count ;
        if(count == 2){
            callback && callback() ;
        }
    } ;
    this.$leftWin.transition({
        transformOrigin: "left",
        transform: "rotateY(60deg)",
        top: "0.03rem",
    }, 2000, "ease-in-out", function(){
        complete() ;
    });

    this.$rightWin.transition({
        transformOrigin: "right",
        transform: "rotateY(-60deg)",
        top: "0.03rem",
    }, 2000, "ease-in-out", function(){
        complete() ;
    }) ;

} ;

pageA.prototype.next = function(options){
    var dfd = $.Deferred() ;
    this.$boy.transition(options.style, options.time, "linear", function(){
        dfd.resolve() ;
    }) ;
    return dfd ;
} ;

pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer") ;
} ;

pageA.prototype.run = function(callback){
    var that = this ;

    that.next({
        time: 10000,
        style: {
            top: "4rem",
            right: "16rem",
            scale: "1.2"
        }
    })
        .then(function(){
            return that.next({
                time: 500,
                style: {
                    rotateY: "-180",
                    scale: "1.5"
                }
            })
        })
        .then(function(){
            return that.next({
                time: 7000,
                style: {
                    top: "7.8rem",
                    right: "2rem"
                }
            })
        })
        .then(function(){
            that.stopWalk() ;
            that.openWindow(that.callback)
        })
} ;