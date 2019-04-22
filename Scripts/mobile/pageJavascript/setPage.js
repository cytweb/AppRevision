function setPage(){
    switchToolbar("setPageTool");
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
    $("#languageList").find("option:eq(0)").attr("selected", true);
    $("#languageListName>.item-after").html("中文");
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
              });
              window.localStorage.localBgColor = 1;
            }
            else
            {
               $(".whiteColor").each(function(index){
                 hrefUrl =$(this).attr("href").replace("back","white");
                 $(this).attr("href",hrefUrl);
               });
               window.localStorage.localBgColor = 0;
            }
        }
      }
    });
    if (window.localStorage.localBgColor == 1){toggle.checked = true;}
    else {toggle.checked = false;}
   
}


function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
    // getLanguageChoice($("#voiceList").find("option:selected").attr("data-value"));
}

function selectLanguage() {
   var selText= $("#languageList").find("option:selected").text();
   tranformAlert("提示","是否切换为英文?","确认","取消",confirmFunction,cancelFunction); 

}
  function confirmFunction(){ //确认
    var selValue= $("#languageList").find("option:selected").attr("value");//1为英文 0为中文
      $.when(AlarmCenterContext.post("/api/GWServiceWebAPI/insertLanguageStatus?userName="+window.localStorage.userName+"&status="+selValue)).done(function(n){
        var result = n.HttpData.data;
        if (result && n.HttpData.code == 200 && selValue == 1) {
           tranformMenu(selValue);
           myApp.router.navigate("/mobile-en/setPage_en/"); 
        } 
        else
        {
           tranformMenu(selValue);myApp.router.navigate("/setPage/"); 
        }
        window.localStorage.languageList = 1;

     }).fail(function(e){tranformMenu(selValue);myApp.router.navigate("/setPage/");  });    
  }

  function cancelFunction(){  //取消
      $("#languageList").find("option:eq(0)").attr("selected", true);
      $("#languageListName>.item-after").html("中文");
      window.localStorage.languageList = 0;
      myApp.router.navigate("/setPage/"); 
  } 