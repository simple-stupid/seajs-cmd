/*
  author:Nimo
*/
define("rain/statistics/0.0.1/statistics", ['jquery/jquery/1.11.1/jquery','gallery/chartjs/1.0.1/chartjs','rain/labelsselect/0.0.1/labelsselect','rain/daterange/0.0.1/daterange'], function(require, exports, module) {
    var $ = require('jquery/jquery/1.11.1/jquery');
    var Chart = require('gallery/chartjs/1.0.1/chartjs');
    //Chart.defaults.global.responsive = true;
    var Labelsselect = require('rain/labelsselect/0.0.1/labelsselect');
    var Daterange = require('rain/daterange/0.0.1/daterange');
    var Statistics = function(opt){
      var that = this;

      // options
      that.options = {
        wrap:'.s-statistics',
        daterange: '.s-dateRange',
        labelselect: '.s-labelSelect',
        mainchart: '#mainchart',
        ajaxurl: '/Ajax/url/',
        onUpdate:function(response){
          // response = ajax返回值
        }
      }

      $.extend(that.options,opt);

      // data
      that.data = {
        search:{
          labels:[],
          daterange:''
        },
        /*
        $red:#e95644;
        $cyan:#1cbfb5;
        $green:#51b466;
        $orange:#f77601;
        $blue:#34a9df;
        $khaki:#daa25d;
        $brown:#a7706d;
        $darkcyan:#588f92;
        */
        colors: {
            "b-text-red": "rgb(233, 86, 68)",
            "b-text-cyan":  "rgb(28, 191, 181)",
            "b-text-green":  "rgb(81, 180, 102)",
            "b-text-orange":  "rgb(247, 118, 1)",
            "b-text-blue":  "rgb(52, 169, 223)",
            "b-text-khaki":  "rgb(218, 162, 93)",
            "b-text-brown":  "rgb(88, 143, 146)",
            "b-text-gray":  "rgb(223, 223, 223)"
        },
        // 缓存级别：JS变量缓存，刷新页就消失
        cache: {

        },
        support: {
          canvas: !!document.createElement("canvas").getContext
        }
      }

      if(!that.data.support.canvas){
        // 不支持canvas的IE种不使用动画
        Chart.defaults.global.animation = false;
      }

      var $wrap = $(that.options.wrap);
      that.ele = {
        wrap: $wrap,
        daterange: $(that.options.daterange,$wrap),
        labelselect: $(that.options.labelselect,$wrap),
        mainchart: $(that.options.mainchart,$wrap)
      }
      var ele = that.ele;
    
      ele.mainchartWrap = that.ele.mainchart.closest('.s-canvas-wrap')
      // 设置chart 宽度满屏
      ele.mainchart.attr('width',ele.mainchartWrap.width())

      // 初始化日期，准备图表，初始化标签选择
      that.daterange = new Daterange({
        wrap: that.ele.daterange,
        onSelectDone: function(date){
          that.data.search.daterange = date.join('~')
          that.update()
        }
      })
      // 初始化chart
      that.mainchart = new Chart(ele.mainchart.get(0).getContext("2d"));
      that.mainchartLine = null;

      that.labelsselect = new Labelsselect({
        wrap: that.ele.labelselect,
        onSubmit: function(checkeds){
          that.data.search.labels = []
          $(checkeds).each(function(){
            that.data.search.labels.push(this.value)
          })
          that.update()
        }
      })

      // 初始化收集查询条件
      $(that.labelsselect.data.checkeds).each(function(){
        that.data.search.labels.push(this.value)
      })
      that.data.search.daterange = that.daterange.data.date.join('~')

      // 加载完成获数据
      that.update();
    }
    Statistics.prototype.update = function(){
      var that = this;
      var sUpdateID = that.data.search.labels.join(',') + " " + that.data.search.daterange;
      // 缓存判断
      if(that.data.cache[sUpdateID]){
        var oChartOpt = that.data.cache[sUpdateID];
        that.draw(oChartOpt);
        that.options.onUpdate.call(that,oChartOpt.response)
      }else{
        that.ele.wrap.find('.s-canvas-wrap').addClass('b-loading');
        $.getJSON(that.options.ajaxurl,{
          labels: that.data.search.labels.join(','),
          range: that.data.search.daterange
        },function(oData){
          that.ele.wrap.find('.s-canvas-wrap').removeClass('b-loading')
          // 将返回的detail数据转换为图表参数
          var oChartOpt = {
              main:{
                labels: oData.labels,
                datasets:[]
              },
              response: oData
          }

          // 主图表数据
          $.each(oData.detail,function(index){
              var sColor = that.data.colors[$(that.labelsselect.data.checkeds).eq(index).data('color')];
              oChartOpt.main.datasets.push({
                  data:this,
                  fillColor:sColor.replace(/rgb/,'rgba').replace(/\)$/,',.04)'),
                  strokeColor:sColor,
                  pointColor:sColor,
                  pointStrokeColor:'white'
              })
          })

          // 数据存入缓存
          that.data.cache[sUpdateID] = oChartOpt;
          that.draw(oChartOpt);
          that.options.onUpdate.call(that,oChartOpt.response)
        })
      }
    }
    Statistics.prototype.draw = function(oChartOpt){
      var that = this;
      if(that.mainchartLine){
        that.mainchartLine.destroy()
      }
      that.mainchartLine = that.mainchart.Line(oChartOpt.main,{
        responsive: true
      });
      
    }
    module.exports = Statistics;
});