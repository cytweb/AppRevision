var toastCenter;

function eventQuery() {
    switchToolbar("configTool");
    var calendarRange = myApp.calendar.create({
        inputEl: '#condition-timepiker',
        dateFormat: 'yyyy/mm/dd',
        monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
        rangePicker: true
    });
    myApp.sheet.open('.sheet-eventQu');
    var searchbar = myApp.searchbar.create({
        el: '.eventQu',
        searchContainer: '.eq-list',
        searchIn: '.item-title'
    })
    getEquipList()
}

function getEquipList() {
    $.when(AlarmCenterContext.getEquipList()).done(function(e) {
        var dat = JSON.parse(e.d),
            lg = dat.length;
        for (var i = 0; i < lg; i++) {
            var value = dat[i];
            if (value.value != "") {
                var html = '<li onclick="selectEquip(\'' + value.value + '\')">' + '<label class="item-checkbox item-content">' + ' <input type="checkbox" name="demo-checkbox" value="' + value.value + '" />' + '<i class="icon icon-checkbox"></i>' + '<div class="item-inner">' + '<div class="item-title">' + value.name + '</div>' + ' </div>' + '</label>' + '</li>';
                $(".eq-list ul").append(html)
            }
        }
    });
}
var equipId = [];

function selectEquip(value) {
    if (equipId.indexOf(value) != -1) {
        equipId.remove(value);
    } else {
        equipId.push(value);
    }
}

function selectEvent() {
    var timeStr = $("#condition-timepiker").val();
    var start = timeStr.split("-")[0] + " 00:00";
    var end = timeStr.split("-")[1] + "23:59";
    var data = {
        equip_no_list: equipId.toString(),
        times: start + "," + end
    }
    if (!timeStr) {
        myApp.dialog.alert('请选择查询日期', "温馨提示");
        return;
    } else {
        getEventEquip(data);
        getEventSet(data);
        getEventSys(data);
    }
}
function loadEvent(data) {}
function getEventEquip(data) {
    if (!data.equip_no_list) {
        myApp.dialog.alert('请选择查询设备', "温馨提示");
        return;
    }
    $.when(AlarmCenterContext.getEquipEvent()).done(function(e) {
    })
}

function getEventSet(data) {
    if (!data.equip_no_list) {
        myApp.dialog.alert('请选择查询设备', "温馨提示");
        return;
    }
    $.when(AlarmCenterContext.getSetEvent()).done(function(e) {
    })
}

