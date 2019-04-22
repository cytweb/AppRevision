function test(){

	// 遥信
	$.when(AlarmCenterContext.equip_yxp_state(9,7)).done(function(n,l){
	    $(".yx").text(n.HttpData.data.m_YXState);
	}).fail(function(e){});
	// 遥测试
	$.when(AlarmCenterContext.equip_ycp_state(9,7)).done(function(n,l){
	    $(".yc").text(n.HttpData.data.m_YCValue);
	}).fail(function(e){});
	// 控制
	$(".controlEquip").unbind().bind("click",function(){
		$.when(AlarmCenterContext.setup(51)).done(function(n,l){
           
		}).fail(function(e){});
	});
	


}