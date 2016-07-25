var WH = $(window).height(),
    WW = $(window).width(),
    $navBody = $("#navBody");
;
(function() {
    var cacheList = [
        [1017085 ,"begin_01.png"],
        [876314 ,"begin_02.png"],
        [775397 ,"begin_03.png"],
        [886315 ,"begin_04.png"],
        [916035 ,"bg_inner01.jpg"]
    ];
    var cacheObj = {
        progress: 0
    };

    function perload() {
        var total = 0,
            item, obj = {};
        for (var i = 0; i < cacheList.length; i++) {
            item = cacheList[i];
            total += item[0];
            obj[item[1]] = item[0];
        }
        cacheObj.total = total;
        cacheObj.list = obj;
    }

    function setProgress(progress) {
        progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
        $('.coverPage .progress2').css('width',Math.ceil(progress*100)+'%');
        $('.coverPage .value').text(Math.ceil(progress*100)+'%');

        if (Math.ceil(progress*100) == 100) {
            $('img[data-src]').each(function() {
                $(this).attr('src', $(this).data('src'));
            });
            setTimeout(function() {
                $('.coverPage').hide();
                onloadEv.init();
            }, 1500);
        };
    }
    window.setProgress = setProgress;

    function loadImage(imgsrc) {
        var image = new Image();
        image.onload = function() {
            cacheObj.progress += cacheObj.list[imgsrc.split('/')[1]] / cacheObj.total;
            setProgress(cacheObj.progress)
            if (cacheList[0]) {
                loadImage("img/" + cacheList.pop()[1])
            }
        }
        image.src = imgsrc;
    }

    perload();
    loadImage("img/" + cacheList.pop()[1]);
})();

var onloadEv={
    init:function(){
        if(WW>375){
            $(".sec-container .swiper-slide").width(WW-20-24);
            $(".sec-container .swiper-slide .bottom").height(WH-80-(WW-20-24));
        }else if(WW>320 && WW<=375){
            $(".sec-container .swiper-slide").width(WW-50-24);
            $(".sec-container .swiper-slide .bottom").height(WH-80-(WW-50-24));
        }else{
            $(".sec-container .swiper-slide").width(WW-80-24);
            $(".sec-container .swiper-slide .bottom").height(WH-80-(WW-80-24));            
        }
		$(".lineB").height($(".sec-container .swiper-slide .bottom").height()-$(".imgS").eq(0).height()-20);
		$(".imgS img").css("height","100%")//.removeAttr("style");
        $(".act").removeClass("hide");
        //$(".swiper-container,swiper-slide").width(WW);

        rootSwiper = new Swiper('.root-container', {
            pagination: '.root-pagination',
            paginationClickable: true,
            slidesPerView: '1',
            noSwiping : true,
            onSlideChangeStart: function(swiper){
                //$(".lineL,lineR,lineB,lineB2").show();
            }
        });
        secSwiper = new Swiper('.sec-container', {
            pagination: '.sec-pagination',
            centeredSlides: true,
            slidesPerView: 'auto',
            //slidesPerView: 3,
            spaceBetween: 12,
            loop:true,
            onSlideChangeEnd: function(swiper){
                activeLoopIndex=$(".sec-container .swiper-slide-active").data("swiper-slide-index");
                $(".lineB .t").eq(activeLoopIndex).animate({"top":0},300).siblings().animate({"top":36},300);
                $(".dot li").eq(activeLoopIndex).addClass("on").siblings().removeClass("on");
                $(".carProgress img").animate({"right":(((WW-40-60)/7)*activeLoopIndex)},300);
            }
        });
        $(".detail-container").each(function(idx){
            $(this).swiper({
                slidesPerView: 'auto',
                scrollContainer: true,
                scrollbar: $(this).find('.swiper-scrollbar')[0],
                direction: 'vertical',
                freeMode: true
            });
        });
        $(".imgB").click(function(){
            $(".detail-container").eq(activeLoopIndex).animate({"left":0},300);
        });
        $(".playBtn").click(function(){
            $(".video-container").animate({"left":0},300);
			$("#videos").get(0).play();
        });
        closeEv.init();
        
        $(".detail-container .swiper-slide").each(function(){
            var $this=$(this);
            $this.height($this.find(".cont").height()+68);
        });
    }
};
var closeEv={
    init:function(){
        $(".closeBtn").click(function(){
            $(this).closest(".detail-container,.video-container").animate({"left":"100%"},300);
			if($(this).closest(".video-container").length){
				$("#videos").get(0).pause();
			};
        });
    }
};