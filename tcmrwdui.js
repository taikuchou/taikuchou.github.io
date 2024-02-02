
channelsDict = {}
function addGrpup(parent, dict) {
    var html = '<div class="container"><ul class="breadcrumbs ul-line"><li><a href=""><i class="fas fa-home"></i>{group}</a></li><li><a href="">{sub_1}</a></li><li><a href="">{sub_2}</a></li></ul></div>'
    html = html.replace("{group}", dict["GROUP"])
    html = html.replace("{sub_1}", dict["SUBGROUP_1"])
    html = html.replace("{sub_2}", dict["SUBGROUP_2"])
    parent.append($(html))
}
function addTitle(parent, dict) {
    var html = "<div class='row'><h3 class='color-b1'>{name}&nbsp;<a href='{url}'>{pinyin}</a>&nbsp;({latin})</h3></div>"
    html = html.replace("{name}", dict["NAME"])
    html = html.replace("{pinyin}", getData(dict, "PINYIN_NAME"))
    html = html.replace("{latin}", getData(dict, "LATIN_NAME"))
    html = html.replace("{url}", dict["URL"])
    parent.append($(html))
}
function addThreeColunmnTextRow(parent, dict, title1, title2, title3, key1, key2, key3) {
    var html = '<div class="">' +
        '<div class="row">' +
        '<div class="col-12 col-md-12">' +
        '<label>{t1}：</label>' +
        '<label>{subject}</label>' +
        '</div>' +
        '<div class="col-12 col-md-6">' +
        '<label>{t2}：</label>' +
        '<label>{cn}</label>' +
        '</div>' +
        '<div class="col-12 col-md-6">' +
        '<label>{t3}：</label>' +
        '<label>{le}</label>' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{t2}", title2)
    html = html.replace("{t3}", title3)
    html = html.replace("{subject}", getData(dict, key1))
    html = html.replace("{cn}", getData(dict, key2))
    html = html.replace("{le}", getData(dict, key3))
    parent.append($(html))
}
function getData(dict, key) {
    data = dict[key]
    if (data == "") {
        data = "N/A"
    }
    return data
}
function addTwoColunmnTextRow(parent, dict, title1, title2, key1, key2) {
    var html = '<div class="input">' +
        '<div class="row">' +
        '<div class="col-12 col-md-6">' +
        '<label>{t1}:</label>&nbsp;' +
        '<label>{c}</label>' +
        '</div>' +
        '<div class="col-12 col-md-6">' +
        '<label>{t2}:</label>&nbsp;' +
        '<label>{d}</label>' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{t2}", title2)
    html = html.replace("{c}", getData(dict, key1))
    html = html.replace("{d}", getData(dict, key2))
    parent.append($(html))
}
function addOneColunmnListRow(parent, dict, title1, key1, s1, isFufan = false) {
    var html = '<div class="input-row">' +
        '<div class="row">' +
        '<div class="col-12 col-md-12">' +
        '<label>{t1}:</label>' +
        '{c}' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{c}", getListHTML(dict[key1], s1, isFufan))
    parent.append($(html))
}
function addTwoColunmnListRow(parent, dict, title1, title2, key1, key2, s1 = "，", s2 = "，", isFufan = false) {
    var html = '<div class="input-row">' +
        '<div class="row">' +
        '<div class="col-12 col-md-6">' +
        '<label>{t1}:</label>' +
        '{c}' +
        '</div>' +
        '<div class="col-12 col-md-6">' +
        '<label>{t2}:</label>' +
        '{d}' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{t2}", title2)
    html = html.replace("{c}", getListHTML(dict[key1], s1))
    html = html.replace("{d}", getListHTML(dict[key2], s2, isFufan))
    parent.append($(html))
}
function getListHTML(text, separator = "，", isFufan = false) {
    if (text.indexOf(separator) == -1) {
        if (text.indexOf("◦") != -1) {
            separator = "◦"

        } else if (text == "" || text === undefined) {
            text = "N/A"
            return "<label>{t}</label>".replace("{t}", text)
        }
    }
    list = text.split(separator)
    var ul1 = $("<ul class='ul-line'></ul>")
    for (i = 0; i < list.length; i++) {
        if (list[i].trim() == "") {
            continue
        }
        li = $("<li class='wrap'></li>")
        content = list[i].trim().replaceAll("•", "").replaceAll("–", "").replaceAll("|", "").replaceAll("◦", "").replaceAll("，", ", ")

        if (isFufan) {

            array = content.split("=>")
            if (fufandict[array[0]] === undefined) {
                li.text(array[0] + " => " + array[1])
            } else {
                li.html("<a href='" + fufandict[array[0]] + "'>" + array[0] + "</a>&nbsp;=>&nbsp;" + array[1])
            }
        } else {
            if (content.indexOf("＊＊") != -1){
                content = content.replaceAll("＊＊", "")
                li.html("<span class='redText'>"+content+"</span>")
            }else{
                li.text(content)
            }
        }
        ul1.append(li)
    }

    return ul1.html()
}

