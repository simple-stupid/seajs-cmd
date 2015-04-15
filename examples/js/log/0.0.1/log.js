define('local/log/0.0.1/log',function(){
    return function (msg) {
        console.log('--- log ----')
        console.log(msg)
        console.log('------------')
    }
})