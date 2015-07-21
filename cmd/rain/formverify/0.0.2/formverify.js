/*
  author:Nimo
*/
define("rain/formverify/0.0.2/formverify", ['arale/widget/1.1.1/widget','jquery','arale/validator/0.9.7/validator','arale/dialog/1.3.0/dialog','gallery/mustache/0.8.1/mustache'], function(require, exports, module) {
    var Widget = require('arale/widget/1.1.1/widget');
    var $ = require('jquery');
    var Core = require('arale/validator/0.9.7/validator');
    var Dialog = require('arale/dialog/1.3.0/dialog');
    var Mustache = require('gallery/mustache/0.8.1/mustache');
    var Formverify = function(opt){
        var that = this;
        // options
        that.options = {
           element:'.s-formverify-form',
           onAJAXDone: function(oData){
                //console.log(arguments)
                // return false
                // 返回false则不进行后续操作
           },
           beforeSend:function(){
                // 返回false则不进行后续操作
           }
        }
        $.extend(that.options,opt)
        that.ele = {
            form : $(that.options.element)
        }
        that.ele.submit = that.ele.form.find('[type=submit]');
        that.data = {
            dialogSuccessTpl: $(that.ele.form.data('dialog-success-tpl')).html(),
            dialogErrorTpl: $(that.ele.form.data('dialog-error-tpl')).html()
        }
        // init
        Widget.autoRenderAll();
        that.validator = Core.query(that.ele.form);
        that.ele.submit.data('text',that.ele.submit.html())

        // debug S
        // that.ele.form.find('.ui-input').each(function(){
        //     that.validator.removeItem(this);
        // })
        // debug E
        that.validator.attrs.autoSubmit.value = false;
        that.ajax = null;
        that.validator.on('formValidated',function(error, message, elem){
            if(that.options.beforeSend() === false){
                return false;
            }
            if(!error){
                var $form = that.ele.form,
                aSendData = $form.serializeArray();
                aSendData.push({
                    name:'_ajax',
                    value:true
                })
                if(that.ajax){
                    that.ajax.abort()
                }
                if(!that.ele.submit.data('display')){
                    that.ele.submit.data('display',that.ele.submit.html())
                }
                that.ele.submit.html('正在'+that.ele.submit.data('display')+'...')
                that.ajax = $.ajax($form.attr('action'),{
                    type: $form.attr('method'),
                    dataType: 'json',
                    data: aSendData
                }).done(function(oData){
                    that.ele.submit.html(that.ele.submit.data('text'))
                    if(that.options.onAJAXDone.call(that,oData) === false){
                        return false
                    }
                    var sMsgClass = 'ui-dialog-success',
                    sDialogTpl = that.data.dialogSuccessTpl,
                    sICON = '&#xe60c;'
                    if(oData.status === 'error'){
                        sMsgClass = 'ui-dialog-error'
                        sDialogTpl = that.data.dialogErrorTpl;
                        sICON = '&#xe60f;';
                    }
                    if(oData.msg){
                        if(oData.input){
                            // {"error":true,"input":"username","msg":"error detail"}
                            var $target = that.ele.form.find('[name='+oData.input+']');
                            var $parent = $target.closest('.ui-form-item');
                            var $explain = $parent.find('.ui-form-explain');
                            $target.trigger('focus');
                            $parent.addClass('ui-form-item-error').removeClass('ui-form-focus');
                            $explain.html(oData.msg);

                        }else{
                            // {"msg":"ok"} or {"error":true,"msg":"error detail"}
                            new Dialog({
                                width:'',
                                height:'',
                                content:'<div class="ui-dialog-minbox"><div class="'+sMsgClass+'"><i class="b-icon">'+ sICON +'</i>'+oData.msg+'</div></div>'
                            }).show()
                        }
                    }
                    if(oData.url){
                        // {"url":"http://gfryhue.org/srdjq"}
                        location.href = oData.url;
                    }
                    if (sDialogTpl) {
                        new Dialog({
                            width:'',
                            height:'',
                            content:Mustache.render(sDialogTpl,oData.view)
                        }).show()
                    }
                })
            }
        })
    }
    module.exports = Formverify;
});

