
function showList(area, list, groups) {

    for (var idx in groups) {
        level1 = groups[idx]
        count = 0
        var html = '<li class="dropdown"></li>'
        level1li = $(html)
        area.append(level1li)
        html = '<a href="">{level1}({count})</a>'
        html = html.replace("{level1}", level1).replace("{level1}", level1)
        //Add Level1
        level1a = $(html)
        level1li.append(level1a)
        level2ul = $("<ul></ul>")
        //Add Level2
        level1li.append(level2ul)
        for (var level2 in list[level1]) {
            //console.log(level1,">",level2)
            subcount = 0
            html = '<li class="dropdown"></li>'
            level2li = $(html)
            level2ul.append(level2li)
            html = '<a href="" class="level2" style="color:#F7DB4F;">{level2}({subcount})</a>'
            html = html.replace("{level2}", level2)
            level2li.append($(html))
            level3ul = $("<ul></ul>")
            level2li.append(level3ul)
            for (var level3 in list[level1][level2]) {
                dafan = list[level1][level2][level3];
                html = '<li><a href="" class="level3" data="{level5},{level6}">{level3} {level4}</a></li>'
                html = html.replace("{level3}", filter(dafan["CHANNELS"]))
                html = html.replaceAll("{level4}", filter(dafan["LITERAL_ENGLISH"]))
                html = html.replaceAll("{level5}", filter(dafan["CHANNELS"]))
                html = html.replaceAll("{level6}", filter(dafan["GROUP"]))
                level3ul.append($(html))
                count += 1
                subcount += 1
            }
            level2li.html(level2li.html().replace("{subcount}", subcount).replace(",", "").replace(" (", "("))
        }
        level1a.html(level1a.html().replace("{count}", count))
    }
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
    html = html.replace("{t1}", filter(title1))
    html = html.replace("{t2}", filter(title2))
    html = html.replace("{c}", getData(dict, key1))
    html = html.replace("{d}", getData(dict, key2))
    parent.append($(html))
}
function getDafan(pname) {
    array = pname.split(",")
    name = array[0]
    group_name = array[1]
    dafanList = alldata.dafanList
    for (j = 0; j < dafanList.length; j++) {
        pinyinName = dafanList[j]["CHANNELS"]
        groupName = dafanList[j]["GROUP"]
        if (name == pinyinName && group_name == groupName) {
            return dafanList[j]
        }
    }
}

function filter(word) {
    return word.replace("_x000b_", "").replace(",", "")
}
function showDafan(data) {
    $("#g0").text(data["MainCategory".toUpperCase()])
    //$("#g1").text(data["GROUP".toUpperCase()])
    $("#g2").text(data["SUBGROUP_1".toUpperCase()])
    //$("#g3").text(data["SUBGROUP_2".toUpperCase()])
    $("#title").html("<a href='" + data["URL"] + "'>" + data["CHANNELS"] + " (" + filter(data["LITERAL_ENGLISH"]) + ") </a>")//+ data["LATIN_NAME"] +
    formBox = $("#formbox")
    formBox.empty()
    dict = data
    // console.log("showDafan", dict)
    addTwoColunmnListRow(formBox, dict, "Treatment Principles", "Symptoms and Signs", "EFFECT", "ACTIONS_INDICATIONS", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Point Prescription", "Formula", "LATIN_NAME", "PINYIN_NAME", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Formula Pattern", "Formula Actions", "NAME", "COMMON_NAME", "•", "•")
    addTwoColunmnListRow(formBox, dict, "Formula Ingredients", "Formula Modifications", "DOSAGE", "SUBJECT", "•", "•")
    //console.log(data["EFFECT"])
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
//Ken:isRemoveDuplicate
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
        content = list[i].trim().replaceAll("|", "").replaceAll("◦", "")//replaceAll("，", ", ")
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
$(function () {
    $("#version_info").text(alldata.version)
    showList($("#menuroot"), alldata.dafanGroup, alldata.groups)
    $("a.level3").click(function () {
        pname = $(this).attr("data")
        // console.log(pname)
        pdata = getDafan(pname)
        if (pdata != undefined) {
            //console.log(pdata)
            showDafan(pdata)
            window.scrollTo(0, 0);
            $("#menu").removeClass("active");
            $("#menuA").removeClass("active");
            $("body").removeClass("hidden");
        }
    })
    showDafan(alldata.dafanList[0])
});