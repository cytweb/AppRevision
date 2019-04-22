var alertSuc,alertFai;

function sysConfigEdict(){
	alertSuc= myApp.toast.create({text: "操作成功", position: 'center', closeTimeout: 2000, });
	alertFai= myApp.toast.create({text: "操作失败", position: 'center', closeTimeout: 2000, });

var ychtml=[
	{lable:"设备号",key:"equip_no"},{lable:"模拟量编号",key:"yc_no"},{lable:"模拟量名称",key:"yc_nm"},{lable:"单位",key:"unit"},
	{lable:"属性值",key:"val_trait"},{lable:"下限值",key:"val_min"},{lable:"上限值",key:"val_max"},{lable:"最小值",key:"physic_min"},
	{lable:"最大值",key:"physic_max"},{lable:"操作命令",key:"main_instruction"},{lable:"操作参数",key:"minor_instruction"},
	{lable:"处理意见",key:"proc_advice"},{lable:"报警级别",key:"lvl_level"},{lable:"声音文件",key:"wave_file"},{lable:"报警屏蔽",key:"alarm_shield"},
	{lable:"安全时段",key:"SafeTime"},{lable:"回复下限值",key:"restore_min"},{lable:"回复上限值",key:"restore_max"},{lable:"实测最小值",key:"yc_min"},
	{lable:"实测最大值",key:"yc_max"},{lable:"越下限事件",key:"outmin_evt"},{lable:"越上限事件",key:"outmax_evt"},{lable:"曲线记录阈值",key:"curve_limit"},
	{lable:"报警升级周期",key:"AlarmRiseCycle"},{lable:"起始安全时段",key:"safe_bgn"},{lable:"结束安全时段",key:"safe_end"},{lable:"越线滞纳时间（秒）",key:"alarm_acceptable_time"},
	{lable:"恢复滞纳时间（秒）",key:"alarm_repeat_time"},{lable:"重复报警时间（分钟）",key:"restore_acceptable_time"},{lable:"关联界面",key:"related_pic"},{lable:"关联视频",key:"related_video"},
	{lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},{lable:"是否曲线记录",key:"curve_rcd",type:"curve_rcd,sheet-alarm"},{lable:"是否比例变换",key:"mapping",type:"mapping,sheet-alarm"},
	{lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
	 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
	
]
var yxhtml=[
	{lable:"设备号",key:"equip_no"},{lable:"模拟量编号",key:"yx_no"},{lable:"状态量名称",key:"yx_nm"},{lable:"0-1事件",key:"evt_01"},
	{lable:"1-0事件",key:"evt_10"},{lable:"处理意见0-1",key:"proc_advice_r"},{lable:"处理意见1-0",key:"proc_advice_d"},{lable:" 0-1级别",key:"level_r"},
	{lable:"1-0级别",key:"level_d"},{lable:"初始状态",key:"initval"},{lable:"属性值",key:"val_trait"},{lable:"操作命令",key:"main_instruction"},
	{lable:"操作参数",key:"minor_instruction"},{lable:"越线滞纳时间（秒）",key:"alarm_acceptable_time"},{lable:"恢复滞纳时间（秒）",key:"alarm_repeat_time"},{lable:"重复报警时间（分钟）",key:"restore_acceptable_time"},
	{lable:"声音文件",key:"wave_file"},{lable:"报警屏蔽",key:"alarm_shield"},{lable:"报警升级周期（分钟）",key:"AlarmRiseCycle"},{lable:"安全时段",key:"SafeTime"},
	{lable:"关联页面",key:"related_pic"},{lable:"关联视频",key:"related_video"},{lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},
	{lable:"是否取反",key:"inversion",type:"inversion,sheet-alarm"},
	{lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
	 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
]
var sethtml=[
	{lable:"设备号",key:"equip_no"},{lable:"设置号",key:"set_no"},{lable:"设置名称",key:"set_nm"},{lable:"值",key:"value"},
	{lable:"设置类型",key:"set_type"},{lable:"动作",key:"action"},{lable:"操作命令",key:"main_instruction"},{lable:" 操作参数",key:"minor_instruction"},
	{lable:"是否记录",key:"record",type:"record,sheet-alarm"},{lable:"是否可执行",key:"canexecution",type:"canexecution,sheet-alarm"}
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
		$("#sysConfigEdict .navbar .title").text("遥测配置")
		getYcSingle(eqNo,ycNo,ychtml);
		
	}else if(type==2){
		$("#sysConfigEdict .navbar .title").text("遥信配置")
		getYxSingle(eqNo,yxNo,yxhtml)
	}else{
		$("#sysConfigEdict .navbar .title").text("设置配置")
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
//				var valueStr=JSON.stringify(value).replace(/"/g,"'"); 	
				loadInfor(1,valueStr,ychtml)
//				$("#equipTable").append(html);
			}
		}
//		myApp.dialog.close()
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
	$("#sysConfigEdict .edictList ul").html("");
	for(var i=0;i<equipHtml.length;i++){
		var value=equipHtml[i];
		var boolStr=value.type;
		loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'#sysConfigEdict .edictList ul');
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
//	console.log(check)
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
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}else if(idStr=="yc_no"){
					return;
				}
				else if(idStr=="mapping"){
					updateObj={
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":mapping
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":curve_rcd
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						"id":$("#equip_no").val(),
						"yc_no":$("#yc_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:$("#equip_no").val(),
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
						"id":$("#equip_no").val(),
						"yx_no":$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}else if(idStr=="yx_no"){
					return;
				}
				else if(idStr=="inversion"){
					updateObj={
						"id":$("#equip_no").val(),
						"yx_no":$("#yx_no").val(),
						"listName":idStr,
						"vlaue":inversion
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					
					updateObj={
						"id":$("#equip_no").val(),
						"yx_no":$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						"id": $("#equip_no").val(),
						"yx_no":$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						"id":$("#equip_no").val(),
						"yx_no":$("#yx_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				id:$("#equip_no").val(),
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
							"id":$("#equip_no").val(),
							"set_no":$("#set_no").val(),
							"listName":idStr,
							"vlaue":"'"+val+"'"
						}
					}else if(idStr=="set_no"){
						return;
					}
					else if(idStr=="canexecution"){
						
						updateObj={
							"id":$("#equip_no").val(),
							"set_no":$("#set_no").val(),
							"listName":"[canexecution]",
							"vlaue":canexecution
						}
					}else if(idStr=="record"){
						updateObj={
							"id":$("#equip_no").val(),
							"set_no":$("#set_no").val(),
							"listName":"[record]",
							"vlaue":record
						}
					}else if(idStr=="alarm"){
						return
					}
					else{
						updateObj={
							"id":$("#equip_no").val(),
							"set_no":$("#set_no").val(),
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
