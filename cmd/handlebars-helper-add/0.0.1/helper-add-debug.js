define("handlebars-helper-add/0.0.1/helper-add-debug", [], function(require, exports, module){
module.exports = function() {
    var arg = arguments
    var i = 0
    var length = arg.length - 1
    var output = ''
    for (; i<length; i++) {
        output = output + arg[i]
    }
    return output
};

// Handlebars.registerHelper('add', helperAdd);
});
