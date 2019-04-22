
//首页
$(document).on("page:beforein", ".page[data-page='home']", function (e) {
    onHomePage();
});
//实时快照
$(document).on("page:beforein", ".page[data-page='snapshot']", function (e) {
    initPageJS('snapshot', '/Scripts/mobile/pageJavascript/');
});

//实时快照详情页
$(document).on("page:beforein", ".page[data-page='snapShotDetail']", function (e) {
    initPageJS('snapShotDetail', '/Scripts/mobile/pageJavascript/');
});

//语音
$(document).on("page:beforein", ".page[data-page='voice']", function (e) {
    initPageJS('voice', '/Scripts/mobile/pageJavascript/');
});

//设备列表
$(document).on("page:beforein", ".page[data-page='equips']", function (e) {
    initPageJS('equips', '/Scripts/mobile/pageJavascript/');
});
//配置列表加载页面
$(document).on("page:beforein", ".page[data-page='equipConfigList']", function (e) {
	
    initPageJS('equipConfigList', '/Scripts/mobile/pageJavascript/');
	
});
/*配置页面*/
$(document).on("page:beforein", ".page[data-page='sysConfigEdict']", function (e) {
	
    initPageJS('sysConfigEdict', '/Scripts/mobile/pageJavascript/');
	
});
//配置导航
$(document).on("page:beforein", ".page[data-page='systemConfig']", function (e) {
	
    initPageJS('systemConfig', '/Scripts/mobile/pageJavascript/');
	
});

//事件查询
$(document).on("page:beforein", ".page[data-page='eventSearch']", function (e) {
    initPageJS('eventSearch', '/Scripts/mobile/pageJavascript/');
});

//事件查询-详情
$(document).on("page:beforein", ".page[data-page='equipSearchDetail']", function (e) {
    initPageJS('equipSearchDetail', '/Scripts/mobile/pageJavascript/');
});

//报警排表
$(document).on("page:beforein", ".page[data-page='schedule']", function (e) {
    initPageJS('schedule', '/Scripts/mobile/pageJavascript/');
});

//设备联动
$(document).on("page:beforein", ".page[data-page='equipLinkage']", function (e) {
    initPageJS('equipLinkage', '/Scripts/mobile/pageJavascript/');
});


// 个人信息
$(document).on("page:beforein", ".page[data-page='UserInfor']", function (e) {
    initPageJS('UserInfor', '/Scripts/mobile/pageJavascript/');
});


// 设置
$(document).on("page:beforein", ".page[data-page='setPage']", function (e) {
    initPageJS('setPage', '/Scripts/mobile/pageJavascript/');
});
// 遥测和遥信
$(document).on("page:beforein", ".page[data-page='ycAndyx']", function (e) {
    initPageJS('ycAndyx', '/Scripts/mobile/pageJavascript/');
});

// 视频列表
$(document).on("page:beforein", ".page[data-page='Video']", function (e) {
    initPageJS('Video', '/Scripts/mobile/pageJavascript/');
});
//地图视频
$(document).on("page:beforein", ".page[data-page='videoControl']", function (e) {
    initPageJS('videoControl', '/Scripts/mobile/pageJavascript/');
});
// PPT
$(document).on("page:beforein", ".page[data-page='mettingPPT']", function (e) {
    initPageJS('mettingPPT', '/Scripts/mobile/pageJavascript/');
});
$(document).on("page:beforein", ".page[data-page='mettingDetails']", function (e) {
    initPageJS('mettingDetails', '/Scripts/mobile/pageJavascript/');
});
// 欢迎词
$(document).on("page:beforein", ".page[data-page='welcomeWords']", function (e) {
    initPageJS('welcomeWords', '/Scripts/mobile/pageJavascript/');
});
// 报警排表内容修改
$(document).on("page:beforein", ".page[data-page='scheduleModify']", function (e) {
    initPageJS('scheduleModify', '/Scripts/mobile/pageJavascript/');
});
// 设备联动内容修改
$(document).on("page:beforein", ".page[data-page='equipLinkageModify']", function (e) {
    initPageJS('equipLinkageModify', '/Scripts/mobile/pageJavascript/');
});
$(document).on("page:beforein", ".page[data-page='scheduleModifyChild']", function (e) {
    initPageJS('scheduleModifyChild', '/Scripts/mobile/pageJavascript/');
});


