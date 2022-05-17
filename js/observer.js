var Observer = (function(slice){
    function subscribe(event, fn){
        var events = this.events = this.events || {} ,
            parts = event.split(/\s+/) ,
            num = parts.length ,
            part ;
        if(events[event] && events[event].length)
            return this ;

        for(var i = 0; i < num ; i ++){
            events[(part = parts[i])] = events[part] || [] ;
            events[part].push(fn) ;
        }
        return this ;
    }

    function one(event, fn){
        this.subscribe(event, function fnc(){
            fn.apply(this, slice.call(argument)) ;
            this.unsubscribe(event, fnc) ;
        }) ;
        return this ;
    }

    function unsubscribe(event, fn){
        var events = this.events ,
            eventName, i, parts, num ;

        if(!events)
            return ;

        parts = event.splid(/\s+/) ;
        for(i = 0, num = parts.length; i < num; i ++){
            if((eventName = parts[i]) in events !== false){
                events[eventName].splice(events[eventName].indexOf(fn), 1) ;
                if(!events[eventName].length){
                    delete events[eventName] ;
                }
            }
        }
        return this ;
    }

    function publish(event){
        var events = this.events,
            i, args, falg ;

        if(!events || event in events === false)
            return ;
        args = slice.call(arguments, 1);
        for (i = events[event].length - 1; i >= 0; i--) {
            falg = events[event][i].apply(this, args);
        }
        return falg; //修正带返回
    }

    return function() {
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;
        this.publish = publish;
        this.one = one;
        return this;
    };
})([].slice);