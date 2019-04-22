function setPage_en(){

    //语音初始化
    $("#voiceList").find("option").each(function () {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
             $("#voiceListName>.item-after").html($(this).html());
        } 
        else if(window.localStorage.voiceList == undefined)
        {
             $("#voiceList").find("option:eq(0)").attr("selected", true);
              $("#voiceListName>.item-after").html($(this).html());
        }
    });
    //语言初始化
    $("#languageList").find("option:eq(1)").attr("selected", true);
    $("#languageListName>.item-after").html("English");
    // modifyZnUs();
    //用户
    $(".userClassName p").html(window.localStorage.userName);
    myApp.navbar.hide('.navbar');

    //切换背景
    var toggle = myApp.toggle.create({
      el: '.toggle',
      on: {
        change: function () {
            var hrefUrl ="";
            if (toggle.checked) {
              $(".whiteColor").each(function(index){
                 hrefUrl =$(this).attr("href").replace("white","back");
                 $(this).attr("href",hrefUrl);
              });window.localStorage.localBgColor = 1;
            }
            else
            {
               $(".whiteColor").each(function(index){
                 hrefUrl =$(this).attr("href").replace("back","white");
                 $(this).attr("href",hrefUrl);
              });window.localStorage.localBgColor = 0;
            }
        }
      }
    });
    if (window.localStorage.localBgColor == 1){toggle.checked = true;}
    else {toggle.checked = false;}
    
}


function onVoiceList_en() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
    // getLanguageChoice($("#voiceList").find("option:selected").attr("data-value"));

}

function selectLanguage_en() {
  tranformAlert("Tips","Whether to switch to Chinese?","confirm","cancel","confirmFunction_en","cancelFunction_en");
}

function confirmFunction_en(){
    $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/insertLanguageStatus?userName="+window.localStorage.userName+"&status="+$("#languageList").find("option:selected").attr("value"))).done(function(n){
      var result = n.HttpData.data; 
      if (result && n.HttpData.code == 200 && $("#languageList").find("option:selected").attr("value") == 0) {
         tranformMenu($("#languageList").find("option:selected").attr("value"));
         myApp.router.navigate("/setPage/"); 
      } 
      else
      {
         tranformMenu($("#languageList").find("option:selected").attr("value"));myApp.router.navigate("/mobile-en/setPage_en/"); 
      }
     window.localStorage.languageList = 0;
   }).fail(function(e){tranformMenu($("#languageList").find("option:selected").attr("value"));myApp.router.navigate("/mobile-en/setPage_en/");  });    
}

function cancelFunction_en(){
      $("#languageList").find("option:eq(1)").attr("selected", true);
      $("#languageListName>.item-after").html("English");
      window.localStorage.languageList = 1;
      myApp.router.navigate("/mobile-en/setPage_en/"); 
}   