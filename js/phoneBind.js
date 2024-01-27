var browserid = Util.getUUID(window.location.href);
//èŽ·å–å›¾å½¢éªŒè¯ç  
function getCaptchaBind(){
	var _key = new Date().getTime() + ":" + browserid
	var imgurl = Util.host + "/web/captcha.do?appId=" + _appId + "&key=" + _key +"&timestamp="+new Date().getTime();
	$("#getCaptchaCodeBind").attr("src",imgurl);
	$('#bind_captchaCode').attr('key', _key)
};
$("#getCaptchaCodeBind").click(function(){
	getCaptchaBind();
	$("#bind_captchaCode").val("");
});
//å‘é€çŸ­ä¿¡
var sendIngFlagBind = false;
$('#getBindCode').click(function () {
    if (!sendIngFlagBind){
        var $this = $(this);
		var dataPhone = $('.phone_bind').val(),
            countryCode = $('#bind_area').val(),
		    captchaCode = $('#bind_captchaCode').val();
		if(dataPhone == ''){
            showMsg(textPhoneNull);
            return false;
        }
		if(captchaCode == ""){
			showMsg(textImgCodeNull);
            return false;
		}
		sendIngFlagBind = true;
        var data = {
			appId:_appId,
			captchaCode : captchaCode,
			captchaKey: $('#bind_captchaCode').attr('key'),
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
                            sendIngFlagBind = false;
							//$("#bind_captchaCode").val("");
							//getCaptchaBind();
                        }
                    }, 1000);
	            }else{
	            	showMsg(data.message);
	            	sendIngFlagBind = false;
					$("#bind_captchaCode").val("");
					getCaptchaBind();
	            }
	        },
	        error:function(){
	            alert('Network Errorï¼');    
	        }
	    });
    }
}); 
//submit
$('#btn_sub_bind').click(function(){
	var dataPhone = $('.phone_bind').val(),
        countryCode = $('#bind_area').val(),
		captchaCode = $('#bind_captchaCode').val(),
		code_bind = $("#code_bind").val();
	if(dataPhone == ''){
		showMsg(textPhoneNull);
		return false;
	}
	if(captchaCode == ""){
		showMsg(textImgCodeNull);
		return false;
	}
	if(code_bind == ''){
		showMsg(textSendCodeNull);
		return false;
	}
	var data = {
		appId: _appId,
		captchaCode: captchaCode,
		captchaKey: $("#bind_captchaCode").attr('key'),
		countryCode: countryCode,
		ndid: browserid,
		packageName: _packageName,
		phoneNumber: dataPhone,
		smsCode: code_bind,			
		timestamp: new Date().getTime(),
		token:token,
		uid:userId,
		alertLanguage: alertLanguage,
	}
	$.ajax({
		type: "get",
		url: Util.host + "/web/user/phone/bind.do",
		data: data,
		dataType: "jsonp",
		success: function (data) {
			if (data.code == 0) {
				isBindPhone = true;
				$('#pop_bind_phone').hide();
				area = $('#bind_area option:selected').attr('area-cont');
				_third.initLoginPage();
				showMsg(msgData["99998"]);
			}else{
				showMsg(data.message);
			}
		},
		error: function () {
			alert('Network Errorï¼');
		}
	});
});
$('.phone_bind').on('input',function(event){
	this.value = this.value.replace(/\D/g,'');
});