//login_parameter
var textBtnSend = 'Verification Code',
    textPhoneNull = 'Phone number cannot be empty',
    textEmailNull = 'Email cannot be empty',
    textEmailFalse = 'Incorrect email format',
    textImgCodeNull = 'Graphic verification code cannot be empty',
    textSendCodeNull = 'Verification code cannot be empty',
    textXieyi = 'Please agree with the Agreement first';
    textPhonePassworldNull ='passworld number cannot be empty';
var alertLanguage = 'EN';//EN,ID,TH
var loginBoxHtml = '<div class="pop_fixed" id="pop_login">\
    <div class="pop_login_cont">\
        <span class="icon_close"></span>\
        <div class="login_tab_box">\
            <div class="login_tab">\
                <span class="login_tab_phone publicGoogleAnalytics on" type="PhoneRegister_default_click">Phone</span>\
                <span class="login_tab_email publicGoogleAnalytics" type="emailRegister_default_click">E-mail</span>\
            </div>\
        </div>\
        <div class="login_type_cont" id="login_type_phone">\
            <div class="form_line">\
                <div class="phone_line_bg">\
                    <select class="area_code_select" id="login_area"></select>\
                    <input class="phone" type="text" maxlength="13" />\
                </div>\
            </div>\
             <div class="form_line" style="display:none">\
                <input class="inp_code" id="password" type="password" placeholder="password" style="color:#fff"/ >\
            </div>\
            <div class="form_line">\
                <input class="inp_code" id="phone_captchaCode" type="text" />\
                <div class="img_code_box">\
                    <img id="getCaptchaCodePhone" src="" />\
                </div>\
            </div>\
            <div class="form_line">\
                <input class="inp_code" id="code_phone" type="text" />\
                <span class="btn_send" id="getPhoneCode">Verification Code</span>\
            </div>\
            <div class="xieyi_box">\
                <span class="icon_check" id="xieyi_phone"></span><span>Agreed to the "<a href="https://static.perfectworldgames.com/mapi/contract/contract.html" target="_blank">User Agreement</a>" and "<a href="https://static.perfectworldgames.com/mapi/privacy/privacy.html" target="_blank">Privacy Policy</a>"</span>\
            </div>\
            <span class="btn_sub_login publicGoogleAnalytics" type="registerButton_default_click" id="btn_sub_login_phone"><span>REGISTER</span><span class="icon_jiantou"></span></span>\
            <span class="btn_sub_login publicGoogleAnalytics" type="registerButton_default_click" style="display:none" id="btn_sub_password_phone"><span>REGISTER</span><span class="icon_jiantou"></span></span>\
        </div>\
        <div class="login_type_cont" id="login_type_email">\
            <div class="form_line">\
                <input class="email" type="text" />\
            </div>\
            <div class="form_line">\
                <input class="inp_code" id="email_captchaCode" type="text" />\
                <div class="img_code_box">\
                    <img id="getCaptchaCodeEmail" src="" />\
                </div>\
            </div>\
            <div class="form_line">\
                <input class="inp_code" id="code_email" type="text" />\
                <span class="btn_send" id="getEmailCode">Verification Code</span>\
            </div>\
            <div class="xieyi_box">\
                <span class="icon_check" id="xieyi_email"></span><span>Agreed to the "<a href="https://static.perfectworldgames.com/mapi/contract/contract.html" target="_blank">User Agreement</a>" and "<a href="https://static.perfectworldgames.com/mapi/privacy/privacy.html" target="_blank">Privacy Policy</a>"</span>\
            </div>\
            <span class="btn_sub_login publicGoogleAnalytics" type="registerButton_default_click" id="btn_sub_login_email"><span>REGISTER</span><span class="icon_jiantou"></span></span>\
        </div>\
        <div class="other_log_box">\
            <span class="btn_login_google publicGoogleAnalytics" type="Googleregister_default_click"></span>\
            <span class="btn_login_apple" id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></span>\
            <span class="btn_login_fb publicGoogleAnalytics" type="fbRegister_default_click"></span>\
            <span class="btn_login_huawei publicGoogleAnalytics" type="huaweiRegister_default_click"></span>\
        </div>\
    </div>\
    </div>\
    <div class="pop_fixed" id="pop_msg">\
    <div class="pop_msg_cont">\
        <span class="icon_close"></span>\
        <div class="msg_line_bg">\
            <div id="msg"></div>\
        </div>\
    </div>\
</div>';
$('body').append(loginBoxHtml);

function showMsg(msg){
    $('#msg').html(msg);
    $('#pop_msg').fadeIn();
}
$('.btn_login').click(function(){
    $('#pop_login').fadeIn();
});
$('.icon_close').click(function(){
    $(this).parent().parent('.pop_fixed').hide();
});