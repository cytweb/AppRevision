var welcome_getcolor, welcome_objoriginal = new Object();

function welcomeWords_en() {
   
    //	getFocusValue();
    /*获取文件夹中背景图片信息*/
    var url1 = WORDcommand.backgroundImage.url,
        fileName1 = ".png|.jpg|.JPG",
        _urlChild1 = "/api/Other/GetFileStructure",
        setHtml = "";
    var groupPhotoArray = new Array(),
        typeEnd = new Array();
    $.ajax({
        type: 'post',
        url: _urlChild1,
        headers: {
            Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
        },
        data: {
            filePath: url1,
            fileName: fileName1,
        },
        success: function(data) {
            var dt = data.HttpData,
                result = dt.replace(/\"/g, "").replace("[", "").replace("]", "").split(",");
            if (result != "" && result != undefined && result != null) {
                for (var i = 0; i < result.length; i++) {
                    groupPhotoArray[i] = welcome_getNmae(result[i]).split(".")[0]; //获得数字名称
                    typeEnd[i] = welcome_getNmae(result[i]).split(".")[welcome_getNmae(result[i]).split(".").length - 1]; //获取第一个文件名最后一个后缀
                    if (i == 0) {
                        setHtml += '<div class="swiper-slide"><img src="/Image/bg/' + groupPhotoArray[i] + "." + typeEnd[i] + '"><i class="iconfont icon-xuanzhongbiaoshi welcome-Word-control-icon-check" style="display:inline;"></i></div>';
                        $(".welComeInitImg").attr("src", "/Image/bg/" + groupPhotoArray[i] + "." + typeEnd[i]);
                    } else {
                        setHtml += '<div class="swiper-slide"><img src="/Image/bg/' + groupPhotoArray[i] + "." + typeEnd[i] + '"><i class="iconfont icon-xuanzhongbiaoshi welcome-Word-control-icon-check"></i></div>';
                    }
                }
                $(".setBackground").html(setHtml);
                welcome_bannerList("swiper-3", "swiper-pagination", 10, 3);
                $(".wecomeButtom .swiper-slide").find('img').unbind('click').bind('click', function() {
                    $(".wecomeButtom .swiper-slide").find('i').each(function() {
                        $(this).hide();
                    })
                    $(this).parent().find('i').show();
                    var imgSrc = $(this).attr("src");
                    $(".welcomeInput").css({
                        background: "url(" + imgSrc + ") no-repeat center center/100% 100%"
                    });
                });
            }
        }
    }).done(function() {
        /*获取最近一次欢迎词格式信息*/
        $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getWelcomeSpeech", {})).done(function(n, l) {
            if (n.HttpData.data.length > 0 && n.HttpData.code == 200) {
                var dt = n.HttpData.data[0].siginalVal,
                    result = JSON.parse(dt);
                if (result != "" && result != null && result != undefined) {
                    //左右对齐初始化
                    $("#alignControlId i").each(function(i) {
                        if (i < 3) {
                            $(this).removeClass("control-active-color");
                        }
                    });
                    if (result.CanvasLeft == "flex-start") {
                        $("#alignControlId i").eq(0).addClass("control-active-color");
                    } else if (result.CanvasLeft == "center") {
                        $("#alignControlId i").eq(1).addClass("control-active-color");
                    } else if (result.CanvasLeft == "flex-end") {
                        $("#alignControlId i").eq(2).addClass("control-active-color");
                    }
                    //赋值
                    $(".welcomeInput").css("textAlign", result.CanvasLeft).val(result.Text);
                    //上下对齐初始化
                    if (result.CanvasTop == "flex-start") {
                        $("#alignControlId i").eq(3).removeClass("control-active-color");
                        $(".welcomeInput").css("padding", 0);
                    } else if (result.CanvasTop == "center") {
                        $("#alignControlId i").eq(3).addClass("control-active-color");
                        var textAreaHeight = $(".welcomeInput").height() / 4;
                        strAlignItem = "" + textAreaHeight + "px 0";
                        $(".welcomeInput").css("padding", strAlignItem);
                    }
                    //字体类别
                    $(".welcomeInput").css("fontFamily", result.FontFamily);
                    $("#fontFamily option[data-font='" + result.FontFamily + "']").attr("selected", true);
                    //字体大小
                    $('#controlrangeSliderValueId').text(result.FontSize);
                    $(".welcomeInput").css("fontSize", result.FontSize + "%");
                    myApp.range.get('.welcome-Word-control-tab-range-slider').setValue(result.FontSize);
                    //字体粗细
                    $("#thickControlId i").each(function(i) {
                        if (i < 2) {
                            $(this).removeClass("control-active-color");
                        }
                    });
                    if (result.FontStyle == "normal") {
                        $("#thickControlId i").eq(0).addClass("control-active-color");
                    } else {
                        $("#thickControlId i").eq(1).addClass("control-active-color");
                        $(".welcomeInput").addClass("control-active-style-bold");
                    }
                    if (result.FontWeight == "italic") {
                        $("#thickControlId i").eq(2).addClass("control-active-color");
                        $(".welcomeInput").addClass("control-active-style-italic");
                    } else {
                        $("#thickControlId i").eq(2).removeClass("control-active-color");
                    }
                    //字体颜色
                    $(".activeSkin").css("background", result.FontColor);
                    $(".welcomeInput").css("color", result.FontColor);
                    //背景设置
                    $(".welcomeInput").css({
                        background: "url(" + result.BackgroundImg + ") no-repeat center center/100% 100%"
                    });
                }
            }
        }).fail(function(e) {});
    });
    /*菜单按钮点击事件*/
    $(".welcome-Word-control-boxs li").find('i').unbind('click').bind('click', function() {
        $(".welcome-Word-control-boxs li").each(function() {
            $(this).find('i').css({
                color: "#333333"
            });
        })
        $(this).css({
            color: "#3E7CFB"
        });
        var index = $(this).parent().index();
        if (index == 0) {
            $(".welcomeInput").focus();
        }
    });
    /*对齐图标点击事件*/
    $("#alignControlId i").unbind('click').bind('click', function() {
        var index = $(this).index();
        var realLength = $("#alignControlId i").length;
        $("#alignControlId i").each(function(i) {
            if (i < realLength - 1 && index != 3) {
                $(this).removeClass("control-active-color");
            }
        });
        var strAlignItem = "";
        var strJustifyContent = "";
        if (index != 3) {
            if (index == 0) {
                strJustifyContent = "left";
            } else if (index == 1) {
                strJustifyContent = "center";
            } else if (index == 2) {
                strJustifyContent = "right";
            }
            $(this).addClass("control-active-color");
            $(".welcomeInput").css("textAlign", strJustifyContent);
        } else {
            var textAreaHeight = $(".welcomeInput").height() / 4;
            var isFlag = $(this).hasClass("control-active-color");
            if (isFlag) {
                $(this).removeClass("control-active-color");
                strAlignItem = "0";
            } else {
                $(this).addClass("control-active-color");
                strAlignItem = "" + textAreaHeight + "px 0";
            }
            $(".welcomeInput").css("padding", strAlignItem);
        }
    });
    /*字体选择事件*/
    $("#fontFamily").unbind('change').bind('change', function() {
        var strData = $(this).find("option:selected").attr("data-font");
        $(".welcomeInput").css("fontFamily", strData);
    });
    /*字体粗细选择事件*/
    $("#thickControlId i").unbind('click').bind('click', function() {
        var index = $(this).index();
        var realLength = $("#thickControlId i").length;
        $("#thickControlId i").each(function(i) {
            if (i < realLength - 1 && index != 2) {
                $(this).removeClass("control-active-color");
            }
        });
        var strfontWeight = "";
        var strfontWeight2 = "";
        if (index != 2) {
            if (index == 0) {
                strfontWeight = "control-active-style-normal";
            } else if (index == 1) {
                strfontWeight = "control-active-style-bold";
            }
            $(this).addClass("control-active-color");
            $(".welcomeInput").removeClass("control-active-style-normal control-active-style-bold").addClass(strfontWeight);
        } else {
            strfontWeight2 = "control-active-style-italic";
            var isFlag = $(this).hasClass("control-active-color");
            if (isFlag) {
                $(this).removeClass("control-active-color");
                strfontWeight2 = "";
            } else {
                $(this).addClass("control-active-color");
                strfontWeight2 = "control-active-style-italic";
            }
            $(".welcomeInput").removeClass("control-active-style-italic").addClass(strfontWeight2);
        }
    });
    /*滑块选择事件*/
    $$('#controlrangeSliderId').on('range:change', function(e, range) {
        $$('#controlrangeSliderValueId').text(range.value);
        var realValue = range.value + 78;
        $(".welcomeInput").css("fontSize", realValue + "%");
    });
    /*颜色框弹出事件*/
    $(".activeSkin").unbind('click').bind('click', function() {
        if ($("#SelectSkin").hasClass("displayNone")) {
            weicomeInitAnimation();
        } else {
            $("#SelectSkin").addClass("displayNone");
        }
    });
    /*颜色选中事件*/
    $("#colorSkin a").unbind('click').bind('click', function() {
        welcome_getcolor = $(this).find("i").css("backgroundColor");
        $(".activeSkin").css("background", welcome_getcolor);
        $(".welcomeInput").css("color", welcome_getcolor);
        $("#SelectSkin").addClass("displayNone");
    });
    /*slider图片选中事件*/
    $(".wecomeButtom .swiper-slide").find('img').unbind('click').bind('click', function() {
        $(".wecomeButtom .swiper-slide").find('i').each(function() {
            $(this).hide();
        })
        $(this).parent().find('i').show();
        var imgSrc = $(this).attr("src");
        $(".welcomeInput").css({
            background: "url(" + imgSrc + ") no-repeat center center/100% 100%"
        });
    });
    /*大屏操作事件*/
    $("#tab44 .welcome-Word-control-icon-mutual").unbind('click').bind('click', function() {
        $("#tab44 .welcome-Word-control-icon-mutual").eq(1).find('span').css({
            color: '#FF4747'
        });
        $("#tab44 .welcome-Word-control-icon-mutual").eq(0).find('i').css({
            color: '#333333'
        });
        $("#tab44 .welcome-Word-control-icon-mutual").eq(1).find('i').removeClass().addClass("iconfont icon-weixuanzhong");
        $(this).find('span').css({
            color: '#FFFFFF'
        });
        var index = $(this).index();
        var equipNo = $(this).attr("set_equip");
        var setNo = $(this).attr("set_no");
        if (index == 0) {
            $(this).find('i').css({
                color: '#3E7CFB'
            });
            welcome_activeSave(this, 1);
            get_no_val(this, equipNo, setNo, "");
        } else {
            $(this).find('i').css({
                color: '#FF4747'
            });
            $("#tab44 .welcome-Word-control-icon-mutual").eq(1).find('i').removeClass().addClass("iconfont icon-xuanzhong");
            get_no_val(this, equipNo, setNo, "");
        }
    });
    /*保存欢迎词*/
    $(".saveWelcomeWords").unbind('click').bind('click', function() {
        welcome_activeSave(this, 0);
    });
}
//响应App绑定函数-获取键盘高度
function getKeyboardScreenHeight2(KeyboardHieght, ScreenHeight) {
    var heightRate = KeyboardHieght / ScreenHeight;
    var parentHeight = document.body.clientHeight;
    heightRate = heightRate * parentHeight - 50;
    //	$(".welcomeInput").text(heightRate);
    if (heightRate > 0) {
        $(".welcome-Word-control-boxs").css("bottom", heightRate + "px");
        $(".welcome-Word-control-tabs").css("height", heightRate + "px");
    }
}

