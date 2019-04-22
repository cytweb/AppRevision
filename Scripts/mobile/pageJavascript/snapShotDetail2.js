var userAdmin = [];
var chatList;

function snapShotDetail() {
	//获取父页面参数
	var chatObject = myApp.views.main.history,
		urlLength = chatObject.length - 1;
	var chatValue = chatObject[urlLength].split("?")[1].split("&");
	var chatTitleName = chatValue[0];
	chatList = chatValue[1];
	$("#snapShotDetailTitleId").html(chatTitleName)

	var snapashot_ptr = $$('.snapashotMessage-page-content');
	snapashot_ptr.on("ptr:refresh", refreshpg);
	loadMessage();
}

function loadMessage() {
	$.ajax({
		type: 'post',
		url: '/api/GWServiceWebAPI/get_AdministratorData',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		data: {
			"getDataTable":0,
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data) {
				var resultData = dt.HttpData.data;
				userAdmin=[];
				for(var i = 0; i < resultData.length; i++) {
					userAdmin.push({
						Administrator: resultData[i].Administrator,
						MobileTel: resultData[i].MobileTel,
						allInfo: resultData[i].Administrator + "&&" + resultData[i].MobileTel
					});
				}
			}
		}
	});

	$.ajax({
		type: 'post',
		url: '/api/event/real_evt',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		data: {
			levels: chatList
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data) {
				var result = dt.HttpData.data;
				//console.log(result);
				let tableListData = [];
				var strSureData = "";
				var strData = "";
				var countNum = 0;
				for(var i = 0; i < result.length; i++) {
					var textareaEventMsg = "";
					if(result[i].EventMsg.length > 200) {
						textareaEventMsg = "<textarea>" + result[i].EventMsg + "</textarea>";
					} else {
						textareaEventMsg = result[i].EventMsg;
					}

					var textareaAdviceMsg = "";
					if(result[i].Proc_advice_Msg.length > 200) {
						textareaAdviceMsg = "<textarea>" + result[i].Proc_advice_Msg + "</textarea>";
					} else {
						textareaAdviceMsg = result[i].Proc_advice_Msg;
					}

					var isSureSpan = "";
					if(result[i].bConfirmed == false) {
						isSureSpan = "<span class='span-color-notsure sure-flag'>未确认</span>";
						strData += '<li class="accordion-item">' +
							'<a href="#" class="item-link item-content">' +
							'	<div class="item-inner">' +
							'		<div class="item-title-row">' +
							'			<div class="item-subtitle">' + formatDate(result[i].Time) + '</div>' +
							'			<div class="item-after">' + isSureSpan + '</div>' +
							'		</div>' +
							'		<div class="item-text">' + result[i].EventMsg + '</div>' +
							'	</div>' +
							'</a>' +
							'<div class="accordion-item-content content-container">' +
							'<div class="content-container-block">' +
							'<p>时间：' + formatDate(result[i].Time) + '</p>' +
							'<p>事件：' + textareaEventMsg + '</p>' +
							'<p>处理意见：<textarea class="advice-textarea" placeholder="请输入处理意见"></textarea></p>' +
							'<p>是否发送短信：&nbsp;&nbsp;<label class="toggle toggle-init color-blue" onclick="onProcsCheckBox(' + countNum + ')">' +
							'<input type="checkbox" class="isProcsInput"><span class="toggle-icon"></span></label><div class="procsContent list-block" style="height:auto;display:block"></div></p>' +
							"<p><a href='#' class=\"button button-big button-fill color-blue\" onclick='OnSureMessage(\"" + countNum + "\",\"" + textareaEventMsg + "\",\"" + result[i].Time + "\")' values='" + result[i] + "' title=\"" + result[i].User_Confirmed + formatDate(result[i].Dt_Confirmed) + "\">确定</a></p>" +
							'</div></div>' +
							'</li>';
						countNum++;
					} else {
						isSureSpan = "<span class='span-color-sure sure-flag'>已确认</span>";
						strSureData += '<li class="accordion-item">' +
							'<a href="#" class="item-link item-content">' +
							'	<div class="item-inner">' +
							'		<div class="item-title-row">' +
							'			<div class="item-subtitle">' + formatDate(result[i].Time) + '</div>' +
							'			<div class="item-after">' + isSureSpan + '</div>' +
							'		</div>' +
							'		<div class="item-text">' + result[i].EventMsg + '</div>' +
							'	</div>' +
							'</a>' +
							'<div class="accordion-item-content content-container">' +
							'<div class="content-container-block">' +
							'<p>时间：' + formatDate(result[i].Time) + '</p>' +
							'<p>事件：' + textareaEventMsg + '</p>' +
							'<p>处理意见：' + textareaAdviceMsg + '</p>' +
							"<p>确认人：" + result[i].User_Confirmed + '</p><p>确认时间：' + formatDate(result[i].Dt_Confirmed) + "</p>" +
							'</div></div>' +
							'</li>';
					}
				}
				$("#snapShotDetailListId").html(strData + strSureData);
			}
		}
	});
}

