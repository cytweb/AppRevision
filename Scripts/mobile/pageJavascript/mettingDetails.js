var isTFault = true,setHtml = "",isNsys = true;

function mettingDetails() {
    $(".modalDiv").addClass("displayNone");
    /*==================退出PPT提示 start====================*/
    if (!$("#mettingDetails").hasClass("page-on-left")) removeURL1();
    $("#back2,#homeTool,#snapshotTool,#equipsTool,#eventSearchTool,#systemConfigTool,#scheduleTool,#equipLinkageTool").unbind();
    $("#back2,#homeTool,#snapshotTool,#equipsTool,#eventSearchTool,#systemConfigTool,#scheduleTool,#equipLinkageTool").bind("click", clickMetting);

    function clickMetting() {
        if ($("#mettingDetails").hasClass("page-current")) {
            var thisValue1 = $(this).attr("id"),
                thisURL1 = $(this).attr("href");
            myApp.dialog.create({
                title: "信息提示",
                text: "确认关闭正在播放PPT?",
                buttons: [{
                    text: "取消",
                    onClick: function() {
                        addURL1();
                        toURL1(thisValue1);

                    }
                }, {
                    text: "确认",
                    onClick: function() {
                        addURL1();
                        toURL1(thisValue1);
                        //发送PPT关闭命令
                        $(".closeFile").click();                        
                    }
                }]
            }).open();
        }
    }

    function removeURL1() {
        $("#homeTool").attr("href", "");
        $("#snapshotTool").attr("href", "");
        $("#equipsTool").attr("href", "");
        $("#eventSearchTool").attr("href", "");
        $("#systemConfigTool").attr("href", "");
        $("#scheduleTool").attr("href", "");
        $("#equipLinkageTool").attr("href", "");
    }

    function addURL1() {
        $("#homeTool").attr("href", "/home/");
        $("#snapshotTool").attr("href", "/snapshot/");
        $("#equipsTool").attr("href", "/equips/");
        $("#eventSearchTool").attr("href", "/eventSearch/");
        $("#systemConfigTool").attr("href", "/systemConfig/");
        $("#scheduleTool").attr("href", "/schedule/");
        $("#equipLinkageTool").attr("href", "/equipLinkage/");
    }

    function toURL1(thisValue) {
        switch (thisValue) {
            case "back2":
                myApp.router.back();
                break;
            case "homeTool":
                myApp.router.navigate('/home/');
                break;
            case "snapshotTool":
                myApp.router.navigate('/snapshot/');
                break;
            case "equipsTool":
                myApp.router.navigate('/equips/');
                break;
            case "eventSearchTool":
                myApp.router.navigate('/eventSearch/');
                break;
            case "systemConfigTool":
                myApp.router.navigate('/systemConfig/');
                break;
            case "scheduleTool":
                myApp.router.navigate('/schedule/');
                break;
            case "equipLinkageTool":
                myApp.router.navigate('/equipLinkage/');
                break;
            default:
                ;
        }
    }
    i = 1;
    $(".closeFile,.setScreenSizeChild").unbind();
    $(".closeFile,.setScreenSizeChild").bind('click', function() {
        get_no_val(this, PPTcommand.closePPT.equipNo, PPTcommand.closePPT.setNo, "", "");
        if ($(this).hasClass("setScreenSizeChild")) {
            $(this).addClass("displayNone").siblings().removeClass("displayNone");
        }
    });
    /*=============================init==========================================*/
    $(".detailsTiTle").html(window.localStorage.pptUsername);
    setHtml = "";
    ajaxRequst();
    $(".mettingDetailsBottom div a").unbind();
    $(".mettingDetailsBottom div a").bind("click", function() {
        var dt = this;
        isPage(dt);
    });
    // document.getElementById("startPage").addEventListener('touchstart', addbackground);
    // document.getElementById("startPage").addEventListener('touchend', removebackground);
    // document.getElementById("prePage").addEventListener('touchstart', addbackground);
    // document.getElementById("prePage").addEventListener('touchend', removebackground);
    // document.getElementById("nextPage").addEventListener('touchstart', addbackground);
    // document.getElementById("nextPage").addEventListener('touchend', removebackground);
    // document.getElementById("endPage").addEventListener('touchstart', addbackground);
    // document.getElementById("endPage").addEventListener('touchend', removebackground);
}

