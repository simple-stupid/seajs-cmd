/*
  author:Nimo
*/
define("rain/viewlist/0.0.1/viewlist", ['jquery/jquery/1.11.1/jquery','gallery/mustache/0.8.1/mustache'], function(require, exports, module) {
    var $ = require('jquery/jquery/1.11.1/jquery');
    var Mustache = require('gallery/mustache/0.8.1/mustache');
    var Viewlist = function(opt){
      var that = this;
      // options
      that.options = {
        ajaxurl:'/Ajax/url/',
        type:'get',
        parentNode: '.s-viewlist-view',
        form: '.s-viewlist-form',
        tpl: '.s-viewlist-tpl',
        go: '.s-viewlist-go',
        toinput: '.s-viewlist-input-to',
        totarget: '.s-viewlist-input-target',
        beforepages:5,
        afterpages:5,
        defaultPage:1,
        pagesize:10,
        maskClass: 'c-viewlist-mask b-loading',
        onBeforeSend: function(sendData){

        },
        onReceiveData: function(){

        },
        onRenderDone: function(){

        }
      }
      $.extend(that.options,opt)
      
      // data
      that.data = {
        tpl:null,
        curpage:null,
        viewData:null,
        ajax:null
      }

      // init
      that.ele = {
        parentNode: $(that.options.parentNode),
        form:$(that.options.form),
        tpl:$(that.options.tpl)
      }
      that.data.tpl = that.ele.tpl.html();
      that.data.curpage = that.options.defaultPage;
      that.update()
      // add event
      that.ele.parentNode.on('click',that.options.go,function(){
        var $this = $(this)
        that.data.curpage = Number($this.data('page'));
        that.update()
        return false;
      })
      that.ele.parentNode.on('change',that.options.toinput,function(){
        if(/\D/.test(this.value)){
          this.value = this.value.replace(/\D/g,'')
        }
        
        if(Number(this.value) > that.data.viewData._pagecount){
          this.value = that.data.viewData._pagecount
        }
        if(this.value < 1){
          this.value = 1;
        }
      })
      that.ele.parentNode.on('click',that.options.totarget,function(){
        var $this = $(this)
        that.data.curpage = Number(that.ele.parentNode.find(that.options.toinput).val())
        that.update()
        return false;
      })
    }

    Viewlist.prototype.update = function(){
      var that = this;
      var sendData = [];
      if(that.ele.form.length !== 0){
        sendData = that.ele.form.serializeArray();
      }
      sendData.push({
        name: 'page',
        value: that.data.curpage
      })
      sendData.push({
        name: 'pagesize',
        value: that.options.pagesize
      })
      that.options.onBeforeSend.call(that,sendData)
      if(that.data.ajax){
        that.data.ajax.abort()
        that.ele.parentNode.find('.s__viewlist-mask').remove()
      }
      var $mask = $('<div class="' + that.options.maskClass + ' s__viewlist-mask"></div>');
      $mask.css({
        width:that.ele.parentNode.width(),
        height:that.ele.parentNode.height()
      })
      that.ele.parentNode.append($mask)

      that.data.ajax = $.ajax(that.options.ajaxurl,{
        type:that.options.type,
        dataType:'json',
        data:sendData
      }).done(function(oData){
        /*
        _pagecount 总页数  由ajax返回
        _curpage  当前页
        _isFirstpage  当前页是第一页
        _isLastpage 当前页是最后一页
        _beforepages 当前页前几页
        _afterpages 当前页后几页
        _hasBeforemorepages 
        _hasAftermorepages
        _prevpage 上一页
        _nextpage 下一页
        */
        //oData._pagecount
        oData._curpage = that.data.curpage
        oData._isFirstpage = oData._curpage === 1 ? true : false;
        oData._isLastpage = oData._curpage === oData._pagecount ? true : false;

        oData._beforepages = [];
        var i;
        for(i = 0;i<that.options.beforepages;i++){
          var iPage = oData._curpage - i - 1;
          if(iPage === 0){
            // stop loop
            i = that.options.beforepages + 1;
          }else{
            oData._beforepages.unshift(iPage)
          }
        }

        oData._afterpages = [];
        var i;
        for(i = 0;i<that.options.afterpages;i++){
          var iPage = oData._curpage + i + 1;
          if(iPage > oData._pagecount){
            // stop loop
            i = that.options.afterpages + 1;
          }else{
            oData._afterpages.push(iPage)
          }
        }

        if(oData._beforepages[0] === 1 || oData._beforepages.length === 0){
          oData._hasBeforemorepages = false;
        }else{
          oData._hasBeforemorepages = true;
        }
        
        if(oData._afterpages[oData._afterpages.length-1] === oData._pagecount || oData._afterpages.length === 0){
          oData._hasAftermorepages = false;
        }else{
          oData._hasAftermorepages = true;
        }
        
        oData._prevpage = oData._curpage - 1;
        if(oData._prevpage < 1){
          oData._prevpage = false
        }
        
        oData._nextpage = oData._curpage + 1;
        if(oData._nextpage > oData._pagecount){
          oData._nextpage = false
        }

        that.options.onReceiveData.call(that,oData)
        that.ele.parentNode.html(
            Mustache.render(that.data.tpl,oData)
        )
        that.options.onRenderDone.call(that,oData)
        that.data.viewData = oData;
      })
    }

    
    module.exports = Viewlist;
});
