<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>活动生成</title>
    <link rel="stylesheet" href="/fe_public_library/bootstrap/3.3.4/css/bootstrap.min.css" />
    <style type="text/css">
        .javascripts{
            min-height:2.6em;
        }

        .stylesheets{
            min-height:2.6em;
        }
    </style>
</head>

<body>
    <?php
        //读取数据
        $activity_name = isset($_POST["activity_name"])?$_POST["activity_name"]:"";
        $page_title = isset($_POST["page_title"])?$_POST["page_title"]:"";
        $page_description= isset($_POST["page_description"])?$_POST["page_description"]:"";
        $page_keywords= isset($_POST["page_keywords"])?$_POST["page_keywords"]:"";
        $estate_Id= isset($_POST["estate_Id"])?$_POST["estate_Id"]:"";
        $estate_name= isset($_POST["estate_name"])?$_POST["estate_name"]:"";
        $include_reserve= isset($_POST["include_reserve"]) ? $_POST["include_reserve"] : false;
        $match_css=isset($_POST["match_css"])?$_POST["match_css"]:false;
        $match_js=isset($_POST["match_js"])?$_POST["match_js"]:false;
        $wechat_share=isset($_POST["wechat_share"])?$_POST["wechat_share"]:false;
        $wechat_title= isset($_POST["wechat_title"])?$_POST["wechat_title"]:"";
        $wechat_content= isset($_POST["wechat_content"])?$_POST["wechat_content"]:"";
        $extra_stylesheets = isset($_POST["extra_stylesheets"])?$_POST["extra_stylesheets"]:array();
        $extra_javascripts = isset($_POST["extra_javascripts"])?$_POST["extra_javascripts"]:array();


        $error_array = array();

        if(isset($_POST['submit']))
        {
            //验证数据
            if(empty($activity_name)){
                array_push($error_array,"活动名为空");
            } elseif(is_dir($activity_name)){
                array_push($error_array,"活动已存在");
            }

            if(empty($estate_Id)){
                array_push($error_array,"房产Id为空");
            }

            if(empty($estate_name)){
                array_push($error_array,"房产名称为空");
            }

            if($wechat_share){
                if(empty($wechat_title)){
                    array_push($error_array,"微信分享标题为空");
                }
                if(empty($wechat_content)){
                    array_push($error_array,"微信分享内容为空");
                }
            }
            //生成目录结构
            if(count($error_array)==0){//无错误，生成目录结构
                if(mkdir($activity_name) && mkdir("$activity_name/less") && mkdir("$activity_name/images") && 
                    mkdir("$activity_name/jssrc")){
                        /*
                            config.php 活动配置
                                ├── web.php
                                ├── wap.php
                                ├── css/
                                ├── less/ 
                                ├── jssrc/
                                ├── js/
                                └── images/ 特定活动的图片资源
                                ├── content/ 活动内容图片资源
                                     └── * 活动以外的图片资源 
                        */


                }else{
                    array_push($error_array,"创建活动目录失败");
                }
            }


            //echo "<h1 class='text-center'>生成成功</h1>";
            //echo "$extra_stylesheets";
            //echo "activity_name:$activity_name<br/>" . "page_title:$page_title<br/>" ."page_description:$page_description<br/>". "page_keywords:$page_keywords<br/>"."estate_id:$estate_Id<br/>estate_name:$estate_name<br/>include_reserve:$include_reserve<br/>match_css:$match_css<br/>match_js:$match_js<br/>wechat_share:$wechat_share<br/>wechat_title:$wechat_title<br/>wechat_content:$wechat_content<br/>";
            //foreach($extra_stylesheets as $css){
               //echo "$css";
            //}            
        }
        
    ?>
    

    <div class="container" style="margin-top:20px" >    
        <?php
            if(count($error_array)>0){
        ?>
            <div class="alert alert-danger">
                <ul class="list-unstyled">
                    <?php
                        for($i = 0; $i < count($error_array); $i++){
                    ?>
                        <li><?php echo $error_array[$i]?></li>
                    <?php

                        }
                    ?>
                </ul>
            </div>
        <?php
            }
        ?>    
        <form class="form" action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
            <caption>
                <h2 class="text-center">活动生成</h2>
            </caption>
        	<div class="form-group">
                <label class="control-label" for="activity_name">活动名称</label>
                <input type="text" class="form-control" id="activity_name" name="activity_name" value="<?php echo $activity_name?>"/>
            </div>
            <div class="form-group">
                <label class="control-label" for="page_title">页面标题</label>
                <input type="text" class="form-control" id="page_title" name="page_title" value="<?php echo $page_title?>" />
            </div>
            <div class="form-group">
                <label class="control-label" for="page_description">页面描述</label>
                <textarea class="form-control" cols="20" id="page_description" name="page_description" value="<?php echo $page_description?>"></textarea>
            </div>
            <div class="form-group">
                <label class="control-label" for="page_keywords">页面关键字</label>
                <input type="text" class="form-control" id="page_keywords" name="page_keywords" value="<?php echo $page_keywords?>" />
            </div>
            <div class="form-group">
                <label class="control-label" for="estate_Id">房产ID</label>
                <input type="text" class="form-control" id="estate_Id" name="estate_Id" value="<?php echo $estate_Id?>"/>
            </div>
            <div class="form-group">
                <label class="control-label" for="estate_name">房产名称</label>
                <input type="text" class="form-control" id="estate_name" name="estate_name" value="<?php echo $estate_name?>"/>
            </div>
            
            <div class="form-group">
                <div class="row">
            		<label class="col-xs-4">
                        <input type="checkbox" name="include_reserve" <?php echo $include_reserve? "checked":""?> /> 包含预约
                    </label> 
					<label class="col-xs-4">
						<input type="checkbox" name="match_css" <?php echo $match_css?"checked":""?> /> 匹配路由样式表
					</label>

					<label class="col-xs-4">
						<input type="checkbox" name="match_js" <?php echo $match_js?"checked":""?>/> 匹配路由脚本
					</label>
					</div>
			</div>

			<div class="form-group">
	            <div class="panel panel-default">
	            	<div class="form-group">                
		                <label>
		                    <input type="checkbox" name="wechat_share" <?php echo $wechat_share?"checked":""?> /> 微信分享
		                </label>
	            	</div>	            	
	            	<div class="form-group">
    	                <label class="control-label">微信分享标题</label>
    	                <input type="text" class="form-control" name="wechat_title" />
	               </div>
	               <div class="form-group">
    	                <label class="control-label">微信分享内容</label>
    	                <textarea type="text" class="form-control" name="wechat_content"></textarea>
	               </div>
	            </div>
            </div>

            
            <!--额外样式表-->
            <div class="form-group">
                <label class="control-label" for="extra_stylesheet">额外样式表</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="extra_stylesheet">
                    <span class="input-group-btn">
    					<button class="btn btn-primary addcss" type="button">添加</button>
    				</span>
                </div>
            </div>
            <div class="panel panel-default stylesheets">
                <ul class="list-group">                    
				</ul>
				</div>

				<!--额外脚本 -->
				<div class="form-group">
					<label class="control-label" for="extra_javascript">额外脚本</label>
					<div class="input-group">    					
    					<input type="text" class="form-control" id="extra_javascript">
    					<span class="input-group-btn">
    						<button class="btn btn-primary addjs" type="button">添加</button>
    					</span>
            		</div>
    			</div>
                <div class="panel panel-default javascripts">
                    <ul class="list-group">                        
					</ul>
				</div>

				<div class="form-group text-center">
    				<button type="submit" name="submit" class="btn">生 成</button>
    				<button type="reset" class="btn">重 置</button>
				</div>
			</form>
		</div>
		<script type="text/javascript" src="../jssrc/jquery-1.11.3.js">
		</script>
		<script type="text/javascript" src="/fe_public_library/bootstrap/3.3.4/js/bootstrap.min.js">
		</script>
        <script type="text/javascript">
        $(function(){
            $('.addjs').click(function(){
                var extra_javascript = $.trim($('#extra_javascript').val());
                if(extra_javascript){
                    var extra_javascripts = $.trim($('.javascripts li').text()).split(' ');                                        
                    for(var js in extra_javascripts){
                        if($.trim(extra_javascripts[js]) === extra_javascript){
                            return;
                        }
                    }

                    $('.javascripts ul').append($('<li>'+extra_javascript+'</li>').addClass('list-group-item').append(' <span class="glyphicon glyphicon-remove"></span>').append('<input type="hidden" name="extra_javascripts" value="'+extra_javascript+'" />'));

                    $('#extra_javascript').val('');
                }

            });

            $('.addcss').click(function(){
                var extra_stylesheet = $.trim($('#extra_stylesheet').val());
                if(extra_stylesheet){
                    var extra_stylesheets = $.trim($('.stylesheets li').text()).split(' ');                    
                    
                    for(var css in extra_stylesheets){                       
                        if($.trim(extra_stylesheets[css]) === extra_stylesheet){
                            return;
                        }
                    }

                    $('.stylesheets ul').append($('<li>'+extra_stylesheet+'</li>').addClass('list-group-item').append(' <span class="glyphicon glyphicon-remove"></span>').append('<input type="hidden" value="'+extra_stylesheet+'" name="extra_stylesheets[]"/>'));

                    $('#extra_stylesheet').val('');
                }
            });

            $('.stylesheets').delegate('.glyphicon-remove','click',function(){
                $(this).parent().remove();
            });

            $('.javascripts').delegate('.glyphicon-remove','click',function(){
                $(this).parent().remove();
            });

            $(':input[name=wechat_share]').change(function(){                
                if(this.checked){
                    $(this).closest('.form-group').nextAll().find('.form-control').attr('disabled',false);
                } else{
                    $(this).closest('.form-group').nextAll().find('.form-control').attr('disabled',true);
                }
            });

            $(':input[type=reset]').click(function(){
                $('[name=wechat_title],[name=wechat_content]').attr('disabled',true);                           
            });

            $(':input[name=wechat_share]').trigger('change');
        });
        </script>
	</body>
</html>