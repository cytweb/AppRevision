var alertSuc,alertFai;

function sysConfigEdict_en(){
	alertSuc= myApp.toast.create({text: "Successful operation", position: 'center', closeTimeout: 2000, });
	alertFai= myApp.toast.create({text: "operation failed", position: 'center', closeTimeout: 2000, });

var ychtml=[
	{lable:"Device number",key:"equip_no"},{lable:"Analog number",key:"yc_no"},{lable:"Name of Analog Quantity",key:"yc_nm"},{lable:"Company",key:"unit"},
	{lable:"Attribute value",key:"val_trait"},{lable:"Lower limit value",key:"val_min"},{lable:"Upper limit value",key:"val_max"},{lable:"minimum value",key:"physic_min"},
	{lable:"Maximum value",key:"physic_max"},{lable:"Operation command",key:"main_instruction"},{lable:"Operational parameters",key:"minor_instruction"},
	{lable:"Handling opinions",key:"proc_advice"},{lable:"Alarm level",key:"lvl_level"},{lable:"Sound file",key:"wave_file"},{lable:"Alarm screen",key:"alarm_shield"},
	{lable:"Safety period",key:"SafeTime"},{lable:"Reply to the lower limit",key:"restore_min"},{lable:"Return upper limit",key:"restore_max"},{lable:"Minimum measured value",key:"yc_min"},
	{lable:"Measured maximum",key:"yc_max"},{lable:"Cross-Bottom Events",key:"outmin_evt"},{lable:"Transcendental events",key:"outmax_evt"},{lable:"Curve Recording Threshold",key:"curve_limit"},
	{lable:"Alarm upgrade cycle",key:"AlarmRiseCycle"},{lable:"Initial Safety Period",key:"safe_bgn"},{lable:"End of Safety Period",key:"safe_end"},{lable:"Over-line delay time (seconds)",key:"alarm_acceptable_time"},
	{lable:"Recovery delay time (seconds)",key:"alarm_repeat_time"},{lable:"Repeated alarm time (minutes)",key:"restore_acceptable_time"},{lable:"Relational interface",key:"related_pic"},{lable:"Associated video",key:"related_video"},
	{lable:"Asset number",key:"ZiChanID"},{lable:"Plan number",key:"PlanNo"},{lable:"Whether Curve Recording",key:"curve_rcd",type:"curve_rcd,sheet-alarm"},{lable:"Scale transformation or not",key:"mapping",type:"mapping,sheet-alarm"},
	{lable:"Whether to display alarm",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
	 {lable:"Whether to record alarm",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
	
]
var yxhtml=[
	{lable:"Device number",key:"equip_no"},{lable:"Analog number",key:"yx_no"},{lable:"State variable name",key:"yx_nm"},{lable:"0-1Event",key:"evt_01"},
	{lable:"1-0Event",key:"evt_10"},{lable:"Handling opinions0-1",key:"proc_advice_r"},{lable:"Handling opinions1-0",key:"proc_advice_d"},{lable:" 0-1level",key:"level_r"},
	{lable:"1-0level",key:"level_d"},{lable:"Initial state",key:"initval"},{lable:"Attribute value",key:"val_trait"},{lable:"Operation command",key:"main_instruction"},
	{lable:"Operational parameters",key:"minor_instruction"},{lable:"Over-line delay time (seconds)",key:"alarm_acceptable_time"},{lable:"Recovery delay time (seconds)",key:"alarm_repeat_time"},{lable:"Repeated alarm time (minutes)",key:"restore_acceptable_time"},
	{lable:"Sound file",key:"wave_file"},{lable:"Alarm screen",key:"alarm_shield"},{lable:"Alarm upgrade cycle (minutes)",key:"AlarmRiseCycle"},{lable:"Safety period",key:"SafeTime"},
	{lable:"Related pages",key:"related_pic"},{lable:"Associated video",key:"related_video"},{lable:"Asset number",key:"ZiChanID"},{lable:"Plan number",key:"PlanNo"},
	{lable:"Is it reversed",key:"inversion",type:"inversion,sheet-alarm"},
	{lable:"Whether to display alarm",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
	 {lable:"Whether to record alarm",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
]
var sethtml=[
	{lable:"Device number",key:"equip_no"},{lable:"Setting number",key:"set_no"},{lable:"Set name",key:"set_nm"},{lable:"value",key:"value"},
	{lable:"Set type",key:"set_type"},{lable:"action",key:"action"},{lable:"Operation command",key:"main_instruction"},{lable:" Operational parameters",key:"minor_instruction"},
	{lable:"Is it recorded",key:"record",type:"record,sheet-alarm"},{lable:"Is it enforceable",key:"canexecution",type:"canexecution,sheet-alarm"}
]
	
	
	var eqNo=myApp.views.main.router.currentRoute.query.equipId;
	var name=myApp.views.main.router.currentRoute.query.equipName;
	var type=myApp.views.main.router.currentRoute.query.setType;
	var ycNo=myApp.views.main.router.currentRoute.query.ycId;
	var yxNo=myApp.views.main.router.currentRoute.query.yxId;
	var setNo=myApp.views.main.router.currentRoute.query.setId;
	$.when(AlarmCenterContext.getAlarmWay()).done(function(e){
		if(e.HttpData.code=200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var obj={
					lable:value.Proc_name,
					key:"alarmWay",
					type:"alarmWay"+i+",sheet-alarm,alarmway",
					value:value.Proc_Code
				}
				ychtml.push(obj);
				yxhtml.push(obj);
			}
		}
	})
	getAccessList();
	getlinkVideoList();
	getPlanList();
	if(type==1){
		$("#sysConfigEdict_en .navbar .title").text("yc configuration")
		getYcSingle(eqNo,ycNo,ychtml);
		
	}else if(type==2){
		$("#sysConfigEdict_en .navbar .title").text("yx configuration")
		getYxSingle(eqNo,yxNo,yxhtml)
	}else{
		$("#sysConfigEdict_en .navbar .title").text("set configuration")
		setSetSingle(eqNo,setNo,sethtml)
	}
}
function  getYcSingle(equip,ycno,ychtml){
	$.when(AlarmCenterContext.setYcConfigSingle(equip,ycno)).done(function(e){
		$("#equipTable").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=value;	
				loadInfor(1,valueStr,ychtml)
			}
		}
	})
}
function getYxSingle(equip,yxno,yxhtml){
	$.when(AlarmCenterContext.setYxConfigSingle(equip,yxno)).done(function(e){
		$("#equipTable").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=value;
//				var valueStr=JSON.stringify(value).replace(/"/g,"'"); 	
				loadInfor(2,valueStr,yxhtml)
//				$("#equipTable").append(html);
			}
		}
//		myApp.dialog.close()
	})
}
function setSetSingle(equip,yxno,sethtml){
	$.when(AlarmCenterContext.setSetConfigSingle(equip,yxno)).done(function(e){
		$("#equipTable").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=value;
//				var valueStr=JSON.stringify(value).replace(/"/g,"'"); 	
				loadInfor(3,valueStr,sethtml)
			}
		}
	})
}



