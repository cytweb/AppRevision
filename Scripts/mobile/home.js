//首页事件 

function onHomePage() {
    switchToolbar("homeTool");
    authorizationName();
    getJurisdictionData();
    getAppStatusBarHeight();
    //切换中英文右上角链接
    tranformMenu(window.localStorage.languageList);
    //菜单初始化
    $("#configTool").unbind().bind("click",function(){
        var html = `<div class="popoverSystemMenu">        
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/equips_en/":"/equips/"}">${window.localStorage.languageList == 1 ?"Device list":"设备列表"}</a>
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/eventSearch_en/":"/eventSearch/"}">${window.localStorage.languageList == 1 ?"Event query":"事件查询"}</a>
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/equipConfigList_en/":"/equipConfigList/"}">${window.localStorage.languageList == 1 ?"System configuration":"系统配置"}</a>
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/schedule_en/":"/schedule/"}">${window.localStorage.languageList == 1 ?"Alarm schedule":"报警排表"}</a>
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/equipLinkage_en/":"/equipLinkage/"}">${window.localStorage.languageList == 1 ?"Equipment linkage":"设备联动"}</a>
            <a class="popup-close" href="${window.localStorage.languageList == 1 ?"/mobile-en/equipLinkage_en/":"/SceneConfiguration/"}">${window.localStorage.languageList == 1 ?"Scene configuration":"场景配置"}</a>
        </div>`;

        ststemSet("系统模块","configTool",html);
    });

}
//响应App绑定函数-获取状态栏高度
function getStatusBarHeight(height, ScreenHeight) {
    var heightRate = height / ScreenHeight;
    var parentHeight = document.body.clientHeight;
    heightRate = heightRate * parentHeight;
    if (heightRate > 0) {
        $(".md .statusbar").height(heightRate + "px");
    }
}
function getAppStatusBarHeight() {
    if (typeof(myJavaFun) != "undefined") {
        //App绑定函数-获取键盘高度
        if (typeof myJavaFun.getStatusBarHeight === "function") {
            myJavaFun.getStatusBarHeight();
        }
    }
}
//授权名称
function authorizationName() {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: {
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            if (dt) {
                if (dt == "false") dt = "AlarmCenter";
                $(".auth_name_get").text(dt);
                window.localStorage.auth_name_title = dt;
            } else {
                tipsInformtion(window.localStorage.languageList == 1 ? "Failed to obtain authorization name" : "获取授权名失败,是否退出登陆界面?", exitLogin);
            }
        },
        error: function(e) {
            tipsInformtion(window.localStorage.languageList == 1 ? "Failed to obtain authorization name" : "获取授权名失败,是否退出登陆界面?", exitLogin);
        }
    });
}
//提示窗口
function tipsInformtion(tipsStr, tipsEvent) {
    myApp.dialog.create({
        title: window.localStorage.languageList == 1 ? "Tips" : "提示",
        text: tipsStr,
        buttons: [{
            text: window.localStorage.languageList == 1 ? "Cancel" : "取消"
        }, {
            text: window.localStorage.languageList == 1 ? "confirm" : "确定",
            onClick: function() {
                tipsEvent();
            }
        }]
    }).open();
}
//轮播
function VideoBaner(className, slistName, jsonString) {
    $(".KOvm_container>div,.wiper-paginationTrailer-KOvm").html("");
    var countTrailer = jsonString.length;
    var xhTrailer = 0,
        signIndex = window.localStorage.languageList == 1 ? 6 : 8;
    for (var i = 0; i < countTrailer; i++) {
        var htmlTrailerChild = "<li class=\"" + (window.localStorage.languageList == 1 ? "col-33" : "col-25") + "\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this," + jsonString[i].value + ")\">" + "<i class=\"" + jsonString[i].icon + "\" style=\"background:linear-gradient(-135deg," + jsonString[i].color + ")\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\" ></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<img src=\"#\" style=\"display:none;\"></li>";
        if (i % signIndex == 0 || i == 0) {
            xhTrailer++;
            var htmlTrailer = "<div class=\"swiper-slide\" dataID='" + xhTrailer + "'>" + "<ul class=\"row\" >" + htmlTrailerChild + "</ul></div>";
            $("." + className + " .swiper-wrapper").append(htmlTrailer);
        } else {
            $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").append(htmlTrailerChild);
        }
        if (i == countTrailer - 1 && $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").find("li").length < 8) {
            $("." + className + " .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").addClass("homeControlFunction");
        }
    }
    $(".swiper-paginationTrailer").html("");
    var paginationDom = "";
    for (var j = 0; j < xhTrailer; j++) {
        if (j == 0) {
            paginationDom = `<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>`;
        } else paginationDom += '<span class="swiper-pagination-bullet"></span>';
    }
    $(".swiper-paginationTrailer").append(paginationDom);
    var swiper = myApp.swiper.create('.swiper-containerTrailer', {
        speed: 400,
        spaceBetween: 100,
        pagination: '.swiper-pagination',
    });
    var activeIndex = 0;
    $(".swiper-containerTrailer")[0].addEventListener('touchend', function() {
        activeIndex = parseInt($(".swiper-slide-active").attr("dataid")) - 1;
        $(".swiper-paginationTrailer span:eq(" + activeIndex + ")").addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
    }, false);
}
//常用
function commonlyUsedFun(className, classListName, jsonString) {
    $("." + className).html("");
    var countTrailer = jsonString.length;
    var htmlTrailerChild = "",
        xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        htmlTrailerChild += "<li class=\"col-" + classListName + "\">" + "<a href=\"" + (window.localStorage.languageList == 1 ? jsonString[i].href_en : jsonString[i].href_zh) + "\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\"" + jsonString[i].equipNo + "\" set_no=\"" + jsonString[i].setNo + "\" onclick=\"get_no_set(this,'" + jsonString[i].value + "')\">" + "<i class=\"" + jsonString[i].icon + "\" style=\"background: linear-gradient(-135deg," + jsonString[i].color + ")\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\"" + jsonString[i].icon + "\"></i>" + "<p class=\"p-ellipsis1\">" + (window.localStorage.languageList == 1 ? jsonString[i].name_en : jsonString[i].name) + "</p>" + "</a>" + "</li>";
    }
    $("." + className).append(htmlTrailerChild);
}
//实时快照 
var event_Level_list_home, btnInfoNames_home = [],btnInfoLevels_home = [];
function snashotData() {
    btnInfoNames_home.length = 0,btnInfoLevels_home.length = 0;
    $.ajax({
        type: 'post',
        url: '/api/event/alarm_config',
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
        },
        data: {},
        success: function(dt) {  
            if (dt.HttpStatus == 200 && dt.HttpData.data) {
                var resultData = dt.HttpData.data;
                var strData = "";
                for (var i = 0; i < resultData.length; i++) {
                    if (resultData[i].IsShow == 1) {
                        var btnStatus = resultData[i].IsShow == 1 ? true : false;
                        var btnValue = [];
                        for (var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
                            btnValue += j + ",";
                        }
                        event_Level_list_home += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames_home.push(resultData[i].SnapshotName)
                        btnInfoLevels_home.push(btnValue);
                    }
                }
                snashotCount(btnInfoLevels_home);
            }
        }
    });
}
function snashotCount(btnInfoLevels_home) {
    var strBtnInfoLevels = "";
    for (var i = 0; i < btnInfoLevels_home.length; i++) {
        strBtnInfoLevels += btnInfoLevels_home[i] + "/";
    }
    if (strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data;
                    var resultDataArr = resultData.toString().split(",");
                    for (var i = 0; i < resultDataArr.length; i++) {
                        $(".statisticsTable a:eq(" + i + ")").attr("href", "/snapShotDetail/?" + btnInfoNames_home[i] + '&' + btnInfoLevels_home[i]).find("p").text(resultDataArr[i]);
                    }
                }
            }
        });
    }
}
//配置界面
function getJurisdictionData() {
    myApp.dialog.progress((window.localStorage.languageList == 1 ? '<a style="font-size: 1rem">Loading...</a>' : '<a style="font-size: 1rem">加载中...</a>'));
    // 权限管理 
    var JurisdictionArray = [];
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getJurisdictionData", {
        async: false
    })).done(function(n) {
        let result = n.HttpData;
        var JurisdictionFunArray = result.data.filter((item,index)=> {if(item.ClassName.indexOf("AlarmCenter.APP.Home")>-1) return item;});
        if (result.code == 200) {
            $.ajax({
                type: "post",
                // dataType: "json",
                url: service + "/UserPermissions",
                data: "userName=" + window.localStorage.userName,
                success: function(usersDt) {
                    myApp.dialog.close(); 
                    $("#homeContents>ul").html("");
                    getWebUser = $(usersDt).children("UserItem");
                    let resultControl = $(usersDt).find("RoleItem").find("AddinModule_List").find("int"),JurisdictionArrayList = [];
    
                    if($(usersDt).find("IsAdministrator").text() == "true")
                       JurisdictionArray=["HomeSnapShot","HomeShortcutFunction","HomeSystemMenu"];
                    else 
                     {
                        resultControl.each(function( index_p,item_p) {JurisdictionArrayList.push($(item_p).text()); });
                        let Juris = JurisdictionFunArray.filter((item,index)=>JurisdictionArrayList.some(item_ch=>item_ch.toString() == item.ID.toString()));
                         Juris.forEach((item,index)=>{
                           JurisdictionArray.push(item.ClassName.replace("AlarmCenter.APP.Home.",""));
                         });
                     }  
                    var html = "";
                    JurisdictionArray.forEach(function(item, index) {
                        html += functionalModule(item,"");
                    });
                    $("#homeContents>ul").append(html);
                    // 实现内容添加
                    JurisdictionArray.forEach(function(item, index) {
                        switch (item) {
                            case "HomeSnapShot":
                                snashotData();
                                break;
                            case "HomeShortcutFunction":
                                commonlyUsedFun("pptPattern_container ol", "50", pptPattern);
                                commonlyUsedFun("jjPattern_container ol", "50", jjPattern);
                                break;
                            case "HomeSystemMenu":
                                commonlyUsedFun("sysFourMenu", "25", sysFourMenu);
                                commonlyUsedFun("sysInitFun", "25", commonlyUsed);
                                commonlyUsedFun("welComePage", "25", welComePage);

                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        }
    }).fail(function(e) {
        // myApp.router.navigate("/home/"); 
    });
}

function functionalModule(className,htmlStr) {
    var html = "";
    switch (className) {
        case "HomeSnapShot":
            html = `<li class="row HomeSnapShot statisticsTable">
                        <a class="col-20">${window.localStorage.languageList == 1?"Errors":"故障"}<p>0</p></a>
                        <a class="col-20">${window.localStorage.languageList == 1?"Warnings":"警告"}<p>0</p></a>
                        <a class="col-20">${window.localStorage.languageList == 1?"Informations":"信息"}<p>0</p></a>
                        <a class="col-20">${window.localStorage.languageList == 1?"Settings":"设置"}<p>0</p></a>
                        <a class="col-20" style="border-right: 0;">${window.localStorage.languageList == 1?"Assets":"资产"}<p>0</p></a>
                    </li>`;
            break;
        case "HomeShortcutFunction":
            html = `<li class="HomeShortcutFunction">
              <section>
                 <aside>
                  <div class="pptPattern_container" onclick="videoExplain()">
                       <div class="pptPatternHeader row">
                          <span class="col-100">
                             <h3>视频讲解</h3>
                             遥控器
                          </span>
                          <a><i class="iconfont icon-f7_icon_hf"></i></a>
                       </div>
                       <p>当前文件: <label>敢为平台演示.mp4</label></p>

                  </div>
                  <div class="pptPattern_container"  onclick="pptPlay()">
                       <div class="pptPatternHeader row">
                          <span class="col-100">
                             <h3>PPT播放</h3>
                             遥控器
                          </span>
                           <a><i class="iconfont icon-f7_icon_hf"></i></a>
                       </div>
                       <p>当前文件: <label>敢为平台演示.pptx</label></p>
                  </div>
                  </aside>
              </section>                                  
            </li>`;
            break;
        case "HomeButton1":
            html = `<li class="row HomeButton">
                  <div class="swiper-containerTrailer KOvm_container swiper-init swiper-container" data-space-between="50" >
                    <div class="swiper-paginationTrailer swiper-paginationTrailer-KOvm swiper-pagination"></div>
                    <div class="swiper-wrapper" style="margin-bottom: 5%;"></div>
                  </div>
            </li>`;
            break;
        case "HomeSystemMenu":
            html = `<li class="HomeSystemMenu">
                    <ol class="row sysFourMenu"></ol>
                    <ol class="row commonlyUsed sysInitFun"></ol>
                    <ol class="row commonlyUsed welComePage"></ol>
                   </li>`;
            break;
        default:
            html = htmlStr;
            break;
    }
    return html;
}

//系统设备
function ststemSet(title,id,html){
    myApp.request.get("plug/popoverTemplate.html", "", function (data) {
        var popoverHTML=data;
        popover  = myApp.popover.create({
            targetEl: "#"+id,
            content: popoverHTML,
        }).open();
        $(".publicHeader-back").unbind().bind("click",function(){ try{toastBottom.close();} catch(e){}});
        $(".publicHeader span").html(title);
        $(".popup-public section").html(html);
    });
}

//全局场景
function AllScene(){
     var htmlStart = `<div class="popoverSceneBtn row">`,htmlContent="";    
     KOvm.forEach(function(item,index){
         htmlContent += `<a href="#" class="homeBtn col-25" id="homeBtn${index}" set_equip="${item.equipNo}" set_no="${item.setNo}" onclick="get_no_set(this,null)" >
         <span>
           <i class="${item.icon}"></i>
         </span>
         <p>
            ${window.localStorage.languageList == 1 ?item.name_en:item.name}
         </p>
         </a>`;
     });    
    var htmlEnd = `</div>`;
    ststemSet("场景控制","sceneBtnControl",htmlStart+htmlContent+htmlEnd);  
}

//视频讲解
function videoExplain(){
         var htmlStart = `<div class="popoverVideoExplain row">`,htmlContent="";    
      
        var htmlEnd = `</div>`;
        ststemSet("视频讲解","sceneBtnControl",htmlStart+htmlContent+htmlEnd);  
}
//ppt播放
function pptPlay(){
         var htmlStart = `<div class="popoverPptPlay row">`,htmlContent="";    
      
        var htmlEnd = `</div>`;
        ststemSet("PPT播放","sceneBtnControl",htmlStart+htmlContent+htmlEnd);  
}