function getWidth() { //宽度+外边距
    return window.screen.width * 0.9 / 5;
}
// function addbackground() { //设置单击背景图片
//     var tClass = $(this).attr("id");
//     switch (tClass) {
//         case "startPage":
//             $(".mettingDetailsBottom div").css("background", "url(/Image/phone/startPage.png) no-repeat center/auto 100%");
//             break;
//         case "prePage":
//             $(".mettingDetailsBottom div").css("background", "url(/Image/phone/prePage.png) no-repeat center/auto 100%");
//             break;
//         case "nextPage":
//             $(".mettingDetailsBottom div").css("background", "url(/Image/phone/nextPage.png) no-repeat center/auto 100%");
//             break;
//         case "endPage":
//             $(".mettingDetailsBottom div").css("background", "url(/Image/phone/endPage.png) no-repeat center/auto 100%");
//             break;
//         default:
//             break;
//     }
// }
// function removebackground() {
//     $(".mettingDetailsBottom div").css("background", "url(/Image/phone/indexPage.png) no-repeat center/auto 100%");
// }
//==============================================执行命令========================================================
function isPage(that) {
    //初始化切换图片
    var indexid = "",
        lenIndex = $(".mettingDetails_index>div").length,
        widthIndex = $(".mettingDetails_index").find("div.selectBorder").outerWidth(true).toFixed(1),
        translate = 0,
        onlyWidth = 0,
        sumWidth = 0;
    if ($(that).hasClass("startPage")) {
        $(".mettingDetails_index").css('transform', 'translate3d(0px, 0px, 0px)');
        $(".mettingDetails_index>div:eq(0)").addClass("selectBorder").siblings().removeClass("selectBorder");
    } else if ($(that).hasClass("prePage")) {
        Indexid = parseInt($(".selectBorder").attr("Indexid")); //当前所选
        if (Indexid == 1) $(".mettingDetails_index").css('transform', 'translate3d(0px, 0px, 0px)');
        else $(".mettingDetails_index").css('transform', "translate3d(" + (widthIndex * (2 - Indexid)) + "px, 0px, 0px)");
        $(".mettingDetails_index div[indexid='" + (Indexid - 1) + "']").addClass("selectBorder").siblings().removeClass("selectBorder");
    } else if ($(that).hasClass("nextPage")) {
        Indexid = parseInt($(".selectBorder").attr("Indexid")); //当前所选
        if (Indexid < lenIndex - 4) $(".mettingDetails_index").css('transform', "translate3d(" + widthIndex * Indexid * -1 + "px, 0px, 0px)");
        $(".mettingDetails_index div[indexid='" + (Indexid + 1) + "']").addClass("selectBorder").siblings().removeClass("selectBorder");
    } else if ($(that).hasClass("endPage")) {
        sumWidth = parseInt(widthIndex) * (lenIndex - 4) * -1;
        if (lenIndex > 4) $(".mettingDetails_index").css('transform', "translate3d(" + sumWidth + "px, 0px, 0px)");
        $(".mettingDetails_index>div:eq('" + (lenIndex - 1) + "')").addClass("selectBorder").siblings().removeClass("selectBorder");
    } else if ($(that).hasClass("setScreenSizeChild")) {
        $(that).removeClass("displayNone").siblings("a").addClass("displayNone");
    }
    $(".setviewPng").attr("src", $(".selectBorder img").attr("src"));
    //记录页数
    window.localStorage.savePage = parseInt($(".selectBorder").attr("Indexid"));
    //跳转至该页
    get_no_val(that, PPTcommand.setPage.equipNo, PPTcommand.setPage.setNo, $(".selectBorder").attr("Indexid"));
    isTFault = true;
}
//================================================初始化==========================================================
function ajaxRequst() {
    for (var l = 1; l <= parseInt(window.localStorage.sessionValue); l++) {
        if (l == 1) setHtml += '<div class="swiper-slide selectBorder" onclick="bannerActive(this)" Indexid=' + l + ' set_no=' + PPTcommand.setPage.setNo + ' set_equip=' + PPTcommand.setPage.equipNo + ' set_id=' + PPTcommand.setPage.setNo + '> <span style="display: inline-block;width:42px; height:42px" class=" preloader preloader-white"></span></div>';
        else setHtml += '<div class="swiper-slide" onclick="bannerActive(this)" Indexid=' + l + ' set_no=' + PPTcommand.setPage.setNo + ' set_equip=' + PPTcommand.setPage.equipNo + ' set_id=' + PPTcommand.setPage.setNo + '> <span style="display: inline-block;width:42px; height:42px" class=" preloader preloader-white"></span></div>';
    }
    $(".mettingDetails_index").html(setHtml);
    var mySwiper3 = myApp.swiper.create('.swiper-3', {
        pagination: '.swiper-3 .swiper-pagination',
        spaceBetween: 10,
        slidesPerView: 5
    });
    for (var i = 1; i <= parseInt(window.localStorage.sessionValue); i++) { //缩略图长度
        requestAjax(i, false);
    }
}
var firstImgStatus = true;