var selectEquiId=[],videoList={},acessList={};
var alarmCode=0,updateAlarmCode=0,canEdict,edictDom,edictType;
var canexecution,record,inversion,mapping,curve_rcd;
function loadInfor(deal,str,equipHtml){
	alarmCode=str.alarm_scheme;
	edictType=deal;
	$("#sysConfigEdict_en .edictList ul").html("");
	for(var i=0;i<equipHtml.length;i++){
		var value=equipHtml[i];
		var boolStr=value.type;
		loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'#sysConfigEdict_en .edictList ul');
	}

	
}
function loadEdictHtml(label,key,id,value,type,dom){
//	console.log(label,key,dom)
//	$(dom).html("")
	var html="",alrmId;
	if(type){
		alrmId=type.split(",")[0];
	}

	if(id=="equip_no"||id=="yc_no"||id=="yx_no"||id=="set_no"){
		html='<li class="item-content item-input">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" disabled   placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}else if(id=="related_video"){

		html='<li class="item-content item-input" onclick="showVideoSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'" readonly placeholder="'+label+'" value="'+videoList[key]+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}else if(id=="ZiChanID"){
		html='<li class="item-content item-input" onclick="showZiChanSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'" readonly placeholder="'+label+'" value="'+acessList[key]+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
		
	}else if(id=="PlanNo"){
		html='<li class="item-content item-input"  onclick="showPlanSheet(this,\''+key+'\')">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'" upval="'+key+'"  readonly  placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}
	else if(id=="curve_rcd"){
		
		if(key){
			html='<li onclick="edictCur(this)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1" ckecked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
		}else{
			html='<li  onclick="edictCur(this)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
		}
		curve_rcd=key;
	}else if(id=="mapping"){
		if(key){
			html='<li onclick="edictMap(this)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1" ckecked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
			

		}else{
			html='<li  onclick="edictMap(this)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'"  type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		mapping=key;
	}
	else if(id=="inversion"){
		if(key){
			html='<li onclick="edictInver(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictInver(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		inversion=key;
	}
	else if(id=="record"){
		if(key){
			html='<li  onclick="edictRecord(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictRecord(this,0)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		record=key;
	}
	else if(id=="canexecution"){
		if(key){
			html='<li  onclick="edictCanexe(this,1)">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="1"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictCanexe(this,0)">'+
			      '<label class="item-checkbox item-content" >'+
			        '<input id="'+id+'" type="checkbox" name="demo-checkbox" value="0"  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
		canexecution=key;
	}
	
	else if(id=="alarm"){

		if((alarmCode & value) > 0){
			html='<li onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="alarm"  type="checkbox" name="demo-checkbox" value="'+value+'"  checked />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input id="alarm"  type="checkbox" name="demo-checkbox"  value="'+value+'"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}
	}
	else if(id=="alarmWay"){

		if((alarmCode & value) > 0){
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input   type="checkbox" name="demo-checkbox"   value="'+value+'" checked  />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';

		}else{
			html='<li  onclick="edictAlarmCode(this,'+value+')">'+
			      '<label class="item-checkbox item-content">'+
			        '<input   type="checkbox" name="demo-checkbox"   value="'+value+'"   />'+
			       ' <i class="icon icon-checkbox"></i>'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			        '</div>'+
			      '</label>'+
			    '</li>';
		}
	}
	else{
		html='<li class="item-content item-input">'+
			      '<div class="item-inner">'+
			        '<div class="item-title item-label">'+label+'</div>'+
			        '<div class="item-input-wrap">'+
			          '<input type="text" id="'+id+'"    placeholder="'+label+'" value="'+key+'">'+
			          '<span class="input-clear-button"></span>'+
			        '</div>'+
			      '</div>'+
				'</li>';
	}

	
	$(dom).append(html);
}
function edictCur(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		curve_rcd=false;
	}else{
		curve_rcd=true;
	}
}
function edictMap(dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		mapping=false;
	}else{
		mapping=true;
	}
}
function edictInver(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		inversion=false;
	}else{
		inversion=true;
	}
}
function edictRecord(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		record=false;
	}else{
		record=true;
	}
}
function edictCanexe(dom,deal){
	var check=$(dom).find("input").prop("checked");
	if(check){
		canexecution=false;
	}else{
		canexecution=true;
	}
}
function edictAlarmCode(dom,code){
	var check=$(dom).find("input").prop("checked");
	if(check){
		/*减*/
		alarmCode-=code;
		if(alarmCode<0){
			alarmCode=0
		}
	}else{
		/*加*/
		alarmCode+=code;
	}
//	console.log(alarmCode);
}
function showVideoSheet(dom,videoid){
	$(".sheet-video .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==videoid){
			$(this).find("input").prop("checked",true);
			
		}else{
			$(this).find("input").prop("checked",false);
		}
	})
	
	myApp.sheet.open('.sheet-video')
}
function showZiChanSheet(dom,zichanid){
	$(".sheet-zichan .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==zichanid){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-zichan')
}
function showPlanSheet(dom,plan){
//	console.log(plan)
	$(".sheet-paln .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==plan){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-paln')
}




function selectZichan(zichan,name){
	$("#ZiChanID").val(name);
	$("#ZiChanID").attr("upVal",zichan);
	
}

function selectVideo(video,name){
	$("#related_video").val(name);
	$("#related_video").attr("upVal",video)
}

function selectPlan(plan){
	$("#PlanNo").val(plan);
	
}
function upInforEdict(){
	var updateObj={},val,uploadJson=[];
		if(edictType==1){
			$(".edictList ul li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}else if(idStr=="yc_no"){
					return;
				}
				else if(idStr=="mapping"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":mapping
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":curve_rcd
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yc_no:$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:"'"+$("#equip_no").val()+"'",
				yc_no:$("#yc_no").val(),
				listName:"alarm_scheme",
				vlaue:"'"+alarmCode+"'"
				
			})
			$.when(AlarmCenterContext.updYcConfig(JSON.stringify(uploadJson))).done(function(e){
				if(e.HttpData.code==200&&e.HttpData.data){
					alertSuc.open();
				}else{
					alertFai.open();
				}
			}).fail(function(){
				alertFai.open();
			})
			
		}else if(edictType==2){
			$(".edictList ul li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}else if(idStr=="yx_no"){
					return;
				}
				else if(idStr=="inversion"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":inversion
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						yx_no:$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:"'"+$("#equip_no").val()+"'",
				yx_no:$("#yx_no").val(),
				listName:"alarm_scheme",
				vlaue:"'"+alarmCode+"'"
				
			})
			
			$.when(AlarmCenterContext.updYxConfig(JSON.stringify(uploadJson))).done(function(e){
				if(e.HttpData.code==200&&e.HttpData.data){
					alertSuc.open();
				}else{
					alertFai.open();
				}
			}).fail(function(){
				alertFai.open();
			})
			
		}else{
			$(".edictList ul li").each(function(){
				var idStr=$(this).find("input").attr("id");
				if(idStr){
				    val=$(this).find("input").val();
					if(idStr=="equip_no"){
						updateObj={
							id:"'"+$("#equip_no").val()+"'",
							set_no:$("#set_no").val(),
							"listName":idStr,
							"vlaue":"'"+val+"'"
						}
					}else if(idStr=="set_no"){
						return;
					}
					else if(idStr=="canexecution"){
						
						updateObj={
							id:"'"+$("#equip_no").val()+"'",
							set_no:$("#set_no").val(),
							"listName":"[canexecution]",
							"vlaue":canexecution
						}
					}else if(idStr=="record"){
						updateObj={
							id:"'"+$("#equip_no").val()+"'",
							set_no:$("#set_no").val(),
							"listName":"[record]",
							"vlaue":record
						}
					}else if(idStr=="alarm"){
						return
					}
					else{
						updateObj={
							id:"'"+$("#equip_no").val()+"'",
							set_no:$("#set_no").val(),
							"listName":idStr,
							"vlaue":"'"+val+"'"
						}
					}
					uploadJson.push(updateObj);
	
				}
	
			})
			
			$.when(AlarmCenterContext.updSetConfig(JSON.stringify(uploadJson))).done(function(e){
				if(e.HttpData.code==200&&e.HttpData.data){
					alertSuc.open();
				}else{
					alertFai.open();
				}
			}).fail(function(){
				alertFai.open();
			})
			
		}	

}


