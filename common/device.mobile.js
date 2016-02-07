/**
 * Copyright (c) 2015 Xinhuanet Inc. All rights reserved.
 *
 * @file   common/device.css
 * @author St. <st_sister@icloud.com>
 * @time   2015-10-13-15.10
 */
//jq浏览器版本判断插件
var userAgent = navigator.userAgent.toLowerCase(),
	device = {
		change: function (){
			var m = 'http://www.xinhuanet.com/video/xinhuaradio/mobile.htm',
				u = userAgent,
				w = window.location,
				p = '';
				
			//alert(u)
			
			if (u === null || u === '' || (w.href.indexOf('f=pad') !== -1)) {
				p = 'web';
			}
			else {
				if (u.indexOf('mi pad') !== -1 || u.indexOf('xiaomi/miuibrowser') !== -1 || u.indexOf('ipad') !== -1) {
					p = 'pad';
				}
				else {
					if (u.match(/iphone/i) || u.match(/iphone os/i) || u.match(/android/i) || u.match(/windows mobile/i) || u.match(/ucweb/i)) {
						p = 'phone';
						location.href = m;
					}
					else {
						if (u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1 && u.indexOf('firefox') === -1 && u.indexOf('11.0') === -1) {
							p = 'other mobile';
							location.href = m;
						}
					}
				}
			}
		}
	};
device.change();