function requestAjax(j, k) {
    setTimeout(function() {
        $(".mettingDetails_index div[indexid='" + j + "']").attr("src","#");
        var urlRe = "/PPTImages/" + window.localStorage.sessionFilename + "/" + j + ".jpg";
        $(".mettingDetails_index div[indexid='" + j + "']").html('<img src=' + urlRe + ' onerror="requestAjax(' + j + ',true)" />');
    }, 800);
    //PPT跳转
    if (j == parseInt(window.localStorage.sessionValue) && window.localStorage.historyis == 1) {
        window.localStorage.historyis = 0;
        firstImgStatus = false;
        setTimeout(function() {
            historyInit();
        }, 1000);
    }
    if (firstImgStatus) {
        setTimeout(function() {
            $(".setviewPng").attr("src", $(".mettingDetails_index div[indexid='1']").find("img").attr("src"));
        }, 1000);
    }
}
//================================================初始化历史记录==========================================================
function historyInit() {
    if (window.localStorage.pptUsername == window.localStorage.HistorypptUsername) {
        alert(window.localStorage.savePage);
        $.ajax({
            type: "POST",
            url: "/GWService.asmx/SetupsCommand",
            timeout: 5000,
            data: {
                equip_no: PPTcommand.setPage.equipNo,
                main_instruction: 4,
                minor_instruction: "-",
                value: window.localStorage.savePage,
                user_name: window.localStorage.userName
            },
            success: function(data) {
                //跳转
                $(".mettingDetails_index").css('transform', "translate3d(" + (getWidth() * (2 - window.localStorage.savePage)) + "px, 0px, 0px)");
                setTimeout(function() {
                    $(".mettingDetails_index>div:eq('" + (window.localStorage.savePage - 1) + "')").addClass("selectBorder").siblings().removeClass("selectBorder");
                    $(".viewsPng").find("img").attr("src", $(".selectBorder img").attr("src"));
                }, 100);
            }
        });
    }
    //保存名字
    window.localStorage.HistorypptUsername = window.localStorage.pptUsername;
}
//历史记录
//active banner
function bannerActive(that) {
    $(that).addClass("selectBorder").siblings().removeClass("selectBorder");
    if ($(that).parent().hasClass("mettingDetails_index")) {
        var Indexid = parseInt($(that).attr("Indexid")); //当前所选
        window.localStorage.savePage = Indexid;
        setTimeout(function() {
            get_no_val(that, PPTcommand.setPage.equipNo, PPTcommand.setPage.setNo, Indexid);
        }, 50);
    }
}