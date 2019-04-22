function equipConfigList(){
	switchToolbar("configTool");
	myApp.searchbar.create({
		el:'#search',
		searchContainer:'.eq-list',
		searchIn:'.eq-list a'
	})
	getEquipList();
}
function getEquipList(){
//	myApp.dialog.progress('<a style="font-size: 1rem">加载中...</a>')
	$("#equipConfigList .eq-list ul").html("")
	$.when(AlarmCenterContext.getEquipList()).done(function(e) {
		var dat=JSON.parse($(e).find("string").text()),lg=dat.length;
		if(lg&&lg>0){
			for(var i=0;i<lg;i++){
				var value=dat[i];
				if(value.value!=""){
					var html='<li>'+
								'<li><a href="/systemConfig/?equipId='+value.value+'&equipName='+value.name+'">'+value.name+'</a></li>'+
							'</li>';
					$("#equipConfigList .eq-list ul").append(html)
				}
				
			}
		}else{
			var html='<li style="text-align:center;">'+
						    '暂无设备数据可加载'+
						'</li>';
			$("#equipConfigList .eq-list ul").append(html)
		}
//		myApp.dialog.close()
	});

}
function selectEquip(value,dom){
	var check=$(dom).find("input").prop("checked");
	if(check){
		/*删除*/
		selectEquiId.remove(value);
	}else{
		/*添加*/
		selectEquiId.push(value);
	}
}