//选择是否发送短信
function onProcsCheckBox(countNum) {//console.log(countNum)
	if(!$("#snapShotDetailListId li").eq(countNum).find('.isProcsInput').is(':checked')) {
		if(!$("#snapShotDetailListId li").eq(countNum).find(".procsContent ul").find("li").length) {
			var newRow = "<ul>";
			//console.log(userAdmin)
			for(var i = 0; i < userAdmin.length; i++) {
				/*newRow += '<li>' +
					'  <label class="item-radio item-content">' +
					'    <input type="radio" name="demo-radio" value="Movies"/>' +
					'    <i class="icon icon-radio"></i>' +
					'    <div class="item-inner">' +
					'      <div class="item-title">' + userAdmin[i].Administrator + (userAdmin[i].MobileTel == null ? "" : userAdmin[i].MobileTel + '</div>' +
						'    </div>' +
						'  </label>' +
						'</li>'; */
				newRow += '<li><label class="item-checkbox item-content">' +
					'    <input type="checkbox" name="my-checkbox"  value="' + userAdmin[i].MobileTel + '"/>' +
					'    <i class="icon icon-checkbox"></i>' +
					'    <div class="item-inner">' +
					'      <div class="item-title">' + userAdmin[i].Administrator + (userAdmin[i].MobileTel == null ? "" : "(" + userAdmin[i].MobileTel + ")") + '</div>' +
					'    </div>' +
					'  </label></li>';
			}
			newRow += "</ul>";
			//console.log(newRow)
			$("#snapShotDetailListId li").eq(countNum).find(".procsContent").html(newRow);
			$("#snapShotDetailListId li").eq(countNum).find(".procsContent").show();
		}
	}else{
		$("#snapShotDetailListId li").eq(countNum).find(".procsContent").html("");
	}
}

function OnSureMessage(countNum, strEventMsg, strTime) {
	/*阻止事件冒泡*/
	event.stopPropagation();
	var checkValArr = []; //短信联系人选中值
	var strAdviceMsg = $("#snapShotDetailListId li").eq(countNum).find('.advice-textarea').val(); //处理意见值
	var isShortMsg = "";
	if(!$("#snapShotDetailListId li").eq(countNum).find('.isProcsInput').is(':checked')) {
		$("#snapShotDetailListId li").eq(countNum).find('input[name="my-checkbox"]:checked').each(function() {
			checkValArr.push($(this).val());
		});
		isShortMsg = true;
	}
	//console.log(checkValArr, strAdviceMsg)
	$.ajax({
		type: 'post',
		url: '/api/event/confirm_evt',
		headers: {
			Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey
		},
		data: {
			msg: strAdviceMsg, //处理意见
			shortmsg: isShortMsg, //是否发送短信
			tel: checkValArr.toString(), //发送人的电话
			evtname: strEventMsg, //事件名
			time: strTime, //事件时间
			userName: window.localStorage.userName //是否发送短信
		},
		success: function(dt) {
			if(dt.HttpStatus == 200 && dt.HttpData.data) {
				var resultData = dt.HttpData.data;
				//console.log(resultData)
				myApp.toast.create({
					text: '操作成功!',
					position: 'center',
					closeTimeout: 500,
				}).open();
				$("#snapShotDetailListId li").eq(countNum).find(".content-container").css({
					height: "0"
				});
				$("#snapShotDetailListId li").eq(countNum).find('.sure-flag').html("已确认");
				$("#snapShotDetailListId li").eq(countNum).find('.sure-flag').removeClass("span-color-notsure").addClass("span-color-sure");
				$("#snapShotDetailListId li").eq(countNum).removeClass("accordion-item-opened");
				setTimeout(loadMessage, 2000)
			}
		}
	});
}

function formatDate(time) {
	var newTime = time.replace("T", " ")
	return newTime.substring(0, 19);
}

function refreshpg(e) {
	//console.log(e)
	setTimeout(function() {
		loadMessage();
		// 加载完毕需要重置
		e.detail();
		myApp.toast.create({
			text: '数据加载成功!',
			position: 'center',
			closeTimeout: 500,
		}).open();
	}, 2000);
}