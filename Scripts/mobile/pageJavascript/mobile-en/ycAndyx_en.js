function ycAndyx_en() {

    var urlstr = myApp.views.main.history,leng = urlstr.length,url = urlstr[leng - 1].split("#")[1],equip_no = url.split("&")[0],name = url.split("&")[1];
    $("#titleStats").text(name);
    realShows_en(equip_no, name);
    var searchbar = myApp.searchbar.create({
        el: '.searchbar2',
        searchContainer: ".tab",
        searchIn: '.item-title',
    });
    
}

function refresh_en(txt) {
    $(txt).scrollTop(1);
    $("#titleStats").attr("noTab", txt);
    var myScrollTop = $(txt).scrollTop();
    $(txt).addClass("searchbar-found").siblings().removeClass("searchbar-found")
    if (txt == "#ycp") {
        if (myScrollTop > 0) {
            $("#ycp").bind("scroll", function() {
                var hei = $(this).scrollTop();
                allowScroll_en(hei);
            });
        } else {
            allowScroll_en(0);
            myApp.ptr.get('#ycAndyx_en .ycAndyxPageContent').destroy();
        }
        $("#set").unbind("scroll");
        $("#yxp").unbind("scroll");
    } else if (txt == "#yxp") {
        if (myScrollTop > 0) {
            $("#yxp").bind("scroll", function() {
                var hei = $(this).scrollTop();
                allowScroll_en(hei);
            });
        } else {
            allowScroll_en(0);
            myApp.ptr.get('#ycAndyx_en .ycAndyxPageContent').destroy();
        }
        $("#ycp").unbind("scroll");
        $("#set").unbind("scroll");
    } else {
        if (myScrollTop > 0) {
            $("#set").bind("scroll", function() {
                var hei = $(this).scrollTop();
                allowScroll_en(hei);
            });
        } else {
            allowScroll_en(0);
            myApp.ptr.get('#ycAndyx_en .ycAndyxPageContent').destroy();
        }
        $("#ycp").unbind("scroll");
        $("#yxp").unbind("scroll");
    }
}

function allowScroll_en(hei) {
    if (hei == 0) {
        myApp.ptr.create('.ycAndyxPageContent');
        var $ptrContent = $$('.ycAndyxPageContent');
        $ptrContent.on('ptr:refresh', function(e) {
            setTimeout(function() {
                var id = $("#titleStats").attr("noTab");
                var equip_no = $("#titleStats").attr("equip_no");
                if (id == "#ycp") {
                    serviceDatas_en("yc", equip_no)
                } else if (id == "#yxp") {
                    serviceDatas_en("yx", equip_no)
                } else {
                    tableFills_en(equip_no, "", "set");
                }
                // 加载完毕需要重置
                e.detail();
                myApp.toast.create({
                    text: '数据加载成功!',
                    position: 'center',
                    closeTimeout: 500,
                }).open();
            }, 2000);
        });
    } else {
        if (myApp.ptr.get('#ycAndyx_en .ycAndyxPageContent')) {
            myApp.ptr.get('#ycAndyx_en .ycAndyxPageContent').destroy();
        }
    }
}
//获取设备信息
var signalR_equip_no;

function realShows_en(equip_no, name) {
    var _urlCount = service + "/EquipItemCount";
    var _dataCount = "equip_no=" + equip_no + "&&userName=" + window.localStorage.userName;

    function _callBackCount(dataCount) {
        var dataCountStr = $$(dataCount).children("string").text();
        if (dataCountStr != "false") {
            var useraCount = JSON.parse(dataCountStr);
            var countAll = [];
            for (var i = 0; i < useraCount.length; i++) {
                countAll.push(parseInt(useraCount[i].count));
            }
            realHtmls_en(countAll, equip_no, name);
            //开启signalR
            signalR.connectServer(equip_no);
            signalR_equip_no = equip_no;
        }
    }
    JQajaxo("post", _urlCount, true, _dataCount, _callBackCount);
}

