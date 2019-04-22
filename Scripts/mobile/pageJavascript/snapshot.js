var event_Level_list,btnInfoNames = [],btnInfoLevels = [],timeInterval;
function snapshot() {

    switchToolbar("snapshotTool");
    var snapashot_ptr = $$('.snapashot-page-content');
    snapashot_ptr.on("ptr:refresh", refreshpg);
    myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>');
    initData();
}
//获取事件的报警配置
function initData() {
     btnInfoNames.length = 0,btnInfoLevels.length = 0;
    $.ajax({
        type: 'post',
        url: '/api/event/alarm_config',
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
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
                        event_Level_list += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames.push(resultData[i].SnapshotName)
                        btnInfoLevels.push(btnValue);
                    }
                }
                event_Level_list = event_Level_list.substring(0, event_Level_list.length - 1);
                getRealTimeEventCount();
            }
        }
    });
}
//获取当前实时报警事件的总数
function getRealTimeEventCount() {
    var strBtnInfoLevels = "";
    for (var i = 0; i < btnInfoLevels.length; i++) {
        strBtnInfoLevels += btnInfoLevels[i] + "/";
    }
    if (strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if (dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data,resultDataArr = resultData.toString().split(","),strData = "", iconData="";
                    for (var i = 0; i < resultDataArr.length; i++) {
                    	if(i==0){
                    		iconData="icon-web-cuowu";
                    	}else if(i==1){
                    		iconData="icon-web-jingshimian";
                    	}else if(i==2){
                    		iconData="icon-web-xinxiinfo21";
                    	}else if(i==3){
                    		iconData="icon-web-shezhi";
                    	}else if(i==4){
                    		iconData="icon-web-assets";
                    	}
                        strData += '<li>' + '<a href="/snapShotDetail/?' + judgeSnapshotName(btnInfoNames[i]) + '&' + btnInfoLevels[i] + '" class="item-link item-content">' + '	<div class="item-media"><i class="iconfont ' + iconData + '"></i></div>' + '	<div class="item-inner" id="snapShotDetail_0">' + '		<div class="item-title">' + judgeSnapshotName(btnInfoNames[i]) + '</div>' + '		<div class="item-after"><span class="badge">' + resultDataArr[i] + '</span></div>' + '	</div>' + '</a>' + '</li>';
                    }
                    $("#snapshotMenuListId").html(strData);
                    myApp.dialog.close();
                }
            }
        });
    }
}

function refreshpg(e) {
    setTimeout(function() {
        getRealTimeEventCount();
        // 加载完毕需要重置
        myApp.ptr.done();
        myApp.toast.create({
            text: '数据加载成功!',
            position: 'center',
            closeTimeout: 500,
        }).open();
    }, 2000);
}

function judgeSnapshotName(val){
    var result = "";
     switch(val)
     {
        case "故障": result =window.localStorage.languageList == 1?"Errors":"故障";break;
        case "警告": result =window.localStorage.languageList == 1?"Warnings":"警告";break;
        case "信息": result =window.localStorage.languageList == 1?"Informations":"信息";break;
        case "设置": result =window.localStorage.languageList == 1?"Settings":"设置";break;
        case "资产": result =window.localStorage.languageList == 1?"Assets":"资产";break;

        case "Errors": result =window.localStorage.languageList == 1?"Errors":"故障";break;
        case "Warnings": result =window.localStorage.languageList == 1?"Warnings":"警告";break;
        case "Informations": result =window.localStorage.languageList == 1?"Informations":"信息";break;
        case "Settings": result =window.localStorage.languageList == 1?"Settings":"设置";break;
        case "Assets": result =window.localStorage.languageList == 1?"Assets":"资产";break;        
        default: break;
     }
     return result;
}