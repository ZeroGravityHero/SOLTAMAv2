// $(function(){
//     var footerStr = '<style type="text/css">\
//         @media screen and (min-width: 751px){\
//             .foot_box_container{ width: 100%; height: 75px; padding-top: 10px; background-color: #1e1e1e;}\
//             .foot_box_main{ position:relative; width: 768px; height:75px; margin:0 auto;}\
//             .foot_wm_logo{ float:left; height:50px;}\
//             .foot_link_box{ float:right; width:360px; height: 30px; font-size: 18px; line-height: 30px; color: #b0b3bf;}\
//             .foot_link_box a{color: #b0b3bf; font-size: 20px;}\
//             .foot_link_box span{margin:0 18px;}\
//         }\
//         @media screen and (max-width: 750px){\
//             .foot_box_container{ width: 100%; height: 135px; padding-top: 10px; background-color: #1e1e1e;}\
//             .foot_wm_logo{ display:block; width: 236px; margin: 12px auto 0;}\
//             .foot_link_box{ height: 36px; font-size: 18px; line-height: 36px; color: #b0b3bf; text-align: center;}\
//             .foot_link_box a{color: #b0b3bf; font-size: 20px;}\
//             .foot_link_box span{margin:0 18px;}\
//         }\
//     </style>';
//     footerStr += '<div class="foot_box_container"><div class="foot_box_main">\
//     <img class="foot_wm_logo" src="https://imagizer.imageshack.com/img922/7074/SYLCLZ.png" alt="SOLTAMA Logo" />\
//     <div class="foot_link_box"><a href="" target="_blank">Terms of Service</a><span>|</span><a href="" target="_blank">Privacy Policy</a><p class="copyright_text">@SOLTAMA. All Rights Reserved.</p></div>\
//     </div></div>';
//     var footerId = $('#footid').attr('instid');
//     if(footerId){
//         $('#'+footerId).append(footerStr);
//     }else{
//         $('body').append(footerStr);
//     }
// });