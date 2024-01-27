(function(){
	var phonepassworld =  Util.getParams().phonepassworld
	if (phonepassworld){ 
		$('#code_phone').parents('.form_line').hide()
		$('#btn_sub_login_phone').hide()
		$('#password').parents('.form_line').show()
		$('#btn_sub_password_phone').show()
	}else{ 
		$('#code_phone').parents('.form_line').show()
		$('#btn_sub_login_phone').show()
		$('#password').parents('.form_line').hide()
		$('#btn_sub_password_phone').hide()
	}
	countryCode();
	getCaptchaPhone();
	function countryCode(){
		var data = {
			appId:_appId,
			timestamp:new Date().getTime()
		}
		$.ajax({
			type: "get",
			url: Util.host +"/web/phone/countryCode/list.do",
			data:data,
			dataType:"jsonp",
			success: function(rdata){
				if(rdata.code == 0){
					var listHtml = '';
					if(rdata.result.codes.length > 0){
						$(rdata.result.codes).each(function(i,ele){
							listHtml += '<option value="'+ele.countryCode+'" name="'+ele.countryCode+'" area-cont="'+ele.areaName+'-'+ele.countryCode+'">'+ele.areaName+'-'+ele.countryCode+'</option>';
						});
					}
					$('#login_area').html(listHtml);
					$('#bind_area').html(listHtml);
				}else{
					showMsg(rdata.message);
				}
			},
			error:function(){
				alert('Network Errorï¼');    
			}
		});
	}
	$('.login_tab_phone').click(function(){
		if(!$(this).hasClass('on')){
			getCaptchaPhone();
			$('.login_tab span').removeClass('on');
            $(this).addClass('on');
			$('#login_type_email').hide();
			$('#login_type_phone').show();
		}
	});

	var browserid = Util.getUUID(window.location.href);
	//èŽ·å–å›¾å½¢éªŒè¯ç  
	function getCaptchaPhone(){
		var _key = new Date().getTime() + ":" + browserid
		var imgurl = Util.host + "/web/captcha.do?appId=" + _appId + "&key=" + _key +"&timestamp="+new Date().getTime();
		$("#getCaptchaCodePhone").attr("src",imgurl);
		$('#phone_captchaCode').attr('key', _key)
	};
	$("#getCaptchaCodePhone").click(function(){
		getCaptchaPhone();
		$("#phone_captchaCode").val("");
	});
	//å‘é€çŸ­ä¿¡
    var sendIngFlagPhone = false;
	$('#getPhoneCode').click(function () {
        if (!sendIngFlagPhone){
            var $this = $(this);
			var dataPhone = $('.phone').val(),
                countryCode = $('#login_area').val(),
			    captchaCode = $('#phone_captchaCode').val();
			if(dataPhone == ''){
                showMsg(textPhoneNull);
                return false;
            }
			if(captchaCode == ""){
				showMsg(textImgCodeNull);
                return false;
			}
			sendIngFlagPhone = true;
            var data = {
				appId:_appId,
				captchaCode : captchaCode,
				captchaKey: $('#phone_captchaCode').attr('key'),
				countryCode: countryCode,
				language:alertLanguage,
            	ndid:browserid,
				packageName:_packageName,
				phoneNumber:dataPhone,
				timestamp:new Date().getTime(),
				alertLanguage: alertLanguage,
			};
			$.ajax({
		        type: "get",
				url: Util.host +"/web/phone/sms/code.do",
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
                                sendIngFlagPhone = false;
								//$("#phone_captchaCode").val("");
								//getCaptchaPhone();
                            }
                        }, 1000);
		            }else{
		            	showMsg(data.message);
		            	sendIngFlagPhone = false;
						$("#phone_captchaCode").val("");
						getCaptchaPhone();
		            }
		        },
		        error:function(){
		            alert('Network Errorï¼');    
		        }
		    });
        }
    }); 
	//submit
	$('#btn_sub_login_phone').click(function(){
		var dataPhone = $('.phone').val(),
            countryCode = $('#login_area').val(),
			captchaCode = $('#phone_captchaCode').val(),
			codePhone = $("#code_phone").val();
		if(dataPhone == ''){
			showMsg(textPhoneNull);
			return false;
		}
		if(captchaCode == ""){
			showMsg(textImgCodeNull);
			return false;
		}
		if(codePhone == ''){
			showMsg(textSendCodeNull);
			return false;
		}
		if(!$('#xieyi_phone').hasClass('on')){
			showMsg(textXieyi);
			return false;
		}
		var data = {
			appId: _appId,
			captcha: captchaCode,
			countryCode: countryCode,
			key: $("#phone_captchaCode").attr('key'),
			ndid: browserid,
			packageName: _packageName,
			phoneNumber: dataPhone,
			smsCode: codePhone,			
			timestamp: new Date().getTime(),
			alertLanguage: alertLanguage,
		}
		$.ajax({
			type: "get",
			url: Util.host + "/web/user/login/phone.do",
			data: data,
			dataType: "jsonp",
			success: function (data) {
				if (data.code == 0) {
					data.result['loginFrom'] = 'phone';
					_third.setUserToken(data.result);
					$('#pop_login').hide();
					area = $('#login_area option:selected').attr('area-cont');
				} else {
					showMsg(data.message);
				}
			},
			error: function () {
				alert('Network Errorï¼');
			}
		});
	});
    //passworldsubmit
    var publicKey = ''
    function thirdPublicKey() {
        var _this = this;
        var data = {
            alertLanguage: 'zh',
            appId: _appId,
        };
        $.ajax({
            type: "get",
            url: Util.host + "/web/config.do",
            data: data,
            dataType: "jsonp",
            success: function (data) {
                //console.log(data)
                if (data.code == 0) {
                    publicKey = data.result.publicKey
                };
            },
            error: function () {
                alert('Network Errorï¼');
            }
        });
    }
    thirdPublicKey()
    $('#btn_sub_password_phone').click(function () {
        var password = $("#password").val()
        var jsEncrypt = new JSEncrypt();
        var publicKeyJs = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
        jsEncrypt.setPublicKey(publicKeyJs);
        var passWordEncrypted = jsEncrypt.encrypt(password);
        var dataPhone = $('.phone').val(),
            countryCode = $('#login_area').val(),
            captchaCode = $('#phone_captchaCode').val();
          // codePhone = $("#code_phone").val();
        if (dataPhone == '') {
            showMsg(textPhoneNull);
            return false;
        }
        if (password == "") {
            showMsg(textPhonePassworldNull);
            return false;
        }
		if (captchaCode == "") {
			showMsg(textImgCodeNull);
			return false;
		}
        if (!$('#xieyi_phone').hasClass('on')) {
            showMsg(textXieyi);
            return false;
        }
        var data = {
            appId: _appId,
            captcha: captchaCode,
            countryCode: countryCode,
            key: $("#phone_captchaCode").attr('key'),
            ndid: browserid,
            packageName: _packageName,
            phoneNumber: dataPhone,
            // smsCode: codePhone,
            password: passWordEncrypted,
            timestamp: new Date().getTime(),
            alertLanguage: alertLanguage,
        }
        $.ajax({
            type: "get",
            url: Util.host + "/web/user/login/phone/password.do",
            data: data,
            dataType: "jsonp",
            success: function (data) {
                if (data.code == 0) {
                    data.result['loginFrom'] = 'phone';
                    _third.setUserToken(data.result);
                    $('#pop_login').hide();
                    area = $('#login_area option:selected').attr('area-cont');
                } else {
                    showMsg(data.message);
                }
            },
            error: function () {
                alert('Network Errorï¼');
            }
        });
    });
	$('.phone').on('input',function(event){
		this.value = this.value.replace(/\D/g,'');
	});
	$('#xieyi_phone').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	});
})();