/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2015-12-16-13.37
 *          2015-01-04-09.55
 *          2015-02-07-16.34
 *          2016-04-12-16.12 add device
 *          2016-06-03-10.49 update
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-07-27-05:10:36
 */

$(function() {
    var caseSwiper;
    var gallerySwiper;

    var $mainContainer = $('#mainContainer'); // 主容器
    var $caseContainer = $('#caseContainer'); // 项目容器
    var $prev = $caseContainer.find('.swiper-button-prev'); // 项目容器上一桢按钮
    var $next = $caseContainer.find('.swiper-button-next'); // 项目容器下一桢按钮
    var $casePagination = $caseContainer.find('.casePagination'); // 项目分页容器

    var $galleryContainer = $('#galleryContainer'); // 项目容器
    var $galleryPrev = $galleryContainer.find('.swiper-button-prev'); // 项目容器上一桢按钮
    var $galleryNext = $galleryContainer.find('.swiper-button-next'); // 项目容器下一桢按钮
    var $galleryPagination = $galleryContainer.find('.galleryPagination'); // 项目分页容器

    //jq浏览器版本判断插件
    var device = {
        $html: $('#device'),
        $p6: $('#superwoods_businessCard'),
        $p7: $('#superwoods_businessCard_en'),
        UA: navigator.userAgent.toLowerCase(),
        location: window.location,
        html: function(p) {
            var _this = this;
            if (p) {
                if (p === 'web' || p === 'pad') {
                    _this.$html.removeClass()
                    _this.$html.addClass('pc');
                    // 如果是pc和pad移除p7
                    // var $p8 = $('#sectionContent');
                    _this.$p6.append(_this.$p7.html()).addClass('hasP7Img');
                    _this.$p6.find('img:last').attr('id', '7'); // 如果为pc 那么将data-hash="7" 直接指向第二张被复制的img，使用id="7"
                    _this.$p7.remove();
                    // _this.$p8.attr('data-hash', 'p7');
                    // $p8.attr('data-hash', 'p7');
                    $prev.show();
                    $next.show();
                } else {
                    _this.$html.removeClass();
                    _this.$html.addClass('mobile');
                    $('.hasP7Img').removeClass('hasP7Img');

                    $prev.hide();
                    $next.hide();
                }
            }

            if (!_this.$myWechat) {
                _this.$myWechat = $('#myWechat');
                _this.bodyHeight = $('body').height();
            }
            _this.$myWechat
                .find('.wechatImg')
                .css({
                    'height': Math.round(_this.bodyHeight * 0.6),
                    'width': 'auto'
                        // 'display': 'block',
                        // 'margin': '0 auto'
                });
        },
        set: function() {
            var _this = this;
            var type = 'web';
            if (_this.UA === null || _this.UA === '' || (_this.location.href.indexOf('f=pad') !== -1)) {} else {
                if (_this.UA.indexOf('mi pad') !== -1 || _this.UA.indexOf('xiaomi/miuibrowser') !== -1 || _this.UA.indexOf('ipad') !== -1) {
                    type = 'pad';
                } else {
                    if (_this.UA.match(/iphone/i) || _this.UA.match(/iphone os/i) || _this.UA.match(/android/i) || _this.UA.match(/windows mobile/i) || _this.UA.match(/ucweb/i)) {
                        type = 'phone';
                    } else {
                        if (_this.UA.indexOf('gecko') > -1 && _this.UA.indexOf('khtml') === -1 && _this.UA.indexOf('firefox') === -1 && _this.UA.indexOf('11.0') === -1) {
                            type = 'other mobile';
                        }
                    }
                }
            }
            _this.html(type);
        }
    };

    function mainRender() {
        var $caseRender = $caseContainer.find('.caseRender');
        var caseData = [{
            url: null, //cases
            title: '',
            device: '',
            compatibility: '',
            others: '<div class="cases">' +
                '<div class="col-title">Projects</div>' +
                '<div class="tip"></div>' +
                // '<div class="tip2"></div>' +
                '</div>'
        }, {
            url: 'https://github.com/xinhuaRadioLAB',
            pic: 'img/xinhuaRadioLabs.tinySq280.png',
            title: '新华网创意设计实验室 <br> 新华广播实验室',
            device: null,
            compatibility: null,
            others: '<p><span>新华通讯社 新华网股份有限公司</span></p>'
        }, {
            url: 'http://superfec.github.io',
            pic: 'img/superfec.jpg',
            title: '木木前端教室',
            device: null,
            compatibility: null,
            others: '<p><span>hype3课程和前端开发<br>个人经验分享</span></p>'
        }, {
            url: 'http://wwlocation.xinhuanet.com/fortune/wap.htm',
            pic: 'img/mcp.jpg',
            title: '新华财经',
            device: 'Mobile',
            compatibility: 'webkit',
            // others: '<p><span>依赖xinhuanetMCP系统</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/video/xinhuaradio/',
            pic: 'img/xinhuaradio.jpg',
            title: '新华广播 (RIA)',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            // others: '<p><span>RIA（富互联网应用）</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/politics/kzsl70/ybzbsj/index.htm',
            pic: 'img/93.jpg',
            title: '新华全媒直播胜利日大阅兵<br>(9.3阅兵)',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            others: null
        }, {
            url: 'case/demo20/index.html',
            pic: 'img/demo20.jpg',
            title: '伦敦生活方式',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo11/index.html',
            pic: 'img/demo11.jpg',
            title: 'VOGUE MINI',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo18/index.html',
            pic: 'img/demo18.jpg',
            title: 'It Bag',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo17/index.html',
            pic: 'img/demo17.jpg',
            title: '银网',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo16/index.html',
            pic: 'img/demo16.jpg',
            title: '男装周2016SS',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo15/index.html',
            pic: 'img/demo15.jpg',
            title: '时髦一夏2016',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo14/index.html',
            pic: 'img/demo14.jpg',
            title: '读者之选',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo13/index.html',
            pic: 'img/demo13.jpg',
            title: '蜜月婚礼',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo12/index.html',
            pic: 'img/demo12.jpg',
            title: 'HOW GQ RU',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }];

        var arrayLen = caseData.length;

        // console.log(arrayLen);

        var tmp = '';
        for (var i = 0, j = arrayLen; i < j; i++) {
            var array = caseData[i];
            var url = array.url;
            var pic;
            var title;
            var device;
            var compatibility;
            var others = ((array.others === null || array.others === undefined) ? '' : array.others);

            if (url !== null) {
                if (array.pic === undefined) {
                    pic = url.replace('index.html', 'view.jpg');
                } else {
                    pic = array.pic;
                }

                console.log(url.indexOf('case/demo'));

                if (url.indexOf('case/demo') >= 0) {
                    url = 'http://www.dyliang.com/' + url;
                }

                console.log(url);

                title = array.title;

                if (array.device === null) {
                    device = '';
                } else {
                    device = '<p>设备：<span>' +
                        array.device +
                        '</span></p>';
                }

                if (array.compatibility === null) {
                    compatibility = '';
                } else {
                    compatibility = '<p>兼容：<span>' +
                        array.compatibility +
                        '</span></p>';
                }

                // <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
                // <div class="swiper-lazy-preloader"></div>

                tmp += '<div class="swiper-slide">' +
                    //'<a href="' + url + '" title="' + title + '" target="_blank">' +
                    '<a href="' + url + '" title="' + title + '">' +
                    // '<img src="' + pic + '" alt="' + title + '" /></a>' +
                    // <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
                    '<img data-src="' + pic + '" class="swiper-lazy" with="280" height="280"></a>' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '<h2>' + title + '</h2>' +
                    device +
                    compatibility +
                    others +
                    //'   </a>' +
                    '</div>';
            } else {
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

        caseSwiper = new Swiper($caseContainer.selector, {
            pagination: $casePagination.selector,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            // effect: 'coverflow',
            // coverflow: {
            //     rotate: 50,
            //     stretch: 0,
            //     depth: 100,
            //     modifier: 1,
            //     slideShadows: true
            // },
            //hashnav: true
            //paginationClickable: true,
            loop: true,
            spaceBetween: 50,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            paginationType: 'bullets',
            lazyLoading: true,
            // paginationCustomRender: function (swiper, current, total) {
            //     return current + ' / ' + total;
            // }
        });
    };

    function galleryRender() {
        var $galleryRender = $galleryContainer.find('.galleryRender');
        var galleryData = [{
            url: null, //gallerys
            pic: null,
            title: '',
            device: '',
            compatibility: '',
            others: '<div class="cases">' +
                '<div class="col-title">Gallery</div>' +
                '<div class="tip"></div>' +
                // '<div class="tip2"></div>' +
                '</div>'
        }, {
            pic: 'gallery/nvyueshi.png',
            title: '原画CG / 女乐师'
        }, {
            pic: 'gallery/juduoduo.png',
            title: '画我的同事橘多多',
        }, {
            pic: 'gallery/mickey1.png',
            title: '画我的女儿米琪'
        }, {
            pic: 'gallery/mickey2.png',
            title: '画我的女儿米琪，另一幅'
        }, {
            pic: 'gallery/emolaoyeye.png',
            title: '魔兽世界同人CG / 恶魔老爷爷'
        }, {
            pic: 'gallery/azhen.png',
            title: '画我的同事阿甄'
        }, {
            pic: 'gallery/guangguang.png',
            title: '画我的同事光光'
        }, {
            pic: 'gallery/manhuaxizuo1.png',
            title: '女孩儿们习作1'
        }, {
            pic: 'gallery/manhuaxizuo2.png',
            title: '女孩儿们习作2'
        }, {
            pic: 'gallery/manhuaxizuo3.png',
            title: '女孩儿们习作3'
        }, {
            pic: 'gallery/rentisuxie.png',
            title: '大学时代的人体速写习作'
        }, {
            pic: 'gallery/shuicaixizuo.png',
            title: '大学时代水彩作业'
        }, {
            pic: 'gallery/zaihuashi.png',
            title: '在好朋友央美画室'
        }];

        var arrayLen = galleryData.length;

        // console.log(arrayLen);

        var tmp = '';
        for (var i = 0, j = arrayLen; i < j; i++) {
            var array = galleryData[i];
            // var url = array.url;
            var pic = array.pic;
            var title;
            // var device;
            // var compatibility;
            var others = array.others === null ? '' : array.others;
            // var newUrl;
            if (pic !== null) {
                // if (array.pic === undefined) {
                //     pic = url.replace('index.html', 'view.jpg');
                // } else {
                //     pic = array.pic;
                // }
                //
                // var cons = url.indexOf('gallery/demo') === 0;
                //
                // if (cons) {
                //     newUrl = 'http://www.dyliang.com/' + url;
                //     url = newUrl;
                // }
                //
                title = array.title;
                //
                // if (array.device === null) {
                //     device = '';
                // } else {
                //     device = '<p>设备：<span>' +
                //         array.device +
                //         '</span></p>';
                // }
                //
                // if (array.compatibility === null) {
                //     compatibility = '';
                // } else {
                //     compatibility = '<p>兼容：<span>' +
                //         array.compatibility +
                //         '</span></p>';
                // }

                // <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
                // <div class="swiper-lazy-preloader"></div>

                tmp += '<div class="swiper-slide">' +
                    //'<a href="' + url + '" title="' + title + '" target="_blank">' +
                    // '<a href="' + url + '" title="' + title + '">' +
                    // '<img src="' + pic + '" alt="' + title + '" /></a>' +
                    // <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
                    '<img data-src="' + pic + '" class="swiper-lazy" with="100%" height="auto"></a>' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '<p class="t">' + title + '</p>' +
                    // device +
                    // compatibility +
                    // others +
                    //'   </a>' +
                    '</div>';
            } else {
                tmp += '<div class="swiper-slide galleryFace">' +
                    '<div class=boxIn>' +
                    others +
                    '</div>' +
                    '</div>';
            }
        }

        $galleryRender[0].innerHTML = tmp;

        gallerySwiper = new Swiper($galleryContainer.selector, {
            pagination: $galleryPagination.selector,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            width: window.innerWidth,
            // spaceBetween: 50,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            paginationType: 'bullets',
            lazyLoading: true,
        });
    };

    (function set_data_hash() {
        var li = $mainContainer.find('.data-hash');
        // console.log(li);
        for (var i = 0, j = li.length; i < j; i++) {
            li.eq(i).attr('data-hash', i + 1);
            // console.log(li.eq(i));
        }
    })();


    // 初始化设备识别模块
    device.set();
    // console.log($mainContainer);

    // 初始化swiper
    var swiper = new Swiper($mainContainer.selector, {
        // pagination: '.mainPagination',
        paginationType: 'bullets',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        hashnav: true,
        scrollbar: '.swiper-scrollbar',
        // scrollbarHide: false,
        scrollbarDraggable: true,
        scrollbarSnapOnRelease: true,
        freeMode: true,
        lazyLoading: true,

    });

    // 初始化渲染
    mainRender();
    galleryRender();

});
