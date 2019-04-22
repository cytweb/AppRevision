var scheduleTimeAler, scheduleAlert, scheduleAlertSusscess;

function schedule() {
    switchToolbar("configTool");
    scheduleAlert = myApp.toast.create({
        text: "操作失败",
        position: 'center',
        closeTimeout: 2000,
    });
    scheduleAlertSusscess = myApp.toast.create({
        text: "操作成功",
        position: 'center',
        closeTimeout: 2000,
    });
    scheduleTimeAlert = function(txt) {
        return myApp.toast.create({
            text: txt,
            position: 'center',
            closeTimeout: 2000,
        })
    };
    //顶部菜单切换
    $(".subnavbarTabel>a").unbind();
    $(".subnavbarTabel>a").bind("click", function() {
        $(this).addClass("selectScheduleMenu").siblings().removeClass("selectScheduleMenu");
        //切换
        switchMenu(this);
        //顶部添加
        $($(this).attr("href") + "_nav").removeClass("displayNone").siblings().addClass("displayNone");
    });
    //人员数据请求
    schedule_public_username.length = 0;
    requestUser();
}
//左侧添加菜单
function transformReportingObstaciesMenu() {
    $(".scheduleRightBottomBtn").hasClass("transformReportingMenu") ? $(".scheduleRightBottomBtn").removeClass("transformReportingMenu") : $(".scheduleRightBottomBtn").addClass("transformReportingMenu");
}
// 人员
var schedule_public_username = [];

function requestUser() {
    var disabled = "'disabled'";
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/get_AdministratorData", {
        data: {
            getDataTable: "0"
        }
    })).done(function(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_user ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let telphoneUser = arrayLike[i].Telphone.toString().trim() == "" ? null : arrayLike[i].Telphone;
                let mobileTelUser = arrayLike[i].MobileTel.toString().trim() == "" ? null : arrayLike[i].MobileTel;
                let emailUser = arrayLike[i].EMail.toString().trim() == "" ? null : arrayLike[i].EMail;
                let ackLevelUser = arrayLike[i].AckLevel.toString().trim() == "" ? null : arrayLike[i].AckLevel;
                html += `<li class="swipeout bottomBorderLine" >
                          <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildUser('${arrayLike[i].Administrator}','${telphoneUser}','${mobileTelUser}','${emailUser}','${ackLevelUser}',1)">
                        
                            <div class="col-50">
                                <span>${arrayLike[i].Administrator}</span>
                                
                            </div>
                            <div class="col-50"><a href="#" class="detailsBtn linkColor" >详情</a>   </div>              
                          </div>
                          <div class="swipeout-actions-right">
                            <a href="#" class="delBtn" onclick="delUser(this,'${arrayLike[i].Administrator}')">删除</a>
                          </div>
                        </li>`;
                schedule_public_username.push(arrayLike[i].Administrator);
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_user ul").append(html);
    }).fail(function(e) {});
}
//人员html
function newlyBuildUser(userName, telphone, telmobile, emailValue, ackLevel, status) {
    if (status == 1) myApp.router.navigate("/scheduleModify/?title=人员修改&index=1&table=schedule_user&schedule1_username=" + userName + "&schedule1_hpone=" + telphone + "&schedule1_msm=" + telmobile + "&schedule1_email=" + emailValue + "&schedule1_level=" + ackLevel);
    else myApp.router.navigate("/scheduleModify/?title=人员修改&index=2&table=schedule_user");
}
//人员表删除
function delUser(that, userName) {
    myApp.dialog.confirm("是否删除该人员", "提示", function() {
        var dt = $(that).parent().parent(),
            deleteJson = {
                getDataTable: "Administrator",
                ifName: "Administrator",
                ifValue: userName,
                type: "string"
            };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 1);
    });
    return false;
}
//人员表公共请求
function publicAjax(jsonString, url, index) {
    var jsonData = {
        "url": url,
        "data": jsonString,
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpStatus;
        if (arrayLike == 200 && data.HttpData.data != 0) {
            scheduleAlertSusscess.open();
            switch (index) {
                case 1:
                    requestUser();
                    break;
                case 2:
                    requestEquipGroup();
                    break;
                case 3:
                    requestAlmReport(requestEGAReport);
                    break;
                case 4:
                    requestWeekAlmReport();
                    break;
                case 5:
                    requestSpeAlmReport();
                    break;
                default:
                    break;
            }
        } else {
            scheduleAlert.open();
        }
    }

    function _error(e) {
        scheduleAlert.open();
    }
}

