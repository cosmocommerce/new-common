(function() {
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.match(/msie ([\d.]+)/);
    var isIE6 = isIE && isIE[1] && parseInt(isIE[1]) == 6 ? true : false;
    var onDOMReady = function(fn){
        var isReady=false;
        var readyList= [];
        var timer;
        var ready = function(fn) {
            if (isReady)
                fn.call( document);
            else
                readyList.push( function() { return fn.call(this);});
                return this;
            };
            var onDOMReady=function(){
            for(var i=0;i<readyList.length;i++){
                readyList[i].apply(document);
            }
            readyList = null;
        };
        var bindReady = function(evt){
            if(isReady) return;
                isReady=true;
                onDOMReady.call(window);
            if(document.removeEventListener){
                document.removeEventListener("DOMContentLoaded", bindReady, false);
            }else if(document.attachEvent){
                document.detachEvent("onreadystatechange", bindReady);
                if(window == window.top){
                    clearInterval(timer);
                    timer = null;
                }
            }
        };
        if(document.addEventListener){
            document.addEventListener("DOMContentLoaded", bindReady, false);
        }else if(document.attachEvent){
            document.attachEvent("onreadystatechange", function(){
                if((/loaded|complete/).test(document.readyState)){
                    bindReady();
                }
            });
            if(window == window.top){
                timer = setInterval(function(){
                    try{
                        isReady||document.documentElement.doScroll('left');
                    }catch(e){
                        return;
                    }
                    bindReady();
                },5);
            }
        }

        return ready;
    }();

    var userTrack = function(){
        var userInfo = getUserInfo();
        if(!userInfo){
            userInfo = new Object();
            userInfo.portal = encodeURIComponent(window.location.href);
            if(window.document.referrer){
                userInfo.source = encodeURIComponent(window.document.referrer);
            }
            setUserInfo(userInfo);
        }
        function getUserInfo(){
            var info;
            var values = document.cookie.split(';');
            var pair;
            var key;
            for(var i=0,len=values.length;i<len;i++){
                values[i] = values[i].replace(/\s/,'');
                var pair = values[i].split('=');
                if(pair && pair[0] && pair[0].indexOf('aydotcom_userinfo_') == 0 ){
                    if(!info)info = new Object();
                    key = pair[0].split('aydotcom_userinfo_')[1];
                    info[key] = pair[1];
                }
            }

            return info;
        }

        function getSourceURL(){
            var info = getUserInfo();
            var url = window.location.href;
            if(!info){
                info = {
                    portal:encodeURIComponent(url),
                    source:encodeURIComponent(document.referrer)
                };
            }
            var sourceURL = info.source;
            if(!sourceURL) sourceURL = info.portal;
            if(!sourceURL) sourceURL = url;

            return sourceURL;
        }

        function setUserInfo(info){
            for(i in info){
                document.cookie = 'aydotcom_userinfo_' + i + '=' + info[i] + ';path=/;domain=' + window.location.host.replace(/^.*\.aliyun/i,'.aliyun');
            }
        }
        var pub = {
            getUserInfo:getUserInfo,
            getSourceURL:getSourceURL
        };
        return pub;
    }();


    var suffix = function(){
        if(window.location.host.indexOf('aliyun.') == -1)return '.com';
        var output =  window.location.host.replace(/^.*\.aliyun/i,'');
        if(!output)output = '.com';
        return output;
    }();
    var API = {url:'http://www.aliyun' + suffix + '/user/ajaxcomm/getuserstatus'};
    var cookie = getCookie();
    var uid = cookie['login_aliyunid'];

    var html;

    var cssText =
        '.aly-topbar-wrap{height:26px}.aly-topbar{font-size:12px;font-family:"Microsoft Yahei";background-color:#333333;color:#cccccc;height:26px;line-height:24px;position:relative;z-index:302;width:100%;left:0;-webkit-transform:translateZ(0);text-align:left !important;}.aly-topbar a{color:#bbbbbb;}.aly-topbar a:hover{color:#ffffff;text-decoration:none;}.aly-topbar .inner{margin:0 auto;width:997px}.aly-topbar .inner-left{float:left}.aly-topbar .inner-left a{}.aly-topbar .inner-left a.login-uname,.aysw-topbar-uname{color:#ff6600 !important;}.aly-topbar .inner-left a.has-message{position:relative;background-color:#ff6600;color:#fff;padding:0px 4px 2px 6px;}.aly-topbar .inner-left a.has-message b{border-width:5px;border-color:transparent #ff6600 transparent transparent;border-style:solid;_border-style:dotted solid dotted dotted;position:absolute;left:-10px;top:50%;margin-top:-5px;width:0;height:0;font-size:0px;line-height:0;}.aly-topbar .inner-right{float:right}.aly-topbar i{display:-moz-inline-stack;display:inline-block;vertical-align:middle;*vertical-align:auto;zoom:1;*display:inline;width:1px;height:12px;margin:7px 0;background:#666666;margin:0 10px;vertical-align:middle}.aly-topbar .site_menu{display:-moz-inline-stack;display:inline-block;*vertical-align:auto;zoom:1;*display:inline;position:relative;z-index:2}.aly-topbar .site_menu a.menu-hd{width:62px;position:relative;display:inline-block}.aly-topbar .site_menu a.menu-hd b{position:absolute;right:0px;top:10px;width:0;height:0;border-width:4px 4px;border-style:solid;border-color:#333333 #f5f5f5 #f5f5f5;font-size:0;line-height:0;border-color:#bbb #333 #333 #333;}#J_site_menu:hover b{border-color: #333 #333 #fff #333 !important;top: 6px;}.aly-topbar .site_menu .menu-bd{background-color:#ffffff;border:1px solid #999999;color:#666;display:none;position:absolute;top:20px;left:-22px;width:68px;font-size:12px;padding:10px 16px}.aly-topbar .site_menu .menu-bd b{position:absolute;border-width:6px;border-style:solid;width:0;height:0;border-color:#f5f5f5 #f5f5f5 #ff6600;left:47px;top:-14px}.aly-topbar .site_menu .menu-bd li{height:25px;line-height:25px}.aly-topbar .site_menu .menu-bd li a{color:#666;}.aly-topbar .site_menu .menu-bd li a:hover{color:#000;}.aly-topbar .site_menu:hover:hover .menu-bd,.aly-topbar .site_menu:hover:focus .menu-bd,.aly-topbar .site_menu:focus:hover .menu-bd,.aly-topbar .site_menu:focus:focus .menu-bd{display:block}#J_message{margin-left:8px;_margin-left:0;}';
    var callbackUrl=window.location.href.indexOf('account.aliyun'+suffix)<0?'?oauth_callback=' + encodeURIComponent(window.location.href):'';

    var topbarRightHTML = [
            '<div class="inner-right">',
                '<a href="http://www.aliyun' + suffix + '" data-lingjian="/aliyun.22.2.3">首页</a>',
                '<i></i>',
                '<a href="http://i.aliyun' + suffix + '" data-lingjian="/aliyun.22.2.4">用户中心</a>',
                '<i></i>',
                '<a href="http://console.aliyun' + suffix + '" target="_blank" data-lingjian="/aliyun.22.2.5">管理控制台</a>',
                '<i></i>',
                '<a href="http://help.aliyun' + suffix + '"  data-lingjian="/aliyun.22.2.6">帮助中心</a>',
                '<i></i>',
                '<div class="site_menu" id="J_site_menu">',
                    '<a href="javascript:;" target="_top" aria-haspopup="J_site_menu_list" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单" class="menu-hd">',
                        '网站导航 <b></b>',
                    '</a>',
                    '<div id="J_site_menu_list" class="menu-bd">',
                        '<ul>',
                            '<li><a href="http://www.aliyun.com/product/">产品 • 服务</a></li>',
                            '<li><a href="http://market.aliyun.com/">云市场</a></li>',
                            '<li><a href="http://awdc.aliyun.com/">开发者大会</a></li>',
                            '<li><a href="http://partner.aliyun.com/">合作伙伴</a></li>',
                            '<li><a href="http://www.aliyun.com/act/webbaindex.html">备案专区</a></li>',
                            '<li><a href="http://www.aliyun.com/customer/">客户案例</a></li>',
                            '<li><a href="http://bbs.aliyun.com/">论坛</a></li>',
                        '</ul>',
                    '</div>',
                '</div>',
            '</div>',
    ].join('');


    var loggedHTML = [
      '<div class="aly-topbar-wrap">',
        '<div class="aly-topbar">',
            '<div class="inner">',
                '<div class="inner-left">',
                    '欢迎来到阿里云，',
                    '<a href="http://i.aliyun' + suffix + '" class="login-uname aysw-topbar-uname" data-lingjian="/aliyun.22.2.8"><img src="//static.aliyun'+ suffix +'/images/new-common/topbar_loading.gif" /></a>',
                    '<i id="J_message-line"></i>',
                    '<a id="J_message" href="http://i.aliyun' + suffix + '/pm/" data-lingjian="/aliyun.22.2.7">',
                        '消息 <span class="aysw-topbar-message"></span> <b></b>',
                    '</a> <i></i>',
                    '<a href="http://mail.aliyun' + suffix + '">登录阿里云邮箱</a>',
                    '<i></i>',
                    '<a href="https://account.aliyun' + suffix + '/logout/logout.htm'+callbackUrl+'" data-lingjian="/aliyun.22.2.8" class="register">退出</a>',
                '</div>',
                topbarRightHTML,
            '</div>',
          '</div>',
        '</div>'].join('');


    var unloggedHTML = [
    '<div class="aly-topbar-wrap">',
        '<div class="aly-topbar">',
            '<div class="inner">',
                '<div class="inner-left">',
                    '欢迎来到阿里云，',
                    '<a href="https://account.aliyun' + suffix + '/login/login.htm'+callbackUrl+'" class="login" data-lingjian="/aliyun.22.2.1">登录</a>',
                    '<i></i>',
                    '<a href="https://account.aliyun' + suffix + '/register/register.htm'+callbackUrl+'" data-lingjian="/aliyun.22.2.2" class="register">免费注册</a>',
                    '<i></i>',
                    '<a href="http://mail.aliyun' + suffix + '">登录阿里云邮箱</a>',
                '</div>',
                topbarRightHTML,
            '</div>',
        '</div>',
      '</div>'].join('');

    window.__ay_topbar_requestCallback = function(data){
        if(data.uname){
            var unameEl = findCls('aysw-topbar-uname',document.body)[0];
            var umessageEl = findCls('aysw-topbar-message',document.body)[0];
            if(unameEl && umessageEl) {
                unameEl.innerHTML = data.uname;
                if(data.pnum && data.pnum != 0) {
                  umessageEl.innerHTML = data.pnum;
                  document.getElementById('J_message-line').style.display = 'none';
                  document.getElementById('J_message').className = 'has-message';
                }
            }
        }else{
            var topbarEl = findCls('aly-topbar',document.body)[0];
            topbarEl.innerHTML = unloggedHTML;
        }
    };

    if(uid){
        html = loggedHTML;
    }else{
        html = unloggedHTML;
    };
    //html = '<div class="aysw-topbar">' + html + '</div>';

    addStyle(cssText);
    document.writeln(html);

    if(uid){
        onDOMReady(function(){
            if(window.__ay_topbar_requestCallback){
                var callback = window.__ay_topbar_requestCallback;
                window.__ay_topbar_requestCallback = undefined;
                loadScript({
                    url:API.url + '?' + getRandom(),
                    success:function(){
                        if(window.__ay_login_info && window.__ay_login_info.data){
                            var data = window.__ay_login_info.data;
                            window.__ay_login_info = undefined;

                            callback(data);
                        }
                    }
                });
            }
        });
    };

    function trimURLParam(url,param){
        var splitArr = url.split('?');
        var oriURL = splitArr[0];
        var query = splitArr[1];
        if(!query)return url;

        var params = new Array();
        var pairs = query.split('&');
        var pair;
        for(var i=0,len=pairs.length;i<len;i++){
            pair = pairs[i].split('=');
            if(pair[0] != param){
                params.push(pairs[i]);
            }
        }
        if(params.length == 0){
            return oriURL;
        }else{
            return oriURL + '?' + params.join('&');
        }
    }

    function loadScript(params){
        var url = params.url;
        var successFn = params.success;
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        if(isIE){
            script.onreadystatechange = function(){
                if(script.readyState == "complete" || script.readyState == "loaded"){
                    if(successFn instanceof Function){
                        successFn.call();
                    }
                }
            };
        }else{
            script.onload = function(){
                if(successFn instanceof Function){
                    successFn.call();
                }
            };
        };
        head.appendChild(script);
        return script;
    }

    function getCookie(){
        var info = new Object();
        var values = document.cookie.split(';');
        var pair;
        var key;
        for(var i=0,len=values.length;i<len;i++){
            values[i] = values[i].replace(/\s/,'');
            var pair = values[i].split('=');
            info[pair[0]] = pair[1];
        }
        return info;
    }

    function addStyle(cssText){
        if(isIE){
            document.createStyleSheet().cssText = cssText;
        }else{
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = cssText;
            document.getElementsByTagName("head").item(0).appendChild(style);
        }
    }

    function findCls(cls,el){
        if(!el)el = document.body;
        var elements = el.getElementsByTagName("*");
        var results = [];
        for(var i=0,len=elements.length;i<len;i++){
            if((" " + elements[i].className + " ").indexOf(" " + cls + " ") > -1){
                results.push(elements[i]);
            }
        }
        return results;
    }

    function getRandom(){
        return parseInt((Math.random() * 1000000000)).toString();
    }

    function addEvent( obj, type, fn ) {
        if ( obj.attachEvent ) {
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
            obj.attachEvent( 'on'+type, obj[type+fn] );
        } else
            obj.addEventListener( type, fn, false );
    }

    //绑定黄金令箭的事件
    onDOMReady(function() {
      addEvent(document.body,'click',function(e) {
        e =  e || window.event;
        var target = e.target || e.srcElement;
        var targetData = target.getAttribute("data-lingjian");
        targetData = targetData || target.parentNode.getAttribute("data-lingjian");
        if (targetData) {
            var img = new Image();
            img.onload = function () {
                img.onload = null;
                img = null;
            }
            img.src = "http://log.mmstat.com/" + targetData + "?cache=" + new Date().getTime();
        }
      });
    });

    // 网站导航的下拉 for ie6
    if( isIE6 ) {
      var siteMenu = document.getElementById('J_site_menu'),
        siteMenuList = document.getElementById('J_site_menu_list');
      addEvent(siteMenu,'mouseover',function() {
        siteMenuList.style.display = 'block';
      });
      addEvent(siteMenu,'mouseout',function() {
        siteMenuList.style.display = 'none';
      });
    }
})();
