function equipConfigList_en(){
	switchToolbar("configTool");
	myApp.searchbar.create({
		el:'#search',
		searchContainer:'.eq-list',
		searchIn:'.eq-list a'
	})
	getEquipList();
}
function getEquipList(){
	$("#equipConfigList_en .eq-list ul").html("")
	$.when(AlarmCenterContext.getEquipList()).done(function(e) {
		var dat=JSON.parse($(e).find("string").text()),lg=dat.length;
		if(lg>0){
			var html ="";
			for(var i=0;i<lg;i++){
				var dt=dat[i];
				if(dt.value!=""){
					html +='<li><a href="/mobile-en/systemConfig_en/?equipId='+dt.value+'&equipName='+dt.name+'">'+dt.name+'</a></li>';
				}
			}
			$("#equipConfigList_en .eq-list ul").append(html)
		}else{
			var html='<li style="text-align:center;">'+
						    'No device data available for loading.'+
						'</li>';
			$("#equipConfigList_en .eq-list ul").append(html);
		}
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