//$(function(){
    function getUrlParam(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return r[2]; return null;
	}
	var publicPath = 'https://event.perfectworld.com';
	var isMobile = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream,
		isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
		isHuawei = /huawei/i.test(navigator.userAgent) && !window.MSStream;
	var entrance = getUrlParam('entrance') ? getUrlParam('entrance') : '',
        extraInfo = 'M',//M,PC
        system = 'iOS',//iOS,Android,PC
        area = '';//手机登录或绑定时赋值
    if(isMobile){
        if(!isIOS){
            system = 'Android';
        }
    }else{
        extraInfo = 'PC';
        system = 'PC';
    }
	//login
	var isYY = false;
    var userId = '',
        token = '';
    var _appId = 1000133,
        _ostype = 6,
        _packageName = 'com.pwrd.opmwsea';
	var _third = $.thirdLogin({
		alertLanguage: alertLanguage,
        google: '.btn_login_google',
		apple: '.btn_login_apple',
        facebook: '.btn_login_fb',
        huawei:'.btn_login_huawei',
        //naver: '.log_btn_naver',
        ostype: _ostype,
		logout: '.btn_logout',
		appId: _appId,
		packageName: _packageName,
		facebookAppId: '753895892824985',
		webdomain: 'https://i.perfectworldgames.com',
        //naverClientId: 'DaJ0E1BG90E7KhlA0rPu',
		fireBaseConfig: {
			apiKey: "AIzaSyBpZQ2eFl-dlAgZA4dx64SKSzAZKpwQARM",
			appId: "1:801453477882:web:05d0d50049d0c275d99e43",
			authDomain: "global-publishing.firebaseapp.com",
			measurementId: "G-RXZ13F702W",
			messagingSenderId: "801453477882",
			projectId: "global-publishing",
			storageBucket: "global-publishing.appspot.com"
		},
		appleClientId: 'com.pwrd.opmwsea.web',
		redirectURI: 'https://opmw.perfectworld.com/appleCallback.html',
		//naverRedirectURI: 'https://static.perfectworldgames.com/thirdlogin221014/index.html',
		init:function(rdata){
			if(rdata.state){
				userId = rdata.websdk.uid;
				token = rdata.websdk.token;
				$('.userid').html(userId);
				$('.btn_login').hide();
				$('.user_info_box,.log_btn_box .btn_logout').show();
				doReserve();
			}else{
				userId = '';
				token = '';
				isBindPhone = false;
				isYY = false;
				$('.userid').html('');
				$('.user_info_box,.log_btn_box .btn_logout').hide();
				$('.btn_login').show();

				$(".select_button_wrap img").hide();
				$(".select_button1").show();
			}
		},
		success:function(rdata){
			$('#pop_login').hide();
		}
	});

	function doReserve(){
        $.ajax({
			url: publicPath + '/m/opmw/reserve/doReserve',
			xhrFields: {
				withCredentials: true
			},
			data: {
				userId: userId,
				token: token,
				entrance: entrance,
				extraInfo: extraInfo,
				system: system,
				language: language,
				area: area
			},
			type: 'post',
			success: function(rdata){
				if(rdata.success){
					if(!isMobile){
						var newReserve = rdata.result.reserveResult.newReserve;
						var bindPhone = rdata.result.reserveResult.bindPhone;
						$(".select_button_wrap img").hide();
						if(newReserve == true && bindPhone == true){
							$('#pop_yy_succ').fadeIn();
                        	$(".bind_phone_button").hide();
						}else if(newReserve == true && bindPhone == false){
							$('#pop_yy_succ').fadeIn();
                        	$(".bind_phone_button").show();
						}

						if(bindPhone == true){
							$(".select_button3").show();
						}else{
							$(".select_button2").show();
						}
					};
				}
			}
		});
    }
	//m
	$('.btn_login_click').click(function(){
		if(!isMobile){
			if(userId){
				
			}else{
				$('#pop_login').fadeIn();
			}
		}else if(isIOS) {
			window.location.href = $('.appStore').attr('href');
		}else if(isHuawei) {
			window.location.href = $('.huaweiStore').attr('href');
		}else{
			window.location.href = $('.googleStore').attr('href');
		}
	});
	$(".btn_bindphone").click(function(){
		if(!isMobile){
			if(userId){
				getCaptchaBind();
				$('#pop_yy_succ').fadeOut();
				$('#pop_bind_phone').fadeIn();
			}else{
				$('#pop_login').fadeIn();
			}
		}
	});
	//lcb
	$.ajax({
		type: 'get',
		url: publicPath + '/m/one/seAsia/booking/init',
		dataType: 'jsonp',
		success: function (rdata){
			if(rdata.success){
				var lcbNum = rdata.result.initInfo.bookingNum;
				progress(lcbNum);
			}else{
				alert(rdata.message);
			}
		}
	});
	$('#pop_yy_succ,#pop_yy_done').click(function(){
		$(this).hide();
	});
	$('.pop_yy_cont').click(function(){
		return false;
	});
//});