var screenH = $(window).height();
var screenW = $(window).width();
var aScore = [0,0,0,0,0,0,0,0,0,0];
$(function(){
	var userAgent = navigator.userAgent.toLowerCase();
	var $_progress = $(".progress");
	var $_per = $(".progress .per");
	var $_current = $(".progress .current");
	var $_page = $(".page");

	if(userAgent.indexOf("gq24" ) == -1){
		$(".page-result .downLoad").css("display","block");
	}
	//开始答题按钮事件
	$(".start").tap(function(){
		$(this).closest(".page").removeClass("page-current").next().addClass("page-current");
		$_progress.show();
	});

	//下一题按钮事件
	$(".btnNext").tap(function(){
		var $_thisPage = $(this).closest(".page");
		var pageIndex = parseInt($_thisPage.index());

		if(!parseInt($_thisPage.attr("data-score"))==0){
			scroll(0,0);
			$_thisPage.removeClass("page-current").next().addClass("page-current");
			aScore[pageIndex-1]=$_thisPage.attr("data-score");
			$_current.text(pageIndex+1);
		}
	});
	//上一题按钮事件
	$(".btnPrev").tap(function(){
		scroll(0,0);
		var $_thisPage = $(this).closest(".page");
		var pageIndex = parseInt($_thisPage.index());

		$(this).closest(".page").removeClass("page-current").prev().addClass("page-current");
		$_current.text(pageIndex-1);
	});
	//结果按钮事件
	$(".btnResult").tap(function(){
		var resultNum = 0;
		var $_thisPage = $(this).closest(".page");
		if(!parseInt($_thisPage.attr("data-score"))==0){
			scroll(0,0);
			aScore[9]=$_thisPage.attr("data-score");
			for(var i=0;i<10;i++){
				resultNum=resultNum+parseInt(aScore[i]);
			}

			$_thisPage.removeClass("page-current").next().addClass("page-current");
			$_per.width(100+"%");
			$(".progress .num").text("回答完毕")
			$(".page-result .scores em").text(resultNum);
			$_progress.hide();
		}
	});
	//选题按钮事件
	$(".answer .item").tap(function(){
		var $_this = $(this);
		var $_thisPage = $_this.closest(".page");
		var pageIndex = parseInt($_thisPage.index());
		
		if(!$_this.hasClass("selected")){
			$_this.addClass("selected").siblings(".item").removeClass("selected");
			$_thisPage.attr("data-score",$(this).attr("data-num"));
			$_per.animate({width:10*($(".page .selected").length)+"%"},200)
		}else{
			$_this.removeClass("selected");
			$_thisPage.attr("data-score",0);
			aScore[pageIndex-1]=$_thisPage.attr("data-score");
			$_per.animate({width:10*($(".page .selected").length)+"%"},200)
		}
	});

	// share
	$(".shareLayout").tap(function(){
		$(this).hide();
		$("#btnShare").hide();
		$_progress.show();
	});

    new brickjs.MShare({
        site: "2", //1、vogue 2、self 3、gq 4、adstyle 5、cnt
        catalog: "", //栏目id
        sUrl: "http://www.self.com.cn", //分享地址
        title: "我要分享的定制标题",
        imgUrl: "http://m.vogue.com.cn/mfeature/voguemini2015/img/share.jpg",
        desc: "我要分享的定制说明",
        appKey: {
            tsina: "3335939300"
        },
        ralateUid: '1508453695',
        wxGuide: {
            imgUrl: 'http://css.selfimg.com.cn/vogue/mdiscovery/images/weixin-guide.png',
            width: 295, //微信提示图片宽高
            height: 87,
            style: {
                right: 0,
                top: 0
            }
        }
    }, 'input');

});

