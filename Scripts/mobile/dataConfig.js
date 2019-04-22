
// 地图视频配置
var map, infoPoint = [ //经纬度+设备号+通道号
    [113.960046, 22.535688, 20005, 2],
    [113.922468, 22.497125, 20005, 1]
];

// 系统四菜单   
var sysFourMenu = [{
    name: '事件查询',
    name_en: 'Event query',
    href_zh: '/eventSearch/',
    href_en: '/mobile-en/eventSearch_en/',
    color: '#6FF3FC 0%, #3B87F5 100%',
    icon: 'iconfont icon-xintubiao-',
    equipNo: '',
    setNo: '',
    value: null,
}, {
    name: '系统配置',
    name_en: 'System configuration',
    href_zh: '/equipConfigList/',
    href_en: '/mobile-en/equipConfigList_en/',
    color: ' #A1E695 0%, #ADBF0B 100%',
    icon: 'iconfont icon-navicon-xtpz',
    equipNo: '',
    setNo: '',
    value: null,
}, {
    name: '报警排表',
    name_en: 'Alarm schedule',
    href_zh: '/schedule/',
    href_en: '/mobile-en/schedule_en/',
    color: ' #FFAF99 0%, #FC8F4C 53%, #FF4CA0 100%',
    icon: 'iconfont icon-paibiao',
    equipNo: '',
    setNo: '',
    value: null,
}, {
    name: '设备联动',
    name_en: 'Equipment linkage',
    href_zh: '/equipLinkage/',
    href_en: '/mobile-en/equipLinkage_en/',
    color: '#FFE27A 0%, #F7A474 100%',
    icon: 'iconfont icon-app_icons--',
    equipNo: '',
    setNo: '',
    value: null,
},
];

// 常用
var commonlyUsed = [
{
    name: '场景配置',
    name_en: 'Equipment linkage',
    href_zh: '/equipLinkage/',
    href_en: '/mobile-en/equipLinkage_en/',
    color: '#FFE27A 0%, #F7A474 100%',
    icon: 'iconfont icon-app_icons--',
    equipNo: '',
    setNo: '',
    value: null,
},
{
    name: '列表视频',
    name_en: 'List video',
    href_zh: '/Video/',
    href_en: '/mobile-en/Video_en/',
    color: ' #7AFFAE 0%, #7AD0FF 100%',
    icon: 'iconfont icon-f7_video',
    equipNo: '',
    setNo: '',
    value: null,
}, {
    name: '地图监控',
    name_en: 'Map monitoring',
    href_zh: '/videoControl/',
    href_en: '/mobile-en/videoControl_en/',
    color: ' #976FFC 0%, #6FB7FC 100%',
    icon: 'iconfont icon-f7_control',
    equipNo: '',
    setNo: '',
    value: null,
}, {
    name: 'PPT设置',
    name_en: 'PPT',
    href_zh: '/mettingPPT/',
    href_en: '/mobile-en/mettingPPT_en/',
    color: ' #6FF3FC 0%, #3B87F5 100%',
    icon: 'iconfont icon-f7_ppt',
    equipNo: '',
    setNo: '',
    value: null,
}];
var welComePage = [{
    name: '欢迎词',
    name_en: 'Welcome speech',
    href_zh: '/welcomeWords/',
    href_en: '/mobile-en/welcomeWords_en/',
    color: ' #FFAF99 0%, #FC8F4C 53%, #FF4CA0 100%',
    icon: 'iconfont icon-f7_welcome',
    equipNo: '',
    setNo: '',
    value: null,
}];