function realHtmls_en(countAll, equip_no, name) {
    if (countAll[0] > 0) {
        var html = '<a href="#ycp" class="tab-link " onclick="refresh_en(\'#ycp\')">Telemetry point</a>';
        $("#ycAndyx_en .tabCon").append(html);
        loadYc_en(equip_no)
    } else {
        $("#ycp").remove();
    }
    if (countAll[1] > 0) {
        var html = '<a href="#yxp" class="tab-link"  onclick="refresh_en(\'#yxp\')">Remote point</a>';
        $("#ycAndyx_en .tabCon").append(html);
        loadYx_en(equip_no)
    } else {
        $("#yxp").remove();
    }
    if (countAll[2] > 0) {
        var html = '<a href="#set" class="tab-link "  onclick="refresh_en(\'#set\')">Set up</a>';
        $("#ycAndyx_en .tabCon").append(html);
        loadSet_en(equip_no)
    } else {
        $("#set").remove();
    }
    $(".tabCon a").eq(0).addClass("tab-link-active");
    $("#tabs .tab").eq(0).addClass("tab-active");
    $("#titleStats").attr("noTab", $(".tabCon a").eq(0).attr("href"));
    setTimeout(function() {
        refresh_en($(".tabCon a").eq(0).attr("href"))
    }, 500)
}
var titleStatID;

function loadYc_en(equip_no) {
    serviceDatas_en("yc", equip_no);
}

function loadYx_en(equip_no) {
    serviceDatas_en("yx", equip_no);
}

function loadSet_en(equip_no) {
    tableFills_en(equip_no, "", "set");
}

function serviceDatas_en(tabList, equip) {
    titleStatID = 'titleStats'; //设备状态
    var expression = '$E(' + equip + ')';
    var _urlExpre = service + "/ExpressionEval";
    var _dataExpre = "expression=" + expression + "&&userName=" + window.localStorage.userName;

    function _successExpre(data) {
        var text = $(data).text();
        var textAlarm = '';
        switch (text) {
            case '0':
                textAlarm = 'No communication';
                break;
            case '1':
                textAlarm = 'normal';
                break;
            case '2':
                textAlarm = 'There is alarm.';
                break;
            case '3':
                textAlarm = 'Settings in progress';
                break;
            case '4':
                textAlarm = 'Initialization in progress';
                break;
            case '5':
                textAlarm = 'Withdrawal';
        }
        $('#' + titleStatID).attr('equip_no', equip);
        $('#' + titleStatID).attr('textAlarm', text);
        tableFills_en(equip, text, tabList); //第一次载入数据
    }
    JQajaxo("post", _urlExpre, true, _dataExpre, _successExpre);
}

function tableFills_en(equip, alarm, tabList) {
    var _url = service + "/GetRealTimeData";
    if (tabList == "yc") {
        var _dataYcp = "equip_no=" + equip + "&&table_name=ycp";
        JQajaxo("post", _url, true, _dataYcp, _successfYcp);

        function _successfYcp(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                jsonTodata_en(resultJs, "ycp", alarm);
            }
        }
    }
    if (tabList == "yx") {
        var _dataYxp = "equip_no=" + equip + "&&table_name=yxp";
        JQajaxo("post", _url, true, _dataYxp, _successfYxp);

        function _successfYxp(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                jsonTodata_en(resultJs, "yxp", alarm);
            }
        }
    }
    if (tabList == "set") {
        setTodata_en(equip);
    }
}

