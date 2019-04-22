var equip_list = null,
	realEquipList = "",
	EqpEvtData = null,
	SetEvtData = null,
	SysEvtData = null,
	EqpEvtDataFlag = true,
	SetEvtDataFlag = true,
	SysEvtDataFlag = true;
var equipPicker;

function eventSearch_en() {
	switchToolbar("configTool");
	
	EqpEvtDataFlag = true,
	SetEvtDataFlag = true,
	SysEvtDataFlag = true;
	
	//初始化
	$("#eventSearchTimeId").val(getNowTime() + " - " + getNowTime());
	$("#eventSearchEquipId").val("All equipment");
	$("#eventSearchTypeId").val("Device events");

	//加载所有设备
	onEquipLists();
	var calendarModal = myApp.calendar.create({
		inputEl: '#eventSearchTimeId',
		openIn: 'customModal',
		toolbarCloseText: "Confirm",
		footer: true,
		dateFormat: 'yyyy/mm/dd',
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		dayNamesShort: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
		rangePicker: true,
		on: {
			closed: function(e) {
				var value = $("#eventSearchTimeId").val();
				var searchTime = $("#eventSearchTimeId").val();
				var realSearchTime = "";
				if(searchTime) {
					var searchTimeArrs = searchTime.split(" - ");
					if(searchTimeArrs.length == 1) {
						realSearchTime += searchTimeArrs[0] + " - " + searchTimeArrs[0];
					} else {
						realSearchTime = searchTime;
					}
					$("#eventSearchTimeId").val(realSearchTime);
				}
			},
		}
	});
	
	//事件类型选择
	var pickerModel = myApp.picker.create({
		inputEl: '#eventSearchTypeId',
		rotateEffect: false,
		renderToolbar: function() {
			return '<div class="toolbar">' +
				'<div class="toolbar-inner">' +
				'<div class="left">' +
				'<a href="#" class="link sheet-close popover-close">Cancel</a>' +
				'</div>' +
				'<div class="center">' +
				'<a href="#" class="link toolbar-randomize-link">Select device</a>' +
				'</div>' +
				'<div class="right">' +
				'<a href="#" class="link sheet-close popover-close">Confirm</a>' +
				'</div>' +
				'</div>' +
				'</div>';
		},
		cols: [{
			textAlign: 'center',
			values: ['Device events', 'Set events', 'system event']
		}],
		on: {
			change: function(picker, values, displayValues) {
				$("#eventSearchTypeId").html(values);
				values=values+"";
				$(".eventSearchContent .tabs .tab").each(function(){
					$(this).removeClass("tab-active");
				});
				if(values=="Device events"){
					$(".eventSearchContent .tabs .tab").eq(0).addClass("tab-active");
				}else if(values=="Set events"){
					$(".eventSearchContent .tabs .tab").eq(1).addClass("tab-active");
				}else{
					$(".eventSearchContent .tabs .tab").eq(2).addClass("tab-active");
				}
			},
		}
	})
}

