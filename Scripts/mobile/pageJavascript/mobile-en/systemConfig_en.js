

var systemToastCenter;
var selectEquiId=[],videoList={},acessList={};
var alertSuc,alertFai;
function systemConfig_en(){
	alertSuc= myApp.toast.create({text: "Successful operation", position: 'center', closeTimeout: 2000, });
	alertFai= myApp.toast.create({text: "operation failed", position: 'center', closeTimeout: 2000, });
	switchToolbar("configTool");
	$$(".sheet-modal").on('sheet:open',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"hidden"})
	})
	$$(".sheet-modal").on('sheet:close',function(e,sheet){
		$(".popup-config .page-content .list ul").css({overflow:"auto"})
	})
	var equipHtml=[
		 {lable:"Device number",key:"equip_no"},{lable:"Device name",key:"equip_nm"},{lable:"Relational interface",key:"related_pic"},{lable:"Device attribute",key:"equip_detail"},
		 {lable:"Communication refresh cycle",key:"acc_cyc"},{lable:"Opinions on troubleshooting",key:"proc_advice"},{lable:"Fault hint",key:"out_of_contact"},{lable:"Fault Recovery Tips",key:"contacted"},
		 {lable:"Alarm sound file",key:"event_wav"},{lable:"Communication port",key:"local_addr"},{lable:"Device address",key:"equip_addr"},{lable:"Communication parameters",key:"communication_param"},
		 {lable:"Communication time parameters",key:"communication_time_param"},{lable:"Alarm upgrade cycle (minutes)",key:"AlarmRiseCycle"},{lable:"Template Equipment Number",key:"raw_equip_no"},
		 {lable:"Schedule name",key:"tabname"},{lable:"attribute",key:"attrib"},{lable:"Safety period",key:"SafeTime"},{lable:"Associated video",key:"related_video"},
		 {lable:"Asset number",key:"ZiChanID"},{lable:"Plan number",key:"PlanNo"},
		 {lable:"Whether to display alarm",key:"alarm",type:"showAlarm,sheet-alarm",value:1},
		 {lable:"Whether to record alarm",key:"alarm",type:"markAlarm,sheet-alarm",value:2}
		
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
		$("#set_en").html("")
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length,html="";
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				html +='<li >'+
							'<a href="/mobile-en/sysConfigEdict_en/?setType=3&equipId='+value.equip_no+' &equipName='+value.set_nm+'&setId='+value.set_no+'" >'+value.set_nm+'</a>'+
				    	
						'</li>';
			}
			$("#set_en").append(html)
		}
	})
}
function getYxSelect(arr){
	var str=arr.toString();
	$.when(AlarmCenterContext.setYxConfig(str)).done(function(e){
		$("#yxp_en").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length,html="";
			for(var i=0;i<lg;i++){
				var value=dat[i];
				var valueStr=JSON.stringify(value).replace(/"/g,"'");
				html +='<li  >'+
							'<a href="/mobile-en/sysConfigEdict_en/?setType=2&equipId='+value.equip_no+' &equipName='+value.yx_nm+'&yxId='+value.yx_no+'" >'+value.yx_nm+'</a>'+
			    	
						'</li>';
				
			}
			$("#yxp_en").append(html);
		}
	})
}
function getYcSelect(arr){
	var str=arr.toString();
	$("#ycp_en").html("");
	$.when(AlarmCenterContext.setYcConfig(str)).done(function(e){
		$("#ycp").html("");
		if(e.HttpData.code==200&&e.HttpData.data){
			var dat=e.HttpData.data,lg=dat.length,html="";
			for(var i=0;i<lg;i++){
				var value=dat[i];
				html +='<li >'+
							'<a href="/mobile-en/sysConfigEdict_en/?setType=1&equipId='+value.equip_no+' &equipName='+value.yc_nm+'&ycId='+value.yc_no+'" >'+value.yc_nm+'</a>'+						    	
						'</li>';
			}
			$("#ycp_en").append(html);
		}
		myApp.dialog.close();
	})
}

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
	$(".sheet-video_en .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==videoid){
			$(this).find("input").prop("checked",true);
			
		}else{
			$(this).find("input").prop("checked",false);
		}
	})
	
	myApp.sheet.open('.sheet-video_en')
}
function showZiChanSheet(dom,zichanid){
	$(".sheet-zichan_en .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==zichanid){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-zichan_en')
}
function showPlanSheet(dom,plan){
//	console.log(plan)
	$(".sheet-paln_en .eq-list li").each(function(){
		var id=$(this).find("input").val();
		if(id==plan){
			$(this).find("input").prop("checked",true)
			
		}else{
			$(this).find("input").prop("checked",false)
		}
	})
	myApp.sheet.open('.sheet-paln_en')
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
			          '<div class="item-after">yes</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{
			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">no</div>'+
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
			          '<div class="item-after">yes</div>'+
			        '</div>'+
			      '</div>'+
			    '</li>';
		}else{

			html='<li>'+
			      '<div class="item-content">'+
			        '<div class="item-inner">'+
			          '<div class="item-title">'+label+'</div>'+
			          '<div class="item-after">no</div>'+
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
	    		$(".sheet-zichan_en ul").append(html);
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
	    		$(".sheet-paln_en ul").append(html);
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
	    		$(".sheet-video_en ul").append(html);
			}

		}

	})
}
function upInforEdict_en(){
	var updateObj={},val,uploadJson=[];
		if(edictType==0){
			$("#equipTable li").each(function(){
			var idStr=$(this).find("input").attr("id");
			if(idStr){
			    val=$(this).find("input").val();
				if(idStr=="equip_no"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+val+"'"
					}
				}
				else if(idStr=="canexecution"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+canexecution+"'"
					}
				}else if(idStr=="record"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+record+"'"
					}
				}else if(idStr=="inversion"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+inversion+"'"
					}
				}else if(idStr=="mapping"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+mapping+"'"
					}
				}else if(idStr=="curve_rcd"){
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+curve_rcd+"'"
					}
				}
				else if(idStr=="ZiChanID"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}
				else if(idStr=="related_video"){
					var upval=$(this).find("input").attr("upval");
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
						"listName":idStr,
						"vlaue":"'"+upval+"'"
					}
				}else if(idStr=="alarm"){
					return
				}
				else{
					updateObj={
						id:"'"+$("#equip_no").val()+"'",
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


