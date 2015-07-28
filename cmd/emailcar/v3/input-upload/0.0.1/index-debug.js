define('emailcar/v3/input-upload/0.0.1/index-debug',['jquery-debug','rui-upload/1.2.1/index-debug','handlebars-debug','arale-dialog/1.5.1/dialog-debug'], function (require, exports, module) {
    var $ = require('jquery')
    var Uploader = require('rui-upload/1.2.1/index-debug')
    var Handlebars = require('handlebars-debug')
    var template = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "ui-input-upload-exist";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.filename : stack1), depth0))
    + "\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "            <a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" target=\"_blank\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\"\"></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"ui-input-upload "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.id : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"ui-input-upload-form\">\n        <div class=\"ui-input-upload-placeholder\">\n            "
    + this.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\n        </div>\n        <span class=\"ui-input-upload-btn\">选择文件</span>\n    </div>\n    <div class=\"ui-input-upload-preview\">\n        <div class=\"ui-input-upload-photo\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.is_file : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"ui-input-upload-again\">重新上传</div>\n    </div>\n</div>'";
},"useData":true})
    var Dialog = require('arale-dialog/1.5.1/dialog')
    var inputUpload = function(element){
        // element
        // <input type="hidden" name="photo" data-action="/uploadify/" value="">
        // <input type="hidden" name="photo" data-action="/uploadify/" value='{"src":"http://dummyimage.com/600x400/000/fff","val":"xcxcsdsd"}'>

        var $elem = $(element)
        var settings = {}
        settings.action = $elem.data('action')
        if (!settings.action) {
            throw 'need data-action="/upload_photo_url/"'
        }
        settings.placeholder = $elem.attr('placeholder')
        settings.data = $elem.val()
        if (settings.data) {
            settings.data = $.parseJSON(settings.data)
        }
        if ($elem.data('type') === 'file') {
            settings.is_file = true
        }
        var render = function (settings) {
            var callee = arguments.callee
            if ($elem.data('ui-uploader')) {
                // 每次渲染时废除 upload 定位的 form 
                $elem.data('ui-uploader').destroy()
                $elem.data('dom-input').remove()
            }
            var $input = $(template(settings))
            $elem.val(settings.data.id)
            $elem.data('dom-input', $input)
            $elem.after($input)
            var $placeholder = $input.find('.ui-input-upload-placeholder')
            var $picker = $input.find('.ui-input-upload-again,.ui-input-upload-btn')
            var uploader = new Uploader({
                trigger: $picker,
                name: 'file',
                action: settings.action,
                multiple: false,
                success: function(res){
                    var res = $.parseJSON(res)
                    if (res.status === 'error') {
                        new Dialog({
                        content: S.com.template.errorDialog({
                            title: '提示',
                            content: res.msg
                        })
                    }).show()
                    }
                    settings.data = res
                    callee(settings)
                },
                progress: function (event, position, total, percent, files) {
                    $placeholder.html('正在上传...' + percent + '%')
                },
                error: function () {
                    new Dialog({
                        content: S.com.template.errorDialog({
                            title: '提示',
                            content: '上传出错，请重新上传'
                        })
                    }).show()
                }
            })
            $elem.data('ui-uploader', uploader)
        }
        // 第一次渲染
        render(settings)
    }
    module.exports = inputUpload
})