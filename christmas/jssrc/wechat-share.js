/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：悟空找房微信分享前端MVC框架
 2. 页面名称：WechatShare
 3. 作者：yinqin@lifang.com
 4. 备注：对api的依赖：jQuery
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function WechatShareController() {
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    分享的标题
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.title = $("#wechatTitle").val();
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    分享的内容
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.content = $("#wechatContent").val();
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    分享的链接
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.linkUrl = $("#wechatUrl").val();
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    分享的图片
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.imgUrl = 'http://hd.wkzf.com/christmas/images/wechat_shared.png';
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    全局的环境地址
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.environment = STAGE_ENVIRONENT;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    api接口地址前缀
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.apiPrefix = "//10.0.18.78:8134/";
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    api接口地址
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.apiUrl = "";
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    接口的地址,根据不同的环境进行配置
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (this.environment === "test") this.apiPrefix = "//10.0.18.79:8134/";
    else if (this.environment === "beta") this.apiPrefix = "//wechat-beta.wkzf.com/";
    else if (this.environment === "sim") this.apiPrefix = "//wechat-beta.wkzf.com/";
    else if (this.environment === "prod") this.apiPrefix = "//wechat.wkzf.com/";
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    拼接微信分享地址
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.apiUrl = this.apiPrefix + "wx_js_sdk_sign.rest";
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.wx_onMenuShareTimeline = function(title, linkUrl, imgUrl) {
        wx.onMenuShareTimeline({
            title: title,
            link: linkUrl,
            imgUrl: imgUrl,
            trigger: function(res) {

            },
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    监听“发送给朋友”按钮点击
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.wx_onMenuShareAppMessage = function(title, linkUrl, content, imgUrl) {
        //console.log("wx_onMenuShareAppMessage title " + title + "  linkUrl" + linkUrl + " imgUrl" + imgUrl);
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: content, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                //alert("wx_onMenuShareAppMessage success " + linkUrl);
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                // alert("wx_onMenuShareAppMessage cancel " + linkUrl);
            }
        });
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    发送请求
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.sendRequest = function() {
        $.ajax({
            url: this.apiUrl,
            type: "GET",
            data: { requestUrl: window.location.href },
            dataType: "jsonp",
            jsonpCallback: "callback", //这个配置是在没有真正后端接口前端用自己的 json文件模拟接口的时候为了保持callback参数值一致所做的设置
            error: function(e) {
                //console.log("error" + e);
            },
            success: function(result) {
                var data = result.data;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonce_str, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        });
    };

    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    页面加载的时候执行的公共逻辑
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.onload = function() {
        var classSelf = this;
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        请求完成之后执行ready方法
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        wx.ready(function() {
            wx.showOptionMenu();
            classSelf.wx_onMenuShareTimeline(classSelf.title, classSelf.linkUrl, classSelf.imgUrl); //  监听“分享到朋友圈
            classSelf.wx_onMenuShareAppMessage(classSelf.title, classSelf.linkUrl, classSelf.content, classSelf.imgUrl); //  监听“发送给朋友”按钮点击
        });
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        发送请求
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        classSelf.sendRequest();
    };
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    整个基类逻辑结束
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.onload();
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
类的初始化
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    // new WechatShareController();
    //console.log("test");
});
