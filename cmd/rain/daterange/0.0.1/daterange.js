/*
  author:Nimo
*/
define("rain/daterange/0.0.1/daterange", ['jquery','arale/calendar/1.0.0/calendar'], function(require, exports, module) {
    var $ = require('jquery'),
        Calendar = require('arale/calendar/1.0.0/calendar');
    var Daterange = function(opt){
        var that = this;
        // options
        that.options = {
            wrap: '.s-dateRange',
            stratOutput: '.s-startDate',
            endOutput: '.s-endDate',
            trigger: '.s-dateRange-calendar-hd',
            label: '.s-dateRange-label',
            c1wrap: '.s-dateRange-c1',
            c2wrap: '.s-dateRange-c2',
            submit: '.s-submit',
            cancel: '.s-cancel',
            startTime: '2011.01.01', // 默认最早时间限制
            endTime: '2025.01.01', // 默认最晚时间限制
            format: 'YYYY.MM.DD',
            onSelectDone:function(date){
                // this = new Daterange()得到的对象
                // date = ["2014-09-08", "2014.10.22"] 
            }
        }
        $.extend(that.options,opt)
        // select DOM
        var $wrap = $(that.options.wrap);
        that.ele = {
            wrap: $wrap,
            stratOutput: $(that.options.stratOutput,$wrap),
            endOutput: $(that.options.endOutput,$wrap),
            trigger: $(that.options.trigger,$wrap),
            label: $(that.options.label,$wrap),
            c1wrap: $(that.options.c1wrap,$wrap),
            c2wrap: $(that.options.c2wrap,$wrap),
            submit: $(that.options.submit,$wrap),
            cancel: $(that.options.cancel,$wrap),
            c1:null,
            c2:null
        }
        var ele = that.ele,
            opt = that.options;
        // data
        that.data = {
            date:[ele.wrap.data('default-strat-date'),ele.wrap.data('default-end-date')]
        }
        // init
        that.c1 = new Calendar({
            output: ele.stratOutput,
            range: [opt.startTime, null],
            hideOnSelect:false,
            align:{
                selfXY: [0,0],
                baseXY: [0,0],
                baseElement: ele.trigger
            }
        })
        that.c1.on('selectDate', function(date) {
            that.c2.range([date, opt.endTime]);
        });
        ele.c1 = $(that.c1.element);
        that.c2 = new Calendar({
            output: ele.endOutput,
            range: [null,opt.endTime],
            hideOnSelect:false,
            align:{
                selfXY: [0,0],
                baseXY: [0,0],
                baseElement: ele.trigger
            }
        })
        that.c2.on('selectDate', function(date) {
            that.c1.range([opt.startTime,date]);
        });
        ele.c2 = $(that.c2.element);

        ele.trigger.on('click',function(){
            var $this = $(this);
            ele.wrap.toggleClass('c-dateRange-open')
            that.c1.show();
            that.c2.show();
        })
        ele.label.on('click',function(){
            var $this = $(this);
            $this.addClass('c-dateRange-label-on').siblings('.c-dateRange-label-on').removeClass('c-dateRange-label-on');
            var aDate = $this.data('date-range').split('~');
            that.c1.focus(aDate[0].replace(/\./g,'-'))
            that.c2.focus(aDate[1].replace(/\./g,'-'))
            ele.stratOutput.html(aDate[0])
            ele.endOutput.html(aDate[1])
            that.data.date = [ele.stratOutput.html(),ele.endOutput.html()];
            opt.onSelectDone.call(that,that.data.date)
        })
        ele.submit.on('click',function(){
            ele.wrap.removeClass('c-dateRange-open')
            that.data.date = [ele.stratOutput.html(),ele.endOutput.html()];
            opt.onSelectDone.call(that,that.data.date)
        })
        ele.cancel.on('click',function(){
            ele.wrap.removeClass('c-dateRange-open')
        })
        that.c1.show()
        that.c2.show()
        ele.c1wrap.append(ele.c1)
        ele.c2wrap.append(ele.c2)
    }
    module.exports = Daterange;
});