//加载所有设备
function onEquipLists() {
	var _url = service + "/EquipItemList";

	function _successf(data) {
		var resultJs = $(data).children("string").text();
		if(resultJs != "false") {
			equip_list = new Array();
			var usera = JSON.parse(resultJs);
			var allEquipList = ["All equipment"];
			equip_list[0] = new Array('All equipment', 'x');
			for(var i = 1; i < usera.length; i++) {
				var userb = usera[i];
				var userc = new Array(userb.name, userb.value);
				equip_list[i] = userc;
				allEquipList.push(userb.name);
				realEquipList += userb.value + ",";
			}
			if(realEquipList.length > 0) {
				realEquipList = realEquipList.substring(0, realEquipList.length - 1);
			}
			//设备选择
			equipPicker = myApp.picker.create({
				inputEl: '#eventSearchEquipId',
				rotateEffect: false,
				renderToolbar: function() {
					return '<div class="toolbar">' +
						'<div class="toolbar-inner">' +
						'<div class="left">' +
						'<a href="#" class="link sheet-close popover-close">Cancel</a>' +
						'</div>' +
						'<div class="center">' +
						'<a href="#" class="link toolbar-randomize-link">Select device</a>' +
						'</div>' +
						'<div class="right">' +
						'<a href="#" class="link sheet-close popover-close">Confirm</a>' +
						'</div>' +
						'</div>' +
						'</div>';
				},
				cols: [{
					textAlign: 'center',
					values: allEquipList
				}],
				on: {
					change: function(picker, values, displayValues) {
						$("#eventSearchEquipId").html(values);
						$("#eventSearchEquipId").attr("readonly", false);
					},
					closed: function(picker) {
						if(picker.cols[0].values.length>0){
							var value = picker.cols[0].values[0];
							var realValue = equipPicker.cols[0].value;
							equipPicker.cols[0].replaceValues(allEquipList, "");
							var inputValue = $("#eventSearchEquipId").val();
							var equipCountNum = false;
							for(var n = 0; n < allEquipList.length; n++) {
								if(allEquipList[n] == inputValue) {
									equipCountNum = true;
									break;
								}
							}
							if(!equipCountNum) {
								equipPicker.cols[0].setValue(value);
								$("#eventSearchEquipId").val(value);
							} else {
								equipPicker.cols[0].setValue(realValue);
							}
						}else{
							equipPicker.cols[0].replaceValues(allEquipList, "");
						}
						$("#eventSearchEquipId").attr("readonly", true);
						
					},
					opened: function(e) {
						$("#eventSearchEquipId").attr("readonly", false);
					}
				}
			});

			$("#eventSearchEquipId").bind('input', function() {
				var value = $(this).val();
				var strValueArr = [];
				for(var n = 0; n < allEquipList.length; n++) {
					if(allEquipList[n].indexOf(value) > -1) {
						strValueArr.push(allEquipList[n]);
					}
				}
				equipPicker.cols[0].replaceValues(strValueArr, "");

			});
			//			searchEquipItems();
		}
	}
	JQajaxoNoCancel("post", _url, false, "", _successf);
}

