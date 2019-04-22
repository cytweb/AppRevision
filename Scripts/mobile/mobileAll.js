//移动端js主入口
var myApp = new Framework7({
    root: '#app',
    name: 'My App',
    id: 'com.myapp.gw',
    panel: {
        swipe: 'left',
        swipeOnlyClose: true,
    },
    dialog: {
        buttonOk: window.localStorage.languageList == 1 ? 'confirm' : '确认',
        buttonCancel: window.localStorage.languageList == 1 ? 'cancel' : '取消',
    },
    statusbar: {
        enabled: true,
        overlay: true,
        iosOverlaysWebView: true,
    },
    picker: {
        toolbarCloseText: '确认',
    },
    routes: [{
        path: '/home/',
        url: 'home.html',
    }, {
        path: '/snapshot/',
        url: 'snapshot.html',
    }, {
        path: '/equips/',
        url: 'equips.html',
    }, {
        path: '/systemConfig/',
        url: 'systemConfig.html',
    }, {
        path: '/eventSearch/',
        url: 'eventSearch.html',
    }, {
        path: '/equipSearchDetail/',
        url: 'equipSearchDetail.html',
    }, {
        path: '/schedule/',
        url: 'schedule.html',
    }, {
        path: '/equipLinkage/',
        url: 'equipLinkage.html',
    }, {
        path: '/UserInfor/',
        url: 'UserInfor.html',
    }, {
        path: '/setPage/',
        url: 'setPage.html',
    }, {
        path: '/snapShotDetail/',
        url: 'snapShotDetail.html',
    }, {
        path: '/RealTimeList/',
        content: '123',
    }, {
        path: '/resultEvent/',
        content: '123',
    }, {
        path: '/ycAndyx/',
        url: 'ycAndyx.html',
    }, {
        path: '/Video/',
        url: 'Video.html',
    }, {
        path: '/videoControl/',
        url: 'videoControl.html',
    }, {
        path: '/welcomeWords/',
        url: 'welcomeWords.html',
    }, {
        path: '/mettingPPT/',
        url: 'mettingPPT.html',
    }, {
        path: '/mettingDetails/',
        url: 'mettingDetails.html',
    }, {
        path: '/scheduleModify/',
        url: 'scheduleModify.html',
    }, {
        path: '/equipLinkageModify/',
        url: 'equipLinkageModify.html',
    }, {
        path: '/equipConfigList/',
        url: 'equipConfigList.html',
    }, {
        path: '/sysConfigEdict/',
        url: 'sysConfigEdict.html',
    }, {
        path: '/scheduleModifyChild/',
        url: 'scheduleModifyChild.html',
    }, {
        path: '/mobile-en/home_en/',
        url: 'mobile-en/home_en.html',
    }, {
        path: '/mobile-en/snapshot_en/',
        url: 'mobile-en/snapshot_en.html',
    }, {
        path: '/mobile-en/equips_en/',
        url: 'mobile-en/equips_en.html',
    }, {
        path: '/mobile-en/systemConfig_en/',
        url: 'mobile-en/systemConfig_en.html',
    }, {
        path: '/mobile-en/eventSearch_en/',
        url: 'mobile-en/eventSearch_en.html',
    }, {
        path: '/mobile-en/equipSearchDetail_en/',
        url: 'mobile-en/equipSearchDetail_en.html',
    }, {
        path: '/mobile-en/schedule_en/',
        url: 'mobile-en/schedule_en.html',
    }, {
        path: '/mobile-en/equipLinkage_en/',
        url: 'mobile-en/equipLinkage_en.html',
    }, {
        path: '/mobile-en/UserInfor_en/',
        url: 'mobile-en/UserInfor_en.html',
    }, {
        path: '/mobile-en/setPage_en/',
        url: 'mobile-en/setPage_en.html',
    }, {
        path: '/mobile-en/snapShotDetail_en/',
        url: 'mobile-en/snapShotDetail_en.html',
    }, {
        path: '/mobile-en/RealTimeList/',
        content: '123',
    }, {
        path: '/mobile-en/resultEvent/',
        content: '123',
    }, {
        path: '/mobile-en/ycAndyx_en/',
        url: 'mobile-en/ycAndyx_en.html',
    }, {
        path: '/mobile-en/Video_en/',
        url: 'mobile-en/Video_en.html',
    }, {
        path: '/mobile-en/videoControl_en/',
        url: 'mobile-en/videoControl_en.html',
    }, {
        path: '/mobile-en/welcomeWords_en/',
        url: 'mobile-en/welcomeWords_en.html',
    }, {
        path: '/mobile-en/mettingPPT_en/',
        url: 'mobile-en/mettingPPT_en.html',
    }, {
        path: '/mobile-en/mettingDetails_en/',
        url: 'mobile-en/mettingDetails_en.html',
    }, {
        path: '/mobile-en/scheduleModify_en/',
        url: 'mobile-en/scheduleModify_en.html',
    }, {
        path: '/mobile-en/equipLinkageModify_en/',
        url: 'mobile-en/equipLinkageModify_en.html',
    }, {
        path: '/mobile-en/equipConfigList_en/',
        url: 'mobile-en/equipConfigList_en.html',
    }, {
        path: '/mobile-en/sysConfigEdict_en/',
        url: 'mobile-en/sysConfigEdict_en.html',
    }, {
        path: '/mobile-en/scheduleModifyChild_en/',
        url: 'mobile-en/scheduleModifyChild_en.html',
    }, {
        path: '/test/',
        url: 'test.html',
    }],
    on: {
        pageInit: function(page) {
            try {
                hubConn.stop();
            } catch (e) {}
            $("#voiceContainer").addClass("voiceContainer");
            if(window.localStorage.languageList == 1) {$(".right a:eq(0)").find("p").html("Scene");$(".right a:eq(1)").find("p").html("Scanning");} else {$(".right a:eq(0)").find("p").html("场景切换");$(".right a:eq(1)").find("p").html("扫一扫");};
        },
        popupOpen: function(popup) {},
        init: function() {}
    },
});
var mainView = myApp.views.create('.view-main'); //web接口地址
var service = "/GWService.asmx",
    $$ = Framework7.$;
