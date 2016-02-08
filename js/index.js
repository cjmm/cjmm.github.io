﻿/**
 * @file   js/index.js
 * @author St. <st_sister@icloud.com>
 * @time   2015-12-16-13.37
 *         2015-01-04-09.55
 *         2015-02-07-16.34
 */
var $window = $(window);
//var $html = $('html');
//var $body = $('body');
//ie hacks
//var userAgent = navigator.userAgent.toLowerCase();
//jQuery.browser = {
//    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
//    safari: /webkit/.test(userAgent),
//    opera: /opera/.test(userAgent),
//    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
//    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
//};
//var browser   = $.browser;
//var ie        = browser.msie;
//var ieVersion = browser.version;
//var ie8       = ie && ieVersion < 9.0;
//
//if (ie) {
//    $html.addClass('ie');
//} else {
//    $html.removeClass('ie');
//}
//
////console.log(browser);
////console.log(ie);
////console.log(ieVersion);
////console.log(ie8);
//
//if (ie8) {
//    $html.addClass('oldie');
////    // ie8 增加 reduce
////    if (typeof Array.prototype.reduce != "function") {
////        Array.prototype.reduce = function (callback, initialValue) {
////            var previous = initialValue,
////                k = 0,
////                length = this.length;
////            if (typeof initialValue === "undefined") {
////                previous = this[0];
////                k = 1;
////            }
////            if (typeof callback === "function") {
////                for (k; k < length; k++) {
////                    this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
////                }
////            }
////            return previous;
////        };
////    }
////    // ie8 增加 forEach
////    if (typeof Array.prototype.forEach != "function") {
////        Array.prototype.forEach = function (fn, scope) {
////            var i, len;
////            for (i = 0, len = this.length; i < len; ++i) {
////                if (i in this) {
////                    fn.call(scope, this[i], i, this);
////                }
////            }
////        };
////    }
//}
//else {
//    $html.removeClass('oldie');
//}


var swiper = new Swiper('.mainContainer', {
    pagination: '.mainPagination',
    direction: 'vertical',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    mousewheelControl: true,
    hashnav: true
});

/*var careerSwiper = new Swiper('.careerContainer', {
    scrollbar: '.careerScrollbar',
    scrollbarHide: false,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true
});*/


var caseSwiper;

function mainRender(){
    var $caseRender = $('#caseRender');
    var caseData = [{
            url: null, //cases
            title:  '',
            device: '',
            compatibility: '',
            others: '<div class="cases">' +
                        '<div>项目展示</div>' +
                        '<div class="tip"></div>' +
                        '<div class="tip2"></div>' +
                        '<div class="tip3Box">' +
                            '<div class="tip3">' +
                                '<div class="iconBlueArrowUp"></div>' +
                                '<div class="iconBlueArrowUp iconBlueArrowUp2"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        }, {
            url: 'http://www.xinhuanet.com/fortune/wap.htm',
            pic: 'img/mcp.jpg',
            title:  '新华财经',
            device: 'Mobile',
            compatibility: 'webkit',
            others: '<p><span>依赖xinhuanetMCP系统</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/video/xinhuaradio/',
            pic: 'img/xinhuaradio.jpg',
            title:  '新华广播',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            others: '<p><span>RIA（富互联网应用）</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/politics/kzsl70/ybzbsj/index.htm',
            pic: 'img/93.jpg',
            title:  '新华全媒直播胜利日大阅兵<br>(9.3阅兵)',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            others: null
        }, {
            url: 'case/demo20/index.html',
            title:  '伦敦生活方式',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo11/index.html',
            title:  'VOGUE MINI',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }/*, {
            url: 'case/demo19/index.html',
            title:  'GQ 年度人物2015',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }*/, {
            url: 'case/demo18/index.html',
            title:  'It Bag',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo17/index.html',
            title:  '银网',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo16/index.html',
            title:  '男装周2016SS',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo15/index.html',
            title:  '时髦一夏2016',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo14/index.html',
            title:  '读者之选',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo13/index.html',
            title:  '蜜月婚礼',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo12/index.html',
            title:  'HOW GQ RU',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }];
    var arrayLen = caseData.length;
    var tmp = '';
    for (var i=0, j=arrayLen; i<j; i++) {
            //    <div class="swiper-slide">
    //        <a href="case/demo20/index.html" title="专题(伦敦生活方式)"><img src="case/demo20/view.png" alt="" /></a>
    //        <h3>专题(伦敦生活方式)</h3>
    //        <p>设备：
    //            <span>
    //                Mobile
    //            </span>
    //        </p>
    //        <p>兼容：
    //            <span>
    //                webkit
    //            </span>
    //        </p>
    //    </div>
         var array = caseData[i];
         //var n;
//         if (i<9) {
//             n = '0' + (i + 1);
//         }
//         else {
//             n = i + 1;
//         }
         
         var url = array.url;
         var pic;
         var title;
         var device;
         var compatibility;
         var others = array.others === null ? '' : array.others;
         var newUrl;
         
         if (url!==null) {
             
             //console.log(array.pic=== undefined );
             
             if (array.pic===undefined) {
                 pic = url.replace('index.html', 'view.jpg');
             }
             else {
                 pic = array.pic;
             }
             
             
             
             var cons = url.indexOf('case/demo') === 0;

             if (cons) {
                 newUrl = 'http://www.dyliang.com/' + url;
url = newUrl;
             }
             
             //console.log(url);
             
             title = array.title;
             device = array.device;
             compatibility = array.compatibility;
             
            tmp += '<div class="swiper-slide">' +
                    //'<a href="' + url + '" title="' + title + '" target="_blank">' +
                        '<a href="' + url + '" title="' + title + '">' +
                        '<img src="' + pic + '" alt="' + title + '" /></a>' +
                        '<h3>' + title + '</h3>' +
                        '<p>设备：' +
                            '<span>' +
                                           device +
                            '</span>' +
                        '</p>' +
                        '<p>兼容：' +
                            '<span>' +
                                    compatibility +
                            '</span>' +
                        '</p>' +
                        others + 
                    //'   </a>' + 
                    '</div>';
         }
         else {
             tmp += '<div class="swiper-slide">' +
                        '<div class=boxIn>' +
                        others +
                        '</div>' +
                    '</div>';
         }
         

    }
    
    $caseRender[0].innerHTML = tmp;
    
    
     //var swiper = new Swiper('.swiper-container', {
//        pagination: '.swiper-pagination',
//        nextButton: '.swiper-button-next',
//        prevButton: '.swiper-button-prev',
//        slidesPerView: 1,
//        paginationClickable: true,
//        spaceBetween: 30,
//        loop: true
//    });
    
    caseSwiper = new Swiper('.caseContainer', {
        pagination: '.casePagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        },
        //hashnav: true
        //paginationClickable: true,
        //loop: true
    });
    
    $('.btnNext').click(function(){
        caseSwiper.slideNext();
    })
        
    
}

