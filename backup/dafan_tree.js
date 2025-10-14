

function showData(root , list){
    for (var level1 in list){
        menu = $('<div class="menu"></div>')
        root.append(menu)
        html = '<div class="menuList">{level1}({count})</div>'
        mhtml = html.replace("{level1}", level1)
        menuList = $(mhtml)
        menu.append(menuList)
        count = 0
        for (var level2 in list[level1]){
            
            menuItem = $('<div class="menuItem"></div>')
            menu.append(menuItem)
            html = '<div class="menuListSub" >{level2}</div>'
            html = html.replace("{level2}", level2)
            menuItem.append($(html))
            for (var level3 in list[level1][level2]){
                dafan = list[level1][level2][level3]
                html = '<div class="menuItemSub">{level3} {level4}</div>'
                html = html.replace("{level3}", dafan["NAME"])
                html = html.replace("{level4}", dafan["PINYIN_NAME"])
                menuItem.append($(html))
                count += 1
            }
            
        }
        menuList.html(menuList.html().replace("{count}", count))
    }
}
$(function () {
    showData($("#maindiv") , dafanGroup)
});