// 列表数据模型
var KOvm = [{
        name: '返回软件',
        name_en: 'Return software',
        icon: 'iconfont icon-f7_home',
        equipNo: '300',
        setNo: '10',
        color: '#8bc3ef,#3c81b7',
        value: null,
    }, {
        name: '智能建筑',
        name_en: 'Intelligent building',
        icon: 'iconfont icon-f7_icon_jz',
        equipNo: '300',
        setNo: '2',
        color: '#d49ca8,#f50538',
        value: null,
    }, {
        name: '乐从环保首页',
        name_en: 'Lecong environmental protection',
        icon: 'iconfont icon-f7_icon_hb',
        equipNo: '300',
        setNo: '31',
        color: '#d7b1ea,#a40df3',
        value: null,
    }, {
        name: '乐从河流监测',
        name_en: 'Lecong River Monitoring',
        icon: 'iconfont icon-f7_icon_hl',
        equipNo: '300',
        setNo: '32',
        color: '#96d2e6,#00BAF9',
        value: null,
    }, {
        name: '乐从河流报警',
        name_en: 'Lecong River Alarm',
        icon: 'iconfont icon-f7_icon_bj',
        equipNo: '300',
        setNo: '33',
        color: '#f5999e,#F22834',
        value: null,
    }, {
        name: '开闸排污',
        name_en: 'Sluice discharge',
        icon: 'iconfont icon-f7_icon_pw',
        equipNo: '300',
        setNo: '34',
        color: '#f1d499,#f3ac1e',
        value: null,
    }, {
        name: '数据中心',
        name_en: 'Data center',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '3',
        color: '#eca7a0,#FC6758',
        value: null,
    }, {
        name: '智能交通',
        name_en: 'Intelligent Transportation',
        icon: 'iconfont icon-f7_icon_jt',
        equipNo: '300',
        setNo: '4',
        color: '#b8e29d,#55a91f',
        value: null,
    }, {
        name: '智能电网',
        name_en: 'Smart grid',
        icon: 'iconfont icon-f7_icon_dw',
        equipNo: '300',
        setNo: '11',
        color: '#efd29c,#e29b12',
        value: null,
    }, {
        name: '能源系统',
        name_en: 'Energy system',
        icon: 'iconfont icon-f7_icon_dsj1',
        equipNo: '300',
        setNo: '17',
        color: '#d0f3b2,#6cde08',
        value: null,
    }, {
        name: '智慧监狱',
        name_en: 'Wisdom prison',
        icon: 'iconfont icon-f7_icon_jy',
        equipNo: '300',
        setNo: '18',
        color: '#a6dbe0,#22bbca',
        value: null,
    }, {
        name: '戒毒所模式',
        name_en: 'Drug Rehabilitation Center Model',
        icon: 'iconfont icon-f7_icon_jd',
        equipNo: '300',
        setNo: '25',
        color: '#ecd5a7,#FBB730',
        value: null,
    }, {
        name: '智慧城管',
        name_en: 'Smart City Administration',
        icon: 'iconfont icon-f7_icon_cg',
        equipNo: '300',
        setNo: '81',
        color: '#bacea3,#7cbd31',
        value: null,
    }, {
        name: '智慧公交',
        name_en: 'Smart bus',
        icon: 'iconfont icon-f7_icon_gj',
        equipNo: '300',
        setNo: '82',
        color: '#a6f1ed,#16cdea',
        value: null,
    }, {
        name: '城市3D',
        name_en: 'City 3D',
        icon: 'iconfont icon-f7_icon_3d3d',
        equipNo: '300',
        setNo: '83',
        color: '#e09c96,#e81c08',
        value: null,
    }, {
        name: '智慧环保',
        name_en: 'Wisdom and environmental protection',
        icon: 'iconfont icon-f7_icon_hbxx',
        equipNo: '300',
        setNo: '84',
        color: '#ecdc93,#e8c118',
        value: null,
    }, {
        name: '智慧影院',
        name_en: 'Smart cinema',
        icon: 'iconfont icon-f7_icon_3d',
        equipNo: '300',
        setNo: '85',
        color: '#eaafc5,#FE2F7D',
        value: null,
    }, {
        name: '大数据',
        name_en: 'Big data',
        icon: 'iconfont icon-f7_icon_dj',
        equipNo: '300',
        setNo: '86',
        color: '#a4cce8,#1095f3',
        value: null,
    }, {
        name: '智慧电梯',
        name_en: 'Intelligent elevator',
        icon: 'iconfont icon-f7_icon_dt',
        equipNo: '300',
        setNo: '92',
        color: '#de98aa,#e00f44',
        value: null,
    }, {
        name: '智慧工厂',
        name_en: 'Smart factory',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '100',
        color: '#9fd9de,#03B8C9',
        value: null,
    }, {
        name: '智慧小镇',
        name_en: 'Smart Town',
        icon: 'iconfont icon-f7_equipList',
        equipNo: '300',
        setNo: '98',
        color: '#ec9da6,#ec263c',
        value: null,
    }, {
        name: '智慧城市',
        name_en: 'Smart city',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '99',
        color: '#d3b4ea,#9e2aea',
        value: null,
    }, {
        name: '城市管控',
        name_en: 'City management and control',
        icon: 'iconfont icon-f7_icon_gk',
        equipNo: '300',
        setNo: '2000',
        color: '#e8cea1,#FBB132',
        value: null,
    }, {
        name: '智慧照明',
        name_en: 'Intelligent lighting',
        icon: 'iconfont icon-f7_icon_zm',
        equipNo: '300',
        setNo: '101',
        color: '#98b3ec,#0a52ea',
        value: null,
    }, {
        name: '欢迎词',
        name_en: 'Welcome speech',
        icon: 'iconfont icon-f7_welcome',
        equipNo: '300',
        setNo: '10112',
        color: '#86bfe8,#2093e8',
        value: null,
    },
    {
        name: '消防报警',
        name_en: 'Fire alarm',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10107',
        color: '#8ed5ec,#0baee4',
        value: null,
    },
    {
        name: '消防恢复正常',
        name_en: 'Fire Protection returned to normal',
        icon: 'iconfont icon-f7_icon_hf',
        equipNo: '300',
        setNo: '6',
        color: '#b5a1ec,#460de0',
        value: null,
    },
    {
        name: '防区报警',
        name_en: 'Defense alarm',
        icon: 'iconfont icon-f7_icon_fq',
        equipNo: '300',
        setNo: '10106',
        color: '#23407d,#3961B6',
        value: null,
    },
    {
        name: '空调报警',
        name_en: 'Air conditioning alarm',
        icon: 'iconfont icon-f7_icon_kt',
        equipNo: '300',
        setNo: '10105',
        color: '#dec9a8,#FCB540',
        value: null,
    },
    {
        name: '(总)前台监控',
        name_en: 'Headquarters Front Desk Monitoring',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '1005',
        setNo: '1500',
        color: '#d3f3b5,#82d632',
        value: null,
    },
    {
        name: '(总)会议室监控',
        name_en: 'Headquarters conference room monitoring',
        icon: 'iconfont icon-f7_icon_hys',
        equipNo: '1005',
        setNo: '1000',
        color: '#e99bef,#e420d5',
        value: null,
    },
    {
        name: '展厅监控',
        name_en: 'Exhibition hall monitoring',
        icon: 'iconfont icon-f7_icon_jk',
        equipNo: '300',
        setNo: '10096',
        color: '#f1c7a4,#ea7815',
        value: null,
    },
    {
        name: '欢迎模式',
        name_en: 'Welcome mode',
        icon: 'iconfont icon-f7_icon_xf',
        equipNo: '300',
        setNo: '10112',
        color: '#93aeea,#1b60f1',
        value: null,
    },
    {
        name: '宣传片播放',
        name_en: 'Town Live Demonstration',
        icon: 'iconfont icon-f7_icon_xz',
        equipNo: '300',
        setNo: '10093',
        color: '#a2d3e4,#12afe8',
        value: null,
    },
];

