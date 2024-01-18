
channelsDict = {}
function addGrpup(parent, dict) {
    var html = '<ul class="breadcrumbs ul-line" style="margin: 0px -40px"><li><a href=""><i class="fas fa-home"></i>{group}</a></li><li><a href="">{sub_1}</a></li><li><a href="">{sub_2}</a></li></ul >'
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
    html = html.replace("{c}", dict[key1])
    html = html.replace("{d}", dict[key2])
    // console.log(dict[key1])
    // console.log(dict[key2])
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
    html = html.replace("{c}", getListHTML(dict[key1], s1, isFufan))
    html = html.replace("{d}", getListHTML(dict[key2], s2))
    parent.append($(html))
}
function getListHTML(text, separator = "，", isFufan = false) {
    if (text.indexOf(separator) == -1) {
        if (text == "") {
            text = "N/A"
        }
        return "<label>{t}</label>".replace("{t}", text)
    }
    list = text.split(separator)
    var ul1 = $("<ul class='ul-line'></ul>")
    for (i = 0; i < list.length; i++) {
        if (list[i].trim() == "") {
            continue
        }
        li = $("<li></li>")
        content = list[i].trim().replace("•", "").replace("–", "").replace("|", "").replace("◦", "")
        if (isFufan) {
            array = content.split("=>")
            if (fufandict[array[0]] === undefined) {
                li.text(content)
            } else {
                li.html("<a href='" + fufandict[array[0]] + "'>" + array[0] + "</a>&nbsp;=>&nbsp;" + array[1])
            }
        } else {
            li.text(content)
        }
        ul1.append(li)
    }
    // console.log(ul1.html())
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
    html = html.replace("{c}", dict[key1])
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
    addTwoColunmnTextRow(formBox, dict, "Subject", "Dosage", "SUBJECT", "DOSAGE")
    // addThreeColunmnTextRow(formBox, dict, "Subject", "Common Name", "Literal English", "SUBJECT", "COMMON_NAME", "LITERAL_ENGLISH")
    addTwoColunmnTextRow(formBox, dict, "Common Name", "Literal English", "COMMON_NAME", "LITERAL_ENGLISH")
    // addTwoColunmnTextRow(formBox, dict, "Channels", "Dosage", "CHANNELS", "DOSAGE")
    addOneColunmnInputTextRow(formBox, dict, "Channels", "CHANNELS")
    addTwoColunmnListRow(formBox, dict, "Efficacy", "Properties", "EFFECT", "PROPERTIES")
    addOneColunmnListRow(formBox, dict, "Actions & Indications", "ACTIONS_INDICATIONS", "•")
    addOneColunmnListRow(formBox, dict, "Others", "OTHERS", "•")
    addOneColunmnListRow(formBox, dict, "Fufan", "FUFAN", "|", isFufan = true)
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
    list = searchHandler()
    showList($("#mainDiv"), list)
    var $boxes = $('input[type=checkbox]:checked');
    if ($boxes.length == 0) {
        $("#clear").hide()
    } else {
        $("#clear").show()
    }
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
        //console.log($(this).val())
        searchChannels.push($(this).val())
    })
    var group = $("#group").val()
    console.log(group)
    if ((group == "all" || group == "none") && searchChannels.length == 0) {
        list = dafanList;
    } else {
        //console.log(searchChannels.length)
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
                //console.log(channel, channels)
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

function showList(area, list) {
    area.empty()//Remoive all children
    for (ii = 0; ii < list.length; ii++) {
        div = getDiv(list[ii])
        area.append(div)
    }
}
channels = ['LU', 'BL', 'ST', 'LR', 'SP', 'HT', 'KI', 'GV', 'LV', 'GB', 'PC', 'TH', 'LI', 'SI', 'TE']
groups = ['Warm, Acrid herbs that Release the Exterior', 'Cool Acrid Herbs that Release the Exterior', 'Herbs that Clear Heat', 'Downward Draining Herbs', 'Herbs that Drain Dampness', 'Aromatic herbs that Transform Damp', 'Herbs that Dispel Wind‐Dampness', 'Herbs that Transform Phlegm, and Stop Cough', 'Herbs that Regulate the Qi', 'Herbs that Regulate the Blood', 'Herbs that Tonify', 'Herbs that Warm the Interior and Expel Cold', 'Herbs that Calm the Spirit', 'Herbs that Extinguish Wind and Stop Tremors', 'Herbs that Stabilize and Bind', 'Herbs that Relieve Food Stagnation (Hot&Cold)', 'Herbs that Expel Parasites', 'Aromatic Herbs that Open the Orifices']
$(function () {
    initDropDownList("group", groups)
    initChannelsCheckboxes(channels)
    $("#clear").click(function () {
        $(".channelcbs").prop("checked", "")
        $("#group").val("none")
        list = searchHandler()
        showList($("#mainDiv"), list)
    })
    $("#clear").hide()
    showList($("#mainDiv"), dafanList)
});