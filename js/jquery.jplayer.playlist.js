/**
 * jPlayerPlaylist for jPlayer 2.9.2 ~ (c) 2009-2014 Happyworm Ltd ~ MIT License
 *
 *         for xinhuaradio homepage only
 *
 * @file   js/jquery.jPlayer.playlist.js
 * @author St. <st_sister@icloud.com>
 * @time   2015-11-09-20.04
 *         2015-12-31-15.04
 */
! function (a, b) {
    jPlayerPlaylist = function (b, c, d) {
        var e = this;
        this.current = 0, this.loop = !1, this.shuffled = !1, this.removing = !1, this.cssSelector = a.extend({}, this._cssSelector, b), this.options = a.extend(!0, {
            keyBindings: {
                next: {
                    key: 221,
                    fn: function () {
                        e.next()
                    }
                },
                previous: {
                    key: 219,
                    fn: function () {
                        e.previous()
                    }
                },
                shuffle: {
                    key: 83,
                    fn: function () {
                        e.shuffle()
                    }
                }
            },
            stateClass: {
                shuffled: "jp-state-shuffled"
            }
        }, this._options, d), this.playlist = [], this.original = [], this._initPlaylist(c), this.cssSelector.details = this.cssSelector.cssSelectorAncestor + " .jp-details", this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist", this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next", this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous", this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle", this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off", this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor, this.options.repeat = function (a) {
            e.loop = a.jPlayer.options.loop
        }, a(this.cssSelector.jPlayer).bind(a.jPlayer.event.ready, function () {
            e._init()
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.ended, function () {
            e.next()
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.play, function () {
            a(this).jPlayer("pauseOthers")
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.resize, function (b) {
            b.jPlayer.options.fullScreen ? a(e.cssSelector.details).show() : a(e.cssSelector.details).hide()
        }), a(this.cssSelector.previous).click(function (a) {
            a.preventDefault(), e.previous(), e.blur(this)
        }), a(this.cssSelector.next).click(function (a) {
            a.preventDefault(), e.next(), e.blur(this)
        }), a(this.cssSelector.shuffle).click(function (b) {
            b.preventDefault(), e.shuffle(e.shuffled && a(e.cssSelector.jPlayer).jPlayer("option", "useStateClassSkin") ? !1 : !0), e.blur(this)
        }), a(this.cssSelector.shuffleOff).click(function (a) {
            a.preventDefault(), e.shuffle(!1), e.blur(this)
        }).hide(), this.options.fullScreen || a(this.cssSelector.details).hide(), a(this.cssSelector.playlist + " ul").empty(), this._createItemHandlers(), a(this.cssSelector.jPlayer).jPlayer(this.options)
    }, jPlayerPlaylist.prototype = {
        _cssSelector: {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        },
        _options: {
            playlistOptions: {
                autoPlay: !1,
                loopOnPrevious: !1,
                shuffleOnLoop: !0,
                enableRemoveControls: !1,
                displayTime: "slow",
                addTime: "fast",
                removeTime: "fast",
                shuffleTime: "slow",
                itemClass: "jp-playlist-item",
                freeGroupClass: "jp-free-media",
                freeItemClass: "jp-playlist-item-free",
                removeItemClass: "jp-playlist-item-remove"
            }
        },
        option: function (a, c) {
            if (c === b) {
                return this.options.playlistOptions[a]
            }
            switch (this.options.playlistOptions[a] = c, a) {
            case "enableRemoveControls":
                this._updateControls();
                break;
            case "itemClass":
            case "freeGroupClass":
            case "freeItemClass":
            case "removeItemClass":
                this._refresh(!0), this._createItemHandlers()
            }
            return this
        }, _init: function () {
            var a = this;
            this._refresh(function () {
                a.options.playlistOptions.autoPlay ? a.play(a.current) : a.select(a.current)
            })
        }, _initPlaylist: function (b) {
            this.current = 0, this.shuffled = !1, this.removing = !1, this.original = a.extend(!0, [], b), this._originalPlaylist()
        }, _originalPlaylist: function () {
            var b = this;
            this.playlist = [], a.each(this.original, function (a) {
                b.playlist[a] = b.original[a]
            })
        }, _refresh: function (b) {
            var c = this;
            if (b && !a.isFunction(b)) {
                a(this.cssSelector.playlist + " ul").empty(), a.each(this.playlist, function (b) {
                    a(c.cssSelector.playlist + " ul").append(c._createListItem(c.playlist[b]));
                    //alert(111111)
                    //addShare();
                    //alert($(this));
                }), this._updateControls()
            } else {
                var d = a(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;
                a(this.cssSelector.playlist + " ul").slideUp(d, function () {
                    var d = a(this);
                    a(this).empty(), a.each(c.playlist, function (a) {
                        d.append(c._createListItem(c.playlist[a]));
                        //alert(222222)
                        //addShare();
                        //alert($(this));
                    }), c._updateControls(), a.isFunction(b) && b(), c.playlist.length ? a(this).slideDown(c.options.playlistOptions.displayTime) : a(this).show()
                })
            }
            
            //addShare();
            
        }, _createListItem: function (b) {
            var c = this,
                d = '<li>';
            
            //list fn @St. 2015-07-13 10.01
            var liLen = (a(this.cssSelector.playlist + " ul").children().length + 1);
            var bTitle = b.Title;
            
            
            
            
            
            //var bLinkUrl    = b.LinkUrl;
            
            //console.log(href.convert());
            
            
            //console.log(bLinkUrl)
            
            //var bLinkUrl = loadData(nid, cnt, pageName, pgnum, tp, mulatt, callback, tag);
            //hashPt0 + defaultList + hashPt1 + defaultPage + hashPt2 + defaultItem + hashPtAblum + 5;
            //var bLinkUrl = hashPt0 + nid + hashPt1 + defaultPage + hashPt2 + liLen + hashPtAblum + 5;
            
            var bPunTime    = b.PubTime;
            var bAuthor     = b.Author;
            //var imgSrc      = formatImgSrc(b.PicLinks, 'video');
            var bPicLinks   = formatImgSrc(b.PicLinks, 'video') || '';
            b.poster        = bPicLinks;
            b.title         = bTitle;
            
            if (d += "<a href='javascript:void(0);' class='" + this.options.playlistOptions.removeItemClass + "'>&times;</a>", b.free) {
                var e = !0;
                d += "<span class='" + this.options.playlistOptions.freeGroupClass + "'>(", a.each(b, function (b, f) {
                    a.jPlayer.prototype.format[b] && (e ? e = !1 : d += " | ", d += "<a class='" + c.options.playlistOptions.freeItemClass + "' href='" + f + "' tabindex='-1'>" + b + "</a>")
                }), d += ")</span>";
            }
            return d += '<div data-item="' + liLen + '">',
                   d += "<a href='javascript:void(0);' class='" + this.options.playlistOptions.itemClass + "' tabindex='0'>",
                   d +=    "<span class='listNum'>" + (liNum = liLen, liNum >= 10 ? liNum : "0" + liNum) + "</span>" + "<span class='audioItemTitle'><span class='sprite sprite-iconList0'></span>",
                   d +=        "<span class='audioItemBo'>" + bTitle + "</span>",
                   d +=        (bPunTime ? "<span class='audioDate'>" + bPunTime + "</span> " : " "),
                   d +=        (bAuthor ? "<span class='jp-artist'> " + bAuthor + "</span>" : ""),
                   d +=        "<span class='iconPlayTiny'><span class='sprite sprite-iconList1'></span></span>",
                   d +=    "</span>",
                   d += "</a>",
                   d += "<span class='shareBox'>",
                   d +=    "<span class='info'>",
                   d +=        "<span class='shareBtnBox clearfix' tag='shareBtn'>", 
                   
                   
                        /*'<span class="bds_more">分享到: </span>' + 
                        '<a href="http://t.home.news.cn/share.jsp?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_xinhua" data-cmd="xinhua" title="分享到新华微博">新华微博</a>' + 
                        '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>' + 
                        '<a href="http://service.weibo.com/share/share.php?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>' + 
                        //'<span class="wechat" title="扫码分享到微信" onClick="weChatQRCode(\'' + bLinkUrl + '\');">微信</span>',
                        '<span class="wechat" title="扫码分享到微信" onClick="weChatQRCode();">微信</span>',*/
                   
                   
                   
                   /*d += "			<span id='bdshare' class='bdshare_t bds_tools get-codes-bdshare feed-card-share'",
                   d += "data=\"text:\'" + bTitle + "\', ",
                   d += "url:\'" + bLinkUrl + "\', ",
                   d += "pic:\'" + bPicLinks + "\'\">",
                   d += "				<span class=\"bds_more\">分享</span>",
                   d += "			</span>",
                   //d += "           <span class='bdsharebuttonbox'><a href='#' class='bds_more' data-cmd='more'>分享</a></span>",
                   d += "           <a href='http://t.home.news.cn/share.jsp?url=" + bLinkUrl + "&title=" + bTitle + "&pic=" + bPicLinks + "' target='_blank' class='bds_xinhua' data-cmd='xinhua' title='分享到新华微博'>新华</a>",
                   d += "           <a href='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + bLinkUrl + "&title=" + bTitle + "&pic=" + bPicLinks + "' target='_blank' class='bds_qzone' data-cmd='qzone' title='分享到QQ空间'>QQ</a>",
                   d += "           <a href='http://service.weibo.com/share/share.php?url=" + bLinkUrl + "&title=" + bTitle + "&pic=" + bPicLinks + "' target='_blank' class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'>新浪</a>",*/
                   //d += " 			<span class='weixin' title='扫码分享到微信' onClick='weChatShare(this);' QRcode='[" + bLinkUrl + "," + aaa + "]'>微信</span>",
                   //d += "           <span class='weixin' title='扫码分享到微信' onClick='weChatQRCode();'>微信</span>",
                   //				d += "			<span class='weixinQRCodeBox hide' onClick='$(this).hide();'>",
                   //				d += "				<span class='weixinQRCodeBoxIn'>",
                   //				d += "					<span class='close'>x</span>",
                   //				d += (bLinkUrl ? "<img src='" + (bLinkUrl.replace('c_', 'ewm_').replace('.htm', '1n.jpg')) + "' />" : ""),
                   //				d += "					<span class='t'>扫一扫分享至手机</span>",
                   //				d += "				</span>",
                   //				d += "			</span>",
                   
                   
                   
                    
                   d +=       "</span>",
                   d +=    "</span>",
                   d += "</span>",
                   d += "</div></li>";
        }, _createItemHandlers: function () {
            var b = this;
            a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function (c) {
                c.preventDefault();
                var d = a(this).parent().parent().index();
                b.current !== d ? b.play(d) : a(b.cssSelector.jPlayer).jPlayer("play"), b.blur(this)
            }), a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass, function (c) {
                c.preventDefault(), a(this).parent().parent().find("." + b.options.playlistOptions.itemClass).click(), b.blur(this)
            }), a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function (c) {
                c.preventDefault();
                var d = a(this).parent().parent().index();
                b.remove(d), b.blur(this)
            })
        }, _updateControls: function () {
            this.options.playlistOptions.enableRemoveControls ? a(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show() : a(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide(),
                this.shuffled ? a(this.cssSelector.jPlayer).jPlayer("addStateClass", "shuffled") : a(this.cssSelector.jPlayer).jPlayer("removeStateClass", "shuffled"), a(this.cssSelector.shuffle).length && a(this.cssSelector.shuffleOff).length && (this.shuffled ? (a(this.cssSelector.shuffleOff).show(), a(this.cssSelector.shuffle).hide()) : (a(this.cssSelector.shuffleOff).hide(), a(this.cssSelector.shuffle).show()))
        }, _highlight: function (c) {
            this.playlist.length && c !== b && (a(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current"), a(this.cssSelector.playlist + " li:nth-child(" + (c + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current"))
        }, setPlaylist: function (a) {
            this._initPlaylist(a), this._init()
        }, add: function (b, c) {
            a(this.cssSelector.playlist + " ul").append(this._createListItem(b)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime), this._updateControls(), this.original.push(b), this.playlist.push(b), c ? this.play(this.playlist.length - 1) : 1 === this.original.length && this.select(0)
        }, remove: function (c) {
            var d = this;
            return c === b ? (this._initPlaylist([]), this._refresh(function () {
                a(d.cssSelector.jPlayer).jPlayer("clearMedia")
            }), !0) : this.removing ? !1 : (c = 0 > c ? d.original.length + c : c, c >= 0 && c < this.playlist.length && (this.removing = !0, a(this.cssSelector.playlist + " li:nth-child(" + (c + 1) + ")").slideUp(this.options.playlistOptions.removeTime, function () {
                if (a(this).remove(), d.shuffled) {
                    var b = d.playlist[c];
                    a.each(d.original, function (a) {
                        return d.original[a] === b ? (d.original.splice(a, 1), !1) : void 0
                    }), d.playlist.splice(c, 1)
                } else {
                    d.original.splice(c, 1), d.playlist.splice(c, 1)
                }
                d.original.length ? c === d.current ? (d.current = c < d.original.length ? d.current : d.original.length - 1, d.select(d.current)) : c < d.current && d.current-- : (a(d.cssSelector.jPlayer).jPlayer("clearMedia"), d.current = 0, d.shuffled = !1, d._updateControls()), d.removing = !1
            })), !0)
        }, select: function (b) {
            b = 0 > b ? this.original.length + b : b, b >= 0 && b < this.playlist.length ? (this.current = b, this._highlight(b), a(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current])) : this.current = 0;
        }, play: function (c) {
            c = 0 > c ? this.original.length + c : c, c >= 0 && c < this.playlist.length ? this.playlist.length && (this.select(c), a(this.cssSelector.jPlayer).jPlayer("play")) : c === b && a(this.cssSelector.jPlayer).jPlayer("play");
        }, pause: function () {
            a(this.cssSelector.jPlayer).jPlayer("pause")
        }, next: function () {
            var a = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
            this.loop ? 0 === a && this.shuffled && this.options.playlistOptions.shuffleOnLoop && this.playlist.length > 1 ? this.shuffle(!0, !0) : this.play(a) : a > 0 && this.play(a);
            //clearTimeout(timeoutAudioPlayListVarPlay);
        }, previous: function () {
            var a = this.current - 1 >= 0 ? this.current - 1 : this.playlist.length - 1;
            (this.loop && this.options.playlistOptions.loopOnPrevious || a < this.playlist.length - 1) && this.play(a);
            //clearTimeout(timeoutAudioPlayListVarPlay);
        }, shuffle: function (c, d) {
            var e = this;
            c === b && (c = !this.shuffled), (c || c !== this.shuffled) && a(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function () {
                e.shuffled = c, c ? e.playlist.sort(function () {
                    return 0.5 - Math.random()
                }) : e._originalPlaylist(), e._refresh(!0), d || !a(e.cssSelector.jPlayer).data("jPlayer").status.paused ? e.play(0) : e.select(0), a(this).slideDown(e.options.playlistOptions.shuffleTime)
            })
        }, blur: function (b) {
            a(this.cssSelector.jPlayer).jPlayer("option", "autoBlur") && a(b).blur()
        }
    }
}(jQuery);