function newlyBuild()
{

    let html = `<div class="ycpView">
                <i class="edIcon circle_green" data-no></i>
                <span>
                <label class="edName" data-no>温度</label>
                    <em class="edValue" data-no>26</em>
                    <em class="edCompany" data-no>°C</em>
                </span></div>`;
    ycpFun("ycpView",5,2);
	$(".homeNewlyBuild").append(html);

}


//遥测表
function ycpFun(dt,equip_no,set_no){
    var equip_no = equip_no,set_no = set_no;
    $.when(AlarmCenterContext.equip_ycp_state(equip_no,set_no)).done(function(n){
        var result = n.HttpData;
        if(result.code == 200)
        {
            if(result.data.m_IsAlarm)
            {
                $("."+dt+" .edIcon").attr("data-no",set_no).removeClass("circle_green").addClass("circle_red");
            }
            else
            {
                $("."+dt+" .edIcon").attr("data-no",set_no).addClass("circle_green").removeClass("circle_red");
            }
            $("."+dt+" .edName").attr("data-no",set_no).text(result.data.m_YCNm);
            $("."+dt+" .edValue").attr("data-no",set_no).text(result.data.m_YCValue);
            $("."+dt+" .edCompany").attr("data-no",set_no).text(result.data.m_Unit);
            setTimeout(function(){ try{ hubConn.stop();}catch(e){}AlarmCenterContext.connectServer(equip_no);},1000);
        }
    }).fail(function(e){

    });  
}
              
