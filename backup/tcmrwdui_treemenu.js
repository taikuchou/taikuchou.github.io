
function showList(area, list) {
    count = 0
    for (var level1 in list){
        var html = '<li class="dropdown"></li>'
        level1li = $(html)
        area.append(level1li)
        html = '<a href="">{level1}</a>'
        html = html.replace("{level1}", level1)
        //Add Level1
        level1li.append($(html))
        level2ul = $("<ul></ul>") 
        //Add Level2
        level1li.append(level2ul)
        for (var level2 in list[level1]){
            //console.log(level1,">",level2)
            html = '<li class="dropdown"></li>'
            level2li = $(html)
            level2ul.append(level2li)
            html = '<a href="" class="level2">{level2}</a>'
            html = html.replace("{level2}", level2)
            level2li.append($(html))
            level3ul = $("<ul></ul>") 
            level2li.append(level3ul)
            for (var level3 in list[level1][level2]){
                dafan = list[level1][level2][level3];
                // console.log(level1,">",level2,">", dafan)
                html = '<li><a href="" class="level3">{level3} {level4}</a></li>'
                html = html.replace("{level3}", dafan["NAME"])
                html = html.replace("{level4}", dafan["PINYIN_NAME"])
                level3ul.append($(html))
            }
        }
    }
    
    
    //$("#resultText").html("&nbsp; Total " + count + "&nbsp;records matched!")
}
$(function () {
    showList($("#menuroot"), dafanGroup)
});