//首页PPT
var pptPattern = [{
    name: '打开PPT',
    name_en: 'Open PPT',
    color: '#9cd5ea,#1892bd',
    icon: 'iconfont icon-f7_ppt',
    equipNo: '4001',
    setNo: '1',
    value: 'D:\/PPT\/123.pptx',
}, {
    name: '关闭',
    name_en: 'Close PPT',
    color: '#9cd5ea,#1892bd',
    icon: 'iconfont icon-f7_c_l',
    equipNo: '4001',
    setNo: '7',
    value: null,
}, {
    name: '上一页',
    name_en: 'Previous page',
    color: '#9cd5ea,#1892bd',
    icon: 'iconfont icon-f7_prev',
    equipNo: '4001',
    setNo: '2',
    value: null,
}, {
    name: '下一页',
    name_en: 'Next page',
    color: '#9cd5ea,#1892bd',
    icon: 'iconfont icon-f7_next',
    equipNo: '4001',
    setNo: '3',
    value: null,
}, ];

//讲解模式
var jjPattern = [{
    name: '开始讲解',
    name_en: 'Explain',
    color: '#e4c586,#e89e08',
    icon: 'iconfont icon-f7_jj',
    equipNo: '1007',
    setNo: '1',
    value: null,
}, {
    name: '停止讲解',
    name_en: 'Stop',
    color: '#e4c586,#e89e08',
    icon: 'iconfont icon-f7_s_t',
    equipNo: '1007',
    setNo: '2',
    value: null,
}, {
    name: '暂停讲解',
    name_en: 'Suspend',
    color: '#e4c586,#e89e08',
    icon: 'iconfont icon-f7_stop_0',
    equipNo: '1007',
    setNo: '3',
    value: null,
}, {
    name: '继续讲解',
    name_en: 'Continue',
    color: '#e4c586,#e89e08',
    icon: 'iconfont icon-f7_j_x',
    equipNo: '1007',
    setNo: '4',
    value: null,
}, ];
// 欢迎词
var WORDcommand = {
    "backgroundImage": {
        name: '背景图片',
        name_en: 'Background picture',
        url: 'D:\\AlarmCenter\\Web\\Image\\bg', 
    },
    "Priviewwel": {
        name: '预览欢迎词',
        name_en: 'Preview Welcome Speech',
        equipNo: '1005',
        setNo: '4022'
    },
    "closewel": {
        name: "关闭欢迎词",
        name_en: 'Close the Welcome Speech',
        equipNo: '1005',
        setNo: '4021'
    },
};
// PPT配置
var PPTcommand = {
    "returnSoft": {
        name: '返回软件',
        name_en: 'Return software',
        equipNo: '300',
        setNo: '10108'
    },
    "openPPT": {
        name: '打开PPT',
        name_en: 'Open PPT',
        equipNo: '4001',
        setNo: '1'
    },
    "closePPT": {
        name: "关闭PPT",
        name_en: 'CLose PPT',
        equipNo: '4001',
        setNo: '7'
    },
    "setIp": {
        name: '设置插件IP',
        name_en: 'Setting up plug-in IP',
        set_ip: '192.168.0.152', 
    },
    "setPage": {
        name: "设置跳页",
        name_en: 'Setting up page hopping',
        equipNo: '4001',
        setNo: '4'
    },
};
// 语言
var selLanguageZH = [{
        "name": "设置页面",
        "url": "/setPage/",
        "id": "setPageTool",
    }, {
        "name": "首页",
        "url": "/home/",
        "id": "homeTool",
    }, {
        "name": "实时快照",
        "url": "/snapshot/",
        "id": "snapshotTool",
    }, {
        "name": "设备列表",
        "url": "/equips/",
        "id": "equipsTool",
    }, {
        "name": "系统",
        "url": "#",
        "id": "configTool",
    }, {
        "name": "事件查询",
        "url": "/eventSearch/",
        "id": "eventSearchTool",
    }, {
        "name": "系统配置",
        "url": "/equipConfigList/",
        "id": "equipConfigListTool",
    }, {
        "name": "报警排表",
        "url": "/schedule/",
        "id": "scheduleTool",
    }, {
        "name": "设备联动",
        "url": "/equipLinkage/",
        "id": "equipLinkageTool",
    }, {
        "name": "语音界面",
        "voiceheader": "语音控制",
        "voicecontainer": "请告诉我，您想要进行的操作.",
        "voicearrowcancel": "取消指令",
        "voicearrowdialog": "长按说话",
        "id": "voiceAlarm",
    }, ],
    selLanguageEN = [{
        "name": "设置页面",
        "url": "/mobile-en/setPage_en/",
        "id": "setPageTool",
    }, {
        "name": "Home",
        "url": "/home/",
        "id": "homeTool",
    }, {
        "name": "Snapshot",
        "url": "/mobile-en/snapshot_en/",
        "id": "snapshotTool",
    }, {
        "name": "Device list",
        "url": "/mobile-en/equips_en/",
        "id": "equipsTool",
    }, {
        "name": "System",
        "url": "#",
        "id": "configTool",
    }, {
        "name": "Event query",
        "url": "/mobile-en/eventSearch_en/",
        "id": "eventSearchTool",
    }, {
        "name": "System configuration",
        "url": "/mobile-en/equipConfigList_en/",
        "id": "equipConfigListTool",
    }, {
        "name": "Alarm schedule",
        "url": "/mobile-en/schedule_en/",
        "id": "scheduleTool",
    }, {
        "name": "Equipment linkage",
        "url": "/mobile-en/equipLinkage_en/",
        "id": "equipLinkageTool",
    }, {
        "name": "Voice view",
        "voiceheader": "Voice control",
        "voicecontainer": "Please tell me what you want to do.",
        "voicearrowcancel": "Cancel",
        "voicearrowdialog": "Long pressed speech",
        "id": "voiceAlarm",
    }, ];


