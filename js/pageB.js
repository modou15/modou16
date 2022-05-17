function pageB(element, callback){
    var $boy = element.find(".christmas-boy") ;
    var $girl = element.find(".girl") ;
    var $carousel = element.find("#carousel") ;
    var animationEnd = "animationend webkitAnimationEnd" ;

    var carousel = {
        spinner: $carousel.find("#spinner"),
        run: function(count){
            var dfd = $.Deferred() ;
            var rotate = 120 ;
            var angel = count * rotate + 360 * (count+1) ;

            this.spinner.transition({
                transform: "rotateY(" + angel + "deg)"
            }, 1000, "linear", function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        playVideo: function(){
            var that = this ;
            var i = 1 ;
            console.log(this.spinner) ;
            this.spinner.on("click", function(event){
                var index = that.spinner.find("img").index($(event.target)) ;
                console.log(index) ;
                if(index !== 1) {
                    $girl.removeClass("girl-choose") ;
                    boyAction.strip(i) ;
                    playVedio(index)
                        .then(function() {
                            return girlAction.choose() ;
                        })
                        .then(function(){
                            return that.run(i++);
                        })
                }else{
                    $girl.removeClass("girl-choose") ;
                    boyAction.strip(i) ;
                    playVedio(index)
                        .then(function(){
                            $carousel.css("display", "none") ;
                            return girlAction.weepWalk() ;
                        })
                        .then(function(){
                            boyAction.hug() ;
                            return girlAction.hug() ;
                        })
                        .then(callback)
                }
            }) ;
        }
    } ;

    function playVedio(index){
        console.log("playvedio" + index) ;
        var dfd = $.Deferred() ;
        var videoUrls = [
            "https://f.video.weibocdn.com/o0/hvfTx0hClx07W7ACKYdG0104120011Vj0E010.mp4?label=mp4_720p&template=1280x704.25.0&media_id=4770167411114027&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=4&ot=h&lp=00001tKIgP&ps=mZ6WB&uid=8f8ZT3&ab=7397-g1,7165-g0,7332-g1,6377-g0,1192-g0,1258-g0,7598-g0,3601-g27&Expires=1652783715&ssig=xUJK%2F1EfeI&KID=unistore,video",
            "https://f.video.weibocdn.com/o0/JP7sGLq4lx07W7AVnuk0010412001Cme0E010.mp4?label=mp4_720p&template=1280x704.25.0&media_id=4770168824594524&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=4&ot=h&lp=00001tKIgP&ps=mZ6WB&uid=8f8ZT3&ab=7397-g1,7165-g0,7332-g1,6377-g0,1192-g0,1258-g0,7598-g0,3601-g27&Expires=1652783962&ssig=fJKldtXbVn&KID=unistore,video",
            "https://f.video.weibocdn.com/o0/RlfdPBkClx07W7AU27f2010412001lET0E010.mp4?label=mp4_720p&template=1280x704.25.0&media_id=4770168749097034&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=4&ot=h&lp=00001tKIgP&ps=mZ6WB&uid=8f8ZT3&ab=7397-g1,7165-g0,7332-g1,6377-g0,1192-g0,1258-g0,7598-g0,3601-g27&Expires=1652783962&ssig=8nuWthlzId&KID=unistore,video",
        ] ;
        var $video = $("<video preload='auto'></video>") ;
        $video.attr("src", videoUrls[index]) ;

        $video.on("loadeddata", function(){
            $video.addClass("bounceIn") ;
            $video[0].play() ;
        }) ;

        $video.on("ended", function(){
            $video[0].pause() ;
            $video.addClass("bounceOut")
                .one("animationend webkitAnimationEnd", function(){
                    $video.remove() ;
                    dfd.resolve() ;
                })
        }) ;

        $carousel.after($video) ;

        return dfd ;
    }

    var boyAction = {
        walk: function(){
            var dfd = $.Deferred() ;
            $boy.transition({
                right: "4.5rem"
            }, 4000, "linear", function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        stopWalk: function(){
            $boy.removeClass("boy-walk").addClass("boy-stand") ;
        },
        runWalk: function(){
            $boy.addClass("walk-run") ;
        },
        unwrapp: function(){
            var dfd = $.Deferred() ;
            $boy.addClass("boy-unwrapp") ;
            $boy.removeClass("boy-stand") ;
            $boy.one(animationEnd, function(){
                $carousel.css("display", "block") ;
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        strip: function(count){
            $boy.addClass("boy-strip-"+ count).removeClass("boy-unwrapp") ;
        },
        hug: function(){
            var dfd = $.Deferred() ;
            $boy.addClass("boy-hug").one(animationEnd, function(){
                $(".christmas-boy-head").show() ;
                dfd.resolve() ;
            }) ;
            return dfd ;
        }
    }

    var girlAction = {
        standUp: function(){
            var dfd = $.Deferred() ;
            setTimeout(function(){
                $girl.addClass("girl-standUp") ;
            }, 200) ;
            setTimeout(function(){
                $girl.addClass("girl-throwBook") ;
                $(".cat").addClass("cat-book") ;
                dfd.resolve() ;
            }, 500) ;
            return dfd ;
        },
        walk: function(){
            var dfd = $.Deferred() ;
            $girl.addClass("girl-walk") ;
            $girl.transition({
                right: "7.5rem"
            }, 3000, "linear", function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        stopWalk: function(){
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand") ;
        },
        choose: function(){
            var dfd = $.Deferred() ;
            $girl.removeClass("walk-stop").addClass("girl-choose") ;
            $girl.on(animationEnd, function(){
                dfd.resolve() ;
            })
            return dfd ;
        } ,
        weepWalk: function(){
            var dfd = $.Deferred() ;
            $girl.addClass("girl-weep") ;
            $girl.transition({
                right: "4.5rem"
            }, 1000, "linear", function(){
                $girl.addClass("walk-stop").removeClass("girl-weep") ;
                dfd.resolve() ;
            }) ;
            return dfd ;
        },
        hug: function(){
            var dfd = $.Deferred() ;
            $girl.addClass("girl-hug").addClass("walk-run") ;
            $girl.one(animationEnd, function(){
                dfd.resolve() ;
            }) ;
            return dfd ;
        }
    } ;

    boyAction.walk()
        .then(function(){
            boyAction.stopWalk() ;
            return girlAction.standUp() ;

        })
        .then(function(){
            return girlAction.walk() ;
        })
        .then(function(){
            girlAction.stopWalk() ;
            return boyAction.unwrapp() ;
        })
        .then(function(){
            return girlAction.choose() ;
        })
        .then(function(){
            return carousel.run(0) ;
        })
        .then(function(){
            carousel.playVideo() ;
        })
}
