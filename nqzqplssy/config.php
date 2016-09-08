        <?php require_once('../public/global.php')?>
        <?php
            /*
            |--------------------------------------------------------------
            |额外样式表
            |-------------------------------------------------------------- 
            */
            $config["extra_stylesheets"] = array();

            /*
            |--------------------------------------------------------------
            |额外脚本
            |--------------------------------------------------------------
            */            
            $config["extra_javascripts"] = array();

            /*
            |--------------------------------------------------------------
            |页面标题
            |--------------------------------------------------------------   
            */
            $config["page_title"] = "悟空找房邀您一起挑月饼看楼盘啦";

            /*
            |--------------------------------------------------------------
            |页面描述
            |--------------------------------------------------------------
            */
            $config["page_description"] = "悟空找房挑选31个超值楼盘陪您过中秋,挑选月饼同时挑选自己喜欢的楼盘点击预约即可看房,上海各大板块楼盘均有介绍,更有上海周边潜力巨大楼盘可预约带看,中秋看房,悟空找房";

            /*
            |--------------------------------------------------------------
            |页面关键字
            |--------------------------------------------------------------   
            */
            $config["page_keywords"] = "上海楼盘,上海学区房,轨交房,上海周边楼盘";

            /*
            |--------------------------------------------------------------
            |是否根据路由加载样式表
            |如果匹配则会生成活动目录下的less/[web|wap].less文件
            |--------------------------------------------------------------  
            */
            $config["match_stylesheet"] = true;

            /*
            |--------------------------------------------------------------
            |是否根据路由加载脚本
            |如果匹配则会生成活动目录下的jssrc/[web|wap].js文件
            |--------------------------------------------------------------   
            */
            $config["match_javascripts"] = true;

            /*
            |--------------------------------------------------------------
            |是否包含预约功能
            |--------------------------------------------------------------   
            */
            $config["include_reserve"] = true;

            /*
            |--------------------------------------------------------------
            |房产Id,调用预约接口时使用
            |房产名称
            |--------------------------------------------------------------   
            */
            $config["estate_Id"] = "adad";
            $config["estate_name"] = "adadad";

            /*
            |--------------------------------------------------------------
            |是否支持微信分享
            |微信分享标题
            |微信分享内容
            |--------------------------------------------------------------   
            */
            $config["wechat_share"] = false;
            $config["wechat_title"] = "";
            $config["wechat_content"] = "";

            /*
            |--------------------------------------------------------------
            |热线电话
            |分机号码
            |--------------------------------------------------------------   
            */
            $config["hotline"] = "";
            $config["hotline_subnum"] = "";

            $confs["module_img_path"]=$CURRENT_STATIC_DOMAIN . "/nqzqplssy/images";

            /*
            |--------------------------------------------------------------
            |月饼楼盘信息
            |--------------------------------------------------------------   
            */   
            $config["info"] = json_decode(file_get_contents('config.json'),true);
            
        ?>                        