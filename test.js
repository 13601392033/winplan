class Promise{
    callbacks = []
    state = "pending"
    value = null
    constructor(fn){
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(onSuccess, onReject){
        return new Promise((res, rej)=>{
            this.handle({
                onSuccess: onSuccess || null,
                resolve: res,
                onReject: onReject || null,
                reject: rej,
            })
        })
    }
    handle(callback){
        if(this.state == "pending"){
            this.callbacks.push(callback)
            return;
        }
        let cb = this.state == "fulfilled" ? callback.onSuccess : callback.onReject
        if(!cb){
            cb = this.state == "fulfilled" ? callback.resolve : callback.reject
            cb(this.value)
            return
        }
        let ret = cb(this.value)
        cb = this.state == "fulfilled" ? callback.resolve : callback.reject
        cb(ret)
    }
    reject(error){
        this.state = "rejected"
        this.value = error
        this.callbacks.forEach(item=>{
            this.handle(item)
        })
    }
    resolve(value){
        if(value && (typeof value == "object")){
            let then = value.then;
            if(typeof then == "function"){
                then.call(value, this.resolve.bind(this), this.reject.bind(this));
                return
            }
        }
        this.state = "fulfilled"
        this.value = value
        this.callbacks.forEach(item=>{
            this.handle(item)
        })
    }
}

let p = new Promise((res)=>{
    setTimeout(() => {
        res(111)
    }, 1000);
})

p.then((res)=>{
    console.log(res)
    return new Promise((res,rej)=>{
        setTimeout(() => {
            rej("hello world")
        }, 2000);
    })
}).then(res=>{
    console.log(res)
},(res)=>{
    console.log(res)
})