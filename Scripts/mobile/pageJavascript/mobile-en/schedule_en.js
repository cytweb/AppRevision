var scheduleTimeAler, scheduleAlert, scheduleAlertSusscess;

function schedule_en() {
    switchToolbar("configTool");
    scheduleAlert = myApp.toast.create({
        text: "operation failed",
        position: 'center',
        closeTimeout: 2000,
    });
    scheduleAlertSusscess = myApp.toast.create({
        text: "Successful operation",
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
        switchMenu_en(this);
        //顶部添加
        $($(this).attr("href") + "_nav").removeClass("displayNone").siblings().addClass("displayNone");
    });
    //人员数据请求
    schedule_public_username.length = 0;
    requestUser_en();
}
//左侧添加菜单
function transformReportingObstaciesMenu() {
    $(".scheduleRightBottomBtn").hasClass("transformReportingMenu") ? $(".scheduleRightBottomBtn").removeClass("transformReportingMenu") : $(".scheduleRightBottomBtn").addClass("transformReportingMenu");
}
// 人员
var schedule_public_username = [];

function requestUser_en() {
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
                          <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildUser_en('${arrayLike[i].Administrator}','${telphoneUser}','${mobileTelUser}','${emailUser}','${ackLevelUser}',1)">

                            <div class="col-50">
                                <span>${arrayLike[i].Administrator}</span>
                              
                            </div>
                            <div class="col-50"><a href="#" class="detailsBtn linkColor" >Details</a>   </div>              
                          </div>
                          <div class="swipeout-actions-right">
                            <a href="#" class="delBtn" onclick="delUser_en(this,'${arrayLike[i].Administrator}')">Delete</a>
                          </div>
                        </li>`;
                schedule_public_username.push(arrayLike[i].Administrator);
            }
        } else {
            requestUser_en();
            return false;
        }
        $("#schedule_user ul").append(html);
    }).fail(function(e) {});
}
//人员html
function newlyBuildUser_en(userName, telphone, telmobile, emailValue, ackLevel, status) {
    if (status == 1) myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Personnel modification&index=1&table=schedule_user&schedule1_username=" + userName + "&schedule1_hpone=" + telphone + "&schedule1_msm=" + telmobile + "&schedule1_email=" + emailValue + "&schedule1_level=" + ackLevel);
    else myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Personnel modification&index=2&table=schedule_user");
}
//人员表删除
function delUser_en(that, userName) {
    myApp.dialog.confirm("Whether to delete the person", "Tips", function() {
        var dt = $(that).parent().parent(),
            deleteJson = {
                getDataTable: "Administrator",
                ifName: "Administrator",
                ifValue: userName,
                type: "string"
            };
        publicAjax_en(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 1);
    });
    return false;
}
//人员表公共请求
function publicAjax_en(jsonString, url, index) {
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
                    requestUser_en();
                    break;
                case 2:
                    requestEquipGroup_en();
                    break;
                case 3:
                    requestAlmReport_en(requestEGAReport);
                    break;
                case 4:
                    requestWeekAlmReport_en();
                    break;
                case 5:
                    requestSpeAlmReport_en();
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

function requestEquipGroup_en() {
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
                        <span onclick="activeLinkEquipGroup_en(this,1)" equipcomb="${arrayLike[i].equipcomb}" group_no="${arrayLike[i].group_no}">${arrayLike[i].group_name}</span>
                        <div class="displayNone"><input type="text" value=""/></div>
                    </div>
                    <div class="col-50">
                      <a href="#" class="equipGroupModifyBtn linkColor" onclick="equipAlert_en(this,1)">Modify</a>
                      <span class="displayNone">
                        <a href="#" class="equipGroupSaveBtn linkColor" onclick="equipAlert_en(this,2)">Save</a>
                        <a href="#" class="equipGroupCancelBtn linkColor" onclick="equipAlert_en(this,3)">Cancel</a>
                      </span>
                    </div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delEquip_en(this)">Delete</a>
                  </div>
                </li>`;
                equipArray.push(arrayLike[i].group_no);
            }
        } else {
            requestEquipGroup_en();
            return false;
        }
        $("#schedule_equip ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
// 设备html
function activeLinkEquipGroup_en(that, status) {
    if (status == 1) myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Equipment grouping modification&index=1&table=schedule_equip&equipcomb=" + $(that).attr("equipcomb") + "&group_no=" + $(that).attr("group_no") + "&currentTxt=" + $(that).text());
    else myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Equipment grouping modification&index=2&table=schedule_equip");
}
//设备删除
function delEquip_en(that) {
    myApp.dialog.confirm("Whether to delete the group", "Tips", function() {
        let dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "EquipGroup",
            ifName: "group_no",
            ifValue: dt.find("div.col-50 span").attr("group_no"),
            type: "number"
        };
        publicAjax_en(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 2);
    });
}
//弹窗输入
function equipAlert_en(dt, index) {
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
            publicAjax_en(updateJson, "/api/GWServiceWebAPI/updateEquipGroup", 2);
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
                groupName: "New projects",
                groupNo: NewLineVal
            };
            publicAjax_en(insertJson, "/api/GWServiceWebAPI/insertEquipGroup", 2);
            break;
        default:
            break;
    }
}
//获取最大序号
function getMaxNo_en() {
    if (equipArray.length == 0) return 1;
    else return Math.max.apply(null, equipArray) + 1;
}

