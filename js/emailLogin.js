(function(){ 
	var browserid = Util.getUUID(window.location.href);
	$('.login_tab_email').click(function(){
		if(!$(this).hasClass('on')){
			getCaptchaEmail();
			$('.login_tab span').removeClass('on');
            $(this).addClass('on');
			$('#login_type_phone').hide();
			$('#login_type_email').show();
		}
	});

	//èŽ·å–å›¾å½¢éªŒè¯ç  
	function getCaptchaEmail(){
		var _key = new Date().getTime() + ":" + browserid
		var imgurl = Util.host + "/web/captcha.do?appId=" + _appId + "&key=" + _key + "&timestamp=" + new Date().getTime();
		$("#getCaptchaCodeEmail").attr("src",imgurl);
		$('#email_captchaCode').attr('key', _key);
	};
	$("#getCaptchaCodeEmail").click(function(){
		getCaptchaEmail();
		$("#email_captchaCode").val("");
	});
	
	//å‘é€é‚®ç®±éªŒè¯ç 
    var sendIngFlagEmail = false;
    $('#getEmailCode').click(function () {
        if (!sendIngFlagEmail){
        	
            var $this = $(this);
			var dataEmail = $('.email').val(),
				captchaCode = $('#email_captchaCode').val();
			var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	        if(dataEmail == ''){
                showMsg(textEmailNull);
                return false;
            }
            if (!re.test(dataEmail)) {
                showMsg(textEmailFalse);
                return false;
            };
			if(captchaCode == ""){
				showMsg(textImgCodeNull);
                return false;
			}
			sendIngFlagEmail = true;
            var data = {
            	appId:_appId,
				captchaCode : captchaCode,
				captchaKey: $('#email_captchaCode').attr('key'),
				email:dataEmail,
            	ndid:browserid,
            	osType:_ostype,
				packageName:_packageName,
				timestamp:new Date().getTime(),
				alertLanguage: alertLanguage
			};
			$.ajax({
		        type: "get",
		        url: Util.host+"/web/user/email/login/code/get.do",
		        data:data,
		        dataType:"jsonp",
		        success: function(data){
		            if(data.code == 0){
		            	var Total = 60;
                        var t = setInterval(function () {
                            if (Total > 0) {
                                Total--;
                                $this.html(Total + ' S');
                            } else {
                                $this.html(textBtnSend);
                                clearInterval(t);
                                sendIngFlagEmail = false;
                                //$("#email_captchaCode").val("");
								//getCaptchaEmail();
                            }
                        }, 1000);
		            }else{
		            	showMsg(data.message);
		            	sendIngFlagEmail = false;
						$("#email_captchaCode").val("");
						getCaptchaEmail();
		            }
		        },
		        error:function(){
		            alert('Network Errorï¼');    
		        }
		    });
        }
    });
	//submit
	$('#btn_sub_login_email').click(function(){
		var dataEmail = $('.email').val(),
			captchaCode = $('#email_captchaCode').val(),
			codeEmail = $("#code_email").val();
		var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
		if(dataEmail == ''){
			showMsg(textEmailNull);
			return false;
		}
		if (!re.test(dataEmail)) {
			showMsg(textEmailFalse);
			return false;
		};
		if(captchaCode == ""){
			showMsg(textImgCodeNull);
			return false;
		}
		if(codeEmail == ''){
			showMsg(textSendCodeNull);
			return false;
		}
		if(!$('#xieyi_email').hasClass('on')){
			showMsg(textXieyi);
			return false;
		}
		var data = {
			appId: _appId,
			email: dataEmail,
			emailCode: codeEmail,
			ndid: browserid,
			osType: _ostype,
			packageName: _packageName,
			timestamp: new Date().getTime(),
			alertLanguage: alertLanguage
		}
		$.ajax({
			type: "get",
			url: Util.host + "/web/user/email/login/code.do",
			data: data,
			dataType: "jsonp",
			success: function (data) {
				if (data.code == 0) {
					data.result['loginFrom'] = 'email';
					_third.setUserToken(data.result);
					$('#pop_login').hide();
				} else {
					showMsg(data.message);
				}
			},
			error: function () {
				alert('Network Errorï¼');
			}
		});
	});
	$('#xieyi_email').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	});
})();