function addOneColunmnInputTextRow(parent, dict, title1, key1) {
    var html = '<div class="">' +
        '<div class="row">' +
        '<div class="col-12 col-md-12">' +
        '<label>{t1}:</label>' +
        '<input type="text" value="{c}" readonly="">' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{c}", getData(dict, key1))
    parent.append($(html))
}
function addOneColunmnTextRow(parent, dict, title1, key1) {
    var html = '<div class="">' +
        '<div class="row">' +
        '<div class="col-12 col-md-10">' +
        '<label>{t1}:</label>&nbsp;' +
        '<label>{c}</label>' +
        '</div>' +
        '</div>' +
        '</div>'
    html = html.replace("{t1}", title1)
    html = html.replace("{c}", getData(dict, key1))
    parent.append($(html))
}
function getDiv(dict) {
    main = $('<section class="section-box"></section>')
    formBox = $('<div class="form-box"></div>')
    main.append(formBox)
    row = $('<div class=""></div>')
    formBox.append(row)
    addGrpup(row, dict)
    addTitle(row, dict)
    addTwoColunmnTextRow(formBox, dict, "Subject", "Common Name", "SUBJECT", "COMMON_NAME")
    addTwoColunmnTextRow(formBox, dict, "Dosage", "Literal English", "DOSAGE", "LITERAL_ENGLISH")
    addOneColunmnTextRow(formBox, dict, "Channels", "CHANNELS")
    addTwoColunmnListRow(formBox, dict, "Properties", "Contraindications / Cautions", "PROPERTIES", "CONTRAINDICATIONS_CAUTIONS", "•", "，")
    addTwoColunmnListRow(formBox, dict, "Actions & Indications", "Efficacy", "ACTIONS_INDICATIONS", "EFFECT", "•", "，")
    addTwoColunmnListRow(formBox, dict, "Common Combinations", "Fufan", "COMMON_COMBINATIONS", "FUFAN", "，", "|", is2Fufan = true)
    addOneColunmnListRow(formBox, dict, "Others", "OTHERS", "•")
    return main
}

function initDropDownList(key, channels) {
    select = $("<select id='" + key + "' class='select2-accessible'></select>")
    opt = $("<option value='none'>Please select a group</option>")
    select.append(opt)
    opt = $("<option value='all'>All</option>")
    select.append(opt)
    for (i = 0; i < channels.length; i++) {
        val = channels[i]
        opt = $("<option value='" + val + "'>" + val + "</option>")
        select.append(opt)
    }
    $("#funcArea").append(select);
    $("#" + key).change(function () {
        reloadPage()
    })
}
function reloadPage() {
    text = $("#searchText").val()
    $("#resultText").val("")
    list = searchHandler()
    if (text.trim() != "") {
        list = keyworkSearchHandler(list, text.trim())
    }
    showList($("#mainDiv"), list)
    var $boxes = $('input[type=checkbox]:checked');
}