//管理范围
function requestAlmReport_en(almGroupObject) {
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
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildAlmReport_en(this,1);" dataid = "${arrayLike[i].id}" datano="${arrayLike[i].group_no}">
                    <div class="col-50">${arrayLike[i].Administrator}</div>
                    <div class="col-50">${getEquipName_en(almGroupObject,arrayLike[i].group_no)}</div>              
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delAlmReport_en(this)">Delte</a>
                  </div>
                </li>`;
            }
        } else {
            requestAlmReport_en(almGroupName);
            return false;
        }
        $("#schedule_administartor ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
// 设备html
function newlyBuildAlmReport_en(that, status) {
    if (status == 1) myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Management Scope Modification&index=1&table=schedule_administartor&dataid=" + $(that).attr("dataid") + "&datano=" + $(that).attr("datano") + "&username=" + $(that).find("div:eq(0)").text() + "&groupname=" + $(that).find("div:eq(1)").text());
    else myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Management Scope Modification&index=2&table=schedule_administartor");
}
//返回对应设备号的设备名称
function getEquipName_en(equipObject, equipno) {
    // console.log(equipObject);
    var equipName = "";
    equipObject.forEach(function(ele, index) {
        if (ele.group_no == equipno) {
            equipName = ele.group_name;
        }
    });
    return equipName;
}
//返回对应设备名称的设备号
function getEquipNO_en(equipObject, equipName) {
    var equipName;
    equipObject.forEach(function(ele, index) {
        if (ele.group_name == equipName) equipName = ele.group_no;
        return equipName;
    });
    return equipName;
}
//请求设备分组
var requestEGAReport;

function requestEGAlmReport_en() {
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
            requestAlmReport_en(arrayLike);
            requestEGAReport = arrayLike;
        }
    }

    function equip_error(e) {}
}
//设备删除
function delAlmReport_en(that) {
    myApp.dialog.confirm("Whether to delete this administrative scope", "Tips", function() {
        let dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "AlmReport",
            ifName: "id",
            ifValue: dt.attr("dataid"),
            type: "number"
        };
        publicAjax_en(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 3);
    });
}
//弹窗输入
function almReportAlert_en(dt, index) {
    myApp.dialog.prompt('', 'New device group name', function(equipName) {
        if (!equipName) myApp.toast.create({
            text: 'The device group name cannot be empty',
            position: 'center',
            closeTimeout: 2000,
        }).open();
        else updateEquip(dt, equipName, index);
    });
}
// 设备分组选项选择
function almReportList_en(parentTaht, that) {
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

function requestWeekAlmReport_en() {
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
                var sTime = formatDate_en(new Date(arrayLike[i].begin_time), "hh:mm"),
                    eTime = formatDate_en(new Date(arrayLike[i].end_time), "hh:mm");
                jsondate = [arrayLike[i].Administrator, weekReturn_en(arrayLike[i].week_day), arrayLike[i].week_day, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildWeekAlmReport_en(this,1)" dataid = "${arrayLike[i].id}" dataday="${arrayLike[i].week_day}">
                    <div class="col-35">${arrayLike[i].Administrator}</div>
                    <div class="col-15">${weekReturn_en(arrayLike[i].week_day)}</div>   
                    <div class="col-25">${formatDate_en(new Date(arrayLike[i].begin_time),"hh:mm")}</div>           
                    <div class="col-25">${formatDate_en(new Date(arrayLike[i].end_time),"hh:mm")}</div>
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delWeekAlmReport_en(this)">Delete</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser_en();
            return false;
        }
        $("#schedule_specificDate ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
//周排表html
function newlyBuildWeekAlmReport_en(tThatParent, status) {
    if (status == 1) myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Weekly Schedule Amendment&index=1&table=schedule_specificDate&username=" + $(tThatParent).find("div:eq(0)").text() + "&week=" + $(tThatParent).find("div:eq(1)").text() + "&stime=" + $(tThatParent).find("div:eq(2)").text() + "&etime=" + $(tThatParent).find("div:eq(3)").text() + "&dataid=" + $(tThatParent).attr("dataid"));
    else myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Weekly Schedule Amendment&index=2&table=schedule_specificDate");
}
//周排表删除
function delWeekAlmReport_en(that) {
    myApp.dialog.confirm("Whether to delete the weekly schedule", "Tips", function() {
        var dt = $(that).parent().siblings();
        var deleteJson = {
            getDataTable: "WeekAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax_en(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 4);
    });
}
// ********************************************************************************
//特定排表
var spe_array = [];

function requestSpeAlmReport_en() {
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
                let sTime = formatDate_en(new Date(arrayLike[i].begin_time), "yyyy/MM/dd hh:mm:ss");
                let eTime = formatDate_en(new Date(arrayLike[i].end_time), "yyyy/MM/dd hh:mm:ss");
                spe_array = [arrayLike[i].Administrator, sTime.toString(), eTime.toString()];
                html += `<li class="swipeout bottomBorderLine">
                  <div class="item-content swipeout-content schedule-content row no-gap" onclick="newlyBuildSpeAlmReport_en(this,1)" dataid="${arrayLike[i].id}">
                    <div class="col-30">${arrayLike[i].Administrator}</div>
                    <div class="col-35">${sTime}</div>   
                    <div class="col-35">${eTime}</div>           
                  </div>
                  <div class="swipeout-actions-right">
                    <a href="#" class="delBtn" onclick="delSpeAlmReport_en(this)">Delete</a>
                  </div>
                </li>`;
            }
        } else {
            requestUser_en();
            return false;
        }
        $("#schedule_weeklytable ul").append(html);
    }

    function _error(e) {
        // console.log(e);
    }
}
//特定排表删除
function delSpeAlmReport_en(that) {
    myApp.dialog.confirm("Whether to delete this particular schedule", "Tips", function() {
        var dt = $(that).parent().siblings();
        let deleteJson = {
            getDataTable: "SpeAlmReport",
            ifName: "id",
            ifValue: $(dt).attr("dataid"),
            type: "number"
        };
        publicAjax_en(deleteJson, "/api/GWServiceWebAPI/deleteEquipGroup", 5);
    });
}

function newlyBuildSpeAlmReport_en(tThatParent, status) {
    if (status == 1) myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Specific Scheduling Modifications&index=1&table=schedule_weeklytable&username=" + $(tThatParent).find("div:eq(0)").text() + "&stime=" + $(tThatParent).find("div:eq(1)").text() + "&etime=" + $(tThatParent).find("div:eq(2)").text() + "&dataid=" + $(tThatParent).attr("dataid"));
    else myApp.router.navigate("/mobile-en/scheduleModify_en/?title=Specific Scheduling Modifications&index=2&table=schedule_weeklytable");
}
//switchMenu_en
function switchMenu_en(dt) {
    let idObj = $(dt).attr("href")
    $(idObj).removeClass("displayNone").siblings("section").addClass("displayNone");
    switch (idObj) {
        case "#schedule_user":
            requestUser_en();
            break;
        case "#schedule_equip":
            requestEquipGroup_en();
            break;
        case "#schedule_administartor":
            requestEGAlmReport_en();
            break;
        case "#schedule_specificDate":
            requestWeekAlmReport_en();
            break;
        case "#schedule_weeklytable":
            requestSpeAlmReport_en();
            break;
    }
}
//字符串处理
function weekReturn_en(week) {
    var weekString;
    switch (week) {
        case 0:
            weekString = "Daily";
            break;
        case 2:
            weekString = "Monday";
            break;
        case 3:
            weekString = "Tuesday";
            break;
        case 4:
            weekString = "Wednesday";
            break;
        case 5:
            weekString = "Thursday";
            break;
        case 6:
            weekString = "Friday";
            break;
        case 7:
            weekString = "Saturday";
            break;
        case 1:
            weekString = "Sunday";
            break;
        case "每天" || "Daily":
            weekString = 0;
            break;
        case "星期一" || "Monday":
            weekString = 2;
            break;
        case "星期二" || "Tuesday":
            weekString = 3;
            break;
        case "星期三" || "Wednesday":
            weekString = 4;
            break;
        case "星期四" || "Thursday":
            weekString = 5;
            break;
        case "星期五" || "Friday":
            weekString = 6;
            break;
        case "星期六" || "Saturday":
            weekString = 7;
            break;
        case "星期日" || "Sunday":
            weekString = 1;
            break;
        default:
            break;
    }
    return weekString;
}
//日期转化
function formatDate_en(date, fmt) {
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
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero_en(str));
        }
    }
    return fmt;
};

function padLeftZero_en(str) {
    return ('00' + str).substr(str.length);
};
//删除当前控制项
function scheduleDelControl_en() {
    myApp.dialog.confirm("Whether to delete the item", "Tips", function() {});
}