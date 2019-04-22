function videoControl() {
    // var map, infoPoint = [
    //     [113.960046, 22.535688, 4007, 1],
    //     [113.922468, 22.497125, 4007, 2]
    // ]; //经纬度+设备号+通道号
    var myIcon = new BMap.Icon("../../Image/Camera.png", new BMap.Size(40, 60));
    initBaiduMap();

    function initBaiduMap() {
        map = new BMap.Map("container", {
            enableMapClick: false
        });
        for (var i = 0; i < infoPoint.length; i++) {
            map.centerAndZoom(new BMap.Point(infoPoint[i][0], infoPoint[i][1]), 13);
            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(top_left_control);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.MapTypeControl());
            map.enableScrollWheelZoom(); // 启用滚轮放大缩小。
            map.enableKeyboard(); // 启用键盘操作
            map.disableDoubleClickZoom(); // 禁用双击放大
            AddMarker(infoPoint[i]);
        }
    }
    //添加标注
    function AddMarker(infoPoint) {
        var stringValue = infoPoint[0] + "," + infoPoint[1];
        var marker = new BMap.Marker(StringToPoint(stringValue), {
            icon: myIcon
        });
        marker.addEventListener("click", function() {
            equipVideo(infoPoint[2], infoPoint[3], "");
        }, false);
        map.addOverlay(marker);
    }
}
//处理经纬度数据
function returnFloat(element) {
    return parseFloat(element, 10)
}
//字符串转经纬度
function StringToPoint(Data) {
    var PointData = Data.split(',').map(returnFloat);
    return new BMap.Point(PointData[0], PointData[1]);
}
//字符串转数组
function StringToArray(Data) {
    var PointData = Data.split(',').map(returnFloat);
    return [PointData[0], PointData[1]];
}
//在调用前确保服务可连接
function ConnectService() {
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/ConnectService",
        timeout: 5000,
        data: {
            user_name: "admin",
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            GetDataFromSQL();
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时
                ajaxVar.abort();
                //console.log("超时");
                XMLHttpRequest = null;
            }
        },
        error: function() {
            // console.log("连接服务器错误");
        }
    });
}
//在调用前请确保数据库中有表以及相应字段和数据
function GetDataFromSQL() {
    $.ajax({
        type: "post",
        url: "/GWService.asmx/GetDataTableFromSQL", //调用数据库接口
        async: false,
        data: {
            sql: "select * from GWWebMapMarker", //SQL语句
            userName: "admin"
        },
        success: function(data) {
            if ($(data).find('shen').length > 0) {
                var markerInfo;
                $(data).find('shen').each(function(i) {
                    markerInfo = new Object();
                    markerInfo.Name = $(this).children('MarkerName').text();
                    markerInfo.LngLat = $(this).children('Position').text();
                    AddMarker(markerInfo);
                })
            } else {
                alert("未找到数据");
            }
        }
    });
}
// *******************************video***************************************
var tableVideoConfig;

function equipVideo(equip_no, ID, dll) {
    var _url = service + "/VideoConfigs";
    var _data = "data=equip";

    function _sccess(data) {
        tableVideoConfig = new Array();
        var result = $$(data).children("string").text();
        if (result != "false") {
            var newRow = "";
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonStringParent = JSON.stringify(userb); //111
                if (userb.equip_no == equip_no) {
                    videoListLiMap(equip_no, ID, dll, jsonStringParent);
                }
            }
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}
//添加节点   GW_VideoInfo
function videoListLiMap(equip_no, ID, dll, jsonStringParent) {
    var _url = service + "/VideoConfigs";
    var _data = "data=" + equip_no;

    function _sccess(data) {
        var result = $(data).children("string").text();
        if (result != "false") {
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonStringChild = JSON.stringify(userb); //222
                if (userb.ID == ID) videoListClickMap(jsonStringParent, jsonStringChild, dll);
            }
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}
//节点事件
function videoListClickMap(jsonStringParent, jsonStringChild, dll) {
    if (dll == 'HikYun.NET.dll') {
        var address = '';
        var equip_no = $(dt).attr('equip_no');
        var ids = $(dt).attr('ids');
        var accessToken = $(dt).parent().parent().attr('accessToken');
        var appkey = $(dt).parent().parent().attr('appkey');
        var appsecret = $(dt).parent().parent().attr('appsecret');
        var ChannelType = $(dt).attr('ChannelType');
        var ChannelNum = $(dt).attr('ChannelNum');
        var datas = {
            'accessToken': accessToken,
            'appkey': appkey,
            'appsecret': appsecret,
            'ChannelNum': ChannelNum,
            'ChannelType': ChannelType,
            'cameraName': titleName
        }
        var jsonString = JSON.stringify(datas);
        try {
            myJavaFun.HikYunVideoShow(jsonString);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    }
    if (dll == 'Hik8700.NET.dll') {
        var equip = jsonStringParent;
        var video = jsonStringChild;
        var json = '{"equip":' + equip + ',"video":' + video + '}';
        try {
            myJavaFun.Hik8700VideoShow(json);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    } else {
        var equip = jsonStringParent;
        var video = jsonStringChild;
        var json = '{"equip":' + equip + ',"video":' + video + '}';
        // console.log(json);
        try {
            myJavaFun.VideoShow(json);
        } catch (ex) {
            alert('请更新APP客户端或者使用APP客户端打开！');
        }
    }
}

function onVideoClick() {
    var video = document.getElementById("videoPlay");
    if (video.controls) {
        video.controls = false;
    } else {
        video.controls = true;
    }
}
//控制按钮
function controlsBtnMap(equip_no, Video_id) {
    if (Control_Equip_List(equip_no) || Control_SetItem_List(equip_no, false)) {
        $('.videoControls').find('a').each(function() {
            var values = $(this).attr('values');
            $(this).attr('ontouchstart', 'onSetCommand_Map(' + equip_no + ',"' + Video_id + '","' + values + '","true","' + window.localStorage.userName + '")');
            $(this).attr('ontouchend', 'onSetCommand_Map(' + equip_no + ',"' + Video_id + '","' + values + '","false","' + window.localStorage.userName + '")');
        });
        $('.videoControls2').find('img').each(function() {
            var values = $(this).attr('values');
            $(this).attr('ontouchstart', 'onSetCommand_Map(' + equip_no + ',"' + Video_id + '","' + values + '","true","' + window.localStorage.userName + '",this)');
            $(this).attr('ontouchend', 'onSetCommand_Map(' + equip_no + ',"' + Video_id + '","' + values + '","false","' + window.localStorage.userName + '",this)');
        });
    }
}
//设置命令-确定
function onSetCommand_Map(str_1, str_2, str_3, str_4, dt, thisDom) {
    if (thisDom) {
        var act = $(thisDom).attr('actives').split('_');
        if (act[1] == "j") {
            var imgNm = act[0] + '_jv_' + act[2];
            $(thisDom).attr('actives', imgNm);
            $(thisDom).attr('src', '/Image/video/' + imgNm + '.png');
        } else {
            var imgNm = act[0] + '_j_' + act[2];
            $(thisDom).attr('actives', imgNm);
            $(thisDom).attr('src', '/Image/video/' + imgNm + '.png');
        }
    }
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(str_4) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);

    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {}
    }
}