function getFocusValue() {
    if (typeof(myJavaFun) != "undefined") {
        //App绑定函数-获取键盘高度
        if (typeof myJavaFun.getKeyboardHeight2 === "function") {
            myJavaFun.getKeyboardHeight2();
        }
    }
}
//保存事件
function welcome_activeSave(that, number) {
    welcome_objoriginal = new Object();
    //内容
    welcome_objoriginal.Text = $(".welcomeInput").val();
    var welcomeVal = welcome_tramsformData(welcome_objoriginal.Text);

    //字体大小
    welcome_objoriginal.FontSize = $('#controlrangeSliderValueId').html();
    //字体颜色
    welcome_getcolor = $(".publicInputEdit").css("color");
    if (welcome_getcolor == "" || welcome_getcolor == undefined) {
        welcome_getcolor = "white";
        welcome_objoriginal.FontColor = welcome_getcolor.toString();
    } else {
        welcome_objoriginal.FontColor = welcome_getcolor.toString();
    }
    //welcome_objoriginal.FontColor = welcome_colorRGB2Hex(welcome_getcolor);
    //字体类型
    welcome_objoriginal.FontFamily = $("#fontFamily").find("option:selected").attr("data-font");
    //粗细-常规，粗体
    welcome_objoriginal.FontStyle = $("#thickControlId i").eq(1).hasClass("control-active-color") ? "bold" : "normal";
    //粗细-斜体
    welcome_objoriginal.FontWeight = $("#thickControlId i").eq(2).hasClass("control-active-color") ? "italic" : "";
    //对齐-左右
    welcome_objoriginal.textAlign = $("#alignControlId i").eq(0).hasClass("control-active-color") ? "0" : ($("#alignControlId i").eq(1).hasClass("control-active-color") ? "1" : "2");
    //对齐-上下
    welcome_objoriginal.textValign = $("#alignControlId i").eq(3).hasClass("control-active-color") ? "1" : "0";
    //左对齐值
    if (welcome_objoriginal.textAlign == 0) {
        welcome_objoriginal.CanvasLeft = "flex-start";
    } else if (welcome_objoriginal.textAlign == 1) {
        welcome_objoriginal.CanvasLeft = "center";
    } else if (welcome_objoriginal.textAlign == 2) {
        welcome_objoriginal.CanvasLeft = "flex-end";
    }
    //垂直对齐值
    if (welcome_objoriginal.textValign == 0) {
        welcome_objoriginal.CanvasTop = "flex-start";
    } else if (welcome_objoriginal.textValign == 1) {
        welcome_objoriginal.CanvasTop = "center";
    }
    welcome_getcolor = null;
    // 背景图片
    var imgIcon = $(".wecomeButtom .swiper-slide").eq(0).find('i').is(":hidden") ? ($(".wecomeButtom .swiper-slide").eq(1).find('i').is(":hidden") ? "2" : "1") : "0";
    var fileNameURL = $(".welcomeInput").css("backgroundImage").replace('url("', '').replace('")', '');
    if (fileNameURL == undefined || fileNameURL == "none") {
        fileNameURL = $(".wecomeButtom .swiper-slide").eq(0).find("img").attr("src");
    }
    var fileName = fileNameURL.split("/")[fileNameURL.split("/").length - 1]; //name
    welcome_objoriginal.BackgroundImg = fileNameURL;
    //是否居中
    welcome_objoriginal.center = "positionClass";
    var allHTML = "<html>" + "<head>" + "<meta charset=\"utf-8\">" + "<meta http-equiv=\"Expires\" content=\"0\">" + "<meta http-equiv=\"Pragma\" content=\"no-cache\">" + "<meta http-equiv=\"Cache-control\" content=\"no-cache\">" + "<meta http-equiv=\"Cache\" content=\"no-cache\">" + "<title>欢迎词</title>" + "<style type=\"text/css\">" + "*{margin: 0;padding: 0;}" + "html,body{width: 100%;height: 100%;position: relative;overflow: hidden;}" + ".a123 span{  font-family:" + welcome_objoriginal.FontFamily + ";position: absolute;white-space: pre;width: 100%;height: 100%;display: flex;}" + ".positionClass{width: 100% !important;left: 0% !important;display: inline-block;text-align: center;padding: 11px;transform: translateX(-50%);transform: translateY(-50%);}" + "</style>" + "</head>" + "<body>" + "<div style=\"width: 100%;height: 100%;    text-align: center;background: url(" + fileNameURL.replace("url(","").replace(")","") + ") no-repeat center center/100%;\" class=\"a123\">" + "<span style=\"font-size: " + welcome_objoriginal.FontSize + "px;color: " + welcome_objoriginal.FontColor + "; justify-content: " + welcome_objoriginal.CanvasLeft + "; align-items: " + welcome_objoriginal.CanvasTop + "; font-weight: " + welcome_objoriginal.FontWeight + "; font-style: " + welcome_objoriginal.FontStyle + "; \">" + welcomeVal + "</span>" + "</div>" + "</body>" + "</html>";
   console.log(allHTML);

   $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/insertWelcomeSpeech?JSONContent="+allHTML+"&BGImage="+fileName+"&Type="+number+"&siginalVal="+JSON.stringify(welcome_objoriginal))).done(function(n,l){
	var dt = n.HttpData.data;
	if(dt && n.HttpData.code == 200) {alertMsgSuccess.open();} else alertMsgError.open();
	}).fail(function(e){});





    // var ajaxVar = $.ajax({
    //     type: "POST",
    //     url: "/GWService.asmx/ExecuteSQL",
    //     timeout: 5000,
    //     data: {
    //         sql: "insert into WelcomingSpeech(JSONContent,BGImage,Type,siginalVal) values('" + allHTML + "','" + fileName + "','" + number + "','" + JSON.stringify(welcome_objoriginal) + "')",
    //         userName: window.localStorage.userName,
    //     },
    //     success: function(data) {
    //         var dt = $(data).find('int').text(); //返回受影响行数
    //         if (dt == 1) {
    //             alertMsgSuccess.open();
    //         } else alertMsgError.open();
    //     }
    // });
}
//slide初始化通用事件
function welcome_bannerList(class1, class2, number3, number4) {
    var mySwiper3 = myApp.swiper.create('.' + class1, {
        pagination: '.' + class1 + ' .' + class2,
        spaceBetween: number3,
        slidesPerView: number4
    });
}
//颜色弹出框动画调用
function weicomeInitAnimation() {
    weicomeTestAnim("SelectSkin", "flipInX", 200);
}
//动画调用
function weicomeTestAnim(thatId, x, time) {
    setTimeout(function() {
        $('#' + thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#' + thatId).removeClass(x + ' animated');
        });
    }, time);
};
//格式转换
function welcome_tramsformData(dataVal) {
    var lengthVal = dataVal.length;
    var stringVal = "";
    for (var i = 0; i < lengthVal; i++) {
        if (dataVal.charCodeAt(i) == 10) stringVal += "<br />";
        else if (dataVal.charCodeAt(i) == 32) stringVal += "  ";
        else stringVal += dataVal.charAt(i);
    }
    return stringVal;
}
//RGB转16进制 
function welcome_colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
//active banner
function bannerActive_wel(that) {
    $(that).addClass("selectBorder").siblings().removeClass("selectBorder");
    $(".welcomeHeader").css("background", "url(" + $(that).find("img").attr("src") + ") no-repeat center center/100% 100%");
}
//提取名称
function welcome_getNmae(name) {
    return name.split("\\")[name.split("\\").length - 1];
}