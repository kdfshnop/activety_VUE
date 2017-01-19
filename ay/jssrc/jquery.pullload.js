/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 插件名称：pullload
2. 插件描述：拖动加载数据
3. 版本：1.0
4. 原理：判断滚动条的位置是否达到指定目标的在页面中的位置的X或者Y值临界值，以此为依据来触发Ajax请求
5. 使用范例：  
    
6. 未尽事宜：
7. 作者：zhaohuagang@guanaihui.com
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
(function ($) {
    $.fn.pullload = function (options) {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        合并配置属性
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var opts = $.extend({}, $.fn.pullload.defaults, options);
        return this.each(function () {
            var self = this;
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            首先把容器节点的可以请求数据设置为true，表示允许开始请求，一旦请求开始，这个属性将被设置为false，表示在请求数据后执行接口事件过程中不能继续请
            求，一定要等接口事件完毕才能继续请求，否则计算容器最后一个节点的位置会出现偏差
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            $(this).attr("requestable", "true");
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            然后给句柄绑定事件
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            $(opts.handler).on("scroll.pullload", function () {
                /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                取得页面滚动条位置
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                var height = $(window).height();
                var scrollTop = $(window).scrollTop();
                /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                取得容器内最后一个元素和发生加载滚动距离需要达到的数值
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                var $lastEl = $(self).children().last();
                var $secondLastEl = $(self).children().last().prev();
                var lastOffset = $lastEl.height() + $lastEl.offset().top + opts.threshold;
                var secondLastOffset = $secondLastEl.height() + $secondLastEl.offset().top + opts.threshold;

                var offset = lastOffset > secondLastOffset ? lastOffset : secondLastOffset;

                /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                满足条件就触发请求
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                if ((height + scrollTop) > offset && $(self).attr("requestable") == "true") $.fn.pullload.request(self, opts);
            });
        });
    };

    $.fn.pullload.request = function (container, opts) {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        并将允许请求状态设置为false ;
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        $(container).attr("requestable", "false");
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        明确化几个参数
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var apiDataType = opts.crossDomain ? "jsonp" : "json";
        var requestType = opts.crossDomain ? "GET" : opts.requestType;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        设置请求的时候附带的参数数据
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var requestParams = {};
        requestParams[opts.requestLoadedKey] = $(container).children().size() - 1;
        // requestParams[opts.pageIndexKey] = $(container).attr(opts.pageIndexKey);
        requestParams[opts.pageSizeKey] = $(container).attr(opts.pageSizeKey);

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        一旦请求开始，状态条就要开启
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        // $.fn.pullload.tips(opts.loadingTips, container, opts);
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        整个请求过程用try-catch块包起来
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        try {
            $.ajax({
                url: opts.apiUrl,
                type: requestType,
                dataType: apiDataType,
                data: requestParams,
                success: function (data) {
                    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    先执行回调函数
                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    if (opts.callback) opts.callback(data);
                    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    只有还有数据继续请求的时候，才将允许请求状态设置为true ;
                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    $(container).attr("requestable", "true");
                    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    关闭提示信息
                    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    // $.fn.pullload.closeTips(container, opts);
                },
                error: function (e) {
                    $.fn.pullload.tips(opts.loadFailedTips, container, opts);
                }
            })

        } catch (e) {
            $.fn.pullload.tips("错误名称：" + e.name + "\n错误描述：" + e.message);
        }
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        整个try-catch块结束
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    显示状态提示信息，如果提示框还没创建就先创建
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.pullload.tips = function (html, container, opts) {
        if ($(container).next("." + opts.tipsClassName).size() === 0) $(container).after("<div class=\"" + opts.tipsClassName + "\"></div>");
        var $tipsBar = $(container).next("." + opts.tipsClassName);
        $tipsBar.html(html);
        $tipsBar.slideDown(100);
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    关闭状态提示信息
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.pullload.closeTips = function (container, opts) {
        $(container).next("." + opts.tipsClassName).slideUp(100);
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    pullload默认配置
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    $.fn.pullload.defaults = {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        拉动对象，默认是window，也可以是其他容器
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        handler: window,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        提供数据进行异步加载的Ajax数据接口API地址
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        apiUrl: "",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        接口是否跨域，这直接决定了接口的返回格式是json还是jsonp
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        crossDomain: false,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        请求类型，可以是：GET | POST，如果crossDomain="jsonp"，那请求肯定是GET类型
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        requestType: "GET",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        接收到数据后的进行dom绘制的回调函数
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        callback: null,
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        向后端 请求的时候，已经存在的记录数参数key
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        requestLoadedKey: "loaded",

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        向后端 请求的时候，分页页码参数的key
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        pageIndexKey: "pageIndex",

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        向后端 请求的时候，分页页数参数的key
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        pageSizeKey: "pageSize",

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        接口返回的总共多少条记录在json返回串中的key，这个key应该在返回串第一级key中
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        countKey: "count",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        数据加载提示容器的class
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        tipsClassName: "data-status",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        数据加载中提示html内容，dom会贴到整个容器后面
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        loadingTips: "数据加载中...",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        数据加载到最后一条提示html内容
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        lastLoadedTips: "已经加载到最后一页！",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        数据加载失败提示html内容
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        loadFailedTips: "数据加载失败，请重试！",
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        滚动到容器底部元素后，继续往下滚动的距离达到一定距离后，才触发请求后端
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        threshold: 50
    };
})(jQuery);