initLoads();

function initLoads() {
    myApp.dialog.progress();
    loadNameMobile();
    //如果没有语音记录则默认为讯飞
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
}

var IsAdministrator, getWebUser, GWAddinModule, GWEquipPages;
//连接服务器
function InitEnsure() {
    var ajaxs = $.ajax({
        type: "post",
        timeout: 10000,
        url: "/api/Server/ConnectService",
        dataType: "JSON",
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
        },
        success: function(dt) {
            var analyze = dt.HttpData.code;
            if (analyze == 200) {
                $("#app").css("visibility", "visible");
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            myApp.dialog.close();
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxs.abort();
                myApp.dialog.create({
                    title: "系统提示",
                    text: '请求超时，请查看网络是否已连接！',
                    buttons: [{
                        text: '确定'
                    }]
                }).open();
            }
        }
    });
}

//重连服务器
function initEnsureChonglian(fun) {
    var _url = service + "/GetName2SFService";
    var _data = "userName=" + window.localStorage.userName;

    function _success(data) {
        var analyze = $(data).children("string").text();
        if (analyze != "" || analyze != "false") {
            if (fun != null) {
                fun();
            }
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}

//解析
function getValueByKey(str, key) {
    var urlSearchSplit = str.split('&');
    for (var i = 0; i < urlSearchSplit.length; i++) {
        var stringSplitValue = urlSearchSplit[i].split('=');
        if (stringSplitValue[0].toLowerCase() === key.toLowerCase()) {
            return stringSplitValue[1]
        }
    }
    return '';
}

//载入界面
function loadNameMobile() {
    if (location.search) {
        try {
            var urlSearch = location.search.split('?')[1],
                terminal = getValueByKey(urlSearch, "terminal"),
                ac_appkey = getValueByKey(urlSearch, "appkey"),
                ac_infokey = getValueByKey(urlSearch, "infokey"),
                service_url = getValueByKey(urlSearch, "service_url"),
                jsonString = {
                    "terminalString": terminal,
                    "ac_appkeyString": ac_appkey,
                    "ac_infokeyString": ac_infokey,
                    "service_urlString": service_url
                };
            window.localStorage.ac_appkey = ac_appkey, window.localStorage.terminal = terminal, window.localStorage.ac_infokey = ac_infokey, window.localStorage.service_url = service_url;
            myJavaFuntion.SetCookie(JSON.stringify(jsonString));
        } catch (ex) {
            window.localStorage.terminal = '', window.localStorage.ac_appkey = '', window.localStorage.ac_infokey = '', window.localStorage.service_url = '';
        }
    } else {
        myJavaFuntion.GetCookie();
    }
    setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "/api/GWServiceWebAPI/getClientTypeInfo",
            timeout: 5000,
            dataType: "json",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            success: function(dt) {
                var codeString = dt.HttpData;
                if (codeString.code == 200) {
                    window.localStorage.userName = codeString.data.userName;
                } else {
                    window.localStorage.userName = '';
                }
            },
            error: function(e) {
                window.localStorage.userName = '';
                myJavaFuntion.OpenLocalUrl("login");
            },
            complete: function(XMLHttpRequest, status) {
                if (window.localStorage.userName != "" && window.localStorage.userName != null) {
                    $("#userName").html("我(" + window.localStorage.userName + ")");
                    InitEnsure();
                    AppShows();
                    onHomePage();
                    //查询表中用户选择的语言
                    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getLanguageStatus?userName=" + window.localStorage.userName)).done(function(n) {
                        var result = n.HttpData.data;
                        if (result.length > 0 && result[0].status != "0" && n.HttpData.code == 200) {
                            window.localStorage.languageList = 1;
                        } else {
                            window.localStorage.languageList = 0;
                        }
                        tranformMenu(window.localStorage.languageList);
                    }).fail(function(e) {});
                    $(".voiceDivs,.toolbar").removeClass("displayNone");
                } else {
                    myJavaFuntion.OpenLocalUrl("login");
                }
            }
        });
    }, 100);
}

