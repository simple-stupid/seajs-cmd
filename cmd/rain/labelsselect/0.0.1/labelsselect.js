/*
  author:Nimo
*/
define("rain/labelsselect/0.0.1/labelsselect", ['jquery/jquery/1.11.1/jquery','gallery/icheck/1.0.2/icheck'], function(require, exports, module) {
    var $ = require('jquery/jquery/1.11.1/jquery');
    require('gallery/icheck/1.0.2/icheck');
    var LabelSelect = function(opt){
        var that = this;
        // data 
        that.data = {
          checkeds:[]
        }
        // options 
        that.options = {
          wrap: '.s-labelSelect',
          tags: '.s-labelsSelect-tags',
          btn: '.s-labelSelect-btn',
          bd: '.s-labelSelect-bd',
          inputs: '.s-labelSelect-bd [type=checkbox],.s-labelSelect-bd [type=radio]',
          submit: '.s-labelSelect-submit',
          maxselect :999,
          toggleClass :'c-labelSelect-on',
          onSubmit:function(checkeds){
            // this = new LabelSelect()得到的对象
            // checkeds = 选中状态的input
          }
        }
        $.extend(that.options,opt)
        //method
        that.method = {
          updateLabels: function(){
              var aHTML = [];
              $(that.data.checkeds).each(function(){
                var $this = $(this);
                aHTML.push('<span class="'+ $this.data('color') +'">'+ $this.data('text') +'</span>')
              })
              that.ele.tags.html(aHTML.join('、'))
          }
        }
        
        // select DOM
        var $wrap = $(that.options.wrap);
        that.ele = {
          wrap: $wrap,
          tags: $(that.options.tags,$wrap),
          btn: $(that.options.btn,$wrap),
          bd: $(that.options.bd,$wrap),
          inputs: $(that.options.inputs,$wrap),
          submit: $(that.options.submit,$wrap)
        }
        // alias
        var opt = that.options,
            data = that.data,
            ele = that.ele;
        // update data
        ele.inputs.filter(':checked').each(function(){
          data.checkeds.push(this)
        })
        // add Event S
        // toggle 
        ele.btn.on('click',function(){
          ele.wrap.toggleClass(opt.toggleClass)
        })
        
        // change & checked
        ele.inputs.iCheck().on('ifChecked',function(){
          data.checkeds.push(this);
        }).on('ifUnchecked',function(){
          var target = this;
          $.each(data.checkeds,function(index){
            if(this === target){
                data.checkeds = data.checkeds.slice(0,index).concat(
                  data.checkeds.slice(index+1)
                )
            }
          })
        }).on('ifChanged',function(){
          var iCheckedLength = ele.inputs.filter(':checked').length;
          if(iCheckedLength > opt.maxselect){
            $(data.checkeds.shift()).iCheck('uncheck');
          }
        })

        //submit
        ele.submit.on('click',function(){
          ele.wrap.removeClass(opt.toggleClass)
          that.method.updateLabels(); 
          // callback
          opt.onSubmit.call(that,that.data.checkeds)
        })
        // add Event E
        that.method.updateLabels();
    }
    module.exports = LabelSelect;
});