$(function(){
    mainRender();
    /*$('.swiper-slide').append('<div class="tip3Box">'+ 
                    '<div class="tip3">'+ 
                    '   <div class="iconBlueArrowUp"></div>'+ 
                    '   <div class="iconBlueArrowUp iconBlueArrowUp2"></div>'+ 
                    '</div>'+ 
                '</div>');*/
 
            
            
           //$("#jquery_jplayer_2").jPlayer({
//        ready: function () {
//            $(this).jPlayer("setMedia", {
//                //title: "Hidden",
//                //m4v: "../src/media/bannerBg.mp4"
//                //oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
//                m4v: "../src/video/bn.mp4",
//				poster: "http://www.xinhuanet.com/video/xinhuaradio/2.1.7/img/bannerPoster.jpg"
//                //m4v: "/test/org.mp4"
//            });
//            $(this).jPlayer("play");
//            //$(this).jPlayer("repeat");
//            //$(this).jPlayer("mute");
//            //$('#jp_poster_0').hide();
//        },
//        //play: function(){
////            clearTimeout(timeout);
////            timeout = setTimeout(function(){
////                $('#videoBox').slideUp(2500, function(){
////                    $("#jquery_jplayer_2").jPlayer("stop");
////                    //////console.log('done!');
////                });
////            }, 10000);
////        },
//        swfPath: "http://www.xinhuanet.com/video/xinhuaradio/js",
//        supplied: "m4v",
//        cssSelectorAncestor: "#jp_container_2",
//        wmode: "window",
//        //globalVolume: true,
//        useStateClassSkin: true,
//        autoBlur: false,
//        smoothPlayBar: false,
//        keyEnabled: false,
//        size: {
//            width: 320,//($(window).width()) + "px",
//            height: 640//($(window).width() * 1080 / 1920) + "px"
//        }
//    }); 



});

// echarts width
//var $main = $('#main');
//var windowWidth = $window.width();
//$main.width( windowWidth * 0.8);

// echarts init
var myChart = echarts.init(document.getElementById('main')); 
var option = {
    title : {
        text: '分布视图',
        subtext: '2015/12'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient : 'vertical',
        x : 'right',
        y : 'bottom',
        data:['预估占比（％）']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    polar : [
       {
           indicator : [
               { text: 'JavaSrcipt ／ jQuery',    max: 100},
               { text: '表现层', max: 100},
               { text: '设计',   max: 100},
               { text: '需求',   max: 100},
               { text: '交互',   max: 100},
               { text: '后端',   max: 100},
               { text: '服务器', max: 100}
            ]
        }
    ],
    calculable : true,
    series : [
        {
            name: '',
            type: 'radar',
            data : [
                {
                    value : [85, 90, 90, 80, 85, 40, 55],
                    name : '预估占比（％）'
                }
            ]
        }
    ]
};
myChart.setOption(option);






