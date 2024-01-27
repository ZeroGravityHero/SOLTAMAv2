
var Util = (function () {
    return {
        host: "https://i.perfectworldgames.com",
        setCookie: function(cname, cvalue, exdays) {
            var _this = this;
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/";
        },
        IEVersion : function (){
            var _this = this;
            var userAgent = navigator.userAgent; //å–å¾—æµè§ˆå™¨çš„userAgentå­—ç¬¦ä¸²  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //åˆ¤æ–­æ˜¯å¦IE<11æµè§ˆå™¨  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //åˆ¤æ–­æ˜¯å¦IEçš„Edgeæµè§ˆå™¨  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IEç‰ˆæœ¬<=7
                }   
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//ä¸æ˜¯ieæµè§ˆå™¨
            }
        },
        bin2hex: function(s) {
            var i, l, o = '', n;
            s += '';
            for (i = 0, l = s.length; i < l; i++) {
              n = s.charCodeAt(i)
                .toString(16);
              o += n.length < 2 ? '0' + n : n;
            }
            return o;
        },
        getUUID: function(domain) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            var txt = domain;
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "websdk";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125,1,62,20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
        
            var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
            var bin = atob(b64);
            var crc = this.bin2hex(bin.slice(-16,-12));
            return crc;
        },
        getParams:function (url) {
            var theRequest = new Object();
            if (!url) {
                url = location.href;
            }
            if (url.indexOf("?") !== -1) {
                var str = url.substr(url.indexOf("?") + 1) + "&";
                var strs = str.split("&");
                for (var i = 0; i < strs.length - 1; i++) {
                    var key = strs[i].substring(0, strs[i].indexOf("="));
                    var val = strs[i].substring(strs[i].indexOf("=") + 1);
                    theRequest[key] = val;
                }
            }
            return theRequest;
        }
    }
})();
// var ieVersion = Util.IEVersion();
// if(ieVersion > 0 && ieVersion <= 9){
//     window.location = "/warring?appId=1001&gameId=0&loginType=user&location=https%3A%2F%2Fpassport.playcomb.com%2Ftest%2Fcallback%3Fvalid_wanmei_token_qazwsx%3D0p%3B%2F19ol.28ik%2C3%26s%3D1%26appId%3D1001%26urlType%3Dtwtest&t=1600250476611&encrypt=ed86eb07656f9443efdce5829edd8779&warringCode=IEVersion";
// }