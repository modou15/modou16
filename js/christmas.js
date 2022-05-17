$(function(){
    christmas() ;
    $('.play-btn').on('click', function () {
        $(this).fadeOut(500);
        var audio1 = HTML5Audio("./music/scene.mp3") ;
        audio1.end(function(){
            HTML5Audio("./music/circulation.mp3", true) ;
        })
    })
}) ;

function HTML5Audio(url, loop){
    var audio = new Audio(url) ;
    audio.autoplay = true ;
    audio.loop = loop || false ;
    audio.play() ;
    return {
        end: function(callback){
            audio.addEventListener("ended", callback, false) ;
        }
    }
}

function changePage(element, effect, callback){
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function(){
            callback && callback() ;
        }) ;
}

var christmas = function(){
    var $pageA = $(".page-a") ;
    var $pageB = $(".page-b") ;
    var $pageC = $(".page-c") ;

    var observer = new Observer() ;

    // new pageC() ;

    new pageA($pageA, function() {
        observer.publish("completeA");
    }) ;

    observer.subscribe("pageB", function(){
        new pageB($pageB, function(){
            observer.publish("completeB") ;
        }) ;
    }) ;

    observer.subscribe("pageC", function(){
        new pageC() ;
    }) ;

    observer.subscribe("completeA", function(){
        changePage($pageA, "effect-out", function(){
            $pageA.css("display", "none") ;
            observer.publish("pageB") ;
        }) ;
    }) ;

    observer.subscribe("completeB", function(){
        changePage($pageC, "effect-in", function(){
            observer.publish("pageC") ;
            $('.love-sentence').parent().fadeIn(500)
        }) ;
    }) ;
} ;

