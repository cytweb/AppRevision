var isVoices = false;
var cancelFlag = false;
var cancelVoiceFlag = false;
var startX, //触摸时的坐标   
    startY,
    x, //滑动的距离   
    y,
    aboveY = 0; //设一个全局变量记录上一次内部块滑动的位置    
$(function() {
    $$('.popup-voices').on('popup:open', function(e, popup) {
        $(".view-main").css({
            filter: 'blur(8px)'
        })
        //打开语音时，初始化界面内容
        $(".voice-container").html('<div class="pannel-chat-info">' + ' <div class="chart-content">' + initAlert() + '  </div>' + '</div>');
        modifyZnUs();
        //移除监听
        document.getElementById("videoContentBtnId").removeEventListener('touchstart', onTouchStart);
        document.getElementById("videoContentBtnId").removeEventListener('touchend', onTouchEnd);
        // 监听
        document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
        document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
    });
    $$('.popup-voices').on('popup:close', function(e, popup) {
        $(".view-main").css({
            filter: 'blur(0px)'
        });
    });
    //记录选择
    try {
        myJavaFun.VoiceOpen();
    } catch (ex) {}
});

function changeContentBoxBg() {
    $(".voice-container .pannel-chat-info").each(function(i) {
        var len = $(".voice-container .pannel-chat-info").length;
        if (!$(this).find(".chart-content").hasClass("stay-right") && i < len - 1) {
            $(this).addClass("chart-content-old");
        }
    })
}

function onTouchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    startY = touch.pageY; //刚触摸时的坐标
    cancelVoiceFlag = cancelFlag = false;
    $(".voice-container").html('<div class="pannel-chat-info">' + ' <div class="chart-content">' + initAlert() + '  </div>' + '</div>');
    // $(".voice-arrow-cancel").show();
    // $(".voice-arrow-box").show();
    // $(".voice-arrow-dialog").hide();
    try {
        isVoices = true;
        myJavaFun.StartVoice("1");
    } catch (ex) {}
    $(".voice-container").append('<div class="pannel-chat-info">' + '   <div class="chart-content stay-right">' + '<div class="waveAnim"><i></i><i></i><i></i><i></i><i></i></div>' + ' </div>' + '</div>');
    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
}
// function onTouchMove(e) {
//     e.preventDefault();
//     var touch = e.touches[0];
//     y = touch.pageY - startY; //滑动的距离
//     var distance = aboveY + y;
//     if (distance < -10 && distance > -200) {
//         if (distance < -70 && !cancelFlag) {
//             $(".voice-arrow-cancel").css({
//                 background: "rgba(255,255,255,1)",
//                 color: "rgba(112,112,112,1)"
//             });
//             $(".voice-arrow-box .voice-arrow-ani").each(function() {
//                 $(this).removeClass().addClass("voice-arrow-ani");
//                 $(this).css({
//                     opacity: 1
//                 });
//             });
//             cancelVoiceFlag = cancelFlag = true;
//         }
//     }
// }
function onTouchEnd(e) {
    // if (cancelVoiceFlag || cancelFlag) {
    //     $(".voice-arrow-cancel").hide();
    //     $(".voice-arrow-box").hide();
    //     $(".voice-arrow-dialog").show();
    //     $(".voice-arrow-box").css({
    //         bottom: "70px",
    //         opacity: 1
    //     });
    //     $(".voice-arrow-cancel").css({
    //         background: "rgba(255,255,255,0)",
    //         color: "rgba(255,255,255,1)"
    //     });
    //     $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(initInstructions());
    //     $(".voice-arrow-box .voice-arrow-ani").each(function() {
    //         var index = $(this).index();
    //         index = 3 - index;
    //         $(this).removeClass().addClass("voice-arrow-ani IndexIconAnimation" + index + "");
    //     });
    //     try {
    //             myJavaFun.StopVoice();
    //     } catch (ex) {
    //         isVoices = false;
    //         $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0"?"<span>无法使用此功能，请下载最新app！</span>":"<span>Unable to use this feature, please download the latest app!</span>");
    //         document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    //         document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    //         setTimeout(function() {
    //             if (isVoices == false) {
    //                 document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    //                 document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    //             }
    //         }, 3000);
    //     }
    //     cancelFlag = false;
    //     return;
    // } else {
    //     $(".voice-arrow-cancel").hide();
    //     $(".voice-arrow-box").hide();
    //     $(".voice-arrow-dialog").show();
    //     $(".voice-arrow-box").css({
    //         bottom: "70px",
    //         opacity: 1
    //     });
    //     $(".voice-arrow-cancel").css({
    //         background: "rgba(255,255,255,0)",
    //         color: "rgba(255,255,255,1)"
    //     });
    // }
    // if (!isVoices) {
    //     return;
    // }
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(initIdentifying());
    document.getElementById("videoContentBtnId").removeEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").removeEventListener('touchend', onTouchEnd);
    setTimeout(function() {
        try {
            myJavaFun.StopVoice();
        } catch (ex) {
            isVoices = false;
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>无法使用此功能，请下载最新app！</span>" : "<span>Unable to use this feature, please download the latest app!</span>");
            $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
            changeContentBoxBg();
            document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
            document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
            setTimeout(function() {
                if (isVoices == false) {
                    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
                    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}

function StartVoiceXF() {
    try {
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    } catch (ex) {}
}

function callbackVoiceXFMessage(dt) {
    if (cancelVoiceFlag) {
        return;
    }
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>您好像没有说话哦！</span>" : "<span>You don't seem to be talking！</span>");
    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
    document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
}
//输入口令正确  
function VoicePasswords() {
    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content"><span>口令正确</span></div>' + '</div>');
    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
}
//等待口令
function waitForPasswords() {
    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content"><span>请您说出口令</span></div>' + '</div>');
    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
}
//返回
function callbackVoiceXFData(dt) {
    // $(".voice-container").append('<div class="pannel-chat-info">' + '   <div class="chart-content stay-right">' + '<div class="waveAnim"><i></i><i></i><i></i><i></i><i></i></div>' + ' </div>' + '</div>');
    // $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
    // setTimeout(function() {
        var voiceString = dt;
        if (voiceString == "") {
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>您好像没有说话哦！</span>" : "<span>You don't seem to be talking！</span>");
            return;
        }
        var _url = "/api/Voice/voice_string";
        var _data = {
            data_string: dt,
            userName: window.localStorage.userName
        };
        ajaxServiceSendVoice("post", _url, true, _data, _successf, _error);
        function _successf(dt) {
            if (dt.HttpStatus == 200 && dt.HttpData.data) {
                var result = dt.HttpData.data;
                if (result == "") {
                    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html(window.localStorage.languageList == "0" ? "<span>未识别！</span>" : "<span> Unidentified！</span>");
                } else {
                    result = result.replace("未识别语音,内容","");
                    result = result.replace("已处理语音,内容", "");
                    result = result.replace("---", "");
                    result = result.replace("。", "");
                   $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>"+ result + "</span>");
                    $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' +  (window.localStorage.languageList == "0" ? "正在执行中...</span>" : "In progress...</span>") + '</div>' + '</div>');
                    $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);                   
                    //每次说话
                    setTimeout(function() {
                        let contentTxt = result.replace(/打/g,"").replace(/开/g,"");
                        if(result.indexOf("打") != -1 || result.indexOf("开") != -1)
                        {
                           $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" +(window.localStorage.languageList == "0" ? (contentTxt+"已经打开") : "Already implemented")+"</span>");
                        }
                        else
                        {
                           $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>" +(window.localStorage.languageList == "0" ? (contentTxt+"已执行") : "Already implemented")+"</span>");
                        }
                        changeContentBoxBg();
                    }, 1000);
                }
            } else {
                $(".voice-container").append('<div class="pannel-chat-info">' + '<div class="chart-content">' + '<span>' + voiceString + (window.localStorage.languageList == "0" ? "指令异常，执行失败！</span>" : " Instruction exception, execution failure!") + ' </div>' + '</div>');
                $('.voice-container').scrollTop($('.voice-container')[0].scrollHeight);
                changeContentBoxBg();
            }
            isVoices = false;
            document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
            document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
        }

        function _error(qXHR, textStatus, errorThrown) {
            $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>服务器出错！</span>");
            isVoices = false;
            document.getElementById("videoContentBtnId").addEventListener('touchstart', onTouchStart);
            document.getElementById("videoContentBtnId").addEventListener('touchend', onTouchEnd);
            setTimeout(function() {
                if (isVoices == false) {
                    $(".voice-container").children(".pannel-chat-info:last-child").find('.chart-content').html("<span>按住说话</span>");
                }
            }, 3000);
        }
}

function ajaxServiceSendVoice(_type, _url, _asycn, _data, _success, _error) {
    var ajaxs = $.ajax({
        type: _type,
        url: _url,
        timeout: 5000,
        async: _asycn,
        data: _data,
        success: _success,
        error: _error,
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
        }
    });
}
//初始化提示语句
function initAlert() {
    if (window.localStorage.languageList == "0") {
        return '<span>请您告诉我,您要进行的操作</span>';
    } else return '<span>Please tell me what you want to do.</span>';
}
//指令提示
function initInstructions() {
    if (window.localStorage.languageList == "0") return '<span>指令已取消</span>';
    else return '<span>Instruction cancelled.</span>';
}
//识别提示
function initIdentifying() {
    if (window.localStorage.languageList == "0") return '<span>正在识别..</span>';
    else return '<span>Identifying...</span>';
}