(function ($) {
    function ThirdLogin(opts) {
        this.opts = $.extend(ThirdLogin.defaults, opts);
        this.bind();
    }

    ThirdLogin.defaults = {
        facebook: null,
        google: null,
        apple: null,
        naver: null,
        huawei: null,
        apj: null,
        ostype: null,
        crunchyroll: null,
        //email
        // email_password: null,//email password login btn
        // email_code: null,//email code login btn
        // dataEmail:null,
        // captchaCode: null,
        // emailCode: null,
        // password:null,
        //email end
        //phone
        // phoneLogin:null,
        // captchaCodePhone : null,
        // dataPhone : null,
        // smsCode : null,

        //phone end
        logout: null,
        appId: 1000027,
        packageName: null,
        facebookAppId: null,
        fireBaseConfig: null,
        appleClientId: null,
        //appleConfig:null,
        redirectURI: null,
        naverRedirectURI: null,
        naverClientId: null,
        webdomain: null,
        key: uuidv4(),
        ndid: Util.getUUID(document.location.href),
        timestamp: new Date().getTime(),
        provider: null,
        init: null,
        success: null,
        alertLanguage: 'en'
    };

    ThirdLogin.prototype = {
        bind: function () {
            var _this = this;
            //èŽ·å–ç™»å½•æ€
            this.initLoginPage();
            //this.thirdPublicKey(); 
            //facebookç™»å½•
            if (this.opts.facebook) {
                // åˆå§‹åŒ–facebook
                _this.initFaceBook(this.opts.facebookAppId);
                $(this.opts.facebook).on('click', function () {
                    _this.thirdFaceLogin();
                });
            }

            //googleç™»å½•
            if (this.opts.google) {
                this.initGoogle();
                $(this.opts.google).on('click', function () {
                    _this.thirdGoogleLogin();
                });
            }
            //è‹¹æžœç™»å½•
            if (this.opts.apple) {
                _this.initApple();
                // $(this.opts.apple).on('click', function () {
                //     this.initApple();
                // });
            }
            //naverç™»å½•
            if (this.opts.naver) {
                // this.initNaver();
                 _this.thirdNaverLogin();
                // $(this.opts.naver).on('click', function () {

                // });

            }
            //åŽä¸ºç™»å½•
            if (this.opts.huawei) {
                this.initAuawei();
                $(this.opts.huawei).on('click', function () {
                    var data = {
                        loginUrlSuccess: window.location.href
                        //loginUrlSuccess:'https://tst.wanmei.com/test.wanmei.com/yq/twitch231130/login-callback.html'
                    };

                    _this.thirdHuaweiLogin(data);
                });

            }
            //apj
            if (this.opts.apj) {
                this.initApj();
                $(this.opts.apj).on('click', function () {
                    // APJSDK.accountLogin('317217100@qq.com', 'abc123456');
                    APJSDK.openAPJLogin();
                });

            }
            //crunchyrollç™»å½•
            if (this.opts.crunchyroll) {
                this.initCrunchyroll();
                $(this.opts.crunchyroll).on('click', function () {
                    var data = {
                        loginUrlSuccess: window.location.href
                        //loginUrlSuccess:'https://tst.wanmei.com/test.wanmei.com/yq/twitch231130/login-callback.html'
                    };

                    _this.thirdCrunchyroll(data);
                });

            }
            //emailå¯†ç ç™»å½•
            // if (this.opts.email_password) {
            //     $(this.opts.email_password).on('click', function () {
            //         _this.thirdemailPasswordLogin();
            //     });
            // };
            // //emailéªŒè¯ç ç™»å½•
            // if (this.opts.email_code) {
            //     $(this.opts.email_code).on('click', function () {
            //         if($(this).hasClass('ok')){
            //             _this.thirdemialCodeNaverLogin();
            //         }
            //     });              
            // }
            //phoneç™»å½•
            // if (this.opts.phoneLogin) {
            //     var _str ='<option value="" name="countryCode">countryCode</option>'
            //     for (var item of countryCode) {
            //         _str += `<option value="${item.phone_code}" area-cont="${item.country_code}+${item.phone_code}" name="${item.english_name}">${item.country_code}+${item.phone_code}</option>`

            //         $(this.opts.countryCode).html(_str)
            //     }
            //     $(this.opts.countryCode).on('change',function (params) {
            //         $(this).find("option").each(function (params) {
            //             $(this).text($(this).attr('name') + " " + $(this).val())
            //         })
            //         $(this).find("option:selected").text($(this).val())
            //     })

            //     $(this.opts.phoneLogin).on('click', function () {
            //         if ($(this).hasClass('ok')) {
            //             _this.thirdphoneLogin();
            //         }
            //     });
            // }
            //ç™»å‡º
            if (this.opts.logout) {
                $(this.opts.logout).on('click', function () {
                    _this.clearUserToken();
                });
            }
        },
        //èŽ·å–urlå‚æ•°
        getParam: function (param) {
            var u = window.location.toString(),
                r = new RegExp("\\?(?:.+&)?" + param + "=(.*?)(?:&.*)?$");
            if (param == "usurl") {
                return u.substring(u.indexOf("usurl=") + 6);
            }
            var m = u.match(r);

            //////console.log(m);
            return m ? decodeURIComponent(m[1]) : "";
        },
        initLoginPage: function () {
            var loginData = new Object();
            var _websdk_ = $.cookie('_websdk_') ? JSON.parse($.cookie('_websdk_')) : null;
            var _avatar_ = localStorage.getItem('_avatar_') ? localStorage.getItem('_avatar_') : null;
            if (_websdk_ && _websdk_.username && _websdk_.uid && _websdk_.token) {
                loginData['websdk'] = _websdk_;
                loginData['avatar'] = _avatar_;
                loginData['state'] = true;
            } else {
                loginData['state'] = false;
            }
            this.opts.init(loginData);
        },
        initFaceBook: function (faceId) {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: faceId,
                    cookie: true,
                    xfbml: true,
                    version: 'v3.2'
                });
                FB.AppEvents.logPageView();
            };
            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        },
        thirdFaceLogin: function () {
            var _this = this;
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.getLoginStatus(function (res) {
                        // æ£€æŸ¥ç”¨æˆ·ç™»å½•çŠ¶æ€
                        _this.fbStatusChangeCallback(res);
                    });
                } else {
                    // alert('error');
                }
            });
        },
        fbStatusChangeCallback: function (response, errorCallBack) {
            switch (response.status) {
                case 'connected':
                    this.fbUserInfo(response.authResponse);
                    break;
                case 'authorization_expired':
                case 'not_authorized':
                case 'unknown':
                    alert(response.status);
                    break;
                default:
                    break;
            }
        },
        fbUserInfo: function (info) {
            var _this = this;
            FB.api('/me?fields=name,first_name,last_name,email,picture', function (response) {
                var data = {
                    thirdAvatar: response.picture.data.url,
                    thirdUsername: response.name,
                    thirdEmail: response.email,
                    thirdAuthToken: info.accessToken,
                    thirdId: info.userID, // response.id
                    thirdType: 1
                };
                _this.thirdSubmit(data);
            });
        },
        thirdSubmit: function (json) {
            var _this = this;
            var data = {
                appId: this.opts.appId,
                packageName: this.opts.packageName,
                ndid: this.opts.ndid,
                timestamp: this.opts.timestamp,

            };
            var params = $.extend(data, json);
            $.ajax({
                url: Util.host + '/web/user/login/third.do',
                type: 'get',
                data: params,
                jsonp: 'callback',

                dataType: 'jsonp',
                success: function (rdata) {
                    if (rdata.code === 0) {
                        //alert('ç™»å…¥æˆåŠŸ');
                        // ç¼“å­˜
                        _this.setUserToken(rdata.result);
                        //window.location.href = window.location.href.split('?')[0]
                        history.replaceState({}, '', window.location.href.split('?')[0])
                    } else {
                        alert(rdata.message);
                    }
                },
                error: function () {
                    alert('error!');
                }
            });
        },
        setUserToken: function (data) {
            var user = {
                username: data.username,
                uid: data.uid,
                token: data.token,
                thirdUsers: data.thirdUsers
            };
            localStorage.setItem('_avatar_', data.avatar ? data.avatar : null);
            $.cookie('_websdk_', JSON.stringify(user), {
                expires: 7,
                path: '/'
            });
            setTimeout(() => {
                // window.location.href = data.callbackUrl  +"?"+ $.param(data.callbackData);
            }, 0);
            this.initLoginPage();
            this.opts.success(data);
        },
        initGoogle: function () {
            var _this = this;
            $.getScript('https://www.gstatic.com/firebasejs/6.2.0/firebase.js', function (data, status, jqxhr) {
                firebase.initializeApp(_this.opts.fireBaseConfig);
                _this.opts.provider = new firebase.auth.GoogleAuthProvider();
            });
        },
        initApple: function () {
            var _this = this;
            // apple init
            AppleID.auth.init({
                clientId: this.opts.appleClientId,
                scope: 'name email',
                redirectURI: this.opts.redirectURI,
                state: 'state',
                // nonce : '[NONCE]',
                usePopup: true
            });
            // Listen for authorization success.
            document.addEventListener('AppleIDSignInOnSuccess', function (event) {
                var thirdInfo = event.detail.authorization,
                    thirdParams = {};
                var id_token = thirdInfo.id_token;
                var decoded = jwt_decode(id_token);
                thirdParams.thirdType = 11;
                thirdParams.thirdAuthToken = thirdInfo.code;
                thirdParams.appleIdentityToken = id_token;
                thirdParams.thirdId = decoded.sub;
                thirdParams.thirdAvatar = '';
                thirdParams.thirdUsername = '';
                thirdParams.thirdEmail = decoded.email;
                // Handle successful response.
                _this.thirdSubmit(thirdParams);
            });

            // Listen for authorization failures.
            document.addEventListener('AppleIDSignInOnFailure', function (event) {
                // Handle error.
                console.log(event.detail.error);
            });
        },
        thirdGoogleLogin: function () {
            var _this = this;
            firebase
                .auth()
                .signInWithPopup(this.opts.provider)
                .then(function (result) {
                    console.log(result);
                    var data = {
                        thirdUsername: result.additionalUserInfo.profile.name,
                        thirdAuthToken: result.credential.idToken,
                        thirdId: result.additionalUserInfo.profile.id,
                        //googleId: result.credential.accessToken,
                        thirdAvatar: result.user.photoURL,
                        thirdType: 2
                    };
                    _this.thirdSubmit(data);
                })
                .catch(function (error) {
                    console.log(error);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    //alert('error!');
                });
        },
        // initNaver: function () {
        //     var naverLogin = new naver_id_login(this.opts.appleClientId, this.opts.naverRedirectURI);
        //     naverLogin.get_naver_userprofile('naverSignInCallback()');
        //     function naverSignInCallback() {
        //         var accessToken = naverLogin.oauthParams.access_token;
        //         var email = naverLogin.getProfileData('email');
        //         var nickname = naverLogin.getProfileData('nickname');
        //         // var age = naverLogin.getProfileData("age");
        //         var id = naverLogin.getProfileData('id');
        //         var params = {},
        //             thirdParams = {};
        //         // params.appId = this.opts.appId;
        //         // params.packageName = this.opts.packageName;
        //         // params.ndid = Util.getUUID(appId + packageName);
        //         // params.timestamp = Math.floor(new Date().getTime() / 1000);
        //         //params.xClientData = xClientData;

        //         thirdParams.thirdType = '10';
        //         thirdParams.thirdAuthToken = accessToken;
        //         thirdParams.thirdId = id;
        //         thirdParams.thirdAvatar = '';
        //         thirdParams.thirdUsername = nickname;
        //         thirdParams.thirdEmail = email;
        //         _this.thirdSubmit(thirdParams);
        //     }
        // },
        thirdNaverLogin: function () {
            var _this = this;
            var naverLogin = new naver.LoginWithNaverId({
                clientId: this.opts.naverClientId,
                callbackUrl: this.opts.naverRedirectURI,
                isPopup: false,
                loginButton: {
                    color: 'green',
                    type: 3,
                    height: 40
                },
                callbackHandle: true
            });
            // åˆå§‹åŒ–å®žä¾‹
            naverLogin.init();
            // èŽ·å–ç”¨æˆ·ç™»å½•çŠ¶æ€
            naverLogin.getLoginStatus(function (status) {
                if (status) {
                    var thirdParams = {};
                    var email = naverLogin.user.getEmail();
                    var nickname = naverLogin.user.getNickName();
                    var id = naverLogin.user.getId();
                    // å‘é€ç”¨æˆ·ä¿¡æ¯ç»™UNIAPP
                    var accessToken = naverLogin.accessToken.accessToken;
                    console.log(email, nickname, id, accessToken);

                    thirdParams.thirdType = "10";
                    thirdParams.thirdAuthToken = accessToken;
                    thirdParams.thirdId = id;
                    thirdParams.thirdAvatar = "";
                    thirdParams.thirdUsername = nickname;
                    thirdParams.thirdEmail = email;
                    _this.thirdSubmit(thirdParams);
                } else {
                    console.log('naverç™»å½•å¤±è´¥');
                }
            });
        },
        initAuawei: function (params) {
            var _this = this
            // window.onload = function() {

            //     window.addEventListener('message', function (e) {
            //         alert(e.origin);
            //         console.log(e) 
            //         // if (e.origin !== "http://www.42du.cn") {
            //         //     return;
            //         // }

            //     });
            // }
            if (this.getParam('thirdType') == '17') {
                var data = {
                    thirdUsername: this.getParam('thirdName'),
                    thirdAuthToken: this.getParam('thirdAuthToken'),
                    thirdId: this.getParam('thirdId'),
                    thirdAvatar: this.getParam('thirdAvatar'),
                    osType: this.opts.ostype,
                    thirdType: 17
                };
                _this.thirdSubmit(data);


            }

        },

        thirdHuaweiLogin: function (json) {
            var _this = this;
            var data = {
                appId: this.opts.appId,
                packageName: this.opts.packageName,
                loginUrlFail: 'https://static.perfectworldgames.com/webLogin/webLoginFail.html',
                osType: this.opts.ostype,
                thirdType: 17
            };
            var params = $.extend(data, json);
            $.ajax({
                url: 'https://i.perfectworldgames.com/web/user/huawei/login/url.do',
                type: 'get',
                data: params,
                jsonp: 'callback',

                dataType: 'jsonp',
                success: function (rdata) {
                    if (rdata.code === 0) {
                        // window.open(rdata.result.loginUrl)
                        //  var popup = window.open(rdata.result.loginUrl,'','width=800,height=800')
                        //     popup.addEventListener("message", e => {
                        //         console.log(e,'back')
                        //         _this.thirdSubmit(Util.strToData(e.data))
                        //     }, false);
                        window.location.href = rdata.result.loginUrl
                    } else {
                        alert(rdata.message);
                    }
                },
                error: function () {
                    alert('error!');
                }
            });
        },
        initCrunchyroll: function (params) {
            var _this = this
            // window.onload = function() {

            //     window.addEventListener('message', function (e) {
            //         alert(e.origin);
            //         console.log(e) 
            //         // if (e.origin !== "http://www.42du.cn") {
            //         //     return;
            //         // }

            //     });
            // }
            if (this.getParam('thirdType') == '25') {
                var data = {
                    thirdUsername: this.getParam('thirdName'),
                    thirdAuthToken: this.getParam('thirdAuthToken'),
                    thirdId: this.getParam('thirdId'),
                    thirdAvatar: this.getParam('thirdAvatar'),
                    osType: this.opts.ostype,
                    thirdType: 25
                };
                _this.thirdSubmit(data);


            }

        },

        thirdCrunchyroll: function (json) {
            var _this = this;
            var data = {
                appId: this.opts.appId,
                packageName: this.opts.packageName,
                loginUrlFail: 'https://static.perfectworldgames.com/webLogin/webLoginFail.html',
                osType: this.opts.ostype,
                thirdType: 25
            };
            var params = $.extend(data, json);
            $.ajax({
                url: 'https://i.perfectworldgames.com/web/user/crunchyroll/login/url.do',
                type: 'get',
                data: params,
                jsonp: 'callback',

                dataType: 'jsonp',
                success: function (rdata) {
                    if (rdata.code === 0) {
                        // window.open(rdata.result.loginUrl)
                        //  var popup = window.open(rdata.result.loginUrl,'','width=800,height=800')
                        //     popup.addEventListener("message", e => {
                        //         console.log(e,'back')
                        //         _this.thirdSubmit(Util.strToData(e.data))
                        //     }, false);
                        window.location.href = rdata.result.loginUrl
                    } else {
                        alert(rdata.message);
                    }
                },
                error: function () {
                    alert('error!');
                }
            });
        },
        initApj: function (params) {
            var _this = this
            APJSDK.init({
                language: 'en', //de fr es pt ar
                appId: '150808163195559936',
                appChannelId: "18",
                privacyUrl: 'https://eu.onepunchmanworld.com/privacy',
                onRegisterSuccess: (data) => { //å¯é€‰
                    console.log('æ³¨å†ŒæˆåŠŸï¼š' + JSON.stringify(data));
                },
                onLoginSuccess: (data, type) => {
                    console.log('ç™»å½•æˆåŠŸ', type + JSON.stringify(data));
                    var _data = {
                        thirdUsername: data.userEmail,
                        thirdAuthToken: data.accessToken,
                        thirdId: data.userId,
                        thirdAvatar: '',
                        osType: this.opts.ostype,
                        thirdType: 24
                    };
                    console.log(_data)
                    _this.thirdSubmit(_data);
                },
                onLoginFail: (code, msg, type) => { //å¯é€‰

                }
            });

        },
        // thirdPublicKey:function(){
        //     var _this = this;
        //     var data = {
        //         alertLanguage: this.opts.alertLanguage,
        //         appId:this.opts.appId,
        //     };
        //     $.ajax({
        //         type: "get",
        //         url: Util.host+"/web/config.do",
        //         data:data,
        //         dataType:"jsonp",
        //         success: function(data){
        //             //console.log(data)
        //             if(data.code == 0){
        //                 _this.opts.publicKey = data.result.publicKey
        //             };
        //         },
        //         error:function(){
        //             alert('Network Errorï¼');    
        //         }
        //     });
        // },
        // thirdemailPasswordLogin: function (info){//é‚®ç®±å¯†ç ç™»å½•æ–¹å¼
        //     var _this = this;
        //     var captchaCode = this.opts.captchaCode.val();
        //     var dataEmail = this.opts.dataEmail.val();
        //     var password = this.opts.password.val();
        //     var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        //     if (!re.test(dataEmail)) {
        //         alert("Please enter your Email!");
        //         return false;
        //     };
        //     if(password == ""){
        //         alert("Create passwordï¼");
        //         return false;
        //     };
        //     if(captchaCode == ""){
        //         alert("Enter a verification codeï¼");
        //         return false;
        //     };
        //     var jsEncrypt = new JSEncrypt();
        //     var publicKey = this.opts.publicKey;
        //     var publicKeyJs = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
        //     jsEncrypt.setPublicKey(publicKeyJs);
        //     var passWordEncrypted = jsEncrypt.encrypt(password);
        //     var data = {
        //         // msgLanguage:"en",
        //         alertLanguage: this.opts.alertLanguage,
        //         appId:this.opts.appId,
        //         ndid:this.opts.ndid,
        //         osType:this.opts.ostype,
        //         packageName:this.opts.packageName,
        //         timestamp:this.opts.timestamp,
        //         captchaCode : captchaCode,
        //         email:dataEmail,
        //         password: passWordEncrypted,
        //         captchaKey: this.opts.captchaCode.attr('key')
        //     };
        //     _this.thirdSubmit_password(data);
        // },
        // thirdSubmit_password: function (data) {//é‚®ç®±å¯†ç ç™»å½•æäº¤
        //     var _this = this;
        //     $.ajax({
        //         type: "get",
        //         url: Util.host+"/web/user/email/login/password.do",
        //         data:data,
        //         dataType:"jsonp",
        //         success: function(data){
        //             //console.log(data)
        //             if(data.code == 0){
        //                 _this.setUserToken(data.result);

        //             }else{
        //                 alert(data.message);
        //             }
        //         },
        //         error:function(){
        //             alert('Network Errorï¼');    
        //         }
        //     });
        // },
        // thirdemialCodeNaverLogin: function (info) {//é‚®ç®±éªŒè¯ç ç™»å½•æ–¹å¼
        //     var _this = this;
        //     var dataEmail = this.opts.dataEmail.val();
        //     var captchaCode = this.opts.captchaCode.val();
        //     var emailCode = this.opts.emailCode.val();

        //     var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        //     if (!re.test(dataEmail)) {
        //         alert("Please enter your Email!");
        //         return;
        //     };
        //     if(captchaCode == ""){
        //         alert("Enter a verification codeï¼");
        //         return false;
        //     };
        //     if(emailCode == ""){
        //         alert("Please enter the dynamic verification codeï¼");
        //         return false;
        //     };
        //     var data = {
        //         // msgLanguage:"en",
        //         alertLanguage: this.opts.alertLanguage,
        //         appId:this.opts.appId,
        //         ndid:this.opts.ndid,
        //         osType:this.opts.ostype,
        //         packageName:this.opts.packageName,
        //         timestamp:this.opts.timestamp,
        //         email:dataEmail,
        //         emailCode:emailCode
        //     };
        //     _this.thirdSubmit_code(data);
        // },
        // thirdSubmit_code: function (data) {//é‚®ç®±éªŒè¯ç ç™»å½•æäº¤
        //     //console.log(data);
        //     var _this = this;
        //     $.ajax({
        //         type: "get",
        //         url: Util.host+"/web/user/email/login/code.do",
        //         data:data,
        //         dataType:"jsonp",
        //         success: function(data){
        //             //console.log(data);ç¿»è¯‘åœ¨çº¿
        //             if(data.code == 0){
        //                 data.result['loginFrom'] = 'email';
        //                 _third.setUserToken(data.result); 
        //             }else{
        //                 alert(data.message);   
        //             }
        //         },
        //         error:function(){
        //             alert('Network Errorï¼');    
        //         }
        //     });
        // },
        // thirdphoneLogin: function (info) {//é‚®ç®±éªŒè¯ç ç™»å½•æ–¹å¼
        //     var _this = this;
        //     var captchaCode = this.opts.captchaCodePhone.val();
        //     var dataPhone = this.opts.dataPhone.val();
        //     var smsCode = this.opts.smsCode.val();
        //     var countryCode = this.opts.countryCode.val();
        //     var re = /^1[3456789]\d{9}$/; 
        //     if (countryCode == "" || !countryCode || countryCode==0) {
        //         alert("Please select countryCode!");
        //         return false;
        //     };
        //     if (!re.test(dataPhone) || dataPhone == '') {
        //         alert("Please enter your phone!");
        //         return false;
        //     };

        //     if (captchaCode == "") {
        //         alert("Enter a verification codeï¼");
        //         return false;
        //     };
        //     if (smsCode == "" || !smsCode) {
        //         alert("Create smsCodeï¼");
        //         return false;
        //     };
        //     var data = {
        //         // msgLanguage:"en",
        //         alertLanguage: this.opts.alertLanguage,
        //         smsCode: smsCode, 
        //         countryCode: countryCode,
        //         appId: this.opts.appId,
        //         ndid: this.opts.ndid,
        //         osType: this.opts.ostype,
        //         packageName: this.opts.packageName,
        //         timestamp: this.opts.timestamp,
        //         captcha: captchaCode,
        //         phoneNumber: dataPhone,
        //         key: this.opts.captchaCodePhone.attr('key')
        //     };
        //     _this.thirdSubmit_phone(data);
        // },
        // thirdSubmit_phone: function (data) {//é‚®ç®±éªŒè¯ç ç™»å½•æäº¤
        //     //console.log(data);
        //     var _this = this;
        //     $.ajax({
        //         type: "get",
        //         url: Util.host + "/web/user/login/phone.do",
        //         data: data,
        //         dataType: "jsonp",
        //         success: function (data) {
        //             //console.log(data);
        //             if (data.code == 0) {
        //                 data.result['loginFrom'] = 'phone';
        //                 _this.setUserToken(data.result);

        //             } else {
        //                 alert(data.message);
        //             }
        //         },
        //         error: function () {
        //             alert('Network Errorï¼');
        //         }
        //     });
        // },
        clearUserToken: function () {

            $.removeCookie('_websdk_', { path: '/' });
            localStorage.removeItem('_avatar_');
            localStorage.removeItem('com.naver.nid.oauth.state_token');
            localStorage.removeItem('com.naver.nid.access_token');


            this.initLoginPage();
        }
    };

    $.extend({
        thirdLogin: function (opts) {
            return new ThirdLogin(opts);
        }
    });
})(jQuery);