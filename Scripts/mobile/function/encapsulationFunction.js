//获取几天之后的日期
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    return y + "-" + m + "-" + d;
}
//时间格式化
function newDate(date) {
    var s = date;
    var ps = s.split(" ");
    var pd;
    if (ps[0].indexOf('-') > 0) {
        pd = ps[0].split("-");
    } else {
        pd = ps[0].split("/");
    }
    var pt = ps.length > 1 ? ps[1].split(":") : [0, 0, 0];
    var st = new Date(pd[0], pd[1] - 1, pd[2], pt[0], pt[1], pt[2]);
    return st;
}
//计算时间差
function dateCost(data1, data2) {
    var s1 = data1.getTime(),
        s2 = data2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
    var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60); //计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
    return day + "," + hour + "," + min + "," + afterMin;
}
//日期格式化
Date.prototype.format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * JS获取n至m随机整数
 */
function rd(n, m) {
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}

function TimeJSONToString2(dt) {
    var timeDate = new Date(dt * 1000).format("yyyy-MM-dd hh:mm:ss");
    return timeDate.toLocaleString();
}
//百度SDK位置信息回调
function locationDBData(dt) {
    window.testIframe.gpsBack(dt);
}
//微信分享id
var wxShareStr = "wxd2a573967e43f6c6";
//div分享到微信
function divShareToWX(byID) {
    myJavaFun.AppShare('', wxShareStr);
}
//图表分享到微信
function chartShareToWX(myChart) {
    myJavaFun.AppShare('', wxShareStr);
}
var classObj = {
    ToUnicode: function(str) {
        return escape(str).replace(/%/g, "\\").toLowerCase();
    },
    UnUnicode: function(str) {
        return unescape(str.replace(/\\/g, "%"));
    }
}
//扫一扫返回结果
function onRichScanCallback(dt) {
    var _url = service + "/ExecuteRichScan";
    var _data = "userName=" + window.localStorage.userName + "&&data=" + dt;

    function _success(data) {
        var str = $(data).children("string").text();
        if (str != "false") {
            realShow(str);
        }
    }
    JQajaxo("post", _url, true, _data, _success);
}
/* 
 * formatMoney(s,type) 
 * 功能：金额按千位逗号分割 
 * 参数：s，需要格式化的金额数值. 
 * 参数：type,判断格式化后的金额是否需要小数位. 
 * 返回：返回格式化后的数值字符串. 
 */
function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s)) return "0";
    if (s == null || s == "") return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) { // 不带小数位(默认是有小数位)  
        var a = s.split(".");
        if (a[1] == "00") {
            s = a[0];
        }
    }
    return s;
}
//引入javascript
function loadJs(url,callback,id){
        var script=document.createElement('script');
        script.type="text/javascript";
        script.src = url;
        script.id = id+"_1";
        document.body.appendChild(script);
        if(typeof(callback)!="undefined"){
            if(script.readyState){
                script.onreadystatechange=function(){
                    if(script.readyState == "loaded" || script.readyState == "complete"){
                        script.onreadystatechange=null;
                        callback();
                    }
                }
            }else{
                script.onload=function(){
                  callback();
                }
            }
    }
}
//获取App版本信息
function BackAppVersion(versionCode, versionName) {
    window.localStorage.versionCode = versionCode;
    window.localStorage.versionName = versionName;
}
//获取系统信息
function BackSystemInfor(phoneName, phoneModel, phoneVersion) {
    window.localStorage.phoneName = phoneName;
    window.localStorage.phoneModel = phoneModel;
    window.localStorage.phoneVersion = phoneVersion;
    try {
        myJavaFun.GetPushID(); //获取推送ID
    } catch (ex) {}
}
//获取推送ID
function BackPushID(data) {
    $.ax({
        type: 'post',
        url: '/api/jpush/add_push_id',
        data: {
            id: data,
            phoneName: window.localStorage.phoneName,
            phoneModel: window.localStorage.phoneModel,
            phoneVersion: window.localStorage.phoneVersion
        },
        success: function(dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.code == 200) {} else {
                alert('错误码：' + dt.HttpData.code + '\n错误信息：' + dt.HttpData.message);
            }
        }
    });
}
