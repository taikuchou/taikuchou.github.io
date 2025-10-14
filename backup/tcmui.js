function addLabel(parent, text, className = "") {
    label = $("<label class='" + className + "'>")
    label.text(text)
    parent.append(label)
    return label
}
function addLink(parent, text, url) {
    link = $("<a>")
    link.text(text)
    link.prop("href", url)
    parent.append(link)
    return label
}
function addLine(parent) {
    line = $("<div class='input-row border-t'></div>")
    parent.append(line)
}
function addSubTitle(parent, text) {
    addNextLine(main)
    addLabel(parent, text)
}
function addSubTitleAndLabel(parent, title, text, separator = "，", isFufan = false) {
    span = $("<div>")
    addLabel(span, title)
    addBlank(span)
    if (text.indexOf(separator) != -1) {
        addList(span, text, separator, isFufan, title)
    } else if (text.indexOf("◦") != -1) {
        addList(span, text, "◦", isFufan, title)
    } else {
        if (text.trim() == "") {
            text = "N/A"
        }
        addLabel(span, text.replace("•", "").replace("–", "").replace("|", "").replace("◦", "").replace("–", ""))
    }
    parent.append(span)
}
channelsDict = {}
function addList(parent, text, separator, isFufan = false, title = "") {
    list = text.split(separator)
    ul = $("<ul>")
    //console.log(title)
    for (i = 0; i < list.length; i++) {
        if (list[i].trim() == "") {
            continue
        }
        /*if (title == "Channels:") {
            channelsDict[list[i].trim()] = list[i]
            //console.log(list[i])
        }*/
        li = $("<li>")
        content = list[i].trim().replace("•", "").replace("–", "").replace("|", "").replace("◦", "").replace("–", "")
        if (isFufan) {
            array = content.split("=>")
            if (fufandict[array[0]] === undefined) {
                li.text(content)
            } else {
                li.html("<a href='" + fufandict[array[0]] + "'>" + array[0] + "</a>=>" + array[1])
            }
        } else {
            li.text(content)
        }
        ul.append(li)
    }
    parent.append(ul)
    return ul
}
function addBlank(parent) {
    parent.append("<label>&nbsp;</label>")
}
function addNextLine(parent) {
    parent.append("<br/>")
}
function addGroupSeperator(parent) {
    parent.append("<label>&nbsp;->&nbsp;</label>")
}
function getDiv(dict) {
    main = $("<div>")
    addLabel(main, dict["NAME"])
    addBlank(main)
    addLink(main, dict["PINYIN_NAME"], dict["URL"])
    addBlank(main)
    addLabel(main, "( " + dict["LATIN_NAME"] + " )")
    addBlank(main)
    addNextLine(main)
    addSubTitleAndLabel(main, "Common Name:", dict["COMMON_NAME"])
    addNextLine(main)
    addSubTitleAndLabel(main, "Literal English:", dict["LITERAL_ENGLISH"])
    addNextLine(main)
    addLabel(main, dict["SUBJECT"])
    addNextLine(main)
    addSubTitleAndLabel(main, "Efficacy:", dict["EFFECT"])
    addLabel(main, dict["GROUP"])
    addGroupSeperator(main)
    addLabel(main, dict["SUBGROUP_1"])
    addGroupSeperator(main)
    addLabel(main, dict["SUBGROUP_2"])
    addNextLine(main)
    addSubTitleAndLabel(main, "Channels:", dict["CHANNELS"])
    addSubTitleAndLabel(main, "Properties:", dict["PROPERTIES"])
    addSubTitleAndLabel(main, "Actions & Indications:", dict["ACTIONS_INDICATIONS"], separator = "•")
    addSubTitleAndLabel(main, "Dosage:", dict["DOSAGE"])
    addNextLine(main)
    addSubTitleAndLabel(main, "Common Combinations:", dict["COMMON_COMBINATIONS"], separator = "•")
    addSubTitleAndLabel(main, "Others:", dict["OTHERS"], separator = "•")
    addSubTitleAndLabel(main, "Fufan:", dict["FUFAN"], separator = "|", isFufan = true)
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

function dropdownListHandler() {
    list = []
    if (channel == "all") {
        list = dafanList;
    } else if (channel != "none") {
        for (j = 0; j < dafanList.length; j++) {
            channels = dafanList[j]["CHANNELS"]
            if (channels === undefined) {
                continue
            }
            console.log(channel, channels)
            if (channels.indexOf(channel) != -1) {
                list.push(dafanList[j])
            }
        }
    }
    return list
}

function checkBoxesHandler() {
    list = []
    var $boxes = $('input[type=checkbox]:checked');
    searchChannels = []
    $boxes.each(function () {
        //console.log($(this).val())
        searchChannels.push($(this).val())
    });
    if (searchChannels.length == 0) {
        list = dafanList;
    } else {
        //console.log(searchChannels.length)
        for (j = 0; j < dafanList.length; j++) {
            channels = dafanList[j]["CHANNELS"]
            isAdd = true
            //console.log(channels)
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
        addLine(area)
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
    /*ks = []
    for (key in channelsDict) {
        ks.push(key)
    }
    console.log(ks)
    */
});
