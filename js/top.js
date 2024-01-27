var topStrlist = "";
var topLanguage = $("#toplanguage").attr("lau");
var homelink = "";
var medialink = "";
var eventlink = "";
var selctLanguage = "";
if(topLanguage == "en"){
	selctLanguage = "top_en"
	homelink = "index.html"
	medialink = "";
	eventlink = "l";
}else if(topLanguage == "th"){
	selctLanguage = "top_th"
	homelink = "https://opmw.perfectworld.com/th/index.html"
	medialink = "https://opmw.perfectworld.com/th/article/news/index.html";
	eventlink = "https://opmw.perfectworld.com/net/240115invite/th/index.html";
}

topStrlist+='<div class="topCont '+selctLanguage+'">';
topStrlist+='    <a href="'+homelink+'"><img src="./images/home/soltamatablogo.png" alt="SOLTAMA Logo" class="topLogo" /></a>';
topStrlist+='    <div class="topNav">';

topStrlist+='        <div class="topline"><span></span></div>';
topStrlist+='        <div class="topDiv"><a class="link home" href="'+homelink+'"><span></span></a></div>';
topStrlist+='        <div class="topline"><span></span></div>';

topStrlist+='        <div class="topDiv"><a class="link about" href="'+homelink+'#aboutSection"></a></div>';
topStrlist+='        <div class="topline"><span></span></div>';

topStrlist+='        <div class="topDiv"><a class="link roadmap" href="'+homelink+'#roadmapSection"><span></span></a></div>';
topStrlist+='        <div class="topline"><span></span></div>';

topStrlist+='        <div class="topDiv"><a class="link howToBuy" href="'+homelink+'#howtobuySection"><span></span></a></div>';
topStrlist+='        <div class="topline"><span></span></div>';

topStrlist+='    </div>';

// topStrlist+='    <div class="log_box">';
// topStrlist+='        <span class="btn_login publicGoogleAnalytics" type="loginButton_default_click"></span>';
// topStrlist+='        <div class="user_info_box">';
// topStrlist+='            <span class="btn_logout"></span>';
// topStrlist+='            <p>UID:<span class="userid">-</span></p>';
// topStrlist+='        </div>';
// topStrlist+='    </div>';
// topStrlist+='</div>';
if($("#topIntContent").length > 0){
    $("#topIntContent").append(topStrlist);
}else{
    $('body').append(topStrlist);
};

// 2nd

// document.addEventListener('DOMContentLoaded', function() {
// 	// Your JavaScript code here
// 	// This ensures that your code will run after the DOM has fully loaded
// 	var topStrlist = "";
// 	var topLanguage = $("#toplanguage").attr("lau");
// 	var homelink = "";
// 	var medialink = "";
// 	var eventlink = "";
// 	var selctLanguage = "";
  
// 	if (topLanguage == "en") {
// 	  selctLanguage = "top_en"
// 	  homelink = "index.html"
// 	  medialink = "https://opmw.perfectworld.com/en/article/news/index.html";
// 	  eventlink = "https://opmw.perfectworld.com/net/240115invite/en/index.html";
// 	} else if (topLanguage == "th") {
// 	  selctLanguage = "top_th"
// 	  homelink = "https://opmw.perfectworld.com/th/index.html"
// 	  medialink = "https://opmw.perfectworld.com/th/article/news/index.html";
// 	  eventlink = "https://opmw.perfectworld.com/net/240115invite/th/index.html";
// 	}
  
// 	topStrlist += '<div class="topCont ' + selctLanguage + '">';
// 	topStrlist += '    <a href="' + homelink + '"><img src="./images/home/soltamatablogo.png" alt="SOLTAMA Logo" class="topLogo" /></a>';
// 	topStrlist += '    <div class="topNav">';
  
// 	topStrlist += '        <div class="topline"><span></span></div>';
// 	topStrlist += '        <div class="topDiv"><a class="link home" href="' + homelink + '"><span></span></a></div>';
// 	topStrlist += '        <div class="topline"><span></span></div>';
  
// 	topStrlist += '        <div class="topDiv"><a class="link about" href="#aboutSection"><span></span></a></div>';
// 	topStrlist += '        <div class="topline"><span></span></div>';
  
// 	topStrlist += '        <div class="topDiv"><a class="link roadmap" href="' + eventlink + '"><span></span></a></div>';
// 	topStrlist += '        <div class="topline"><span></span></div>';
  
// 	topStrlist += '        <div class="topDiv"><a class="link howToBuy" href="' + eventlink + '"><span></span></a></div>';
// 	topStrlist += '        <div class="topline"><span></span></div>';
  
// 	topStrlist += '    </div>';
  
// 	if ($("#topIntContent").length > 0) {
// 	  $("#topIntContent").append(topStrlist);
// 	} else {
// 	  $('body').append(topStrlist);
// 	}
  
// 	// Assuming you have a section with the id "aboutSection" on your page
// 	function scrollToAboutSection() {
// 	  document.getElementById('aboutSection').scrollIntoView({
// 		behavior: 'smooth'
// 	  });
// 	}

// 	function scrollToAboutSection() {
// 		document.getElementById('homeSection').scrollIntoView({
// 		  behavior: 'smooth'
// 		});
// 	  }




//   });
