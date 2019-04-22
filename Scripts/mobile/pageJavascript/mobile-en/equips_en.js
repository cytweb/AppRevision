function equips_en() {
    switchToolbar("equipsTool");
    myApp.dialog.progress('<a style="font-size: 1rem">Loading...</a>');
    allEquipSatatus();
    //获取所有设备的状态
    var $ptrContent = $$('.equipPageContent');
    $ptrContent.on('ptr:refresh', function(e) {
        // Emulate 2s loading
        setTimeout(function() {
            allEquipSatatus();
            // 加载完毕需要重置
            e.detail();
            myApp.toast.create({
                text: 'Successful data loading!',
                position: 'center',
                closeTimeout: 500,
            }).open();
        }, 2000);
    })
    $(".ios .ptr-preloader").css({
        zIndex: "99"
    })
    $(".ios .ptr-preloader .preloader").css({
        top: "50%"
    })
    $(".ios .ptr-preloader .ptr-arrow").css({
        top: "50%"
    })
    var searchbar = myApp.searchbar.create({
        el: '.searchbarEquip',
        searchContainer: '.equip-list',
        searchIn: '.item-title',
    });
}
var AllEquipStat;

function allEquipSatatus() {
    AllEquipStat = null, _url = service + "/GetEquipAllState";
    JQajaxo("post", _url, true, "", _successf);

    function _successf(data) {
        var resultStr = $(data).children("string").text();
        if (resultStr != 'false') {
            AllEquipStat = resultStr.split(';');
            treeConfList();
            //	获取设备的树状图 
        }
    }
}
var GetEquipTreeLists2;
function treeConfList() {
    var _url = service + "/GWEquipTree";
    JQajaxo("post", _url, true, "", _successf);
    function _successf(e) {
        var str = $(e).children('string').text();
        if (str != 'false') {
            $(".equip-list").html("");
            GetEquipTreeLists2 = null;
            GetEquipTreeLists2 = str;
            $(str).children('GWEquipTreeItem').each(function() {
                var len = $(this).children('GWEquipTreeItem').length;
                var name = $(this).attr('name');
                var equip_no = $(this).attr('EquipNo');
                treeHTML(len, name, equip_no, $('.equip-list'));
                myApp.dialog.close();
            });
        }
    }
}
//添加节点到html
function treeHTML(len, name, equip_no, thisDom) {
    var newRow = "";
    if (len > 0) {
        var alarm = selectAlarm(name);
        var alarmClass = '';
        if (alarm > 0) {
            alarmClass = 'alarm';
        } else {
            alarmClass = 'comOk';
        }
        newRow = `<li class="accordion-item" onclick="onTreePar(this,'${name}',event)">
    			 <a href="#" class="item-content item-link">
			    	<div class="item-media">
			        	<i class="iconfont icon-dian ${alarmClass}"></i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title">${name}</div>
			        </div>
			    </a>
			    <div class="accordion-item-content " style="padding-left: 15px;">
			    	<ul></ul>
			    </div>
    		</li>`
        if (alarm > 0) {
            thisDom.prepend(newRow);
        } else {
            thisDom.append(newRow);
        }
    } else {
        if (Browse_Equip_List(equip_no) || Browse_SpecialEquip_List(equip_no, false)) {
            for (var i = 0; i < AllEquipStat.length; i++) {
                var allEquipStat = AllEquipStat[i].split(',');
                var iconColorClass = getIconColor(allEquipStat[2]);
                if (equip_no == allEquipStat[0]) {
                    if (name == '') {
                        name = allEquipStat[1];
                    }
                    newRow = `<li>
								    <a href="/mobile-en/ycAndyx_en/#${equip_no}&${name}" class="item-link item-content">
								        <div class="item-media">
								        	<i class="iconfont icon-dian ${iconColorClass}"></i>
								        </div>
								        <div class="item-inner">
								          <div class="item-title">${name}</div>
								        </div>
								    </a>
								</li>
				        		`
                    if (allEquipStat[2] == 'HaveAlarm') {
                        thisDom.prepend(newRow);
                    } else {
                        thisDom.append(newRow);
                    }
                }
            }
            if (newRow == "") {
                newRow = `<li><a href="#" class="item-link item-content">
								        <div class="item-media">
								        	<i class="iconfont icon-dian noCom"></i>
								        </div>
								        <div class="item-inner">
								          <div class="item-title">${name}</div>
								        </div>
								    </a>
								</li>
				        		`
                thisDom.append(newRow);
            }
            thisDom.attr('equiplist', 'true');
        }
    }
}

function getIconColor(str) {
    var iconColor = '';
    switch (str) {
        case 'CommunicationOK':
            iconColor = 'comOk'
            break;
        case 'HaveAlarm':
            iconColor = 'alarm'
            break;
        case 'NoCommunication':
            iconColor = 'noCom'
            break;
    }
    return iconColor;
}

function selectAlarm(name) {
    var $selectDomRT = null;
    $(GetEquipTreeLists2).find('GWEquipTreeItem').each(function() {
        if ($(this).attr('Name') == name) {
            $selectDomRT = $(this);
        }
    });
    var equip_alarm = 0;
    $selectDomRT.find('GWEquipTreeItem').each(function() {
        var equip_nos = $(this).attr('EquipNo');
        for (var i = 0; i < AllEquipStat.length; i++) {
            var allEquipStat = AllEquipStat[i].split(',');
            if (equip_nos == allEquipStat[0]) {
                if (allEquipStat[2] != 'CommunicationOK') {
                    equip_alarm++;
                }
            }
        }
    });
    return equip_alarm;
}

function onTreePar(dt, name, e) {

    var doms = selectDom(name); 
    $(dt).find("ul").html("");
    doms.each(function() {
        var len = $(this).children('GWEquipTreeItem').length;
        var name = $(this).attr('name');
        var equip_no = $(this).attr('EquipNo');
        $(dt).children("a").next(".accordion-item-content").css({
            height: "auto"
        })
        
        treeHTML(len, name, equip_no, $(dt).find("ul"));
    });

    $(dt).children("a").next(".accordion-item-content").children("ul").click(function(e) {
    e.stopPropagation()
    })
}


function selectDom(name) {
    var selectDomRT = null;
    $(GetEquipTreeLists2).find('GWEquipTreeItem').each(function() {
        if ($(this).attr('Name') == name) {
            selectDomRT = $(this).children('GWEquipTreeItem');
        }
    });
    return selectDomRT;
}