function jsonTodata_en(data, tableName, alarm) {
    var usera = JSON.parse(data);
    if (tableName == "ycp") {
        $("#" + tableName).html("");
        for (var i = 0; i < usera.length; i++) {
            dataCurve[i] = [usera[i].m_YCValue, usera[i].m_Unit]
            var alarmImg = '';
            if (alarm != '0') {
                if (usera[i].m_IsAlarm == 'False' || usera[i].m_IsAlarm == false) {
                    alarmImg = 'comOk';
                } else {
                    alarmImg = 'alarm';
                }
            } else {
                alarmImg = 'alarm';
            }
            var newRow = `<li class="row oneLine no-gap" id="m_alarmycps_${usera[i].m_iYCNo}">
                            <div class="col-15 iconWrap">
                                <i class="iconfont icon-dian ${alarmImg}"></i>
                            </div>
                            <div class="item-title col-70 " id="valueycps_${usera[i].m_iYCNo}">
                                <span class="name">${usera[i].m_YCNm}</span>
                                <span class="val">${usera[i].m_YCValue}${usera[i].m_Unit}</spn>
                            </div>
                            <div class="col-15 iconWrap" onclick="curveBox_en(${i},'${usera[i].m_YCNm}',this)">
                                <i class="iconfont icon-tubiaofenxi"></i>
                            </div>
                        </li>`;
            if (alarmImg == 'alarm') {
                $("#" + tableName).prepend(newRow);
            } else {
                $("#" + tableName).append(newRow);
            }
        }
    } else {
        $("#" + tableName).html("");
        for (var j = 0; j < usera.length; j++) {
            var alarmImg = '';
            if (alarm != '0') {
                if (usera[j].m_IsAlarm == 'False' || usera[j].m_IsAlarm == false) {
                    alarmImg = 'comOk';
                } else {
                    alarmImg = 'alarm';
                }
            } else {
                alarmImg = 'alarm';
            }
            var newRow = `<li class="row oneLine no-gap" id="m_alarmyxps_${usera[j].m_iYXNo }">
                            <div class="col-15 iconWrap">
                                <i class="iconfont icon-dian ${alarmImg}"></i>
                            </div>
                            <div class="item-title col-85" id="valueyxps_${usera[j].m_iYXNo}">
                                <span class="name">${usera[j].m_YXNm}</span>
                                <span class="val">${usera[j].m_YXState}</spn>
                            </div>
                        </li>`;
            if (alarmImg == 'alarm') {
                $("#" + tableName).prepend(newRow);
            } else {
                $("#" + tableName).append(newRow);
            }
        }
    }
}
//获取设置表数据
function setTodata_en(equip) {
    if (Control_Equip_List(equip) || Control_SetItem_List(equip, false)) {
        var _url = service + "/GetSystemConfig";
        var _dataSet = "equip_no_list=" + equip + "&&table_name=SetParm";
        JQajaxo("post", _url, true, _dataSet, _successfSet);

        function _successfSet(data) {
            $("#set .tabContent").html("");
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtn_en(resultJs, equip);
            }
        }
    } else {}
}
//创建设置表按钮
function jsonTobtn_en(data, confarr) {
    $("#set ").html("");
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
            var newRow = `<li class="link" onclick="onSetClickBtn_en(${confarr},'${userc[1]}','${userc[2]}','${userc[3]}','${userc[0]}','${userc[4]}')">
                            <p class="name item-title">${userc[0]}</p>
                        </li>`
            $("#set ").append(newRow);
        }
    }
}

function onSetClickBtn_en(str_1, str_2, str_3, str_4, btnName, str_5) {
    if (str_5 == "V") {
        myApp.dialog.create({
            title: btnName,
            text: "Set values:<br><input type=\"text\" class=\"modal-text-input\" id=\"setValues\" value=\"" + str_4 + "\">",
            buttons: [{
                text: 'Cancel'
            }, {
                text: 'Confirm',
                onClick: function() {
                    if ($("#setValues").val() != "") {
                        onSetCommand_en(str_1, str_2, str_3, $("#setValues").val(), btnName);
                    }
                }
            }]
        }).open();
    } else {
        myApp.dialog.create({
            title: btnName,
            text: 'Are you sure you want to operate?',
            buttons: [{
                text: 'Cancel'
            }, {
                text: 'Confirm',
                onClick: function() {
                    onSetCommand_en(str_1, str_2, str_3, str_4, btnName);
                }
            }]
        }).open();
    }
}
//设置命令-确定
function onSetCommand_en(str_1, str_2, str_3, str_4, dt) {
    var vals = "";
    if (str_4 == "") {
        vals = $("#setValues").val();
    } else {
        vals = str_4;
    }
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(vals) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            setTimeout(function() {
                refreshDatas_en();
            }, 3500);
        }
    }
}
//曲线点
var curveDrop = -5;
//遥测表曲线值
var dataCurve = new Array();
//动态数据
var dynamicCurve;