//设备分组
var that_parent, equipArray = new Array();

function requestEquipGroup() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_EquipGroupData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_equip ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            equipArray.length = 0;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" style="padding-left: 0;">
                    <div class="col-50 equipGroupInput" >
                        <span onclick="activeLinkEquipGroup(this,1)" equipcomb="${arrayLike[i].equipcomb}" group_no="${arrayLike[i].group_no}">${arrayLike[i].group_name}</span>
                        <div class="displayNone"><input type="text" value=""/></div>
                    </div>
                    <div class="col-50">
                      <a href="#" class="equipGroupModifyBtn linkColor" onclick="equipAlert(this,1)">修改</a>
                      <span class="displayNone">
                        <a href="#" class="equipGroupSaveBtn linkColor" onclick="equipAlert(this,2)">保存</a>
                        <a href="#" class="equipGroupCancelBtn linkColor" onclick="equipAlert(this,3)">取消</a>
                      </span>
                    </div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delEquip(this)">删除</a>
                  </div>
                </li>`;
                equipArray.push(arrayLike[i].group_no);
            }
        } else {
            requestEquipGroup();
            return false;
        }
        $("#schedule_equip ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
// 设备html
function activeLinkEquipGroup(that, status) {
    if (status == 1) myApp.router.navigate("/scheduleModify/?title=设备分组修改&index=1&table=schedule_equip&equipcomb=" + $(that).attr("equipcomb") + "&group_no=" + $(that).attr("group_no") + "&currentTxt=" + $(that).text());
    else myApp.router.navigate("/scheduleModify/?title=设备分组修改&index=2&table=schedule_equip");
}
//设备删除
function delEquip(that) {
    myApp.dialog.confirm("是否删除该分组", "提示", function() {
        let dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "EquipGroup",
            ifName: "group_no",
            ifValue: dt.find("div.col-50 span").attr("group_no"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 2);
    });
}
//弹窗输入
function equipAlert(dt, index) {
    switch (index) {
        case 1:
            $(dt).addClass("displayNone").siblings().removeClass("displayNone");
            $(dt).parent().prev().find("div").removeClass("displayNone").siblings().addClass("displayNone");
            $(dt).parent().prev().find("div input").focus();
            break;
        case 2:
            let val = $(dt).parents("div.col-50").prev().find("div input").val(),
                tbject = $(dt).parents("div.col-50").prev().find("span");
            if (!val) {
                scheduleAlert.open();
                return false;
            }
            let updateJson = {
                getDataTable: "EquipGroup",
                equipcomb: tbject.attr("equipcomb"),
                group_name: val,
                ifValue: tbject.attr("group_no")
            };
            publicAjax(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 2);
            break;
        case 3:
            $(dt).parent().addClass("displayNone").siblings().removeClass("displayNone");
            $(dt).parents("div.col-50").prev().find("span").removeClass("displayNone").siblings().addClass("displayNone");
            break;
        case 4:
            // updateEquip(dt, "", 2);
            var NewLineVal, NewLineArray = [];
            $("#schedule_equip").find("li").each(function(index) {
                NewLineArray.push($(this).find("div.equipGroupInput span").attr("group_no"));
            });
            NewLineVal = NewLineArray.length == 0 ? 1 : Math.max.apply(null, NewLineArray) + 1;
            let insertJson = {
                getDataTable: "EquipGroup",
                groupName: "新增项目",
                groupNo: NewLineVal
            };
            publicAjax(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 2);
            break;
        default:
            break;
    }
}
//获取最大序号
function getMaxNo() {
    if (equipArray.length == 0) return 1;
    else return Math.max.apply(null, equipArray) + 1;
}

//管理范围
function requestAlmReport(almGroupObject) {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_AlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_administartor ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildAlmReport(this,1);" dataid = "${arrayLike[i].id}" datano="${arrayLike[i].group_no}">
                    <div class="col-50">${arrayLike[i].Administrator}</div>
                    <div class="col-50">${getEquipName(almGroupObject,arrayLike[i].group_no)}</div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestAlmReport(almGroupName);
            return false;
        }
        $("#schedule_administartor ul").append(html);
    }

    function _error(e) {}
}
// 设备html
function newlyBuildAlmReport(that, status) {
    if (status == 1) myApp.router.navigate("/scheduleModify/?title=管理范围修改&index=1&table=schedule_administartor&dataid=" + $(that).attr("dataid") + "&datano=" + $(that).attr("datano") + "&username=" + $(that).find("div:eq(0)").text() + "&groupname=" + $(that).find("div:eq(1)").text());
    else myApp.router.navigate("/scheduleModify/?title=管理范围修改&index=2&table=schedule_administartor");
}
//返回对应设备号的设备名称
function getEquipName(equipObject, equipno) {
    var equipName = "";
    equipObject.forEach(function(ele, index) {
        if (ele.group_no == equipno) {
            equipName = ele.group_name;
        }
    });
    return equipName;
}
//返回对应设备名称的设备号
function getEquipNO(equipObject, equipName) {
    var equipName;
    equipObject.forEach(function(ele, index) {
        if (ele.group_name == equipName) equipName = ele.group_no;
        return equipName;
    });
    return equipName;
}
//请求设备分组
var requestEGAReport;

function requestEGAlmReport() {
    var equipData = {
        "url": "/api/GWServiceWebAPI/get_EquipGroupData",
        "data": {
            getDataTable: "0"
        },
        "success": equip_success,
        "error": equip_error,
    };
    $.fn.axpost(equipData);

    function equip_success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code;
        if (code == 200) {
            requestAlmReport(arrayLike);
            requestEGAReport = arrayLike;
        }
    }
    function equip_error(e) {}
}
//设备删除
function delAlmReport(that) {
    myApp.dialog.confirm("是否删除该管理范围", "提示", function() {
        let dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "AlmReport",
            ifName: "id",
            ifValue: dt.attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 3);
    });
}
//弹窗输入
function almReportAlert(dt, index) {
    myApp.dialog.prompt('', '新的设备分组名', function(equipName) {
        if (!equipName) myApp.toast.create({
            text: '设备分组名不能为空',
            position: 'center',
            closeTimeout: 2000,
        }).open();
        else updateEquip(dt, equipName, index);
    });
}
// 设备分组选项选择
function almReportList(parentTaht, that) {
    var isFlag = false;
    var equipcombParentString = $(parentTaht).attr("equipcomb"),
        equipnoString = $(that).attr("equip_no");
    if (!equipcombParentString) {
        equipcombParentString = "#" + equipnoString + "#";
    } else {
        if (!$(that).find("input").is(':checked')) {
            if (equipcombParentString.indexOf("#" + equipnoString + "#") == -1) {
                equipcombParentString += equipnoString + "#";
            }
        } else {
            equipcombParentString = equipcombParentString.replace("#" + equipnoString + "#", "#");
        }
    }
    $(parentTaht).attr("equipcomb", equipcombParentString);
    updateEquip($(parentTaht).next().find("i.icon-f7_modify"), $(parentTaht).text(), 1);
}

//周排表
var jsondate = [];

function requestWeekAlmReport() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_WeekAlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data,
            code = data.HttpData.code,
            html = "";
        jsondate.length = 0;
        $("#schedule_specificDate ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                var sTime = formatDate(new Date(arrayLike[i].begin_time), "hh:mm"),
                    eTime = formatDate(new Date(arrayLike[i].end_time), "hh:mm");
                jsondate = [arrayLike[i].Administrator, weekReturn(arrayLike[i].week_day), arrayLike[i].week_day, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildWeekAlmReport(this,1)" dataid = "${arrayLike[i].id}" dataday="${arrayLike[i].week_day}">
                    <div class="col-35">${arrayLike[i].Administrator}</div>
                    <div class="col-15">${weekReturn(arrayLike[i].week_day)}</div>   
                    <div class="col-25">${formatDate(new Date(arrayLike[i].begin_time),"hh:mm")}</div>           
                    <div class="col-25">${formatDate(new Date(arrayLike[i].end_time),"hh:mm")}</div>
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delWeekAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_specificDate ul").append(html);
    }

    function _error(e) {}
}
//周排表html
function newlyBuildWeekAlmReport(tThatParent, status) {
    if (status == 1) myApp.router.navigate("/scheduleModify/?title=周排表修改&index=1&table=schedule_specificDate&username=" + $(tThatParent).find("div:eq(0)").text() + "&week=" + $(tThatParent).find("div:eq(1)").text() + "&stime=" + $(tThatParent).find("div:eq(2)").text() + "&etime=" + $(tThatParent).find("div:eq(3)").text() + "&dataid=" + $(tThatParent).attr("dataid"));
    else myApp.router.navigate("/scheduleModify/?title=周排表修改&index=2&table=schedule_specificDate");
}
//周排表删除
function delWeekAlmReport(that) {
    myApp.dialog.confirm("是否删除该周排表", "提示", function() {
        var dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "WeekAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 4);
    });
}
// ********************************************************************************
//特定排表
var spe_array = [];

function requestSpeAlmReport() {
    var jsonData = {
        "url": "/api/GWServiceWebAPI/get_SpeAlmReportData",
        "data": {
            getDataTable: "0"
        },
        "success": _success,
        "error": _error,
    };
    $.fn.axpost(jsonData);

    function _success(data) {
        let arrayLike = data.HttpData.data;
        let code = data.HttpData.code,
            html = "";
        $("#schedule_weeklytable ul").html("");
        if (code == 200) {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
                let sTime = formatDate(new Date(arrayLike[i].begin_time), "yyyy/MM/dd hh:mm:ss");
                let eTime = formatDate(new Date(arrayLike[i].end_time), "yyyy/MM/dd hh:mm:ss");
                spe_array = [arrayLike[i].Administrator, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildSpeAlmReport(this,1)" dataid="${arrayLike[i].id}">
                    <div class="col-30">${arrayLike[i].Administrator}</div>
                    <div class="col-35">${sTime}</div>   
                    <div class="col-35">${eTime}</div>           
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delSpeAlmReport(this)">删除</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser();
            return false;
        }
        $("#schedule_weeklytable ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
//特定排表删除
function delSpeAlmReport(that) {
    myApp.dialog.confirm("是否删除该特定排表", "提示", function() {
        var dt = $(that).parent().siblings();
        let deleteJson = {
            getDataTable: "SpeAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 5);
    });
}

function newlyBuildSpeAlmReport(tThatParent, status) {
    if (status == 1) myApp.router.navigate("/scheduleModify/?title=特定排表修改&index=1&table=schedule_weeklytable&username=" + $(tThatParent).find("div:eq(0)").text() + "&stime=" + $(tThatParent).find("div:eq(1)").text() + "&etime=" + $(tThatParent).find("div:eq(2)").text() + "&dataid=" + $(tThatParent).attr("dataid"));
    else myApp.router.navigate("/scheduleModify/?title=特定排表修改&index=2&table=schedule_weeklytable");
}
//switchMenu
function switchMenu(dt) {
    let idObj = $(dt).attr("href")
    $(idObj).removeClass("displayNone").siblings("section").addClass("displayNone");
    switch (idObj) {
        case "#schedule_user":
            requestUser();
            break;
        case "#schedule_equip":
            requestEquipGroup();
            break;
        case "#schedule_administartor":
            requestEGAlmReport();
            break;
        case "#schedule_specificDate":
            requestWeekAlmReport();
            break;
        case "#schedule_weeklytable":
            requestSpeAlmReport();
            break;
    }
}
//字符串处理
function weekReturn(week) {
    var weekString;
    switch (week) {
        case 0:
            weekString = "每天";
            break;
        case 2:
            weekString = "星期一";
            break;
        case 3:
            weekString = "星期二";
            break;
        case 4:
            weekString = "星期三";
            break;
        case 5:
            weekString = "星期四";
            break;
        case 6:
            weekString = "星期五";
            break;
        case 7:
            weekString = "星期六";
            break;
        case 1:
            weekString = "星期日";
            break;
        case "每天":
            weekString = 0;
            break;
        case "星期一":
            weekString = 2;
            break;
        case "星期二":
            weekString = 3;
            break;
        case "星期三":
            weekString = 4;
            break;
        case "星期四":
            weekString = 5;
            break;
        case "星期五":
            weekString = 6;
            break;
        case "星期六":
            weekString = 7;
            break;
        case "星期日":
            weekString = 1;
            break;
        default:
            break;
    }
    return weekString;
}
//日期转化
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};
//删除当前控制项
function scheduleDelControl() {
    myApp.dialog.confirm("是否删除该项", "提示", function() {});
}