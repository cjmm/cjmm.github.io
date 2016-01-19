function empty() {}
    /** 
     * @fileOverview 页面切换组件
     * @author jie.qin@condenast.com.cn
     * @version 0.1.0
     * @requires http://js.selfimg.com.cn/gallery/zepto/1.1.4/zepto.min.js
     * @example <a href="../pageswitch/examples/demo.html">无鼠标跟随</a>
     * @example <a href="../pageswitch/examples/demo.html">鼠标跟随</a>
     * @see http://js.selfimg.com.cn/brickjs/pageswitch/0.1.0/pageswitch.min.js
     */
    /** 
     * @author qinjie
     * @constructor PageSwitch
     * @description 滑动到底部，加载更多
     * @requires http://js.selfimg.com.cn/gallery/zepto/1.1.4/zepto.min.js
     * @example <a href="../pageswitch/examples/demo.html">无鼠标跟随</a>
     * @example <a href="../pageswitch/examples/demo.html">鼠标跟随</a>
     * @see http://js.selfimg.com.cn/brickjs/pageswitch/0.1.0/pageswitch.min.js
     * @since version 0.1.0
     * @param {Object} cfgs 配置项
     * @param {String} [cfgs.pages] 页面切换选择器
     * @param {Object} [cfgs.effect="scroll"] 切换动画效果，scroll：滚动，cover：覆盖，scale：缩放
     * @param {Boolean} [cfgs.end2end=true] 是否可以循环切换
     * @param {Function} [cfgs.onSwitchStart] 切换开始回调
     * @param {Function} [cfgs.onSwitchEnd] 切换结束回调
     * @param {Boolean} [cfgs.followEvt=false] 是否手势跟随
     * @param {String} [cfgs.curPageCls="pt-page-current"] 当前页面定制class
     * @param {String} [cfgs.movInCls="pt-page-in"] 切换过程中进入页面定制class
     */
