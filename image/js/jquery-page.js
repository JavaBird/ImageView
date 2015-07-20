// zhangxiaohong  2015-7-17


	var object = {

		_container : $('.pvcl-container'),

		_ul:$('.pvcl-container > ul'),

		_img:$('.pvc-photo-wrap > img')

	}


	var data = {

		curr : 1 , //游标位置

		minNum: 1 // 容器最小标量


	}





	var imageMove = {

		// 初始化
		init:function(){

			 _li_width = object._ul.find('li:first').width();// li的单位宽度

			 _div_width = object._container.width();

			  data._length = object._ul.find('li').length; //图片总数量   


			 _ul_width = (_li_width+18) * data._length;


			 object._ul.width(_ul_width);

             data.step = _li_width;

             if(_div_width > _ul_width){

             	 _count = data._length;

             	 data.count = Math.ceil(_count); 

             }else if(_div_width <= _ul_width){

             	_count = _div_width / (_li_width + 18);

             	data.count = Math.ceil(_count); 

             }



             data.maxNum = data.count;

            

            

             

		},
		left:function(){

			this.moveIt();
		},
		right:function(){

			this.moveIt(true);

		},
		clickLeft:function(){

				var count = data.count;//一次只能容纳5个

					var curr = data.curr;//游标位置

					var num = data._length;//图片总数

					var maxNum = data.maxNum;//当前最大数

					var minNum = data.minNum;//当前最小值

					if (curr - 1 > 1) {

						if (curr - 1 > minNum) {

							// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

						 //    object._ul.find('li > a[fid="'+(curr - 1)+'"]').addClass('current');

						 this.selectImg(curr,curr - 1);

							data.curr = curr - 1;

							

						} else if (curr - 1 == minNum) {

							// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

						 //    object._ul.find('li > a[fid="'+(curr - 1)+'"]').addClass('current');

						    this.selectImg(curr,curr - 1);

						    data.curr = curr - 1;

							data.maxNum = maxNum - 1;

							data.minNum = minNum - 1;

							this.left();

							
						}

					} else if (curr - 1 > 0 && curr - 1 == 1) {

						this.selectImg(curr,curr - 1);

						// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

						//  object._ul.find('li > a[fid="'+(curr - 1)+'"]').addClass('current');

						data.curr = curr - 1;

					} else if (curr - 1 == 0) {

						alert("已达到开始!")
					}

				



		},
		clickRight:function(){//

				   var count = data.count;//一次只能容纳5个

					var curr = data.curr;//游标位置

					var num = data._length;//图片总数

					var maxNum = data.maxNum;//当前最大数

					var minNum = data.minNum;//当前最小值

					

					if (curr + 1 < maxNum) {

						this.selectImg(curr,curr + 1)

						// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

						// object._ul.find('li > a[fid="'+(curr + 1)+'"]').addClass('current');

						data.curr = curr + 1;


						

					} else if (curr + 1 == maxNum) {

						// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

						// object._ul.find('li > a[fid="'+(curr + 1)+'"]').addClass('current');

						this.selectImg(curr,curr + 1)

						if (maxNum < num) {

							data.curr = curr + 1;

							data.maxNum = maxNum + 1;

							data.minNum = minNum + 1;

							this.right();

						} else if (maxNum == num) {

							data.curr = curr + 1;
						}

					} else if (curr + 1 > maxNum) {

						
						alert('末尾')
					}


					


		},
		clickImg:function(t,v){// v :点击事件游标位置   


			        var _curr = Number(v);//点击事件游标位置

					var count = data.count;//一次只能容纳5个

					var curr = data.curr;//游标位置

					var num = data._length;//图片总数

					var maxNum = data.maxNum;//当前最大数

					var minNum = data.minNum;//当前最小值

					// object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

					// object._ul.find('li > a[fid="'+(_curr)+'"]').addClass('current');

					this.selectImg(curr,_curr)

					data.curr = _curr;

					

					if (curr > _curr) {//向左移

						if (_curr - 1 >= 1) {

							if (_curr == minNum) {

								data.maxNum = maxNum - 1;

								data.minNum = minNum - 1;

								this.left();

							}

						}

					} else if (curr < _curr) {//向右移动

						if (_curr == maxNum) {

							if (maxNum < num) {

								data.maxNum = maxNum + 1;

								data.minNum = minNum + 1;

								this.right();


							}

						}

					}

					
				


		},
		selectImg:function(curr,_curr){

			object._ul.find('li > a[fid="'+curr+'"]').removeClass('current');

			object._ul.find('li > a[fid="'+_curr+'"]').addClass('current');	

			object._img.filter('[fid="'+curr+'"]').css("display","none");

			object._img.filter('[fid="'+_curr+'"]').css("display","block");
			



		},
		moveIt:function(v){// 移动


			_left = Math.abs(object._ul.position().left);

			if(data._length > data.count){

				if(v){ // 向右移动


						object._ul.animate({

							left:'-' +(_left + data.step+18)+ 'px',

						},'slow')

					}else{// 向左移动

						object._ul.animate({

							left:'-' +(_left - data.step - 18)+ 'px'

						},'slow')


					}


			}

			



		},
		_log:function(){// 控制台日志

		//	console.log('curr: '+data.curr+' count: '+data.count+' length: '+data._length+' maxNum: '+data.maxNum+' minNum: '+data.minNum);


		}
		










	}





$(function(){


      imageMove.init();


	  $(window).resize(function() {

			 window.location.href = window.location.href ; 

		});

	  $('a[btn="prev"]').on('click',function(){

	  	imageMove.clickLeft();

	  })

	   $('a[btn="next"]').on('click',function(){

	  	imageMove.clickRight();

	  })


	   $('a[data-btn="prev"]').on('click',function(){

	  	imageMove.clickLeft();

	  })

	   $('a[data-btn="next"]').on('click',function(){

	  	imageMove.clickRight();

	  })


	   object._ul.find('li > a').each(function(i){

	   			$(this).on('click',function(){

	   					imageMove.clickImg($(this),$(this).attr('fid'));


	   			})


	   })





});




