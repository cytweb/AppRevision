function equipSearchDetail() {
	switchToolbar("configTool");
	//获取父页面参数
	var chatObject = myApp.views.main.history,
		urlLength = chatObject.length - 1;
	var chatValue = chatObject[urlLength].split("?")[1].split("&");
	var type = chatValue[0];
	var time = chatValue[1];
	var event = chatValue[2];
	var strData = "";
	if(type == 0) {
		for(var i = 0; i < EqpEvtData.length; i++) {
			if(EqpEvtData[i].time == time && EqpEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备名称</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + EqpEvtData[i].equip_nm + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textareareadonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("设备事件详情");
		$(".eventDetailList").html(strData);
	} else if(type == 1) {
		for(var i = 0; i < SetEvtData.length; i++) {
			if(SetEvtData[i].time == time && SetEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备名称</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + SetEvtData[i].equip_nm + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">操作人</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + SetEvtData[i].operator + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textarea readonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("设置事件详情");
		$(".eventDetailList").html(strData);
	} else {
		for(var i = 0; i < SysEvtData.length; i++) {
			if(SysEvtData[i].time == time && SysEvtData[i].event == event) {
				strData += '<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">时间</div>' +
					'					<div class="item-input-wrap">' +
					'						<input type="text" name="name" readonly value="' + time + '">' +
					'					</div>' +
					'				</div>' +
					'			</li>' +
					'<li class="item-content item-input">' +
					'				<div class="item-inner">' +
					'					<div class="item-title item-label">设备事件</div>' +
					'					<div class="item-input-wrap">' +
					'						<textarea readonly>"' + event + '"</textarea>' +
					'					</div>' +
					'				</div>' +
					'			</li>';
				break;
			}
		}
		$(".eventDetailPopupTitle").html("系统事件详情");
		$(".eventDetailList").html(strData);
	}
}