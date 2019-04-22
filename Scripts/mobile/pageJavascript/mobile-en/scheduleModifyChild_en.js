var scheduleModifyChildpositionList;
function scheduleModifyChild_en() {
    scenalControlPro_init_en();
    //控制子项目点击事件
    $(".equipLinkage_edit_modify_childFirst>div").unbind();
    $(".equipLinkage_edit_modify_childFirst>div").bind("click",function(){
        $(this).addClass("selectedIcorlor").siblings().removeClass("selectedIcorlor");
        $("."+$(this).attr("div_attribute")).removeClass("displayNone").siblings().addClass("displayNone");
        $(".equipLinkage_edit_modify_childFirst").removeClass("displayNone");
    });
    scheduleModifyChildSuccessTooip = myApp.toast.create({text: "Insert success", position: 'center', closeTimeout: 2000, });
    // 获取位置参数
    var chatObjectChild = myApp.views.main.history,
    urlLengthChild = chatObjectChild.length - 1;
    scheduleModifyChildpositionList = chatObjectChild[urlLengthChild].split("?")[1];

}
//确认控制项目
function comfirmScaneControl_en(){
    if(!$(".equipLinkage_edit_modify_childSecond").hasClass("displayNone"))
    {
        var selVal = $(".equipLinkage_edit_modify_child_equip").find("option:selected").attr("combination");
        scheduleModifyChildpositionList == "last"?equiplinkageStr.push(selVal):equiplinkageStr.splice(parseInt(scheduleModifyChildpositionList),0,selVal);
    }
    else
    {
        let str = $(".equipLinkage_edit_modify_child_time").val();
        if(!str)
           {
            myApp.dialog.alert(window.localStorage.languageList == 1 ?"Please enter the correct time":"请输入正确的时间");
            return false;
           } 
        else
             scheduleModifyChildpositionList == "last"?equiplinkageStr.push(str):equiplinkageStr.splice(parseInt(scheduleModifyChildpositionList),0,str);
    } 
    scheduleModifyChildSuccessTooip.open();
  
}