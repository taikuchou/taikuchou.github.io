
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
                html = '<li><a href="" class="level3" data="{level4}">{level3} {level4}</a></li>'
                html = html.replace("{level3}", filter(dafan["NAME"]))
                html = html.replaceAll("{level4}", filter(dafan["PINYIN_NAME"]))

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
function getDafan(name) {
    dafanList = alldata.dafanList
    for (j = 0; j < dafanList.length; j++) {
        pinyinName = dafanList[j]["PINYIN_NAME"]
        if (name == pinyinName) {
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
    $("#title").html("<a href='" + data["URL"] + "'>" + data["PINYIN_NAME"] + " (" + filter(data["NAME"]) + ") </a>")//+ data["LATIN_NAME"] +
    formBox = $("#formbox")
    formBox.empty()
    addTwoColunmnListRow(formBox, data, "Indication", "Latin Name", "SUBJECT", "LATIN_NAME", "•", "•")
    addTwoColunmnListRow(formBox, data, "Functions", "Ingredients", "DOSAGE", "COMMON_NAME", "•", "•")
    addTwoColunmnListRow(formBox, data, "Manifestation", "Modification", "PROPERTIES", "CONTRAINDICATIONS_CAUTIONS", "•", "•")
    addTwoColunmnListRow(formBox, data, "Review 1", "Review 2", "CHANNELS", "EFFECT", "•", "•")
    addTwoColunmnListRow(formBox, data, "Others", "Summary", "LITERAL_ENGLISH", "ACTIONS_INDICATIONS", "•", "•")
    console.log(data["EFFECT"])
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
    html = html.replace("{c}", getListHTML(filter(dict[key1]), s1))
    html = html.replace("{d}", getListHTML(filter(dict[key2]), s2, isFufan))
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
        content = list[i].trim().replaceAll("–", "").replaceAll("|", "").replaceAll("◦", "")//replaceAll("，", ", ")
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
        pdata = getDafan(pname)
        if (pdata != undefined) {
            console.log(pdata)
            showDafan(pdata)
            window.scrollTo(0, 0);
            $("#menu").removeClass("active");
            $("#menuA").removeClass("active");
            $("body").removeClass("hidden");
        }
    })
    showDafan(alldata.dafanList[0])
});