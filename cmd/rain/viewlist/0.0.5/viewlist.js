define("rain/viewlist/0.0.5/viewlist", ['jquery','handlebars/3.0.0/dist/handlebars'], function(require, exports, module) {
    var $ = require('jquery')
    var Handlebars = require('handlebars/3.0.0/dist/handlebars')
    /*
    new Viewlist({
        // ajax 路径
        url: '/ajax/url/',
        // 模板内容 jQuery selector or DOM or jQuery DOM
        tpl: '#tpl',
        // 渲染容器
        view: '#view',
        // 渲染数据源
        renderData: '#renderData',
        form: '.s-viewlist-form'
    })
    */
    var Viewlist = function (settings) {
        var that = this;
        that.options = {
            // ajax 路径
            url: '/ajax/url/',
            // ajax type
            type: 'get',
            // 模板内容 jQuery selector or DOM or jQuery DOM
            tpl: '#tpl',
            // 渲染容器
            view: '#view',
            // 渲染数据源
            renderData: '#renderData',
            // 内部form，提交时候会将form的内容一并提交
            form: '.s-viewlist-form',
            defaultPage: 1,
            pagesize:10,
            paging: {
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
            },
            // 遮罩图层 class
            maskClass: 'ui-viewlist-mask b-loading'
        }
        $.extend(that.options,settings)
        that.callback = {
            beforeSend : function (data) {
                
            },
            done: function (response) {

            },
            fail: function (response) {

            },
            afterRender: function (data, view) {

            }
        }
        
        that.handlebars = Handlebars;
    }
    Viewlist.prototype.on = function (name, callback) {
        var that = this
        that.callback.name = callback
    }
    Viewlist.prototype.init = function () {

        var that = this
        that.ele = {
            view: $(that.options.view),
            form: $(that.options.form),
            tpl : $(that.options.tpl),
            renderData : $(that.options.renderData)
        }
        if (that.ele.tpl.length === 0) {
            throw "not find settings.tpl dom";
        }
        that.data = {
            // 模板内容                       {{=<% %>=}}
            tpl: that.ele.tpl.html().replace(/\%\>/g,'}}').replace(/\<\%/g,'{{'),
            curpage: that.options.defaultPage,
            xhr: null
        }

        that.template = Handlebars.compile(that.data.tpl)

        if (that.ele.renderData) {
            var sJSON = that.ele.renderData.html();
            try{
                that.data.renderData = $.parseJSON(sJSON)
            } catch (err) {
                if(window.console){
                    console.log(err);
                    console.log('Page json invalid format:' + that.options.renderData)
                    console.log(that.ele.renderData)
                    console.log(sJSON)
                  }
            }
            that.update(that.data.renderData)
        } else {
            that.update()
        }
        
        // add event
        that.ele.form.on('submit' ,function () {
            that.update();
            return false;
        })

        that.ele.view.on('click',that.options.paging.go,function(){
          var $this = $(this)
          that.data.curpage = Number($this.data('page'));
          that.update();
          return false;
        })

        that.ele.view.on('change',that.options.paging.jump,function(){
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
        that.ele.view.on('click',that.options.paging.jumpto,function(){
          var $this = $(this)
          that.data.curpage = Number(that.ele.view.find(that.options.paging.jump).val())
          that.update()
          return false;
        })

    }
    
    Viewlist.prototype.update = function(renderData){
        var that = this;
        if (renderData) {
            that.render(renderData)
            return
        }
        var aSendData = [
            {
                name: 'page',
                value: that.data.curpage
            },
            {
            name: 'pagesize',
            value: that.options.pagesize
            }
        ];
        
        that.ele.form.each(function () {
            var $this = $(this);
            aSendData = aSendData.concat($this.serializeArray());
        })
        that.callback.beforeSend.call(that, aSendData)
        
        if(that.data.xhr){
            that.data.xhr.abort()
            that.ele.mask.hide()
        }
        that.loading()
        
        that.data.xhr = $.ajax(that.options.url,{
            type:that.options.type,
            dataType:'json',
            data:aSendData
        }).done(function (response) {
            that.render(response)
        });
    }
    Viewlist.prototype.render = function (oData) {
        var that = this;
        oData._curpage = that.data.curpage;
        $.extend(oData, that.createPaging(that.data.curpage, oData.pagecount))

        if (that.callback.done.call(that,oData) === false)  {
          return false;
        }

        that.ele.view.html(
            that.template(oData)
        )
        that.callback.afterRender.call(that,oData, that.ele.view)
        that.data.viewData = oData;
    }
    Viewlist.prototype.loading = function () {
        var that = this;
        var $mask = $('<div class="' + that.options.maskClass + '"></div>').css({
            position: "absolute",
            left: 0,
            top: 0,
            'z-index': 10,
            width:that.ele.view.width(),
            height:that.ele.view.height(),
            display: 'block'
        })
        $mask.appendTo(that.ele.view)
        that.ele.mask = $mask;
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