//app显示
function AppShows() {
    $("#appCacheClearLi").show();
    $("#appRichScan").show();
}

//清空缓存
function onAppCacheClear() {
    myApp.dialog.create({
        title: window.localStorage.languageList == 1 ? "empty" : "清空",
        text: window.localStorage.languageList == 1 ? "Whether to empty the cache and reload?" : "是否清空缓存，重新加载？",
        buttons: [{
            text: window.localStorage.languageList == 1 ? "Cancel" : '取消'
        }, {
            text: window.localStorage.languageList == 1 ? "Confirm" : '确定',
            onClick: function() {
                myJavaFun.AppCacheClear();
            }
        }]
    }).open();
}

function AppCacheClearCallback(dt) {
    if (dt == "true") {
        location.reload();
    } else {
        myApp.dialog.create({
            title: "",
            text: '清空失败！',
            buttons: [{
                text: '确定'
            }]
        }).open();
    }
}

//注销事件
function onUserLogout() {
    myApp.dialog.create({
        cssClass: "exit",
        title: window.localStorage.languageList == 1 ? "Cancellation" : "注销",
        text: window.localStorage.languageList == 1 ? "Are you sure you want to cancel your current account?" : '确定要注销当前账户吗？',
        buttons: [{
            text: window.localStorage.languageList == 1 ? "Cancel" : '取消'
        }, {
            text: window.localStorage.languageList == 1 ? "Confirm" : '确定',
            onClick: function() {
                window.localStorage.userName = "";
                window.localStorage.userPWD = "";
                myJavaFuntion.OpenLocalUrl("login");
            }
        }]
    }).open();
}

//关于事件
function onAbout() {
    var _url = "/api/server/version";
    function _success(data) {
        var version = data.HttpData.data;
        var versionNameHTML = '';
        if (window.localStorage.versionName != "" && window.localStorage.versionName != null) {
            versionNameHTML = (window.localStorage.languageList == 1 ? "<br/>App Edition：v" : "<br/>App版本：v") + window.localStorage.versionName;
        }
        myApp.dialog.create({
            title: window.localStorage.languageList == 1 ? "" : "关于",
            text: (window.localStorage.languageList == 1 ? "App Edition：v" : "API版本：v") + version + versionNameHTML,
            buttons: [{
                text: window.localStorage.languageList == 1 ? "Confirm" : "确定"
            }]
        }).open();
    }
    JQajaxo("get", _url, true, "", _success);
}

function backss() {
    var mainView = myApp.addView('.view-main');
    var pages = new Array();
    $(".page").each(function(i) {
        pages[i] = $(this).attr("data-page");
    });
    if (pages.length == 2) {
        mainView.router.back()
    }
}

