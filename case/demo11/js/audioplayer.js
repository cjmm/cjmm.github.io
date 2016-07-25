/** 
 * @file 音频插件
 * @author yuwei.wang@condenast.com.cn
 * @version 0.1.0
 * @requires http://js.selfimg.com.cn/gallery/zepto/1.1.4/zepto.min.js
 * @example <a href="../audioplayer/examples/demo.html">播放器</a>
 * @example <a href="../audioplayer/examples/demo2.html">音符播放</a>
 * @see http://js.selfimg.com.cn/brickjs/audioplayer/0.1.0/audioplayer.min.js
 */

/** 
 * @class
 * @author yuwei.wang@condenast.com.cn
 * @description html5音频
 * @version 0.1.0
 * @requires http://js.selfimg.com.cn/gallery/zepto/1.1.4/zepto.min.js
 * @example <a href="../audioplayer/examples/demo.html">播放器</a>
 * @example <a href="../audioplayer/examples/demo2.html">音符播放</a>
 * @see http://js.selfimg.com.cn/brickjs/audioplayer/0.1.0/audioplayer.min.js
 * @param {Object} selector 绑定的对象
 * @param {Object} cfgs 配置项
 * @param {Array} [cfgs.path]	音频地址路径,可以支持多首歌曲播放
 * @param {String} [cfgs.type=simple]	simple:单一功能的播放暂停,适用于手机专题播放音频   multi:多功能的,适用于自定义的播放器
 * @param {String} [cfgs.preload=metadata]	metadata:当页面加载后仅加载音频的元数据  true:页面加载时开始加载音频  false:页面加载后不加载音频
 * @param {Boolean} [cfgs.autoplay=true]	  是否自动播放
 * @param {Boolean} [cfgs.loop=true]	  是否循环播放
 * @param {Function} [cfgs.playfn]  播放的回调
 * @param {Function} [cfgs.pausefn]  暂停播放的回调
 * @param {Function} [cfgs.endfn]  播放结束的回调
 * @param {Function} [cfgs.errorfn]  播放错误的回调
 */