function curveBox_en(number, nameCurve, dts) {
    var curveHeight = 300; //曲线高度
    myApp.request.get("plug/popoverCurve.html", "", function(data) {
        var popoverHTML = data;
        myApp.popover.create({
            targetEl: "#ycp",
            content: popoverHTML,
        }).open();
        $("#poverCurveTitle").html(nameCurve);
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        $(".poverCurve").css({
            "width": "95%",
            "top": "50%",
            "left": "50%",
            "transform": "translate(-50%,-50%)"
        })
        $('#highcharts').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                height: curveHeight,
                events: {
                    load: function() {
                        clearInterval(dynamicCurve);
                        var series = this.series[0];
                        var yVals = 0;
                        !isNaN(yVals) ? yVals = parseFloat(dataCurve[number][0]) : yVals = 0;
                        var x = (new Date()).getTime(),
                            y = yVals;
                        series.addPoint([x, y], true, true);
                        dynamicCurve = setInterval(function() {
                            if ($("#poverCurveTitle").length < 1) {
                                clearInterval(dynamicCurve);
                                signalR.connectServer(signalR_equip_no);
                                return;
                            }
                            refreshDatas_en();
                            !isNaN(yVals) ? yVals = parseFloat(dataCurve[number][0]) : yVals = 0;
                            x = (new Date()).getTime(), y = yVals;
                            series.addPoint([x, y], true, true);
                        }, 2000);
                    }
                },
                backgroundColor: 'none'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 120,
                style: {
                    color: '#000'
                },
                labels: {
                    style: {
                        color: '#000'
                    }
                },
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                        color: '#000'
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    style: {
                        color: '#000'
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: 'Current value:',
                data: (function() {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    for (i = curveDrop, j = 0; i <= 0; i++, j++) {
                        data.push({
                            x: time + i * 1000,
                            y: null
                        });
                    }
                    return data;
                })()
            }]
        });
    })
}
//刷新遥测表，遥信表数据
function refreshDatas_en() {
    var equip_no = $('#' + titleStatID).attr('equip_no');
    if (equip_no == undefined) {
        return;
    }
    var alarm = $('#' + titleStatID).attr('textAlarm');
    var _url = service + "/GetRealTimeData";
    var _dataYcp = "equip_no=" + equip_no + "&&table_name=ycp";
    JQajaxo("post", _url, true, _dataYcp, _successfYcp);
    var _dataYxp = "equip_no=" + equip_no + "&&table_name=yxp";
    JQajaxo("post", _url, true, _dataYxp, _successfYxp);

    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            ycpToHtml(resultJs);
        }
    }

    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            yxpToHtml(resultJs);
        }
    }

    function ycpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCValue, userb.m_AdviceMsg, userb.m_YCNm, userb.m_Unit);
            dataCurve[i] = new Array(userb.m_YCValue, userb.m_Unit);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'comOk';
                } else {
                    alarmImg = 'alarm';
                }
            } else {
                alarmImg = 'alarm';
            }
            $('#m_alarmycps_' + userb.m_iYCNo).find("i.icon-dian").addClass(alarmImg);
            $("#valueycps_" + userb.m_iYCNo).find(".val").html(userc[1] + userc[4]);
            if (alarmImg == 'alarm') { //有报警置顶
                var dom = $("#valueycps_" + userb.m_iYCNo).parent();
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }
    //
    function yxpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YXState, userb.m_AdviceMsg);
            var alarmImg = '';
            if (alarm != '0') {
                if (userc[0] == 'False' || userc[0] == false) {
                    alarmImg = 'comOk';
                } else {
                    alarmImg = 'alarm';
                }
            } else {
                alarmImg = 'alarm';
            }
            $('#m_alarmyxps_' + userb.m_iYXNo).find('i.icon-dian').addClass(alarmImg);
            $("#valueyxps_" + userb.m_iYXNo).find(".val").html(userc[1]);
            if (alarmImg == 'HaveAlarm') {
                var dom = $("#valueyxps_" + userb.m_iYXNo).parent();
                var doms = dom.parent();
                dom.remove();
                doms.prepend(dom);
            }
        }
    }
}