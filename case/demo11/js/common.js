$(function(){
	var imgData = [];
	var imgData = $(".w320").children();

	$(".swiper-main-pages").find("[data-elem]").each(function(){
		imgData.push(this)
	})
	e(f(imgData),
		function() {
			var screenH = $(window).height();
			var screenW = $(window).width();

		    var ps = new PageSwitch({
		        pages: '.page',
		        effect:'scale',
		        onSwitchStart: function() {
		        	audio.play()
		        },
		        onSwitchEnd: function() {
					if(ps.curPage == 1 || ps.curPage == 2 || ps.curPage == 4 ){
						$(".page").eq(ps.curPage).find(".conts").addClass("FadeInB");
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".row01").addClass("FadeInB");
						},100)	
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".row02").addClass("FadeInB");
						},200)	
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".row03").addClass("FadeInB");
						},300)
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".arrow").addClass("BounceInB2");
						},300)			
					};
					if(ps.curPage == 3 || ps.curPage == 5 || ps.curPage == 6){
						$(".page").eq(ps.curPage).find(".conts").addClass("FadeInR");	
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".arrow").addClass("BounceInB2");
						},300)				
					};
					if(ps.curPage == 1 || ps.curPage == 7){
						$(".textV").removeClass("BounceIn");
						$(".textLogo").removeClass("FadeInB");
						$(".text").removeClass("FadeInB");
					}
					if(ps.curPage == 5 || ps.curPage == 7){
						clearInterval(interval01);
						$(".page").eq(6).find(".textL").removeClass("FadeInB");
						$(".page").eq(6).find(".textR").removeClass("FadeInB");	
					}
					if(ps.curPage == 0){
						$(".textV").addClass("BounceIn");
						setTimeout(function(){
							$(".textLogo").addClass("FadeInB");
						},500);
						setTimeout(function(){
							$(".text").addClass("FadeInB");
						},800);
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".arrow").addClass("BounceInB2");
						},900)	
					}
					if(ps.curPage == 6){
						animation.iconInit();
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".textL").addClass("FadeInB");
						},300)
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".textR").addClass("FadeInB");							
						},400)
					}
					if(ps.curPage == 7){
						$(".page").eq(ps.curPage).find(".conts").addClass("FadeInB");
						setTimeout(function(){
							$(".page").eq(ps.curPage).find(".arrow").addClass("BounceInB2");
						},200)	
					}
					$(".page").eq(ps.curPage).siblings().find(".conts").removeClass("FadeInB").removeClass("FadeInR");
					$(".page").eq(ps.curPage).siblings().find(".row").removeClass("FadeInB");
					$(".page").eq(ps.curPage).siblings().find(".arrow").removeClass("BounceInB2")
		        }
		    })
		        
			$(".textV").addClass("BounceIn");
			setTimeout(function(){
				$(".textLogo").addClass("FadeInB");
			},500);
			setTimeout(function(){
				$(".text").addClass("FadeInB");
			},800);
			setTimeout(function(){
				$(".page").eq(0).find(".arrow").addClass("BounceInB2");
			},900)	

		    audio = new AudioPlayer('.audio-box',{
		        'path': ['img/SFX_18.wav'],
		        'type': 'simple',
		        'loop': false,
		        'errorfn': function(){
		            alert('音频加载错误');
		        }
		    });
		}
	);
})
var count = 0;
function rotate(per) {
	var count = per*3.6;
	
var spiner = document.getElementById('spiner');
var filler = document.getElementById('filler');
var masker = document.getElementById('masker');
spiner.style.MozTransform = 'rotate('+count+'deg)';
spiner.style.WebkitTransform = 'rotate('+count+'deg)';

if(count>=180){filler.style.opacity="1";masker.style.opacity="0"}
if (count==360) { return false }
}

function f(m) {
	var l = [];
	$.each(m,
	function(o, p) {
		l.push($(p))
	});
	return l
}
function interval(o, n, m) {
	var l = setInterval(function() {
		if (window._pandaImageLoadArray.length != 0 && window._pandaImageLoadArray.length != n) {
			h((n - window._pandaImageLoadArray.length) / m)
		} else {
			if (window._pandaImageLoadArray.length == 0) {
				
				h(1);
				setTimeout(function() {
					o.call(window)
				},
				500);
				clearInterval(l)
			}
		}
	},
	300)
}
function e(m, p, l) {
	l = l || m.length;
	if (m.length) {
		var o = new Image(),
		n = m.shift();
		if (window._pandaImageLoadArray) {
			window._pandaImageLoadArray = window._pandaImageLoadArray
		} else {
			window._pandaImageLoadArray = []
		}
		window._pandaImageLoadArray.push(n);
		o.src = n.data("xh-src");
		h(window._pandaImageLoadArray.length / (l * l));
		if (o.complete) {
			window._pandaImageLoadArray.shift();
			return e(m, p, l)
		} else {
			o.onload = function() {
				window._pandaImageLoadArray.shift();
				o.onload = null
			};
			o.onerror = function() {
				window._pandaImageLoadArray.shift();
				o.onerror = null
			};
			return e(m, p, l)
		}
		return
	}
	if (p) {
		interval(p, window._pandaImageLoadArray.length, l)
	}
}

function h(l) {
	var m = Math.floor(l * 100) >= 100 ? 100 : Math.floor(l * 100);
	$(".loading").animate({
		width: $("#process").width() * m / 100
	},
	100, "linear");
	$(".progressValue").text(m + "%");
	rotate(m)
	if(l==1){
		$(".coverPage").hide();
	}
}

var interval01;
var animation = {
	x:0,
	y:0,
	n:0,
	iconInit:function(){
		interval01=setInterval(
			function(){
				$(".shake").css("background-position",(-(animation.n) * 177) + "px 0px");
				animation.n++;
				if(animation.n==12){
					animation.n=0;
				}
			},150);
	}
};
