


$(function(){

	var _cache = {},
    _load_timer;
    var _config = {
        resize_step: 10,
        resize_one_step: 80
    };
    var _sildeShowStatus = false;
    
    if($.browser.msie && $.browser.version < 9){
        _config.resize_step = 30;
        _config.resize_one_step = 120;
    }


    var inOver = false, outOver = false, overTimer, inStatus = false, outStatus = false;

      _cache.ctrls = {
                pic: $('img[data-rel="pic"]'),
                file_list: $('a[data-rel="file_list"]'),
                main: $('div[data-rel="main"]'),
                min_pic: $('a[data-rel="min_pic"]'),
                zooms: $('a[data-zoom-btn]'),
                file_name: $('a[data-rel="file_name"]'),
                close_btn: $('a[data-btn="close"]'),
                pause_btn: $('a[data-btn="pause"]')
        }


	var myImage ={

			//放大
			max: function(step){
 
                _pic = $('.pvc-photo-wrap > img:visible');

	            if(!step){
	                step = _config.resize_step;
	            }
	            
	            var oldW = _pic.width();
	            var w = oldW + step;
	            
	            if(w > _cache.ctrls.main.width() * 5){
	                w = _cache.ctrls.main.width() * 5;
	            }
	            
	            _pic.width(w);
	            
	            if(w > 800 && _pic.attr('ackey') == 800 && _cache.data_urls.length >= 4){
	                _pic.attr('src', _cache.data_urls[3]);
	                _pic.attr('ackey', 1440);
	            }
	            
	            /*
	            if(w > 1440 && _pic.attr('ackey') == 1440 && _cache.data_urls.length >= 5){
	                _pic.attr('src', _cache.data_urls[4]);
	                _pic.attr('ackey', 'all');
	            }*/
	            
	            var picTop = _pic.offset().top - $(window).scrollTop()
	            
	            _pic.css({
	                left: _pic.offset().left - (step / 2)
	            });
	            var nt = picTop - (step / 2);
	            if(picTop >= 0 && nt < 0){
	                nt = 0;
	            }
	            _pic.css({
	                top: nt
	            });
	           
          },
          imageRotate:function(img, num){

              if (num == undefined) {
                     num = 0
                }
                var deg = num * 90;
                if ($.browser.msie) {
                    if (num > 3) {
                        num = 0
                    }
                }
                img.css({
                    "-webkit-transform" : "rotate(" + deg + "deg)",
                    "-moz-transform" : "rotate(" + deg + "deg)",
                    "-o-transform" : "rotate(" + deg + "deg)",
                    "-ms-transform" : "rotate(" + deg + "deg)",
                    filter : "progid:DXImageTransform.Microsoft.BasicImage(Rotation="
                            + num + ")"
                });
                return num



          },
          min: function(step){ // 缩小

            _pic = $('.pvc-photo-wrap > img:visible');

            if(!step){
                step = _config.resize_step;
            }
            
            var oldW = _pic.width();
            var w = oldW - step;
            if(w < 100){
                w = 100;
            }
            _pic.width(w);
            
            
            var picTop = _pic.offset().top - $(window).scrollTop()
            
            _pic.css({
                left: _pic.offset().left + (step / 2)
            });
            
            
            var nt = picTop + (step / 4);
            if(picTop <= 0 && _pic.height() > _cache.ctrls.main.height()){
                nt = picTop;
            }
            _pic.css({
                top: nt
            //top: picTop
            });
            
            
        },
			rotate : function(isBack){  // 旋转

               var img = _cache.ctrls.pic;
            
            var rotate = Number(img.attr("rotate"));
            var num;
            if(rotate){
                if(isBack){
                    num = Number(img.attr("rotate")) - 1;
                }
                else{
                    num = Number(img.attr("rotate")) + 1;
                }
            }
            else{
                if(isBack){
                    if ($.browser.msie && $.browser.version < 10) {
                        num = 3;
                    }
                    else{
                        num = -1;
                    }
                }
                else{
                    num = 1;
                }
            }
            
            if ($.browser.msie && $.browser.version < 10) {
                if(num < 0){
                    num = 3;
                }
                if(num == 4){
                    num = 0;
                }
            }
            
           // var res = Util.Image.Rotate(img, num);

            var res = this.imageRotate(img,num);

            img.attr("rotate", res);
            
            var caNum = Math.abs(res) % 4;
            if(caNum){
                _cache.ctrls.zooms.addClass('disabled');
            }
            else{
                _cache.ctrls.zooms.removeClass('disabled');
                
            }
            
            
            
           
		            
           

			}






	};


	  // 显示或者隐藏缩略图列表
	  $('a[data-btn="file_list"]').on('click',function(){

	  		  var pc = $('.previewer-container');

	  		  if(pc.data('flag_list') > 0){

	  		  		pc.removeClass('pvc-showlist');

	  		  		pc.data('flag_list',0);

	  		  }else {

	  		  		pc.addClass('pvc-showlist');

	  		  		pc.data('flag_list',1);

	  		  }

	  })


	  //逆时针旋转

	  $('a[data-btn="rotate_l"]').on('click',function(){


	  			myImage.rotate(true);

	  })

	  //顺时针旋转	

	  $('a[data-btn="rotate_r"]').on('click',function(){

	  			myImage.rotate();

	  })

	  //放大
	  $('a[data-zoom-btn="zoom_in"]').on('mousedown', function(){

                if($(this).hasClass('disabled')) return true;
                if(overTimer) window.clearTimeout(overTimer);
                inOver = window.setInterval(function(){
                    myImage.max();
                    inStatus = true;
                }, 20);
            }).on('mouseup', function(){
                if($(this).hasClass('disabled')) return true;
                if(inOver) window.clearInterval(inOver);
                if(!inStatus) myImage.max(_config.resize_one_step);
                inStatus = false;
            }).on('mouseleave', function(){
                if($(this).hasClass('disabled')) return true;
                if(inOver) window.clearInterval(inOver);
                inStatus = false;
            }).on('click', function(){
                return false;
            });

	  //缩小
	  $('a[data-zoom-btn="zoom_out"]').on('mousedown', function(){
                if($(this).hasClass('disabled')) return true;
                if(overTimer) window.clearTimeout(overTimer);
                outOver = window.setInterval(function(){
                    myImage.min();
                    outStatus = true;
                }, 20);
            }).on('mouseup', function(){
                if($(this).hasClass('disabled')) return true;
                if(outOver) window.clearInterval(outOver);
                if(!outStatus) myImage.min(_config.resize_one_step);
                outStatus = false;
            }).on('mouseleave', function(){
                if($(this).hasClass('disabled')) return true;
                if(outOver) window.clearInterval(outOver);
                outStatus = false;
            }).on('click', function(){
                return false;
            });

 
     // 增加拖拽
     $('img[data-rel="pic"]').draggable();



});