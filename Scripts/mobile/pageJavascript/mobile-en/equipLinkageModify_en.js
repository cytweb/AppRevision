function equipLinkageModify_en() {
	var chatObject = myApp.views.main.history,
		urlLength = chatObject.length - 1,
		receiveUser = chatObject[urlLength].split("?")[1],
		msgArray = [];
	receiveUser ? msgArray = receiveUser.split("&") : "";

	var index = "";
	if(receiveUser) {
		var receiveUserArr = receiveUser.split("&");
		var equipName = receiveUserArr[0];
		var cType = receiveUserArr[1];
		var cSpot = receiveUserArr[2];
		var delayTime = receiveUserArr[3];
		var linkageEquip = receiveUserArr[4];
		var linkageOpt = receiveUserArr[5];
		var optCode = receiveUserArr[6];
		var remarks = receiveUserArr[7];
		var ID = receiveUserArr[8];
		$("#equipLinkageModifyId").attr("dataID", ID)
		index = receiveUserArr[9];
		if(equipName != " " && equipName != "undefined") {
			$("#equipTiggerName").val(equipName);
		}
		if(cType != " " && cType != "undefined") {
			$("#equipTiggerType").val(cType);
		}
		if(cSpot != " " && cSpot != "undefined") {
			$("#equipTiggerSpot").val(cSpot);
		}
		if(delayTime != " " && delayTime != "undefined") {
			$("#equipTiggerTime").val(delayTime);
		}else{
			$("#equipTiggerTime").val(0);
		}
		if(linkageEquip != " " && linkageEquip != "undefined") {
			$("#equipTigger_Link").val(linkageEquip);
		}
		if(linkageOpt != " " && linkageOpt != "undefined") {
			$("#equipTiggerCom").val(linkageOpt);
		}
		if(remarks != " " && remarks != "undefined") {
			$("#equipTiggerInfo").val(remarks);
		}
	}

	$("#equipLinkageModifyId").unbind('click').bind('click', function() {
		addLinkage_en(this, index);
	});
	
	/*function _equipTiggerNameChange(picker, values, displayValues){
		console.log(picker, values, displayValues)
		if(picker.cols[0].replaceValues){
        }
        
        link_listInit_no = listAdd.filter((equip, index) => {if ( equip.label === country) {return equip;}})[0].value;
                    // link_listInit_no?equipLinkPublicAjax({equip_nos: link_listInit_no}, "/api/GWServiceWebAPI/getYcp", 9):"";
                       if(link_listInit_no)
                            $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/getYcp",{equip_nos: link_listInit_no}),AlarmCenterContext.post("/api/GWServiceWebAPI/getYxp",{equip_nos: link_listInit_no})).done(function(n,l){
                              if(n.HttpData.code == 200 && l.HttpData.code == 200)
                              {
                                    ycpData_table_9=n.HttpData;yxpData_table_10 = l.HttpData;writeContent();
                              }
                            }).fail(function(e){});
                    $(".equipTiggerType,.equipTiggerSpot").val("");
        
	}
	//触发设备选择
	createPickerModel_en("equipTiggerName",listAdd.map(item => {return item.label;}),null,_equipTiggerNameChange,null);
	
	function _equipTiggerTypeChange(picker, values, displayValues){
		console.log(picker, values, displayValues)
		if(picker.cols[0].replaceValues){
        }
	}
	//触发类型选择
	createPickerModel_en("equipTiggerType",equipTiggerType.map(item => {return item.label;}),null,_equipTiggerTypeChange,null);
	
	function _equipTiggerSpotChange(picker, values, displayValues){
		console.log(picker, values, displayValues)
		if(picker.cols[0].replaceValues){
        }
	}
	//触发点选择
	createPickerModel_en("equipTiggerSpot",getType[0].children.map(item =>{return item.label}),null,_equipTiggerSpotChange,null);
	
	function _equipTiggerLinkChange(picker, values, displayValues){
		console.log(picker, values, displayValues)
		if(picker.cols[0].replaceValues){
        }
	}
	//联动设备选择
	createPickerModel_en("equipTigger_Link",linkageEquips.map(item => {return item.label;}),null,_equipTiggerLinkChange,null);
	
	function _equipTiggerComChange(picker, values, displayValues){
		console.log(picker, values, displayValues)
		if(picker.cols[0].replaceValues){
        }
	}
	//联动命令选择
	createPickerModel_en("equipTiggerCom",equipTiggerCommand.map(item=>{return item.set_nm}),null,_equipTiggerComChange,null);*/
}

function createPickerModel_en(id, values, _opened, _change, _closed) {
	myApp.picker.create({
		inputEl: '#' + id,
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
			values: values
		}],
		on: {
			opened: _opened,
			change: _change,
			closed: _closed
		}
	});
}