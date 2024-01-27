(function () {
    !function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){
    (t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},
    t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,
    o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),
    p.parentNode.insertBefore(o,p);
    
    }(window,document,"script",0,"AF","pba",{pba: {webAppId: "4694d1bf-d5ab-4e7e-81ac-6bf8c1955c8e"} })

    var loadJS = function (url, callback) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        s.onload = s.onreadystatechange = function () {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                s.onload = s.onreadystatechange = null;
                if (callback) callback();
                s.parentNode.removeChild(s);
            }
        };
        var doc = document.getElementsByTagName('head')[0];
        doc.appendChild(s);
    };
    var googleId = "G-NCHPHLTYJC";
    var googleSrc = 'https://www.googletagmanager.com/gtag/js?id='+googleId;
    setTimeout(function () {
        loadJS(googleSrc, function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', googleId);

            $(".publicGoogleAnalytics").click(function(){
                var type = $(this).attr("type").split("_");
                var data = {};
                data[type[1]] = type[2];
                gtag('event',type[0],data);
                AF('pba', 'event', {eventType: 'EVENT', eventValue: data, eventName: type[0]});
            });
        })
    }, 10);
})();