//执行子界面方法
function initPageJS(dt, ext) { //ext扩展界面地址
    if ($("#" + dt + "_id").length == 0) {
        var pagejs = document.createElement("script");
        pagejs.id = dt + "_id";
        if (ext == "") {
            pagejs.setAttribute("src", "/Scripts/mobile/" + dt + ".js?v" + Math.random());
        } else {
            pagejs.setAttribute("src", ext + dt + ".js?v" + Math.random());
        }
        document.body.appendChild(pagejs);
        pagejs.onload = function() {
            evil(dt + "()");
        }
    } else {
        evil(dt + "()");
    }
}

function evil(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}

var alertMsgSuccess = myApp.notification.create({
        title: '系统提示',
        titleRightText: '',
        subtitle: '<br />',
        text: '操作成功',
        closeTimeout: 2000,
    }),
    alertMsgError = myApp.notification.create({
        title: '系统提示',
        titleRightText: '',
        subtitle: '<br />',
        text: '操作失败或没有该命令配置',
        closeTimeout: 1000,
    });

//判断当前设备是否可查看
function Browse_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_Equip_List").find("int").each(function() {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}

//判断当前设备是否可查看(子集)
function Browse_SpecialEquip_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Browse_SpecialEquip_List").find("string").each(function() {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    } else {
                        equipBool = true;
                    }
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}

//判断当前设备是否可控制
function Control_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Control_Equip_List").find("int").each(function() {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}

//判断当前设备是否可控制（子集）
function Control_SetItem_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function() {
            $(this).find("Control_SetItem_List").find("string").each(function() {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    } else {
                        equipBool = true;
                    }
                }
            });
        });
    } else {
        equipBool = true;
    }
    return equipBool;
}

//退出登陆
function exitLogin() {
    try {
        myJavaFun.OpenLocalUrl("login");
    } catch (e) {
        if (window.localStorage.terminal != "Mobile.App") window.location.href = "/Views/login.html";
        else myApp.dialog.alert("退出登陆异常");
    }
}

//切换底部工具栏
function switchToolbar(id) {
    $("#" + id).addClass("active").siblings().removeClass("active");
}

//语音信息提示
function voiceTooip(txt) {
    return myApp.toast.create({
        text: txt,
        position: 'center',
        closeTimeout: 3000,
    });
}

//下拉列表初始化
function listInit(id, value) {
    myApp.picker.create({
        inputEl: '#' + id,
        cols: [{
            textAlign: 'center',
            values: value
        }]
    });
}

//动态创建弹窗
var popup;
function popupAlert(html) {
    popup = myApp.popup.create({
        content: html,
        on: {
            opened: function(e) {}
        }
    }).open();
}

//封装ajax
function JQajaxo(_type, _url, _asycn, _data, _success, _error) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        timeout: 5000,
        async: _asycn,
        data: _data,
        success: _success,
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxs.abort();
                myApp.dialog.create({
                    title: "系统提示",
                    text: '请求超时，请查看网络是否已连接！',
                    buttons: [{
                        text: '确定'
                    }]
                }).open();
            }
            XMLHttpRequest = null;
        },
        error: function() {
            try {
                clearInterval(dynamicCurve);
            } catch (e) {}
            myApp.dialog.create({
                title: "系统提示",
                text: '请求错误，请查看网络是否已连接！',
                buttons: [{
                    text: '确定'
                }]
            }).open();
        }
    });
}

//发送命令
function get_no_val(that, set_equip, set_no, values) {
    $.when(AlarmCenterContext.get("/api/GWServiceWebAPI/getSetParmRadioList", {
        set_equip: set_equip,
        set_no: set_no
    })).done(function(n, l) {
        var result = n.HttpData.data;
        if (result.length > 0) {
            if (!values) onSetCommand_return(that, set_equip, result[0].main_instruction, result[0].minor_instruction, result[0].value);
            else onSetCommand_return(that, set_equip, result[0].main_instruction, result[0].minor_instruction, values);
        } else {
            alertMsgError.open();
        }
    }).fail(function(e) {
        alertMsgError.open();
    });
}