function searchEquipItems() {
	myApp.dialog.progress('<a style="font-size: 1rem">Loading...</a>');
	var searchTime = $("#eventSearchTimeId").val();
	var realSearchTime = "";
	if(searchTime) {
		var searchTimeArrs = searchTime.split(" - ");
		if(searchTimeArrs.length == 1) {
			realSearchTime += searchTimeArrs[0] + " 00:00:00";
		} else if(searchTimeArrs.length == 2) {
			realSearchTime += searchTimeArrs[0] + " 00:00:00," + searchTimeArrs[1] + " 23:59:59";
		} else {
			realSearchTime += getNowTime() + " 00:00:00";
		}
	}
	var searchEquip = $("#eventSearchEquipId").val();
	var realSearchEquip = "";
	for(var n = 0; n < equip_list.length; n++) {
		if(equip_list[n][0] == searchEquip) {
			if(equip_list[n][0] == "All equipment") {
				realSearchEquip = realEquipList;
			} else {
				realSearchEquip = equip_list[n][1];
			}

			break;
		}
	}
	var searchTabType = $("#eventSearchTypeId").val(),_url = "",_data = "";
	if(searchTabType == "Device events") {
		_url = service + "/QueryEquipEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realSearchEquip;
		function _successEqp(data) {
			var resultJs = $(data).children("string").text();
			var result = EqpEvtData = JSON.parse(resultJs);
			var resultLength = result.length > 20 ? 20 : result.length;
			var strData = "";
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(0,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>Check no data</li>";
			}
			$("#eventSearchEquipsId").html(strData);
			myApp.dialog.close();

			if(EqpEvtDataFlag) {
				// Loading flag
				var allowInfinite = true,lastItemIndex = $$('#eventSearchEquipsId li').length,maxItems = EqpEvtData.length,itemsPerLoad = 20;
				var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
				var nScrollTop = 0; //滚动到的当前位置
				var nDivHight = $("#tab1").height();
				$("#tab1").unbind('srcoll').bind('scroll', function() {
					nScrollHight = $(this)[0].scrollHeight;
					nScrollTop = $(this)[0].scrollTop;
					if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
						myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>');

						allowInfinite = false;

						setTimeout(function() {
							allowInfinite = true;
							if(lastItemIndex >= maxItems) {
								myApp.dialog.close();
								// myApp.dialog.alert("没有更多数据了");
								return;
							}
							var html = '',lastItemIndexMax = lastItemIndex + itemsPerLoad;
							lastItemIndexMax = lastItemIndexMax >= maxItems ? maxItems : lastItemIndexMax;
							for(var i = lastItemIndex; i < lastItemIndexMax; i++) {
								html += "<li onclick='showEventDetail(0,\"" + EqpEvtData[i].time + "\",\"" + EqpEvtData[i].event + "\")'>" + 
									'		<span>' + EqpEvtData[i].time + '</span>' +
									'		<span>' + EqpEvtData[i].equip_nm + '</span>' +
									'		<span>' + EqpEvtData[i].event + '</span>' +
									'	</li>';
							}
							$$('#eventSearchEquipsId').append(html);
							lastItemIndex = $$('#eventSearchEquipsId li').length;
							myApp.dialog.close();
						}, 1000);
					}
				});
				EqpEvtDataFlag = false;
			}
		}
		JQajaxoNoCancel("post", _url, true, _data, _successEqp);
	} else if(searchTabType == "Set events") {
		_url = service + "/QuerySetupsEvt";
		_data = "times=" + realSearchTime + "&&equip_no_list=" + realSearchEquip;

		function _successSet(data) {
			var resultJs = $(data).children("string").text();
			var result = SetEvtData = JSON.parse(resultJs);
			var strData = "";
			var resultLength = result.length > 20 ? 20 : result.length;
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(1,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].equip_nm + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>查无数据</li>";
			}
			$("#eventSearchSetId").html(strData);
			myApp.dialog.close();

			if(SetEvtDataFlag) {
				// Loading flag
				var allowInfinite = true,lastItemIndex = $$('#eventSearchSetId li').length,maxItems = SetEvtData.length,itemsPerLoad = 20;

				var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
				var nScrollTop = 0; //滚动到的当前位置
				var nDivHight = $("#tab2").height();
				$("#tab2").unbind('srcoll').bind('scroll', function() {
					nScrollHight = $(this)[0].scrollHeight;
					nScrollTop = $(this)[0].scrollTop;
					if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
						myApp.dialog.progress('<a style="font-size: 1rem">Loading...</a>');

						allowInfinite = false;

						setTimeout(function() {
							allowInfinite = true;
							if(lastItemIndex >= maxItems) {
								myApp.dialog.close();
								// myApp.dialog.alert("没有更多数据了");
								return;
							}

							var html = '';
							var lastItemIndexMax = lastItemIndex + itemsPerLoad;
							lastItemIndexMax = lastItemIndexMax >= maxItems ? maxItems : lastItemIndexMax;
							for(var i = lastItemIndex; i < lastItemIndexMax; i++) {
								html += "<li onclick='showEventDetail(1,\"" + SetEvtData[i].time + "\",\"" + SetEvtData[i].event + "\")'>" +
									'		<span>' + SetEvtData[i].time + '</span>' +
									'		<span>' + SetEvtData[i].equip_nm + '</span>' +
									'		<span>' + SetEvtData[i].event + '</span>' +
									'	</li>';
							}
							$$('#eventSearchSetId').append(html);
							lastItemIndex = $$('#eventSearchSetId li').length;
							myApp.dialog.close();
						}, 1000);
					}
				});
				SetEvtDataFlag = false;
			}

		}
		JQajaxoNoCancel("post", _url, true, _data, _successSet);
	} else {
		_url = service + "/QuerySystemEvt";
		_data = "times=" + realSearchTime;

		function _successSys(data) {
			var resultJs = $(data).children("string").text();
			var result = SysEvtData = JSON.parse(resultJs);
			var resultLength = result.length > 20 ? 20 : result.length;
			var strData = "";
			if(result && result != "false") {
				for(var i = 0; i < resultLength; i++) {
					strData += "<li onclick='showEventDetail(2,\"" + result[i].time + "\",\"" + result[i].event + "\")'>" +
						'		<span>' + result[i].time + '</span>' +
						'		<span>' + result[i].event + '</span>' +
						'	</li>';
				}
			} else {
				strData = "<li style='border-bottom:none;text-align:center;line-height:38px'>Check no data</li>";
			}
			$("#eventSearchSystemId").html(strData);
			myApp.dialog.close();

			if(SysEvtDataFlag) {
				// Loading flag
				var allowInfinite = true;
				var lastItemIndex = $$('#eventSearchSystemId li').length;
				var maxItems = SysEvtData.length;
				var itemsPerLoad = 20;

				var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
				var nScrollTop = 0; //滚动到的当前位置
				var nDivHight = $("#tab3").height();
				$("#tab3").unbind('srcoll').bind('scroll', function() {
					nScrollHight = $(this)[0].scrollHeight;
					nScrollTop = $(this)[0].scrollTop;
					if(nScrollTop + nDivHight >= nScrollHight && allowInfinite) {
						allowInfinite = false;
						myApp.dialog.progress('<a style="font-size: 1rem">Loading...</a>');

						setTimeout(function() {
							allowInfinite = true;
							if(lastItemIndex >= maxItems) {
								myApp.dialog.close();
								// myApp.dialog.alert("没有更多数据了");
								return;
							}

							var html = '';
							var lastItemIndexMax = lastItemIndex + itemsPerLoad;
							lastItemIndexMax = lastItemIndexMax >= maxItems ? maxItems : lastItemIndexMax;
							for(var i = lastItemIndex; i < lastItemIndexMax; i++) {
								html += "<li onclick='showEventDetail(2,\"" + SysEvtData[i].time + "\",\"" + SysEvtData[i].event + "\")'>" +
									'		<span>' + SysEvtData[i].time + '</span>' +
									'		<span>' + SysEvtData[i].event + '</span>' +
									'	</li>';
							}
							$$('#eventSearchSystemId').append(html);
							lastItemIndex = $$('#eventSearchSystemId li').length;
							myApp.dialog.close();
						}, 1000);
					}
				});
				SysEvtDataFlag = false;
			}
		}
		JQajaxoNoCancel("post", _url, true, _data, _successSys);
	}
}

function showEventDetail(type, time, event) {
	myApp.router.navigate("/equipSearchDetail/?"+type+"&"+time+"&"+event+"");
}

function getNowTime() {
	var date = new Date();
	var seperator1 = "/";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

//封装ajax
function JQajaxoNoCancel(_type, _url, _asycn, _data, _success) {
	var ajaxs = $.ajax({
		type: _type,
		url: _url,
		async: _asycn,
		data: _data,
		success: _success,
		complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
			if(status == 'timeout') { //超时,status还有success,error等值的情况
				ajaxs.abort();
				myApp.dialog.create({
					title: "System hint",
					text: 'Request timeout, see if the network is connected！',
					buttons: [{
						text: 'Confirm'
					}]
				}).open();
			}
			XMLHttpRequest = null;
		},
		error: function() {
			myApp.dialog.create({
				title: "System hint",
				text: 'Request timeout, see if the network is connected！',
				buttons: [{
					text: 'Confirm'
				}]
			}).open();
		}
	});
}