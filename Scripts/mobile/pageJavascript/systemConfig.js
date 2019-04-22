

var systemToastCenter;
var selectEquiId=[],videoList={},acessList={};
var alertSuc,alertFai;
function systemConfig(){
	alertSuc= myApp.toast.create({text: "操作成功", position: 'center', closeTimeout: 2000, });
	alertFai= myApp.toast.create({text: "操作失败", position: 'center', closeTimeout: 2000, });
	switchToolbar("configTool");
	$$(".sheet-modal").on('sheet:open',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"hidden"})
	})
	$$(".sheet-modal").on('sheet:close',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"auto"})
	})
	var equipHtml=[
		 {lable:"设备号",key:"equip_no"},{lable:"设备名称",key:"equip_nm"},{lable:"关联界面",key:"related_pic"},{lable:"设备属性",key:"equip_detail"},
		 {lable:"通讯刷新周期",key:"acc_cyc"},{lable:"故障处理意见",key:"proc_advice"},{lable:"故障提示",key:"out_of_contact"},{lable:"故障恢复提示",key:"contacted"},
		 {lable:"报警声音文件",key:"event_wav"},{lable:"通讯端口",key:"local_addr"},{lable:"设备地址",key:"equip_addr"},{lable:"通讯参数",key:"communication_param"},
		 {lable:"通讯时间参数",key:"communication_time_param"},{lable:"报警升级周期（分钟）",key:"AlarmRiseCycle"},{lable:"模板设备号",key:"raw_equip_no"},
		 {lable:"附表名称",key:"tabname"},{lable:"属性",key:"attrib"},{lable:"安全时段",key:"SafeTime"},{lable:"关联视频",key:"related_video"},
		 {lable:"资产编号",key:"ZiChanID"},{lable:"预案号",key:"PlanNo"},
		 {lable:"是否显示报警",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
		 {lable:"是否记录报警",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
		
	]
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
				equipHtml.push(obj);
			}
		}
	})
	getAccessList();
	getlinkVideoList();
	getPlanList();

	var id=parseInt(myApp.views.main.router.currentRoute.query.equipId) ;
	var name=myApp.views.main.router.currentRoute.query.equipName;
	
	selectEquiId=[id];	
	getEquipSelect(selectEquiId,equipHtml);
	
	$(".tabListConfig a").each(function(){
		$(this).off().click(function(){
			
			var type=$(this).attr("seType");
			if(type==0){
				getEquipSelect(selectEquiId,equipHtml);
			}
			else if(type==1){
				getYcSelect(selectEquiId);
			}
			else if(type==2){
				getYxSelect(selectEquiId);
			}else if(type==3){
				getSetSelect(selectEquiId);
			}	
		})
		

	})
}

function getEquipSelect(arr,equipHtml){
	var str=arr.toString();
	var htmlStr=equipHtml;
	$.when(AlarmCenterContext.setEquipConfig(str)).done(function(e){
		$("#equipTable").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=value;
				loadInforCon(0,valueStr,htmlStr);
			}
		}
	})
}
function loadInforCon(deal,str,equipHtml){
		alarmCode=str.alarm_scheme;
		edictType=deal;
		for(var i=0;i<equipHtml.length;i++){
		var value=equipHtml[i];
		var boolStr=value.type;
			loadEdictHtml(value.lable,str[value.key],value.key,value.value,value.type,'#equipTable');
		}
}
var selectEquiId=[],videoList={},acessList={};
var alarmCode=0,updateAlarmCode=0,canEdict,edictDom,edictType;
var canexecution,record,inversion,mapping,curve_rcd;
function loadEdictHtml(label,key,id,value,type,dom){
	var html="";
	
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

//	console.log(html)
	$(dom).append(html);
}


function getSetSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setSetConfig(str)).done(function(e){
//		console.log(e);
		$("#set").html("")
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li >'+
							'<a href="/sysConfigEdict/?setType=3&equipId='+value.equip_no+' &equipName='+value.set_nm+'&setId='+value.set_no+'" >'+value.set_nm+'</a>'+
				    	
						'</li>';
				$("#set").append(html)
			}
		}
//		myApp.dialog.close()
	})
}
function getYxSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYxConfig(str)).done(function(e){
//		console.log(e);
		$("#yxp").html("")
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li  >'+
							'<a href="/sysConfigEdict/?setType=2&equipId='+value.equip_no+' &equipName='+value.yx_nm+'&yxId='+value.yx_no+'" >'+value.yx_nm+'</a>'+
			    	
						'</li>';
				$("#yxp").append(html)
			}
		}
//		myApp.dialog.close()
	})
}
function getYcSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYcConfig(str)).done(function(e){
//		console.log(e);
		$("#ycp").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length;
			for(var i=0;i<lg;i++){
				var value=dat[i];
//				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				var html='<li >'+
							'<a href="/sysConfigEdict/?setType=1&equipId='+value.equip_no+' &equipName='+value.yc_nm+'&ycId='+value.yc_no+'" >'+value.yc_nm+'</a>'+

						      									    	
						'</li>';
				$("#ycp").append(html);
			}
		}
		myApp.dialog.close()
	})
}
//var edictData;

var alarmCode=0,updateAlarmCode=0,canEdict,edictDom,edictType;
var canexecution,record,inversion,mapping,curve_rcd;
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
function loadInforHtml(label,key,boolStr,id,value,dom){
	var html="";
	var boolArr;
//	$(dom).html("")
	if(boolStr){
		boolArr=boolStr.split(",");
	}
	if(key==""||key=="null"){
		key="无"
	}
//	console.log(value);
//	videoList={},acessList={}
	if(id=="related_video"){
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+videoList[key]+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}else if(id=="ZiChanID"){
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+acessList[key]+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}
	
	else if(id=="alarm"){

		if((alarmCode & value) > 0){
			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">是</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{
			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">否</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}
	}
	else if(id=="alarmWay"){

		if((alarmCode & value) > 0){

			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">是</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{

			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">否</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}
	}
	else{
		html='<li>'+
		      '<div class="item-content">'+
		        '<div class="item-inner">'+
		          '<div class="item-title">'+label+'</div>'+
		          '<div class="item-after">'+key+'</div>'+
		        '</div>'+
		      '</div>'+
		    '</li>';
	}
	
	$(dom).append(html);
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
function upInforEdict(){
	var updateObj={},val,uploadJson=[];
		if(edictType==0){
			$("#equipTable li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				else if(idStr=="canexecution"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+canexecution+"'"
					}
				}else if(idStr=="record"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+record+"'"
					}
				}else if(idStr=="inversion"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+inversion+"'"
					}
				}else if(idStr=="mapping"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+mapping+"'"
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+curve_rcd+"'"
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						"id":$("#equip_no").val(),
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				uploadJson.push(updateObj);

			}

		})
			uploadJson.push({
				"id":$("#equip_no").val(),
				"listName":"alarm_scheme",
				"vlaue":"'"+alarmCode+"'"
				
			})

			$.when(AlarmCenterContext.updEquipConfig(JSON.stringify(uploadJson))).done(function(e){
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
function lookOtherInfor(type){
	myApp.popup.open(".popup-config")
}


