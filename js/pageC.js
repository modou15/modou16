function pageC(){
    this.$window = $(".page-c .window") ;
    this.$leftWin = this.$window.find(".window-left") ;
    this.$rightWin = this.$window.find(".window-right") ;
    this.$sceneBg = this.$window.find(".window-scene-bg") ;
    this.$closeBg = this.$window.find(".window-close-bg") ;

    this.$sceneBg.transition({
        opacity: 0
    }, 3000) ;
    this.$closeBg.transition({
        opacity: 1
    }, 5000) ;
    this.closeWindow(this.snowflake) ;
}

pageC.prototype.closeWindow = function(callback){
    var count = 1 ;
    var complete = function(){
        if(count ++ == 2){
            callback && callback() ;
        }
    } ;

    this.$leftWin.addClass("close")
        .one("animationend webkitAnimationEnd", function(){
            complete() ;
        }) ;
    this.$rightWin.addClass("close")
        .one("animationend webkitAnimationEnd", function(){
            complete() ;
        }) ;
} ;

pageC.prototype.snowflake = function(){
    var snowELement = document.getElementById("snowflake") ;
    var canvasContext = snowELement.getContext("2d") ;
    var width = config.clientWidth ;
    var height = config.clientHeight ;

    snowELement.width = width ;
    snowELement.height = height ;

    var snowNumber = 50 ;

    var snowArrObjs = initSnow(snowNumber, width, height) ;
    var snowArrNum = snowArrObjs.length ;

    renderAndUpdate() ;

    function render(){
        canvasContext.clearRect(0, 0, width, height) ;
        for(var i = 0; i < snowArrNum; i ++){
            snowArrObjs[i].render(canvasContext) ;
        }
    }

    function update(){
        for(var i = 0; i < snowArrNum; i ++){
            snowArrObjs[i].update() ;
        }
    }

    function renderAndUpdate(){
        render() ;
        update() ;
        requestAnimationFrame(renderAndUpdate) ;
    }

    function initSnow(snowNumber, width, height){
        var options = {
            minRadius: 3,
            maxRadius: 10,
            maxX: width,
            maxY: height,
            minSpeedY: 0.035,
            maxSpeedY: 1.5,
            speedX: 0.05,
            minAlpha: 0.5,
            maxAlpha: 1.0,
            minMoveX: 2,
            maxMoveX: 9
        } ;
        var snowArr = [] ;
        for(var i = 0; i < snowNumber; i ++){
            snowArr[i] = new Snow(options) ;
        }
        console.log(snowArr) ;
        return snowArr ;
    }

    function Snow(snowSettings){
        this.snowSettings = snowSettings ;
        this.radius = randomInRange(snowSettings.minRadius, snowSettings.maxRadius) ;
        this.initialX = Math.random() * snowSettings.maxX ;
        this.y = -(Math.random() * 500) ;
        this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY) ;
        this.speedX = snowSettings.speedX ;
        this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha) ;
        this.angle = Math.random(Math.PI * 2) ;
        this.x = this.initialX + Math.sin(this.angle) ;
        this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX) ;
        this.render = function(canvasContext){
            canvasContext.beginPath() ;
            canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")" ;
            canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true) ;
            canvasContext.closePath() ;
            canvasContext.fill() ;
        } ;
        this.update = function(){
            this.y += this.speedY ;
            if(this.y > this.snowSettings.maxY){
                this.y -= this.snowSettings.maxY ;
            }
            this.angle += this.speedX ;
            if(this.angle > Math.PI * 2) {
                this.angle -= Math.PI * 2 ;
            }
            this.x = this.initialX + this.moveX * Math.sin(this.angle) ;
        } ;
    }

    function randomInRange(min, max) {
        var random = Math.random() * (max - min) + min ;
        return random ;
    }
} ;
