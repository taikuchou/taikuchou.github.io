

function initDropDownList(key, channels) {
    select = $("<select id='" + key + "' class='select2-accessible'></select>")
    opt = $("<option value='none'>Please select a group</option>")
    select.append(opt)
    //opt = $("<option value='all'>All</option>")
    select.append(opt)
    for (i = 0; i < channels.length; i++) {
        val = channels[i]
        opt = $("<option value='" + val + "'>" + val + "</option>")
        select.append(opt)
    }
    $("#funcArea").append(select);
    $("#" + key).change(function () {
        $("#resultText").val("")
        list = searchHandler()
        showList($("#mainDiv"), list)
    })
}



function searchHandler() {
    list = {}
    var group = $("#group").val()
    // console.log(group)
    if ((group == "all" || group == "none")) {
        //list = dafanList;
    } else {
        list = dafanGroup[group];
        // console.log(list)
    }
    return list
}

function createRoot(area, level1, css="level1"){
    var html = '<ul class="tree"></ul>'
    root = $(html)
    area.append(root)
    html = '<li></li>'
    level1li = $(html)
    root.append(level1li)
    html = '<span class="{css}">{level1}</span>'
    html = html.replace("{level1}", level1)
    html = html.replace("{css}", css)
    level1li.append($(html))
    level2ul = $('<ul></ul>')
    level1li.append(level2ul)
    return level2ul
}
function createBrench(parent, level2, css="level2"){
    var html = '<li></li>'
    level2li = $(html)
    parent.append(level2li)
    html = '<span class="{css}">{level2}</span>'
    html = html.replace("{level2}", level2)
    html = html.replace("{css}", css)
    level2li.append($(html))
    level3ul = $('<ul></ul>')
    level2li.append(level3ul)
    return level3ul
}
function createLeave(parent, dafan, css="level3"){
    var html = '<li><span class="{css}">{level3} {level4}</span></li>'
    html = html.replace("{level3}", dafan["NAME"])
    html = html.replace("{level4}", dafan["PINYIN_NAME"])
    html = html.replace("{css}", css)
    parent.append($(html))
    return level3ul
}
function showList(area, list) {
    count = 0
    area.empty()//Remoive all children
    var group = $("#group").val()
    if ((group == "all" || group == "none")) {
        return
    } 
    level1 = group
    level1li = createRoot(area, level1)
    showData(level1li , list)
    $("#resultText").html("&nbsp; Total " + count + "&nbsp;records matched!")
}

function showData(root , list , idx = 1){
    // console.log(typeof list, Array.isArray(list))
    idx += 1
    if (!Array.isArray(list)){
        for (var level2 in list){
            level3ul = createBrench(root, level2, css="level"+idx)
            showData(level3ul, list[level2], idx)
        }
    }else if (Array.isArray(list)){
        for (var level3 in list){
            dafan = list[level3];
            createLeave(root,dafan, css="level"+idx)
        }
    }
}
groups = ['Warm, Acrid herbs that Release the Exterior', 'Cool Acrid Herbs that Release the Exterior', 'Herbs that Clear Heat', 'Downward Draining Herbs', 'Herbs that Drain Dampness', 'Aromatic herbs that Transform Damp', 'Herbs that Dispel Wind‐Dampness', 'Herbs that Transform Phlegm, and Stop Cough', 'Herbs that Regulate the Qi', 'Herbs that Regulate the Blood', 'Herbs that Tonify', 'Herbs that Warm the Interior and Expel Cold', 'Herbs that Calm the Spirit', 'Herbs that Extinguish Wind and Stop Tremors', 'Herbs that Stabilize and Bind', 'Herbs that Relieve Food Stagnation (Hot&Cold)', 'Herbs that Expel Parasites', 'Aromatic Herbs that Open the Orifices']
dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory","GROUP", "SUBGROUP_1",
    "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
searchkeys = ["SUBJECT", "EFFECT", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]

$(function () {
    //initDropDownList("group", groups)
    root = createRoot($("#mainDiv"), "TCM草藥學")
    showData(root , dafanGroup)
});