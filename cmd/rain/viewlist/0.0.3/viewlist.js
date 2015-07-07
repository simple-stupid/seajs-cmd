/*
  author:Nimo
*/
define("rain/viewlist/0.0.3/viewlist", ['jquery/jquery/1.11.1/jquery','gallery/handlebars/1.0.2/handlebars'], function(require, exports, module) {
    var $ = require('jquery/jquery/1.11.1/jquery');
    var Handlebars = require('gallery/handlebars/1.0.2/handlebars');
    var Viewlist = function(opt){
       var that = this;
        // options
        that.options = {
          // ajax路径
          ajaxurl:'/Ajax/url/',
          // ajax方式
          type:'get',
          // 模板内容 jQuery selector or DOM or jQuery DOM
          tpl: '#tpl',
          // 渲染容器 jQuery selector or DOM or jQuery DOM
          view: '#view',
          // 内部form，提交时候会将form的内容一并提交
          form: '.s-viewlist-form',
          // 用于配合翻页
          go: '.s-go',
          // 用于配合翻页
          jump: '.s-jump',
          // 用于配合翻页
          jumpto: '.s-jump-to',
          // 保留前几页
          beforepages:5,
          // 保留后几页
          afterpages:5,
          // 默认页面
          defaultPage:1,
          // 每页显示数
          pagesize:10,
          // 遮罩图层 class
          maskClass: 'ui-viewlist-mask b-loading'
        }
        that.method = {
          beforeSend: function(aSendData){
            
          },
          response: function(oResponse){

          },
          renderDone: function(oSource, view){

          }
        }
        $.extend(that.options,opt);
        
        // data
        that.data = {
          // 模板内容
          tpl: null,
          curpage: null,
          viewData: null,
          ajax: null
        }

        that.Handlebars = Handlebars;
    }
    Viewlist.prototype.init = function () {
      var that = this;
        // init
        that.element = {
          view: $(that.options.view),
          form:$(that.options.form),
          tpl:$(that.options.tpl)
        }
        that.data.tpl = that.element.tpl.html().replace(/\%\>/g,'}}').replace(/\<\%/g,'{{');
        that.data.curpage = that.options.defaultPage;
        try{
          that.data.jsondata = $.parseJSON($(that.options.jsondata).html())
        } catch(e){
          if(console){
            console.log('后端JSON格式错误');
              console.log(e);
          }
        }
        
        that.update(that.data.jsondata);
        // add event
        that.element.form.on('submit' ,function () {
            that.update();
            return false;
        })

        that.element.view.on('click',that.options.go,function(){
          var $this = $(this)
          that.data.curpage = Number($this.data('page'));
          that.update();
          return false;
        })

        that.element.view.on('change',that.options.jump,function(){
          if (/\D/.test(this.value)) {
            this.value = this.value.replace(/\D/g,'')
          }
          if(Number(this.value) > that.data.viewData._pagecount){
            this.value = that.data.viewData._pagecount
          }
          if(this.value < 1){
            this.value = 1;
          }
        })
        that.element.view.on('click',that.options.jumpto,function(){
          var $this = $(this)
          that.data.curpage = Number(that.element.view.find(that.options.jump).val())
          that.update()
          return false;
        })
    }
    Viewlist.prototype.update = function(jsondata){
      var that = this;
      var aSendData = [];
      aSendData.push({
        name: 'page',
        value: that.data.curpage
      })
      aSendData.push({
        name: 'pagesize',
        value: that.options.pagesize
      })
      that.element.form.each(function () {
        var $this = $(this);
        aSendData = aSendData.concat($this.serializeArray());
      })
      that.method.beforeSend.call(that,aSendData)

      if(that.data.ajax){
        that.data.ajax.abort()
        that.element.view.find('.s__viewlist-mask').remove()
      }
      var $mask = $('<div class="' + that.options.maskClass + ' s__viewlist-mask"></div>');
      $mask.css({
        position: "absolute",
        left: 0,
        top: 0,
        'z-index': 10,
        width:that.element.view.width(),
        height:that.element.view.height()
      })

      that.element.view.append($mask)
      function fDataCallback (oData){
        oData._curpage = that.data.curpage;
        $.extend(oData, that.createPaging(that.data.curpage, oData.pagecount))
        
        if (that.method.response.call(that,oData) === false)  {
          return false;
        }
        that.element.view.html(
            that.Handlebars.compile(that.data.tpl)(oData)
        )
        that.method.renderDone.call(that,oData, that.element.view)
        that.data.viewData = oData;
      }
      if(jsondata){
        fDataCallback(jsondata)
      } else {
        that.data.ajax = $.ajax(that.options.ajaxurl,{
          type:that.options.type,
          dataType:'json',
          data:aSendData
        }).done(fDataCallback);
      }
    }
    Viewlist.prototype.on = function (name, fn) {
      var that = this;
      that.method[name] = fn;
    }
    Viewlist.prototype.createPaging = function (curpage, pagecount, beforepageCount, afterpageCount) {
        var oResult = {};
        if(!pagecount){
          pagecount = 1;
        }
        if (!beforepageCount) {
            beforepageCount = 3;
        }
        if (!afterpageCount) {
            afterpageCount = 3;
        }
        // 当前页不会大于总页数
        if (curpage > pagecount) {
          curpage = pagecount;
        }
        // 当前页
        oResult._curpage = curpage;
        // 总页数
        oResult._pagecount = pagecount;
        // 存在分页？
        if(pagecount !== 1){
            oResult._hasPagecount = true;
        }else{
            oResult._hasPagecount = false;
        }
        // 是第一页？
        oResult._isFirstpage = curpage === 1 ? true : false;
        // 是最后一页？
        oResult._isLastpage = curpage === pagecount ? true : false;
        // 当前页前几页
        oResult._beforepages = [];
        var i;
        for(i = 0;i < beforepageCount;i ++){
            var iPage = curpage - i - 1;
            if(iPage === 0){
              // stop loop
              i = beforepageCount + 1;
            }else{
              oResult._beforepages.unshift(iPage)
            }
        }
        // 存在前几页？
        if(oResult._beforepages[0] === 1 || oResult._beforepages.length === 0){
            oResult._hasBeforemorepages = false;
        }else{
            oResult._hasBeforemorepages = true;
        }
        // 当前页后几页
        oResult._afterpages = [];
        var i;
        for(i = 0; i < afterpageCount; i ++){
            var iPage = curpage + i + 1;
            if(iPage > pagecount){
                // stop loop
                i = afterpageCount + 1;
            }else{
                oResult._afterpages.push(iPage)
            }
        }
        // 存在后几页？
        if (oResult._afterpages[oResult._afterpages.length-1] === pagecount || oResult._afterpages.length === 0) {
            oResult._hasAftermorepages = false;
        } else {
            oResult._hasAftermorepages = true;
        }
        // 上一页
        oResult._prevpage = curpage - 1;
        if (oResult._prevpage < 1) {
            oResult._prevpage = false
        }
        // 下一页
        oResult._nextpage = curpage + 1;
        if (oResult._nextpage > pagecount) {
            oResult._nextpage = false
        }
        return oResult;
        /*
          返回属性：
          _hasPagecount 存在分页 Boolean 
          _pagecount 总页数 Number
          _curpage  当前页 Number
          _isFirstpage  当前页是第一页 Boolean
          _isLastpage 当前页是最后一页 Boolean 
          _beforepages 当前页前几页 Array [2,3,4]
          _afterpages 当前页后几页 Array [6,7,8]
          _hasBeforemorepages  存在前几页 Boolean
          _hasAftermorepages  存在后几页 Boolean
          _prevpage 上一页 Number or Boolean
          _nextpage 下一页 Number or Boolean
        */
    }
    
    module.exports = Viewlist;
});
