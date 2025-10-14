
channelsDict = {}
function addGrpup(parent, dict) {
    var html = '<div class="container"><ul class="breadcrumbs ul-line"><li><a href=""><i class="fas fa-home"></i>{main}</a></li><li><li><a href="">{sub_1}</a></li></ul></div>'
    html = html.replace("{main}", dict["MAINCATEGORY"])
    html = html.replace("{sub_1}", dict["SUBGROUP_1"])
    parent.append($(html))
}
function addTitle(parent, dict) {
    var html = "<div class='row'><h3 class=''>{name}&nbsp;<a href='{url}'>{pinyin}</a>&nbsp;</h3></div>"
    html = html.replace("{name}", filter(dict["CHANNELS"]))
    html = html.replace("{pinyin}", filter(getData(dict, "LITERAL_ENGLISH")))
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
    return data//.replaceAll("，", ", ")
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
    html = html.replace("{t1}", filter(title1))
    html = html.replace("{t2}", filter(title2))
    html = html.replace("{c}", getListHTML(filter(dict[key1]), s1, isFufan, key1 == "LATIN_NAME"))
    html = html.replace("{d}", getListHTML(filter(dict[key2]), s2, isFufan, key2 == "LATIN_NAME"))
    parent.append($(html))
}

function specialStyle1(content, colorCSS = "redText") {
    licontent = ""
    if (content.indexOf("[") != -1 && content.indexOf("]") != -1) {
        while (content.indexOf("[") != -1 && content.indexOf("]") != -1) {
            start = content.indexOf("[")
            end = content.indexOf("]")
            licontent += "<span class=''>" + content.substring(0, start) + "</span> "
            licontent += "<span class='" + colorCSS + "'>" + content.substring(start + 1, end) + "</span> "
            content = content.substring(end + 1)
        }
        if (content != "") {
            licontent += "<span class=''>" + content + "</span> "
        }
    } else {
        licontent = content
    }
    return licontent
}

function getListHTML(text, separator = "，", isFufan = false, isRemoveDuplicate = false) {
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
        content = list[i].trim().replaceAll("|", "").replaceAll("◦", "")//.replaceAll("，", ", ")
        //Ken:isRemoveDuplicate
        if (isRemoveDuplicate) {
            content = replaceDuplicate(content)
        }
        content = filter(content)
        if (isFufan) {

        } else {
            if (content.indexOf("{SPERATE_LINE}") != -1) {
                li.toggleClass("sepline")
                li.html("<span class=''>------------------------------</span>\n")
            } else if (content.indexOf("{SPERATE}") != -1) {
                li.toggleClass("sepline")
                li.html("<span class=''>&nbsp;</span>\n")
            } else if (content.indexOf("＊＊") != -1) {
                content = content.replaceAll("＊＊", "")
                content = specialStyle1(content, 'blueText')
                li.html("<span class='redText'>" + content + "</span> ")
            } else if (content.indexOf("＆＆") != -1) {
                content = content.replaceAll("＆＆", "")
                content = specialStyle1(content)
                li.html("<span class='blueText'>" + content + "</span> ")
            } else if (content.indexOf("[") != -1 && content.indexOf("]") != -1) {
                licontent = specialStyle1(content)
                li.html(licontent)
            } else if (content.indexOf("{IMAGE_LINK}") != -1) {
                content = content.replaceAll("{IMAGE_LINK}", "")
                li.html("<img src='./in_images/" + content + ".png'/>")
            } else {
                li.text(content)
            }
        }
        ul1.append(li)
    }

    return ul1.html()
}
function filter(word) {
    return word.replace("_x000b_", "")
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
    html = html.replace("{t1}", filter(title1))
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
    html = html.replace("{t1}", filter(title1))
    html = html.replace("{c}", filter(getData(dict, key1)))
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
    // console.log(dict)
    addTwoColunmnListRow(formBox, dict, "Treatment Principles", "Symptoms and Signs", "EFFECT", "ACTIONS_INDICATIONS", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Point Prescription", "Formula", "LATIN_NAME", "PINYIN_NAME", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Formula Pattern", "Formula Actions", "NAME", "COMMON_NAME", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Formula Ingredients", "Formula Modifications", "DOSAGE", "SUBJECT", "•", "•")

    return main
}
function replaceDuplicate(str, delimiter = ":") {
    let array = str.split(delimiter);
    let numCount = array.length
    if (numCount >= 2) {
        title = array[0]
        // console.log(title)
        if (title.indexOf("、") != -1) {
            channels = title.split("、")
            ret = str.replaceAll("、", "").replaceAll(":", "")
            for (let i = 0; i < channels.length; i++) {
                // console.log(ret.indexOf(channels[i]))
                ret = ret.replaceAll(channels[i].trim(), "");
                // console.log(channels[i], ret)
            }
            str = title + ":" + ret
        } else {
            strReplaced = array[1].replaceAll(title, "")
            // console.log(strReplaced)
            str = title + strReplaced + (array[2] == undefined ? "" : array[2]);
        }
    }
    return str;
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

function searchHandler() {
    list = []
    dafanList = alldata.dafanList
    var group = $("#group").val()
    if ((group == "all" || group == "none")) {
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
            if (isAdd) {
                list.push(dafanList[j])
            }
        }
    }
    return list
}
function searchFieldsHandler(list, text, searchfields) {
    text = text.trim()
    ret = []
    if (text != "") {
        for (j = 0; j < list.length; j++) {
            dict = list[j]
            for (k = 0; k < searchfields.length; k++) {
                key = searchfields[k].toUpperCase()
                if (dict[key].indexOf(text) != -1) {
                    // console.log(key)
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
    $("#resultText").html("&nbsp; Total " + list.length + "&nbsp;records matched!")
}
channels = ['LU', 'BL', 'ST', 'LR', 'SP', 'HT', 'KI', 'GV', 'GB', 'PC', 'TH', 'LI', 'SI', 'TE']
dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
    "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions"]//, "Common_Combinations", "Others", "FuFan"]
searchkeys = ["SUBJECT", "EFFECT", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions"]//, "Common_Combinations", "Others", "FuFan"]
searchTitles = ["PINYIN_NAME", "NAME", "LATIN_NAME"]

$(function () {
    initDropDownList("group", alldata.groups)
    $("#searcht").click(function () {
        search_utils(searchTitles)
    })
    showList($("#mainDiv"), alldata.dafanList)
});

function search_utils(fieldList) {
    text = $("#searchText").val()
    $("#resultText").val("")
    list = searchHandler()
    list = searchFieldsHandler(list, text, fieldList)
    showList($("#mainDiv"), list)
}