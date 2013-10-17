;(function() {
  AYSW.product = new Object();
  AYSW.product.isScroll=true;
  Alipw.importClass('Alipw.SlideView');
  Alipw.importClass('Alipw.Window');
  //获取cookie的函数
  AYSW.product.getCookie=function() {
      var info = new Object();
      var values = document.cookie.split(';');
      var pair;
      var key;
      for (var i = 0, len = values.length; i < len; i++) {
          values[i] = values[i].replace(/\s/, '');
          var pair = values[i].split('=');
          info[pair[0]] = pair[1];
      }
      return info;
  }
  AYSW.product.viewBuyArea=function(){
      //为了修复chrome下因为布局用了position：relative，造成fixed左侧定位出现偏差的问题
      if($.browser.webkit){
          $(".buy-container .buy-area").css("left",$(".buy-container").offset().left);
           $(window).resize(function(){
              $(".buy-container .buy-area").css("left",$(".buy-container").offset().left);
           });
      }
      //显示购买区块
       $(".buy-container").removeClass("loading");
  }
  //固定容器构造函数对象
  function FixedContainer(cfg) {
      var fixContainerFuc = function (cfg) {
          //需要绝对定位元素的元素
          var targetContainerParent = $(cfg.targetParent);
          //需要绝对定位的元素
          var targetContainer = targetContainerParent.find(cfg.target);
          //body区的容器元素，为了兼容ie6需要处理
          //var mainColumnContainer = $('.container');
          var footer = $(cfg.footer);
          var fromTop = cfg.fromTop
          var scrollTop = Alipw.getDoc().scrollTop();
          if (targetContainerParent.offset().top < scrollTop + fromTop) {
              var y = fromTop;
              var footerTop = footer.offset().top;
              var topbarHeight = targetContainer.innerHeight();
              if (scrollTop + topbarHeight + fromTop > footerTop) {
                  y = footerTop - topbarHeight - scrollTop - fromTop;
              }
              //console.log(y);
              if (Alipw.isIE6) {
                  //targetContainer.css({
                      //'position': 'absolute',
                      //'top': (scrollTop - mainColumnContainer.offset().top + y) + 'px'
                  //});
              } else {
                  var offsetLeft=targetContainerParent.offset().left;
                  if ((targetContainer.css('position') != 'fixed' || targetContainer.css('position') != 'absolute')) {
                      targetContainer.css({
                          'position': 'fixed',
                          'top': y + 'px',
                          'z-index':'2',
                          'left':offsetLeft+'px'
                      });

                  }
                  targetContainer.css({
                      'left':offsetLeft+'px'
                  });

              }
          } else if (targetContainer.css('position') == 'fixed' || targetContainer.css('position') == 'absolute') {
              targetContainer.css({
                  'position': 'static'
              });
          }
      }
      var config = cfg;
      return function () {
          for (var i = 0, ii = config.length; i < ii; i++) {
              fixContainerFuc(config[i]);
          }
      }
  }

  Alipw.onReady(function () {
      var fixContainerFunc = new FixedContainer([{
              target: ".left-nav-container",
              targetParent: ".left-sidebar",
              footer: ".aysw-footer",
              fromTop: 14
          },
          {
              target: ".product-topnav",
              targetParent: ".product-tab",
              footer: ".aysw-footer",
              fromTop: 0
          }
      ]);
      Alipw.getWin().bind('scroll', fixContainerFunc);
      Alipw.getWin().bind('resize', fixContainerFunc);
      fixContainerFunc();

      var slideViewContainer = $('#customer_slideview');
      if (slideViewContainer[0]) {
          slideViewContainer.removeClass('panel-container-loading');
          var customerSlideView = new Alipw.SlideView({
              subviews: AYSW.product.slideCustomerViews,
              renderTo: '#customer_slideview',
              width: 610,
              height: 225,
              autoPlay: true,
              showIndex: false
          });

          if (AYSW.product.slideCustomerViews.length > 1) {
              $('#customer_slideview_prevbtn').show().click(function (e) {
                  e.preventDefault();
                  customerSlideView.back();
              });

              $('#customer_slideview_nextbtn').show().click(function (e) {
                  e.preventDefault();
                  customerSlideView.forward();
              });
          }
      }

      $('#product_tab li a').mousedown(function(){
          AYSW.product.isScroll=false;
      }).mouseup(function(){
          setTimeout(function(){
              AYSW.product.isScroll=true;
          },1000);
      }).click(function (e) {

          $(this).parent().addClass('active').siblings().removeClass('active');
      });

      // 通过URLtab切换
      if (window.location.hash) {
          $('#product_tab li a[href="' + window.location.hash + '"]').trigger('click');
      }

      // 滚动时定位tag的选中
      //锚点ID数组
      var selectorList=[]
          $('#product_tab li a').each(function(index,elen){
              selectorList.push('#'+this.href.split('#')[1]);
          })

      //锚点offsetTop数组
      var offsetTopList=[];
              for(var i=0,ii=selectorList.length;i<ii;i++){
                  offsetTopList.push($(selectorList[i]).offset().top-10);
              }
      //注册滚动条滚动事件
      $(window).scroll(function(){
              if(!AYSW.product.isScroll) return;
              var scrolltop=Alipw.getDoc().scrollTop();
              for(var n=0,nn=offsetTopList.length;n<nn;n++){
                 if((scrolltop>=offsetTopList[n]&&scrolltop<offsetTopList[n+1])||scrolltop>=offsetTopList[nn-1]){
                      if(scrolltop>=offsetTopList[nn-1])n=nn-1;
                      $('#product_tab li a[href="' + selectorList[n] + '"]').parent().addClass('active').siblings().removeClass('active');
                      return;
                 }
              }
          });

      //OSS扣费说明、欠费说明tips
      $("#J_deduction-legend").click(function(e){
          e.preventDefault();
          $(".deduction-legend").show();
          $(".arrears-legend").hide();
      })
      $("#J_arrears-legend").click(function(e){
          e.preventDefault();
          $(".arrears-legend").show();
          $(".deduction-legend").hide();
      })
      $(".deduction-legend .close-btn,.arrears-legend .close-btn").click(function(e){
          e.preventDefault();
          $(this).parent().hide();
      })
      //rds价格TAB切换
      var tabItem = $(".rds-price-tab .tab-items li");
      var tabContent = $(".rds-price-tab .tab-contents li");
      tabItem.click(function(){
          tabItem.removeClass("tab-item-current");
          tabContent.hide();
          $("."+$(this).attr("class").replace("tab-item","tab-content")).show()
          $(this).addClass("tab-item-current");
      })
      // 点击播放弹出窗口
      //
      Alipw.onReady(function() {
          $('.J_btn_video').click(function(e) {
              e.preventDefault();
              var title = $(this).text();
              var flashUrl = this.href;
              var html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="500" width="700"><param name="quality" value="best"><param name="movie" value="'+ flashUrl +'"><embed height="500" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="best" src="'+ flashUrl +'" type="application/x-shockwave-flash" width="700"></object>';
              var config = {
                  width:740,
                  height:580,
                  closeAction:'hide',
                  modal:true,
                  title:title
              };
              var _dialog = new Alipw.Window(config);
              _dialog.appendChild( html );
          });
      });
  });
})();
