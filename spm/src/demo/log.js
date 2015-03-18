define("src/demo/log", [], function(require, exports, module){
    var log = function (msg) {
        console.log('------------');
        console.log(msg);
        console.log('------------');
    }
    module.exports = log;
});