function get_no_set(dt, values) {

    //动画
    if($(dt).hasClass("homeBtn")) { 
        $(dt).addClass("startAnimation");
        tipsBottom($(dt).find("p").text());
        setTimeout(function() {
            $(dt).removeClass("startAnimation");
        }, 1200);
    }
    var set_equipOld = "",
        set_noOld = "";
    try {
        set_equipOld = $(dt).attr("set_equip");
        set_noOld = $(dt).attr("set_no");
    } catch (e) {}
    if (!set_equipOld.trim() || set_equipOld.trim() == "") return false;
    $.when(AlarmCenterContext.get("/api/GWServiceWebAPI/getSetParmRadioList", {
        set_equip: set_equipOld,
        set_no: set_noOld
    })).done(function(n, l) {
        var result = n.HttpData.data;
        if (result.length > 0) {
            if (values == "null" || values == "undefined" || !values || values.trim() == "") onSetCommand_return(dt, set_equipOld, result[0].main_instruction, result[0].minor_instruction, result[0].value);
            else onSetCommand_return(dt, set_equipOld, result[0].main_instruction, result[0].minor_instruction, values);
        } else {
            alertMsgError.open();
        }
    }).fail(function(e) {
        alertMsgError.open();
    });
}
function onSetCommand_return(dt, equip_no, main_instr, mino_instr, valueset) {
    $.ajax({
        type: "POST",
        url: "/GWService.asmx/SetupsCommand",
        timeout: 5000,
        data: {
            equip_no: equip_no,
            main_instruction: main_instr || "-",
            minor_instruction: mino_instr || "-",
            value: valueset,
            user_name: window.localStorage.userName
        },
        success: function(data) {
            $(data).find("string").text() == "true" ? alertMsgSuccess.open() : alertMsgError.open();
            //ppt details
            if ($(dt).hasClass("selectBorder")) {
                $(".viewsPng").find("img").attr("src", $(dt).find("img").attr("src"));
            }
        },
        error: function(error) {}
    });
}
//切换背景
if (window.localStorage.localBgColor == 1) {
    $(".whiteColor").each(function(index) {
        hrefUrl = $(this).attr("href").replace("white", "back");
        $(this).attr("href", hrefUrl);
    });
} else {
    $(".whiteColor").each(function(index) {
        hrefUrl = $(this).attr("href").replace("back", "white");
        $(this).attr("href", hrefUrl);
    });
}
//videoControl
function videoControlDirction(EquipNum, main_instruction, direction) {
    switch (direction) {
        case "left_start":
            // get_no("", EquipNum, 13, "");
            onSetCommand_return("", EquipNum, main_instruction, "0", "true");
            break;
        case "left_stop":
            // get_no("", EquipNum, 14, "");
            onSetCommand_return("", EquipNum, main_instruction, "0", "false");
            break;
        case "top_start":
            // get_no("", EquipNum, 17, "");
            onSetCommand_return("", EquipNum, main_instruction, "1", "true");
            break;
        case "top_stop":
            // get_no("", EquipNum, 18, "");
            onSetCommand_return("", EquipNum, main_instruction, "1", "false");
            break;
        case "right_start":
            // get_no("", EquipNum, 15, "");
            onSetCommand_return("", EquipNum, main_instruction, "2", "true");
            break;
        case "right_stop":
            // get_no("", EquipNum, 16, "");
            onSetCommand_return("", EquipNum, main_instruction, "2", "false");
            break;
        case "bottom_start":
            // get_no("", EquipNum, 19, "");
            onSetCommand_return("", EquipNum, main_instruction, "3", "true");
            break;
        case "bottom_stop":
            // get_no("", EquipNum, 20, "");
            onSetCommand_return("", EquipNum, main_instruction, "3", "false");
            break;
        default:
            break;
    }
}
//修改界面字体
function modifyZnUs() {
    if (window.localStorage.languageList == "1") {
        $(".voice-arrow-dialog").text("Press to speak");
    } else {
        $(".voice-arrow-dialog").text("按下说话");
    }
    getLanguageChoice(window.localStorage.languageList);
}
//切换语音
function getLanguageChoice(val) {
    switch (val) {
        case "1": //讯飞英文
            try {
                myJavaFun.SetAIUILanguage("english");
            } catch (ex) {}
            break;
        case "0": //讯飞中文
            try {
                myJavaFun.SetAIUILanguage("mandarin");
            } catch (ex) {}
            break;
            break;
        default:
            break;
    }
}
function voiceCloseFun() {
    try {
        myJavaFun.BackVoiceUI();
    } catch (e) {} //语音注销
}
//二维码扫描调用
function RichScan() {
    try {
        myJavaFun.RichScan();
    } catch (e) {}
}
//singar
var hubConn, hubProxy, signalR = {
    connectServer: function(equipNo) {
        hubConn = null
        hubConn = $.hubConnection();
        hubProxy = hubConn.createHubProxy('ServerHub');
        hubProxy.on('sendConnect', data => {
            //连接
        });
        // 来自广播新消息类型和数据
        hubProxy.on('sendAll', (data, type) => {
            // console.log('ycyxall--------------' + type, data)
        });
        // ycp有广播消息
        hubProxy.on('sendYcpSingle', data => {
            // console.log('yccccp----------------', data)
            try {
                let index = data.split(",")[0],
                    value = data.split(",")[2],
                    companyString = data.split(",")[5];
                $("#valueycps_" + index).find("span.val").html(value + companyString);
            } catch (e) {}
        });
        // yxp有广播消息
        hubProxy.on('sendYxpSingle', data => {
            //  console.log('yxxxxp-------------------', data)
            try {
                let index = data.split(",")[0],
                    status = data.split(",")[4];
                if (status == "True") $("#m_alarmyxps_" + index).find(".iconWrap i").addClass("alarm").removeClass("comOk");
                else {
                    $("#m_alarmyxps_" + index).find(".iconWrap i").removeClass("alarm").addClass("comOk");
                }
            } catch (e) {}
        });
        // 监听设备状态
        hubProxy.on('sendEquipSingle', data => {
            // console.log('equip-------------------', data)
            try {
                let index = data.split(",")[0],
                    status = data.split(",")[2];
                if (status == "CommunicationOK") $(".equipListStatus_" + index).find("i").removeClass("noCom alarm").addClass("comOk");
                else if (status == "HaveAlarm") $(".equipListStatus_" + index).find("i").removeClass("noCom comOk").addClass("alarm");
                else $(".equipListStatus_" + index).find("i").removeClass("comOk alarm").addClass("noCom");
            } catch (e) {}
        });
        hubConn.stop()
        // 开始连接signalr
        hubConn.start().done(() => {
            hubProxy.invoke('Connect');
            hubProxy.invoke('ListenEquipAll', window.localStorage.ac_appkey, window.localStorage.ac_infokey)
            hubProxy.invoke('StartListen', equipNo, window.localStorage.ac_appkey, window.localStorage.ac_infokey)
        }).fail(err => {
            console.log('错误-------:', err)
        })
        // signalr重连
        hubConn.reconnecting(() => {
            hubConn.stop();
            hubConn.start().done(() => {
                console.log('start!')
                hubProxy.invoke('Connect')
                hubProxy.invoke('ListenEquipAll', window.localStorage.ac_appkey, window.localStorage.ac_infokey)
                hubProxy.invoke('StartListen', equipNo, window.localStorage.ac_appkey, window.localStorage.ac_infokey)
            }).fail(err => {
                console.log('错误-------:', err)
            })
        })
        // signalr断开连接
        hubConn.disconnected(() => {
            hubConn.stop();
        })
        // 高频连接触发
        hubConn.connectionSlow((err) => {
        })
        // 收到signalr消息触发
        hubConn.received((err) => {
        })
    },
    connectHub: function(equipNo) {
        this.hubConn.stop()
        // 开始连接signalr
        this.hubConn.start().done(() => {
            // console.log('start!')
            this.hubProxy.invoke('Connect')
            this.hubProxy.invoke('ListenEquipAll', window.localStorage.ac_appkey, window.localStorage.ac_infokey)
            this.hubProxy.invoke('StartListen', equipNo, window.localStorage.ac_appkey, window.localStorage.ac_infokey)
        }).fail(err => {
            console.log('错误-------:', err)
        })
    },
}
//中英文目录切换
function tranformMenu(val) {
    let obj;
    val == 1 ? obj = selLanguageEN : obj = selLanguageZH;
    obj.forEach(function(item, index) {
           $("#" + item.id).attr("href", item.url);
    });
}
//中英文弹窗
function tranformAlert(title, tooip, confirmBtn, cancelBtn, confirmEvent, cancelEvent) {
    myApp.dialog.create({
        title: title,
        text: tooip,
        buttons: [{
            text: cancelBtn,
            onClick: function() {
                try {
                    evil(cancelEvent)();
                } catch (e) {}
            }
        }, {
            text: confirmBtn,
            onClick: function() {
                try {
                    evil(confirmEvent)();
                } catch (e) {}
            }
        }]
    }).open();
}

//提示
var toastBottom;
function tipsBottom(name){
   toastBottom = myApp.toast.create({
      text:  (window.localStorage.languageList == 1?"You clicked the button":"你点击了按钮")+ name,
      closeTimeout: 20000,
    }).open();
}

