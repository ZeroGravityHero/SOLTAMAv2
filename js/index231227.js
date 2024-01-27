//$(function(){
	//role
	var thumbsSwiper = new Swiper('.role_tab_swiper', {
		slidesPerView: 4,
		observer: true,
		observeParents: true,
		noSwiping: false,
		freeMode: true,
        watchSlidesProgress: true,
	});
	var roleSwiper = new Swiper('.role_swiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
		navigation: {
			nextEl: '.btn_role_next',
			prevEl: '.btn_role_prev',
		},
        on: {
            init: function() {
                swiperAnimateCache(this);
				swiperAnimate(this);
            },
            slideChangeTransitionEnd: function() {
                swiperAnimate(this);
            }
        },
		thumbs: {
			swiper: thumbsSwiper,
        },
    });
	if(is_mobile && !is_ipad){
		var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if(isIOS){
			$('.googleStore').hide();
			$('.huaweiStore').hide();
		}else{
			$('.appStore').hide();
		}

		$('#sys_li_pc').hide();
		//lcb
		function progress(lcbNum){
			// console.log(lcbNum)
			if(lcbNum < 1500000){
				$('#process_w').css('height',lcbNum/1500000*96+'px');
			}else if(lcbNum >= 1500000 && lcbNum < 2000000){
				$('.lcb_gift li').eq(0).attr('class','on');
				$('#process_w').css('height',96+(lcbNum-1500000)/500000*244+'px');
			}else if(lcbNum >= 2000000 && lcbNum < 3000000){
				$('.lcb_gift li:lt(2)').attr('class','on');
				$('#process_w').css('height',340+(lcbNum-2000000)/1000000*242+'px');
			}else if(lcbNum >= 3000000 && lcbNum < 6000000){
				$('.lcb_gift li:lt(3)').attr('class','on');
				$('#process_w').css('height',582+(lcbNum-3000000)/3000000*313+'px');
			}else if(lcbNum >= 6000000 && lcbNum < 10000000){
				$('.lcb_gift li:lt(4)').attr('class','on');
				$('#process_w').css('height',895+(lcbNum-6000000)/4000000*312+'px');
			}else{
				$('.lcb_gift li').attr('class','on');
				$('#process_w').css('height','100%');
			}
		}
		$('.gofirst').click(function(){
			$('html,body').stop().animate({scrollTop:'0px'},200);
		});
		$(window).scroll(function(){
			var st = $(document).scrollTop();
			if(st > 500){
				$('.gofirst').fadeIn();
			}else{
				$('.gofirst').fadeOut();
			}
		});
	}else{
		//page
		var pageNum = 0;
		var pageSwiper = new Swiper('.page_swiper', {
			direction: 'vertical',
			mousewheel: true,
			on: {
				slideChangeTransitionEnd: function(){
					pageNum = this.activeIndex;
					if(pageNum == 0){
						bgVideo.play();
					}
					if(pageNum == 3){
						$('.icon_down').hide();
						$('.gofirst').fadeIn();
					}else{
						$('.icon_down').fadeIn();
						$('.gofirst').hide();
					}
				},
			},
		});
		//video
		var bgVideo = document.getElementById('bg_video');
		bgVideo.addEventListener('canplaythrough',function(){
			bgVideo.play();
			$('#bg_video').show();
		});
		bgVideo.load();
		//lcb
		function progress(lcbNum){
			// console.log(lcbNum);
			if(lcbNum < 1500000){
				$('#process_w').css('width',lcbNum/1500000*1.71+'rem');
			}else if(lcbNum >= 1500000 && lcbNum < 2000000){
				$('.lcb_gift li').eq(0).attr('class','on');
				$('#process_w').css('width',1.71+(lcbNum-1500000)/500000*4.26+'rem');
			}else if(lcbNum >= 2000000 && lcbNum < 3000000){
				$('.lcb_gift li:lt(2)').attr('class','on');
				$('#process_w').css('width',5.97+(lcbNum-2000000)/1000000*4.19+'rem');
			}else if(lcbNum >= 3000000 && lcbNum < 6000000){
				$('.lcb_gift li:lt(3)').attr('class','on');
				$('#process_w').css('width',10.16+(lcbNum-3000000)/3000000*4.92+'rem');
			}else if(lcbNum >= 6000000 && lcbNum < 10000000){
				$('.lcb_gift li:lt(4)').attr('class','on');
				$('#process_w').css('width',15.08+(lcbNum-6000000)/4000000*4.94+'rem');
			}else{
				$('.lcb_gift li').attr('class','on');
				$('#process_w').css('width','100%');
			}
		}
		//role
		$('.role_video_tab_box li').click(function(){
			var dTxt = $(this).attr('data-text');
			var skillVideo = $(this).attr('vsrc');
			var $video = $(this).parent().siblings('.role_video_box').find('video'),
				$text = $(this).parent().siblings('.role_video_text');
			$(this).addClass('on').siblings().removeClass('on');
			$video.attr('src', skillVideo);
			$text.html(dTxt);
		});
		//foot
		$('.section_news').mousewheel(function(event, delta, deltaX, deltaY){
			if(delta < 0){
				if(!$('#foot_wrap').hasClass('transform_up') && pageNum == 3){
					pageSwiper.mousewheel.disable();
					$('#foot_wrap').addClass('transform_up');
				}
			}else if(delta > 0){
				if($('#foot_wrap').hasClass('transform_up')){
					$('#foot_wrap').removeClass('transform_up');
					setTimeout(function(){
						pageSwiper.mousewheel.enable();
					}, 300);
				}
			}
		});
		$('.gofirst').click(function(){
			$('#foot_wrap').removeClass('transform_up');
			pageSwiper.slideTo(0);
			pageSwiper.mousewheel.enable();
		});
	}
	//pop_v
    var player;
    function onYouTubeIframeAPIReady(){
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            // videoId: 'DHEtf9Jv6K0'
            videoId: '4AQdwNRNCRI'
            /*
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }*/
        });
    }
    $('.btn_head_v').click(function(){
        player.playVideo();
        $('#pop_video').fadeIn();
    });
    $('.close_video,#pop_video').click(function(){
        player.stopVideo();
        $('#pop_video').hide();
    });
    $('.pop_v_box').click(function(){
        return false;
    });
	
	//news
	$('.news_tab li').each(function(i){
		$(this).click(function(){
			if(!$(this).hasClass('on')){
				$('.news_tab li').removeClass('on');
				$(this).addClass('on');
				$('.news_list_cont').hide()
				$('.news_list_cont').eq(i).show()
			}
		});
	});
	/*
	var lunboStr="";
	$.each(ma_data_data.lb1,function(key,value){
		lunboStr += '<div class="swiper-slide">\
						<a href="'+value.link+'" target="_blank"><img src="'+value.bigpic+'" />\
					</div>'
	});
	$("#lunboDiv").html(lunboStr);
	*/
	var newsSwiper = new Swiper('.news_swiper', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		autoplay: {
			disableOnInteraction: false,
		},
		noSwiping: false,
		mousewheel: false,
		observer: true,
		observeParents: true,
		pagination :{
			el: '.news_page',
			clickable :true,
		}
	});
	//qidai
	$('.btn_qidai').click(function(){
		$('#pop_qidai').fadeIn();
		return false;
	});
	
	//close
	$('.icon_close').click(function(){
		$(this).parent().parent('.pop_fixed').fadeOut();
	});
//});