// *************************************************
// ------------------接口配置 start----------------- 
// *************************************************
var myJavaFuntion = function() {};
myJavaFuntion.StartVoice = function(a) {
    try {
        window.webkit.messageHandlers.StartVoice.postMessage(a);
    } catch (ex) {
        try {
            myJavaFun.StartVoice(a);
        } catch (ex) {}
    }
};
myJavaFuntion.StopVoice = function() {
    try {
        window.webkit.messageHandlers.StopVoice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StopVoice();
        } catch (ex) {
            myJavaFun.StopVoice();
        }
    }
};
myJavaFuntion.StopVice = function() {
    try {
        window.webkit.messageHandlers.StopVice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StopVice();
        } catch (ex) {
            myJavaFun.StopVice();
        }
    }
};
myJavaFuntion.StartVice = function() {
    try {
        window.webkit.messageHandlers.StartVice.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.StartVice();
        } catch (ex) {}
    }
};
myJavaFuntion.AppCacheClear = function() {
    try {
        window.webkit.messageHandlers.AppCacheClear.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.AppCacheClear();
        } catch (ex) {}
    }
};
myJavaFuntion.OpenLocalUrl = function(url) {
    try {
        window.webkit.messageHandlers.OpenLocalUrl.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenLocalUrl(url);
        } catch (ex1) {
            if(window.localStorage.terminal != "Mobile.App")
               window.location.href = "/Views/login.html";
            else
                myApp.dialog.alert("退出登陆异常");
        }
    }
};
myJavaFuntion.AppShare = function(url) {
    try {
        window.webkit.messageHandlers.AppShare.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.AppShare(url);
        } catch (ex) {}
    }
};
myJavaFuntion.RichScan = function() {
    try {
        window.webkit.messageHandlers.RichScan.postMessage('');
    } catch (ex) {
        try {
            myJavaFun.RichScan();
        } catch (ex) {}
    }
};
myJavaFuntion.AppShare2 = function() {
    try {
        window.webkit.messageHandlers.AppShare2.postMessage('');
    } catch (ex) {}
};
myJavaFuntion.VideoShow = function(json) {
    try {
        window.webkit.messageHandlers.VideoShow.postMessage(json);
    } catch (ex) {
        try {
            myJavaFun.VideoShow(json);
        } catch (ex) {myJavaFun.VideoShow(json);}
    }
};
myJavaFuntion.HikYunVideoShow = function(json) {
    try {
        window.webkit.messageHandlers.HikYunVideoShow.postMessage(json);
    } catch (ex) {
        try {
            myJavaFun.HikYunVideoShow(json);
        } catch (ex) {}
    }
};
myJavaFuntion.Hik8700VideoShow = function(json) {
    try {
        window.webkit.messageHandlers.Hik8700VideoShow.postMessage(json);
    } catch (ex) {}
};
myJavaFuntion.setOrientation = function() {
    try {
        window.webkit.messageHandlers.setOrientation.postMessage('');
    } catch (ex) {}
};
myJavaFuntion.GetCookie = function() {
    try {
        window.webkit.messageHandlers.GetCookie.postMessage('');
    } catch (ex) {}
};
GetCookieCallback = function(cookie) {
    var cookie_json = JSON.parse(cookie);
    window.localStorage.terminal = cookie_json.terminalString;
    window.localStorage.ac_appkey = cookie_json.ac_appkeyString;
    window.localStorage.ac_infokey = cookie_json.ac_infokeyString;
    window.localStorage.service_url = cookie_json.service_urlString;
};
myJavaFuntion.SetCookie = function(cookie) {
    try {
        window.webkit.messageHandlers.SetCookie.postMessage(cookie);
    } catch (ex) {}
};
myJavaFuntion.OpenMapNav = function(url) {
    try {
        window.webkit.messageHandlers.OpenMapNav.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenMapNav(url);
        } catch (ex) {}
    }
};
myJavaFuntion.OpenApp = function(url) {
    try {
        window.webkit.messageHandlers.OpenApp.postMessage(url);
    } catch (ex) {
        try {
            myJavaFun.OpenApp(url);
        } catch (ex) {}
    }
};
// *************************************************
// ------------------接口配置 end----------------- 
// *************************************************