function PageSwitch(cfgs) {
    this._cfgs = {
        pages: '',
        effect: 'scroll',
        end2end: true,
        onSwitchStart: empty,
        onSwitchEnd: empty,
        followEvt: false,
        curPageCls: 'pt-page-current',
        movInCls: 'pt-page-in'
    };
    this.curPage = 0;
    this.showPage = null;
    this.hidePage = null;
    this.moving = false;
    this.oDrag = {
        direct: 0
    };
    this._init(cfgs);
}
PageSwitch.prototype = {
    /**
     * 切换到某帧页面
     * @param {Number} idx 页面序号
     */
    switchTo: function(idx) {
        if (this.moving) {
            return;
        }
        this.hidePage = this.pages.eq(this.curPage);
        this.curPage = idx;
        this.showPage = this.pages.eq(this.curPage);

        if (idx > this.curPage) {
            this._doSwitch(1);
        } else {
            this._doSwitch()
        }

    },
    /**
     * 切换到上一帧
     */
    prev: function() {
        if (this.moving) {
            return;
        }
        if (!this._cfgs.end2end) {
            if (this.curPage <= 0) return;
        }
        this._getMovePage(-1);

        this._doSwitch();
    },
    /**
     * 切换到下一帧
     */
    next: function() {
        if (this.moving) {
            return;
        }
        if (!this._cfgs.end2end) {
            if (this.curPage >= this.pages.length - 1) return;
        }
        this._getMovePage(1);

        this._doSwitch(1);
    },
    _formatCur: function() {
        var maxIdx = this.pages.length - 1;
        this.curPage = this.curPage < 0 ? maxIdx : this.curPage > maxIdx ? 0 : this.curPage;
    },
    _loadStyle: function() {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = "http://js.selfimg.com.cn/brickjs/pageswitch/0.1.0/animations.css";
        $('head').append(link);
    },
    _init: function(cfgs) {
        $.extend(this._cfgs, cfgs);
        this._loadStyle();
        this.pages = $(this._cfgs.pages);
        this._bind();
    },
    _resetPage: function(outCls, inCls) {
        this.moving = false;
        this.hidePage.off('webkitAnimationEnd').removeClass([outCls, this._cfgs.curPageCls].join(' ')).removeAttr('style');
        this.showPage.off('webkitAnimationEnd').removeClass([inCls, this._cfgs.movInCls].join(' ')).removeAttr('style');
        this.showPage = this.hidePage = null;
    },
    _restorePage: function(outCls, inCls) {
        this.moving = false;
        this.hidePage.removeClass([outCls].join(' ')).removeAttr('style');
        this.showPage.removeClass([inCls, this._cfgs.curPageCls, this._cfgs.movInCls].join(' ')).removeAttr('style');
        this.showPage = this.hidePage = null;
    },
    _doSwitch: function(isNext) {
        var self = this,
            count = 0,
            clses = this._getSwitchClasses(isNext),
            outCls = clses.outCls,
            inCls = clses.inCls;
        this.moving = true;
        this._cfgs.onSwitchStart();
        this.hidePage.addClass(outCls).on('webkitAnimationEnd', function() {
            count++;
            if (count == 2) {
                self._resetPage(outCls, inCls);
                self._cfgs.onSwitchEnd();
            }
        });
        this.showPage.addClass([this._cfgs.curPageCls, this._cfgs.movInCls, inCls].join(' ')).on('webkitAnimationEnd', function() {
            count++;
            if (count == 2) {
                self._resetPage(outCls, inCls);
                self._cfgs.onSwitchEnd();
            }
        });
    },
    _getSwitchClasses: function(isNext) {
        var outCls = '',
            inCls = '';
        switch (this._cfgs.effect) {
            case 'scroll':
                if (isNext) {
                    outCls = 'pt-page-moveToTop';
                    inCls = 'pt-page-moveFromBottom';
                } else {
                    outCls = 'pt-page-moveToBottom';
                    inCls = 'pt-page-moveFromTop';
                }
                break;
            case 'scale':
                if (isNext) {
                    outCls = 'pt-page-scaleDown';
                    inCls = 'pt-page-moveFromBottom';
                } else {
                    outCls = 'pt-page-scaleDown';
                    inCls = 'pt-page-moveFromTop';
                }
                break;
            case 'cover':
                if (isNext) {
                    outCls = 'pt-page-fade';
                    inCls = 'pt-page-moveFromBottom';
                } else {
                    outCls = 'pt-page-fade';
                    inCls = 'pt-page-moveFromTop';
                }
                break;
            default:
                break;
        }
        return {
            outCls: outCls,
            inCls: inCls
        }
    },
    _getMovePage: function(next) {
        this.hidePage = this.pages.eq(this.curPage);
        this.curPage = this.curPage + next;
        this._formatCur();
        this.showPage = this.pages.eq(this.curPage);
        console.log(this.curPage)
    },
    _onTouchStart: function(e, el) {
        if (this.moving) {
            return;
        }
        this.oDrag.dragable = true;
        this.oDrag.eY = e.touches[0].pageY;
        this._cfgs.onSwitchStart();
        e.preventDefault();
    },
    _onTouchMove: function(e, el) {
        if (!this.oDrag.dragable) {
            return;
        }
        if (this.moving) {
            return;
        }
        var self = this,
            mY = e.touches[0].pageY - this.oDrag.eY,
            wh = $(window).height();
        if (mY == 0) {
            return;
        }
        if (!this.showPage || this.showPage.length < 1 || this.oDrag.direct * mY < 0) {
            if (this.showPage && this.oDrag.direct * mY < 0) { //切换翻页方向
                this.showPage.removeAttr('style').removeClass([this._cfgs.curPageCls, this._cfgs.movInCls].join(' '));
            }
            this.hidePage = $(el);
            if (this._cfgs.end2end) {
                if (mY < 0) {
                    this.showPage = this.hidePage.next().length > 0 ? this.hidePage.next() : this.pages.eq(0)
                } else {
                    this.showPage = this.hidePage.prev().length > 0 ? this.hidePage.prev() : this.pages.eq(this.pages.length - 1)
                }
            } else {
                if (mY < 0) {
                    this.showPage = this.hidePage.next();
                } else {
                    this.showPage = this.hidePage.prev();
                }
            }
        }
        this.oDrag.direct = mY;
        if (this.showPage.length < 1) {
            this.moving = false;
            return;
        }

        mY = mY > wh ? wh : mY < -wh ? -wh : mY;

        this._doMove(mY);
        e.preventDefault();
    },
    _onTouchEnd: function(e) {
        var moved = e.changedTouches[0].pageY - this.oDrag.eY;
        this.oDrag.dragable = false;
        if (this.moving || !this.showPage || this.showPage.length < 1) {
            this.hidePage && this.hidePage.removeAttr('style').removeClass(this._cfgs.movInCls);
            this.moving = false;
            return;
        }
        this.moving = true;
        if (moved == 0) {
            this.moving = false;
            return;
        }
        if (moved < 0) { //向上滑
            if (e.changedTouches[0].pageY - this.oDrag.eY < -100) {
                this._moveEnd(1, 1)
            } else {
                this._moveEnd(1, 0)
            }
        } else {
            if (e.changedTouches[0].pageY - this.oDrag.eY > 100) {
                this._moveEnd(0, 1)
            } else {
                this._moveEnd(0, 0)
            }
        }

        e.preventDefault();
    },
    _getOMoveEnd: function(isNext, isSuccess) {
        var oCls = {},wh = $(window).height();
        switch (this._cfgs.effect) {
            case 'scale':
                if (isNext) {
                    oCls = isSuccess ? {
                        hide: 'scale(0.8)',
                        show: 'translate(0,0)'
                    } : {
                        hide: 'scale(1)',
                        show: 'translate(0,'+wh+'px)'
                    }
                } else {
                    oCls = isSuccess ? {
                        hide: 'scale(0.8)',
                        show: 'translate(0,0)'
                    } : {
                        hide: 'scale(1)',
                        show: 'translate(0,-'+wh+'px)'
                    }
                }
                break;
            case 'scroll':
                if (isNext) {
                    oCls = isSuccess ? {
                        hide: 'translate(0,-'+wh+'px)',
                        show: 'translate(0,0)'
                    } : {
                        hide: 'translate(0,0)',
                        show: 'translate(0,'+wh+'px)'
                    }
                } else {
                    oCls = isSuccess ? {
                        hide: 'translate(0,'+wh+'px)',
                        show: 'translate(0,0)'
                    } : {
                        hide: 'translate(0,0)',
                        show: 'translate(0,-'+wh+'px)'
                    }
                }
                break;
            default:
                if (isNext) {
                    oCls = isSuccess ? {
                        hide: '',
                        show: 'translate(0,0)'
                    } : {
                        hide: '',
                        show: 'translate(0,'+wh+'px)'
                    }
                } else {
                    oCls = isSuccess ? {
                        hide: '',
                        show: 'translate(0,0)'
                    } : {
                        hide: '',
                        show: 'translate(0,-'+wh+'px)'
                    }
                }
                break;
        }
        return oCls;
    },
    _getAniTime: function(effect, success) {
        var wh = $(window).height(),
            time = 500,
            transform = this.showPage[0].style.webkitTransform.match(/translate\(.*,(\-*.*)px\)/) || [];
        var moved = Math.abs(Number(transform[1]));
        if (success) {
            time = Math.floor(500 * moved / wh);
        } else {
            time = Math.floor(500 * (wh - moved) / wh);
        }
        return isNaN(time) ? 500 : time < 100 ? 100 : time;
    },
    _moveEnd: function(type, suc) {
        var self = this,
            wh = $(window).height(),
            cls = this._getOMoveEnd(type, suc),
            count = 0;
        if (!this.hidePage || this.hidePage.length < 1) {
            this.moving = false;
            return;
        }
        var aniTime = this._getAniTime(type, suc);
        this.hidePage.animate({
            '-webkit-transform': cls.hide,
            'transform': cls.hide
        }, aniTime, 'linear', function() {
            count++;
            if (count == 2) {
                suc ? self._resetPage() : self._restorePage();
                self._cfgs.onSwitchEnd();
            }
        })
        this.showPage.animate({
            '-webkit-transform': cls.show
        }, aniTime, 'linear', function() {
            count++;
            if (count == 2) {
                suc ? self._resetPage() : self._restorePage();
                self._cfgs.onSwitchEnd();
            }
        })
    },
    _doMove: function(moved) {
        var p = moved > 0 ? -1 : 1,
            wh = $(window).height(),
            to = '';
        switch (this._cfgs.effect) {
            case 'scroll':
                to = 'translate(0,' + (-p * Math.abs(moved)) + 'px)';
                break;
            case 'scale':
                to = 'scale(' + (1 - 0.2 * Math.abs(moved) / wh) + ')';
                break;
            default:
                to = '';
                break;
        }

        this.hidePage.css({
            '-webkit-transform': to
        })

        this.showPage.addClass([this._cfgs.curPageCls, this._cfgs.movInCls].join(' ')).css({
            '-webkit-transform': 'translate(0,' + p * (wh - Math.abs(moved)) + 'px)'
        })
    },
    _bind: function() {
        var self = this,
            cfg = this._cfgs;

        if (cfg.followEvt) {
            $(cfg.pages)
                .on('touchstart', function(e) {
                    self._onTouchStart(e, this)
                })
                .on('touchmove', function(e) {
                    self._onTouchMove(e, this)
                })
                .on('touchend', function(e) {
                    self._onTouchEnd(e)
                })
        } else {
            $(cfg.pages)
                .on('swipeDown', function() {
                    self.prev();
                })
                .on('swipeUp', function() {
                    self.next();
                });
        }
    }
}