// 英文版本

//首页
$(document).on("page:beforein", ".page[data-page='home_en']", function (e) {
    onHomePage();
});
//实时快照
$(document).on("page:beforein", ".page[data-page='snapshot_en']", function (e) {
    initPageJS('snapshot_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

//实时快照详情页
$(document).on("page:beforein", ".page[data-page='snapShotDetail_en']", function (e) {
    initPageJS('snapShotDetail_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

//设备列表
$(document).on("page:beforein", ".page[data-page='equips_en']", function (e) {
    initPageJS('equips_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
//配置列表加载页面
$(document).on("page:beforein", ".page[data-page='equipConfigList_en']", function (e) {
    
    initPageJS('equipConfigList_en', '/Scripts/mobile/pageJavascript/mobile-en/');
    
});
/*配置页面*/
$(document).on("page:beforein", ".page[data-page='sysConfigEdict_en']", function (e) {
    
    initPageJS('sysConfigEdict_en', '/Scripts/mobile/pageJavascript/mobile-en/');
    
});
//配置导航
$(document).on("page:beforein", ".page[data-page='systemConfig_en']", function (e) {
    
    initPageJS('systemConfig_en', '/Scripts/mobile/pageJavascript/mobile-en/');
    
});

//事件查询
$(document).on("page:beforein", ".page[data-page='eventSearch_en']", function (e) {
    initPageJS('eventSearch_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

//事件查询-详情
$(document).on("page:beforein", ".page[data-page='equipSearchDetail_en']", function (e) {
    initPageJS('equipSearchDetail_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

//报警排表
$(document).on("page:beforein", ".page[data-page='schedule_en']", function (e) {
    initPageJS('schedule_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

//设备联动
$(document).on("page:beforein", ".page[data-page='equipLinkage_en']", function (e) {
    initPageJS('equipLinkage_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

// 个人信息
$(document).on("page:beforein", ".page[data-page='UserInfor_en']", function (e) {
    initPageJS('UserInfor_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

// 设置
$(document).on("page:beforein", ".page[data-page='setPage_en']", function (e) {
    initPageJS('setPage_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
// 遥测和遥信
$(document).on("page:beforein", ".page[data-page='ycAndyx_en']", function (e) {
    initPageJS('ycAndyx_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

// 视频列表
$(document).on("page:beforein", ".page[data-page='Video_en']", function (e) {
    initPageJS('Video_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
//地图视频
$(document).on("page:beforein", ".page[data-page='videoControl_en']", function (e) {
    initPageJS('videoControl_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
// PPT
$(document).on("page:beforein", ".page[data-page='mettingPPT_en']", function (e) {
    initPageJS('mettingPPT_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
$(document).on("page:beforein", ".page[data-page='mettingDetails_en']", function (e) {
    initPageJS('mettingDetails_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
// 欢迎词
$(document).on("page:beforein", ".page[data-page='welcomeWords_en']", function (e) {
    initPageJS('welcomeWords_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
// 报警排表内容修改
$(document).on("page:beforein", ".page[data-page='scheduleModify_en']", function (e) {
    initPageJS('scheduleModify_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
// 设备联动内容修改
$(document).on("page:beforein", ".page[data-page='equipLinkageModify_en']", function (e) {
    initPageJS('equipLinkageModify_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});
$(document).on("page:beforein", ".page[data-page='scheduleModifyChild_en']", function (e) {
    initPageJS('scheduleModifyChild_en', '/Scripts/mobile/pageJavascript/mobile-en/');
});

// test
$(document).on("page:beforein", ".page[data-page='test']", function (e) {
    initPageJS('test', '/Scripts/mobile/pageJavascript/');
});