function initChannelsCheckboxes(channels) {
    container = $("#funcArea")
    for (i = 0; i < channels.length; i++) {
        val = channels[i]
        $('<input />', { type: 'checkbox', id: 'cb' + i, class: 'channelcbs', value: val }).appendTo(container);
        $('<label />', { 'for': 'cb' + i, text: val }).appendTo(container);
    }
    $(".channelcbs").change(function () {
        reloadPage()
    })
}

function searchHandler() {
    list = []
    var $boxes = $('input[type=checkbox]:checked');
    searchChannels = []
    $boxes.each(function () {
        searchChannels.push($(this).val())
    })
    var group = $("#group").val()
    // console.log(group)
    if ((group == "all" || group == "none") && searchChannels.length == 0) {
        list = dafanList;
    } else {
        for (j = 0; j < dafanList.length; j++) {
            channels = dafanList[j]["CHANNELS"]
            isAdd = true
            if (group != "all" && group != "none") {
                if (group != dafanList[j]["GROUP"]) {
                    continue
                }
            }
            for (k = 0; k < searchChannels.length; k++) {
                channel = searchChannels[k]
                if (channels.indexOf(channel) == -1) {
                    isAdd = false
                    break
                }
            }

            if (isAdd) {
                list.push(dafanList[j])
            }
        }
    }
    return list
}
function keyworkSearchHandler(list, text) {
    text = text.trim()
    ret = []
    if (text != "") {
        for (j = 0; j < list.length; j++) {
            dict = list[j]
            //console.log(dict)
            for (k = 0; k < searchkeys.length; k++) {
                key = searchkeys[k].toUpperCase()
                if (dict[key].indexOf(text) != -1) {
                    console.log(key)
                    ret.push(list[j])
                    break
                }
            }
        }
        return ret
    } else {
        return list
    }
}

function showList(area, list) {
    area.empty()//Remoive all children
    for (ii = 0; ii < list.length; ii++) {
        div = getDiv(list[ii])
        area.append(div)
    }
    // if (list.length == 0) {
    //     $("#searchArea").hide()
    // } else {
    //     $("#searchArea").show()
    // }
    $("#resultText").html("&nbsp; Total " + list.length + "&nbsp;records matched!")
}
channels = ['LU', 'BL', 'ST', 'LR', 'SP', 'HT', 'KI', 'GV', 'GB', 'PC', 'TH', 'LI', 'SI', 'TE']
groups = ['Warm, Acrid herbs that Release the Exterior', 'Cool Acrid Herbs that Release the Exterior', 'Herbs that Clear Heat', 'Downward Draining Herbs', 'Herbs that Drain Dampness', 'Aromatic herbs that Transform Damp', 'Herbs that Dispel Wind‐Dampness', 'Herbs that Transform Phlegm, and Stop Cough', 'Herbs that Regulate the Qi', 'Herbs that Regulate the Blood', 'Herbs that Tonify', 'Herbs that Warm the Interior and Expel Cold', 'Herbs that Calm the Spirit', 'Herbs that Extinguish Wind and Stop Tremors', 'Herbs that Stabilize and Bind', 'Herbs that Relieve Food Stagnation (Hot&Cold)', 'Herbs that Expel Parasites', 'Aromatic Herbs that Open the Orifices']
dkeys = ["URL", "SUBJECT", "EFFECT", "GROUP", "SUBGROUP_1",
    "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
searchkeys = ["SUBJECT", "EFFECT", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]

$(function () {
    initDropDownList("group", groups)
    initChannelsCheckboxes(channels)
    $("#clear").click(function () {
        $(".channelcbs").prop("checked", "")
        $("#group").val("none")
        $("#searchText").val("")
        list = searchHandler()
        showList($("#mainDiv"), list)
        //$("#clear").hide()
    })
    $("#search").click(function () {
        text = $("#searchText").val()
        $("#resultText").val("")
        list = searchHandler()
        list = keyworkSearchHandler(list, text)
        showList($("#mainDiv"), list)
    })
    // $("#searchArea").hide()
    showList($("#mainDiv"), dafanList)
});