function getEventSys(data) {
    $.when(AlarmCenterContext.getSysSet()).done(function(e) {})
}
function getData() {
    $.ajax({
        type: "post",
        url: "/GWService.asmx/EquipItemList",
        async: true,
        success: function(data) {
            var html = '<li class="all" onclick="selectEquipList(null,this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked"  for="#checkConf_0"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConf_0"></span>全选</label></li>';
            $(data).find('string').each(function() {
                var dat = JSON.parse($(this).text())
                for (var i = 0; i < dat.length; i++) {
                    if (dat[i].value != "") {
                        equipsArray.push(dat[i].value);
                        html += `<li equip="${dat[i].value}" onclick="selectEquipList('${dat[i].value}',this)"><label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked" for="#checkConf_'${(i+1)}'"><span class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input type="checkbox" class="ivu-checkbox-input" id="checkConf_'${(i+1)}'"></span>${dat[i].name}</label></li>`;
                    }
                }
                $(".equipListQuery").append(html);
            });
        }
    });
}
function getEvent() {
    if ($("#timePicker").val() == "") {
        myApp.dialog.alert('请选择开始日期', "温馨提示");
    } else if ($("#timePicker2").val() == "") {
        myApp.dialog.alert('请选择结束日期', "温馨提示");
    } else {
        $(".tabListQuery a.tab-link-active").click();
    }
}
function QueryEquipEvt(data) {
    $("#equipEventContent ul").html("");
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QueryEquipEvt",
        async: true,
        data: data,
        success: function(res) {
            var str = $(res).find("string").text();
            if (str == "false") {
                toastCenter.open();
            } else {
                var dat = JSON.parse(str),
                    html = "";
                for (var i = 0; i < dat.length; i++) {
                    html += `<li class="accordion-item">
                                    <a href="#" class="item-content item-link">
                                        <div class="item-inner">
                                          <div class="item-title">${dat[i].event}</div>
                                          <div class="item-after"></div>
                                        </div>
                                    </a>
                                  <div class="accordion-item-content">
                                    <div class="block">
                                      
                                      <div class="row  eventList">
                                        <div class="col-35 name">设备名称：</div>
                                        <div class="col-65 con">${dat[i].equip_nm}</div>
                                      </div>
                                       <div class="row  eventList">
                                        <div class="col-35  name">设备事件：</div>
                                        <div class="col-65 con">${dat[i].event}</div>
                                      </div>
                                       <div class="row  eventList">
                                        <div class="col-35  name">时间：</div>
                                        <div class="col-65 con">${dat[i].time}</div>
                                      </div>                                      
                                    </div>
                                  </div>
                                </li>`
                }
                $("#equipEventContent>div").html("<ul>" + html + "</ul>");
            }
        }
    });
}
function QuerySetupsEvt(data) {
    $("#setEventContent ul").html("")
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QuerySetupsEvt",
        async: true,
        data: data,
        success: function(res) {
            var str = $(res).find("string").text();
            if (str == "false") {
                toastCenter.open();
            } else {
                var dat = JSON.parse(str),
                    html = "";
                for (var i = 0; i < dat.length; i++) {
                    html += `<li class="accordion-item">
                      <a href="#" class="item-content item-link">
                          <div class="item-inner">
                            <div class="item-title">${dat[i].event}</div>
                            <div class="item-after"></div>
                          </div>
                      </a>
                      <div class="accordion-item-content">
                        <div class="block">
                          <div class="row  eventList">
                            <div class="col-35  name">设备名称：</div>
                            <div class="col-65 con">${dat[i].equip_nm}</div>
                          </div>
                           <div class="row  eventList">
                            <div class="col-35  name">设置事件：</div>
                            <div class="col-65 con">${dat[i].event}</div>
                          </div>
                           <div class="row  eventList">
                            <div class="col-35  name">时间：</div>
                            <div class="col-65 con">${dat[i].time}</div>
                          </div>  
                        </div>
                      </div>
                    </li>`
                }
                $("#setEventContent>div").append("<ul>" + html + "</ul>");
            }
        }
    });
}
function getSetEvent() {
    var start = $("#timePicker").val(),
        end = $("#timePicker2").val();
    $("#stsEventContent ul").html("")
    $.ajax({
        type: "post",
        url: "/GWService.asmx/QuerySystemEvt",
        async: true,
        data: {
            times: start + " 00:00:00," + end + " 23:59:59"
        },
        success: function(res) {
            var str = $(res).find("string").text();
            if (str == "false") {
                toastCenter.open();
            } else {
                var dat = JSON.parse(str),
                    html = "";
                for (var i = 0; i < dat.length; i++) {
                    html += `<li class="accordion-item">
                    <a href="#" class="item-content item-link">
                        <div class="item-inner">
                          <div class="item-title">${dat[i].event}</div>
                          <div class="item-after"></div>
                        </div>
                    </a>
                     <div class="accordion-item-content">
                      <div class="block">
                        <div class="row  eventList">
                          <div class="col-35  name">系统事件：</div>
                          <div class="col-65 con">${dat[i].event}</div>
                        </div>
                           <div class="row  eventList">
                            <div class="col-35  name">时间：</div>
                            <div class="col-65 con">${dat[i].time}</div>
                          </div>                          
                      </div>
                    </div>
                  </li>`;
                }
                $("#stsEventContent>div").append("<ul>" + html + "</ul>");
            }
        }
    });
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};