function AudioPlayer(selector,cfgs){
	this.cfgs = {
		path: [],
		type: 'simple',
		preload: 'metadata', 
		autoplay: true,
		loop: true,
		playfn: function(){},
		pausefn: function(){},
		endfn: function(){},
		errorfn: function(){}
	}
    this.curTime = 0;
	this.totalTime = 0;
	this.startTime = 0;
	this.startX = 0; 
	this.disX = 0;
	this.aboveX = 0;
	this.pathIndex = 0;
	this.bufferTimer = null;
	this.audioId = 'a_'+new Date().getTime();
	AudioPlayer.initObject[this.audioId] = this;
	$.extend(this.cfgs, cfgs);
	this._init(selector);
}
AudioPlayer.initObject = {};
AudioPlayer.prototype ={
	_init: function(selector){
		var self = this;
		/** 包含容器 */
		self.container = $(selector);
		
		/** 创建音频 */
		self.sound = document.createElement('audio');
		self.sound.src = self.cfgs.path[self.pathIndex];
		self.container.append(self.sound);
		
		/** 节点选择 */
		self.pathLen = self.cfgs.path.length;
		self.playBtn = self.container.find('[node-type="play-states"]');
		self.playText = self.container.find('[node-type="play-text"]');
		self.sliderPanel = self.container.find('[node-type="play-slider"]');
		self.handleNode = self.container.find('[node-type="play-handle"]');
		self.progressNode = self.container.find('[node-type="play-progress"]');
		self.bufferNode = self.container.find('[node-type="play-buffer"]');
		self.curTimeNode = self.container.find('[node-type="cur-time"]');
		self.totalTimeNode = self.container.find('[node-type="total-time"]');
		
		self._bind();
		self._autoPlay();
		self._togglePlay();
		self.sound.addEventListener("play",function(){
			for(var key in AudioPlayer.initObject){
				if(key !== self.audioId){
					AudioPlayer.initObject[key].pause();
				}
			}
			self.playBtn.addClass('play').removeClass('pause');
	    	if(self.cfgs.type == 'multi'){
	    		self._buffer();
			}
			self.cfgs.playfn();
		},false);
		self.sound.addEventListener("ended",function(){
	   		self._playList();
			self.cfgs.endfn();
	    },false);
	    self.sound.addEventListener("error",function(e){
			self.cfgs.errorfn(e);
	    },false);
	},	
	_playList: function(){
		var self = this;
		self.curTime = self.aboveX = 0;
		self.pathIndex++;
		if(self.pathLen > 1 && self.pathIndex < self.pathLen){
			self.sound.src = self.cfgs.path[self.pathIndex];
		}
		self._loopPlay();
	},	
	_bind: function(){
		var self = this;
		self._playTime();

		self.sliderPanel.on('touchstart' , function(e){
			self._onTouchStart(e);
		});
		self.sliderPanel.on('touchmove',function(e){
			self._onTouchMove(e);
		}).on('touchend' ,function(e){
			self._onTouchEnd(e);
		});
		self.sliderPanel.on('click' ,function(e){
			self._onMouseDown(e);
		});
	},
	_preload: function(){
		var self = this;
		if (self.cfgs.preload === true) {
            self.sound.preload = 'auto';
        }else if(self.cfgs.preload === false) {
            self.sound.preload = 'none';
        }else {
            self.sound.preload = self.cfgs.preload;
        }
	},
	_autoPlay: function(){
		var self = this;
		if (self.cfgs.autoplay) {
        	self.sound.autoplay = 'autoplay';
        	self.sound.load();
        	self.sound.play();
        }
	},
	_loopPlay: function(){
		var self = this;
		if (self.cfgs.loop) {
			self.sound.loop = 'loop';
			if(self.pathLen > 1){
				self.sound.src = self.cfgs.path[0];
			}else{
				self.sound.load();
	   			self.sound.play();
			}
        }else{

        	self.playBtn.removeClass('play').addClass('pause');
		}
	},
	_buffer: function(){
		var self = this;
		self.bufferTimer = setInterval(function(){
			var bufferIndex = self.sound.buffered.length;
			if (bufferIndex > 0 && self.sound.buffered != undefined) {
				var bufferValue = self.sound.buffered.end(bufferIndex-1)/self.sound.duration*self.sliderPanel.width();
				self.bufferNode.width(parseInt(bufferValue));
				
				if (Math.abs(self.sound.duration - self.sound.buffered.end(bufferIndex-1)) <1) {
					self.bufferNode.width(self.sliderPanel.width());
					clearInterval(self.bufferTimer);
				};
			};
		},1000);
	},
	_togglePlay: function(){
		var self = this;
		self.playBtn.click(function(){
			var a = self.playText.html() , b = self.playText.attr('node-act');
			if(self.playBtn.hasClass('play')){
				self.playBtn.addClass('pause').removeClass('play');
				self.sound.pause();
				if(self.playText.length > 0){
					self.playText.addClass('t-show').html(b);
					self.playText.attr('node-act' , a);
				}
				self.cfgs.pausefn();
			}else{
				self.playBtn.addClass('play').removeClass('pause');
				if(self.pathLen > 1){
					self.sound.src = self.cfgs.path[0];
				}
				self.sound.play();
				if(self.playText.length > 0){
					self.playText.removeClass('t-show').html(b);
					self.playText.attr('node-act' , a);
				}
				self.cfgs.playfn();
			}
		});
	},
	_timeNum: function(num){
		var self = this;
		return num < 10 ? '0' + num : num ;
	},
	_playTime: function(){
		var self = this;
		self.sound.addEventListener('timeupdate',function(){
			if (!isNaN(self.sound.duration)) {
				self.curTime = self.sound.currentTime;
				self.totalTime = self.sound.duration;
				var curMinute = self._timeNum( parseInt(self.curTime / 60)) ,
	            	curSecond = self._timeNum( parseInt(self.curTime % 60)) ,
	            	allMinute = self._timeNum( parseInt(self.totalTime / 60)) ,
	            	allSecond = self._timeNum( parseInt(self.totalTime % 60)) ,
	            	scale = self.curTime / self.totalTime ;

				self.curTimeNode.html( curMinute +':' +  curSecond );
	            self.totalTimeNode.html( allMinute +':' + allSecond );
	            self.handleNode.css('left' , self.sliderPanel.width()*scale );
	            self.progressNode.css('width' , self.sliderPanel.width()*scale );
			}
		},false);
	},
	_onTouchStart: function(e){
		var self = this;
		e.preventDefault();
		self.startX = e.touches[0].pageX;
		self.startTime = self.sound.currentTime;
	},
	_onTouchMove: function(e){
		var self = this;
		self.sound.pause();
		e.preventDefault();
		self.disX = e.touches[0].pageX - self.startX;

		if(self.disX > self.sliderPanel.width() -  self.aboveX ){
			self.disX = self.sliderPanel.width() - self.aboveX ;
		}else if(self.disX <  -self.aboveX ){
			self.disX = -self.aboveX ;
		}
		self.handleNode.css('left' , self.disX +  self.aboveX );
		self.progressNode.css('width' , self.disX + self.aboveX );
		self.curTime = (self.disX / self.sliderPanel.width()) * self.sound.duration + self.startTime;
	},
	_onTouchEnd: function(e){
		var self = this;
		e.preventDefault();
		self.sound.currentTime = self.curTime;
		self.sound.play();
		self.aboveX = parseFloat(self.handleNode.css('left'));
	},
	_onMouseDown: function(e){
		var self = this;
		self.sound.pause();
		self.startTime = self.sound.currentTime;
		self.disX = e.pageX - self.handleNode.offset().left;
		if(self.disX <  -self.aboveX ){
			self.disX = -self.aboveX ;
		}
		self.curTime = (self.disX / self.sliderPanel.width()) * self.sound.duration + self.startTime;
		self.sound.currentTime = self.curTime;
		self.handleNode.css('left' , self.disX +  self.aboveX);
		self.progressNode.css('width' , self.disX +  self.aboveX );
		self.aboveX = parseFloat(self.handleNode.css('left'));
		self.sound.play();
	},
	/**
	 * 开始播放
	 */
	play: function(){
		var self = this;
		self.sound.play();
	},
	/**
	 * 暂停播放
	 */
	pause: function(){
		var self = this;
		self.playBtn.addClass('pause').removeClass('play');
		self.sound.pause();
	},
}


