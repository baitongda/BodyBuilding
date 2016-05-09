;
//传入 jQuery 对外暴露 Carousel
(function($) {
    var Carousel = function(poster) {
        var _self = this;
        //保存单个对象
        this.poster = poster;
        this.posterItemMain = this.poster.find('ul.poster-list');
        this.nextBtn = poster.find('div.poster-btn-next')
        this.prevBtn = poster.find('div.poster-btn-prev')
        this.posterItems = this.posterItemMain.find('li').size();
        if (this.posterItems % 2 === 0) {
            this.posterItemMain.append(this.posterItemMain.find('li').eq(0).clone())
            this.posterItemList = this.posterItemMain.children();
        }
        this.posterFirstItem = this.posterItemMain.find('li').first();
        this.posterItemList = this.posterItemMain.find('li');
        this.posterLastItem = this.posterItemList.last();
        this.rotateFlag = true;

        //默认配置参数
        this.setting = {
            "width": 1000,
            "height": 270,
            "posterWidth": 640,
            "posterHeight": 270,
            "scale": 0.9,
            "speed": 500,
            "verticalAlign": 'middle',
            "autoPlay": true,
            "delay": 2000
        };
        //合并参数
        $.extend(this.setting, this.getSetting())
        this.setSettingValue(); //设置参数
        this.setPosterPos() //设置位置
            //点击事件
        this.nextBtn.click(function() {
            if (_self.rotateFlag) {
                _self.rotateFlag = false;
                _self.carouseRotate('left')
            }
        })
        this.prevBtn.click(function() {
            if (_self.rotateFlag) {
                _self.rotateFlag = false;
                _self.carouseRotate('right')
            }
        });
        //是否开启自动播放
        if (this.setting.autoPlay) {
            this.autoPlay();
            this.poster.hover(function() {
                window.clearInterval(_self.timer);
            }, function() {
                _self.autoPlay();
            });
        }
    }
    window['Carousel'] = Carousel;
    // prototype
    Carousel.prototype = {
        autoPlay: function() {
            var _this = this;
            this.timer = window.setInterval(function() {
                _this.nextBtn.click();
            }, this.setting.delay)
        },
        carouseRotate: function(dir) {
            var _this = this; // Carousel
            var zIndexArr = [];
            if (dir === 'left') {
                this.posterItemList.each(function() {
                    var self = $(this),
                        prev = self.prev().get(0) ? self.prev() : _this.posterLastItem,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css('zIndex'), //需要过渡到的 zIndex
                        opacity = prev.css('opacity'),
                        left = prev.css('left'),
                        top = prev.css('top');
                    zIndexArr.push(zIndex);
                    if (!self.is(':animated')) {
                        self.animate({
                            width: width,
                            height: height,
                            //zIndex:zIndex,
                            opacity: opacity,
                            left: left,
                            top: top
                        }, _this.setting.speed, function() {
                            _this.rotateFlag = true;
                        })
                    }
                });

                _this.posterItemList.each(function(i) {
                    $(this).css('zIndex', zIndexArr[i]);

                })
            } else if (dir === 'right') {
                this.posterItemList.each(function() {
                    var self = $(this),
                        next = self.next().get(0) ? self.next() : _this.posterFirstItem,
                        width = next.width(),
                        height = next.height(),
                        zIndex = next.css('zIndex'),
                        opacity = next.css('opacity'),
                        left = next.css('left'),
                        top = next.css('top');
                    zIndexArr.push(zIndex);
                    if (!self.is(':animated')) {
                        self.animate({
                            width: width,
                            height: height,
                            //zIndex:zIndex,
                            opacity: opacity,
                            left: left,
                            top: top
                        }, _this.setting.speed, function() {
                            _this.rotateFlag = true;
                        })
                    }
                });
                _this.posterItemList.each(function(i) {
                    $(this).css('zIndex', zIndexArr[i]);

                })
            }
        },
        //设置配置参数值
        setSettingValue: function() {
            this.poster.css({
                width: this.setting.width,
                height: this.setting.height
            });
            this.posterItemMain.css({
                width: this.setting.width,
                height: this.setting.height
            });
            //按钮宽度
            var w = (this.setting.width - this.setting.posterWidth) / 2;
            this.nextBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.posterItems / 2)
            });
            this.prevBtn.css({
                width: w,
                height: this.setting.height,
                zIndex: Math.ceil(this.posterItems / 2)
            });
            this.posterFirstItem.css({
                left: w,
                width: this.setting.posterWidth,
                height: this.setting.posterHeight,
                zIndex: Math.floor(this.posterItems / 2)
            })
        },
        //获取手动配置参数
        getSetting: function() {
            return this.poster.data('setting');
        },
        //设置垂直对齐
        setVerticalAlign: function(height) {
            var verticalType = this.setting.verticalAlign,
                top = 0;
            if (verticalType === 'middle') {
                top = (this.setting.height - height) / 2;
            } else if (verticalType === 'top') {
                top = 0;
            } else if (verticalType === 'bottom') {
                top = this.setting.height - height
            } else {
                top = (this.setting.height - height) / 2;
            }

            return top;
        },
        //设置剩余的帧的位置关系
        setPosterPos: function() {
            var _self = this;
            var sliceItems = this.posterItemMain.find('li').slice(1),
                sliceSize = (sliceItems.size()) / 2,
                rightSlice = sliceItems.slice(0, sliceSize),
                leftSlice = sliceItems.slice(sliceSize),
                level = Math.floor(this.posterItems / 2),
                rw = this.setting.posterWidth,
                rh = this.setting.posterHeight,
                gap = ((this.setting.width - rw) / 2) / level;
            var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
            var fixOffsetLeft = firstLeft + rw;
            rightSlice.each(function(i) {
                    //注意this
                    level--;
                    rw = rw * _self.setting.scale;
                    rh = rh * _self.setting.scale;
                    var j = i;
                    $(this).css({
                        zIndex: level,
                        width: rw,
                        height: rh,
                        opacity: 1 / (++i),
                        left: fixOffsetLeft + (++j) * gap - rw,
                        top: _self.setVerticalAlign(rh)
                    })
                })
                //左边的位置关系
            var lw = rightSlice.last().width(),
                lh = rightSlice.last().height(),
                oLoop = Math.floor(this.posterItems / 2) //层级
            leftSlice.each(function(i) {
                $(this).css({
                    zIndex: level,
                    width: lw,
                    height: lh,
                    opacity: 1 / oLoop,
                    left: i * gap,
                    top: _self.setVerticalAlign(lh)
                })
                oLoop--;
                level++;
                lw = lw / _self.setting.scale;
                lh = lh / _self.setting.scale;
            })
        }

    }
    Carousel.init = function(posters) {
            //初始化页面传递进的集合,
            //如果页面有两个类名相同的轮播集合
            var _this = this;
            posters.each(function(index, ele) {
                new _this($(this)); //new Carousel(ele[index])
            });
        }
        //外界无法访问 (return 也不行 需要注册window 对象)
})(jQuery);