function getAccessList(){
	$.when(AlarmCenterContext.getAccess()).done(function(e){
//		console.log(e)
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				acessList[value.ZiChanID]=value.ZiChanName;
				var html='<li onclick="selectZichan(\''+value.ZiChanID+'\',\''+value.ZiChanName+'\')">'+
	    					'<label class="item-radio item-content">'+
					        '<input type="radio" name="demo-radio" value="'+value.ZiChanID+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.ZiChanName+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-zichan ul").append(html);
			}
//			console.log(acessList);
		}
		
		
	})
	
}
function getPlanList(){
	$.when(AlarmCenterContext.getPlan()).done(function(e){
//		console.log(e)
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var html='<li onclick="selectPlan(\''+value.PlanNo+'\')">'+
	    					'<label class="item-radio item-content">'+
					        '<input type="radio" name="demo-radio" value="'+value.PlanNo+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.PlanNo+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-paln ul").append(html);
			}
		}
	})
}
function getlinkVideoList(){
	$.when(AlarmCenterContext.getLinkVideo()).done(function(e){
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var videoId=value.EquipNum+","+value.ID;
				videoList[videoId]=value.ChannelName;
				var html='<li onclick="selectVideo(\''+videoId+'\',\''+value.ChannelName+'\')">'+
	    					'<label class="item-radio item-content" >'+
					        '<input type="radio" name="demo-radio" value="'+value.EquipNum+','+value.ID+'"  />'+
					        '<i class="icon icon-radio"></i>'+
					        '<div class="item-inner">'+
					          '<div class="item-title">'+value.ChannelName+'</div>'+
					        '</div>'+
					      '</label>'+
	    				'</li>';
	    		$(".sheet-video ul").append(html);
			}

		}

	})
}
