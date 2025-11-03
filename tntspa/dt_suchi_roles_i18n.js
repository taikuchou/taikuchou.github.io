// ========================================
// i18n Translations
// ========================================
const translations = {
  "zh-TW": {
    //Page title
    "page.title": "壽司助手 🍣 - 壽司部門幫廚",

    // Navigation
    "nav.checklist": "出餐Ａ",
    "nav.checklistb": "出餐Ｂ",
    "nav.roll1": "卷1",
    "nav.roll2": "卷2",
    "nav.notes": "筆記",

    // Notes
    "notes.title": "壽司卷筆記",
    "notes.selectSushi": "選擇壽司卷",
    "notes.placeholder": "── 請選擇壽司卷 ──",
    "notes.modeSelect": "單選模式",
    "notes.modeSearch": "搜尋模式",
    "notes.switchToSearch": "搜尋",
    "notes.switchToSelect": "單選",
    "notes.search": "搜尋",
    "notes.searchPlaceholder": "搜尋壽司卷名稱或成分...",
    "notes.searchButton": "搜尋",
    "notes.clearSearch": "清除",
    "notes.searchResults": "搜尋結果",
    "notes.noResults": "找不到符合的壽司卷",
    "notes.view": "查看",
    "notes.empty": "請從上方選單選擇一款壽司卷",
    "notes.emptySearch": "輸入關鍵字搜尋壽司卷",
    "notes.notFound": "查無此品項。",
    "notes.styleUnknown": "卷型號未註明",
    "notes.toppings": "表面",
    "notes.fillings": "內餡",
    "notes.none": "（無）",

    // Checklist
    "checklist.title": "壽司部門幫廚",
    "checklist.todayComplete": "今日完成",
    "checklist.total": "共",
    "checklist.items": "項",
    "checklist.completionRate": "完成率",
    "checklist.resetToday": "今日重設",
    "checklist.confirmReset": "確定要將今天的勾選與計時器全部重設嗎？",
    "checklist.timerLabel": "⏱ 便當「兩小時回查」計時器",
    "checklist.timerStatusPending": "待啟動",
    "checklist.timerStatusActive": "計時進行中",
    "checklist.startTimer": "開始計時",
    "checklist.stopTimer": "停止",
    "checklist.timerRunning": "計時中...",
    "checklist.timerAlert": "⏱️ 便當兩小時回查\n\n便當已超過 2 小時\n請檢查並貼上折價標籤",
    "checklist.prep": "工作安排",
    "checklist.selectAll": "全選",
    "checklist.deselectAll": "全不選",
    "checklist.footer": "資料保存在此裝置的瀏覽器（localStorage）<br>每日自動換日重設",

    // Ingredients
    "ingredients.notAvailable": "（成分待補）",

    // Common
    "common.targetLabel": "目標",

    // Footer
    "footer.appName": "壽司助手",
    "footer.version": "版本",
    "footer.copyright": "版權所有",
    "footer.author": "戴谷州",
    "footer.version.number": "6.0",

    // Product Names
    "product.california": "加州卷",
    "product.whiteCalifornia": "白加州",
    "product.salmonAvocado": "三文魚牛油果",
    "product.spicySeafood": "香辣海鮮卷",
    "product.seafood": "海鮮",
    "product.avocado": "牛油果卷",
    "product.cucumberAvocado": "青瓜牛油卷",
    "product.crispyDragon": "脆龍卷",
    "product.spiderRoll": "脆龍卷",
    "product.miniShrimp": "小蝦卷",
    "product.largeTempuraShrimp": "大蝦卷",
    "product.gardenDelight": "田園卷",
    "product.miniCucumber": "小青瓜卷",
    "product.miniSalmon": "三文小卷",
    "product.cookedSalmon": "熟三文魚卷",
    "product.futomaki": "太卷",
    "product.egg": "蛋卷",
    "product.tofuSeafood": "豆皮-海鮮卷",
    "product.largeShrimp": "大蝦卷",
    "product.cucumber": "青瓜卷",
    "product.mapleLeafRoll": "楓葉卷",
    "product.spicyTunaRoll": "辣吞拿魚卷",
    "product.spicySalmonRoll": "辣三文魚卷",
    "product.bigRoll": "太卷",
    "product.batch": "批次",

    // Ingredient Components
    "ing.type2Inside": "(2號反卷)",
    "ing.type1Inside": "(1號反卷)",
    "ing.type1Normal": "(1號正卷)",
    "ing.type3Inside": "(3號反卷)",
    "ing.type1Outside": "(1號正卷)",
    "ing.type3Outside": "(3號正卷)",
    "ing.type3Normal": "(3號正卷)",
    "ing.multiType": "(多款)",
    "ing.seafoodMix": "(2號反卷 / 雜錦組合)",
    "ing.assorted": "雜錦",
    "ing.whiteSesame": "白芝麻",
    "ing.blackWhiteSesame": "黑白芝麻",
    "ing.orangeTobiko": "橙魚子",
    "ing.redTobiko": "紅魚子",
    "ing.noTobiko": "没魚子",
    "ing.greenGrass": "綠草",
    "ing.seaweed": "海藻",
    "ing.crabmeat": "蟹肉碎",
    "ing.crabstick": "蟹柳條",
    "ing.cucumber": "青瓜",
    "ing.avocado": "牛油果",
    "ing.salmon": "三文魚",
    "ing.cookedSalmon": "熟三文魚",
    "ing.tamago": "玉子蛋",
    "ing.tamagoyaki": "玉子蛋",
    "ing.lettuce": "生菜",
    "ing.carrotJulienne": "胡蘿蔔絲",
    "ing.carrotShred": "胡蘿蔔絲",
    "ing.shrimpPair": "一對炸蝦",
    "ing.onePairShrimp": "一對炸蝦",
    "ing.yellowPickle": "黃蘿蔔",
    "ing.redPepper": "紅椒絲",
    "ing.redPepperShred": "紅椒絲",
    "ing.pickledRadish": "日式蘿蔔條",
    "ing.pickledBamboo": "醃竹筍",
    "ing.egg": "蛋",
    "ing.tunaSashimi": "吞拿魚刺身切碎（少量拉差醬拌）",
    "ing.salmonSashimi": "三文魚刺身切碎（少量拉差醬拌），加天婦羅碎",
    "ing.californiaGreenGrass": "(2號反卷 / 綠草版)",

    // Notes
    "note.midAutumn": "中秋",
    "note.dropShape": "水滴",
    "note.triangle": "三角形",
    "note.canadaA": "加拿大A",
    "note.thousandIsland": "千島",
    "note.chargrilled": "炭燒三文魚",
    "note.redTobiko": "紅魚子",
    "note.multipleTypes": "多款",
    "note.mapleLeafFilling": "蟹肉碎/蟹棒/玉子/三文魚/青瓜",
    "note.cookedSalmonNote": "千島壽司盤，加紅魚子",
    "note.tunaSashimi": "吞拿魚刺身切碎（少量拉差醬拌）",
    "note.salmonSashimi": "三文魚刺身切碎（少量拉差醬拌），加天婦羅碎",
    "note.gardenDelight1": "第一條（1號反卷，邊緣補米飯）",
    "note.gardenDelight2": "第二條（1號反卷，邊緣補米飯）",
    "note.gardenDelight3": "第三條（1號反卷，邊緣補米飯）",
    "note.gardenDelight4": "第四條（3號正卷）",

    // Roll Instructions
    "instruction.roll1Type1": "第一條(1號反/邊補米)：黑白芝麻；黃蘿蔔 30g、紅椒絲 25g",
    "instruction.roll2Type1": "第二條(1號反/邊補米)：黑白芝麻；青瓜 20g、牛油果 25g",
    "instruction.roll3Type1": "第三條(1號反/邊補米)：黑白芝麻；青瓜 20g、紅椒絲 10g、胡蘿蔔絲 20g",
    "instruction.roll4Type3": "第四條(3號正)：黃蘿蔔 30g、青瓜 30g、紅椒絲 20g、牛油果 20g、胡蘿蔔絲 15g、生菜 2片",
    "instruction.note": "備註：千島壽司盤可加紅魚子",

    // Checklist Items
    "checklist.task.prep1": "煮飯 3 鍋，並準備洗好下一輪煮飯 3 鍋的米，及製作第二輪的飯。蒸熱醋飯。開打包機，清潔並處理展櫃食物，補好小菜，取回蒸飯。",
    "checklist.task.prep2": "出餐：刺身、特價盤、組合盤（依第一輪要求的數量，與 B 位互相配合）。A–E 盤（若有訂單時完成）。",
    "checklist.task.prep3": "在 12 點前安排午餐。",
    "checklist.task.prep4": "午餐後接替出餐 B 午餐，繼續補出餐 A、B 位的出餐，直到出餐 B 回來。",
    "checklist.task.prep5": "切三文魚 3 條、COHO 魚 1 條（數量依剩餘量與銷售情況決定）。",
    "checklist.task.prep6": "填寫早上溫度表與出餐溫度表。",
    "checklist.task.prep7": "準備出餐材料並進行清潔。",

    // Checklist B
    "checklistb.prep": "工作安排",

    // Checklist B Items
    "checklistb.task.prep1": "拍打飯粒。",
    "checklistb.task.prep2": "出餐 ST2、ST4、ST5（依第一輪要求的數量，與 A 位互相配合），於十一點半前完成並拍照上傳群組。",
    "checklistb.task.prep3": "根據銷售情況，持續補充 A、B 位的出餐，直到 A 位回來午餐。",
    "checklistb.task.prep4": "午餐後繼續負責 A、B 位的出餐。",
    "checklistb.task.prep5": "備料（刨蘿蔔絲與洗生菜），於五點拍照上傳群組。",
    "checklistb.task.prep6": "處理當天剩飯，最後進行壽司部總清潔。",

    // Roll 1
    "roll1.prep": "工作安排",

    // Roll 1 Items
    "roll1.task.prep1": "組裝包卷機並加油，打包壽司托盤與壽司卷席。",
    "roll1.task.prep2": "完成第一輪包卷要求（與卷2協調進度），完成三角飯的貼價錢並擺放至展櫃。",
    "roll1.task.prep3": "在完成第一輪包卷數量後，根據需要繼續準備出餐用卷。",
    "roll1.task.prep4": "在 12 點前用午餐。",
    "roll1.task.prep5": "準備包卷所需材料。",
    "roll1.task.prep6": "切三文魚 3 條。",
    "roll1.task.prep7": "繼續完成晚間出餐用卷。",
    "roll1.task.prep8": "清潔。",

    // Roll 2
    "roll2.prep": "工作安排",

    // Roll 2 Items
    "roll2.task.prep1": "將煮好的第一輪飯打成壽司飯，完成壽司飯酸鹼度測試。",
    "roll2.task.prep2": "完成包卷數量（白加州 9、加州 40、三文魚卷 20、海鮮卷 5）。",
    "roll2.task.prep3": "約在 10 點左右先將飯合用的雞肉與三文魚送至廚房加工。",
    "roll2.task.prep4": "打第二輪壽司飯。",
    "roll2.task.prep5": "開始製作 Bento 飯（雞飯 6、三文魚飯 6、鰻魚飯 6、雞飯 6）。",
    "roll2.task.prep6": "製作鰻魚冷飯 6–8 份。",
    "roll2.task.prep7": "備小菜並切雞肉、鰻魚（小菜量：架上 4、備貨 4）。",
    "roll2.task.prep8": "再煮三鍋飯後用午餐。",
    "roll2.task.prep9": "打壽司飯，將雞肉與三文魚送至廚房加工，繼續完成晚餐 Bento（雞飯 6、三文魚飯 6、鰻魚飯 6、雞飯 6–12）。",
    "roll2.task.prep10": "填寫早上溫度表和出餐溫度表。",
    "roll2.task.prep11": "備貨與清潔。",

  },

  "zh-CN": {
    //Page title
    "page.title": "寿司助手 🍣 - 寿司部门帮厨",
    // Navigation
    "nav.checklist": "出餐A",
    "nav.checklistb": "出餐B",
    "nav.roll1": "卷1",
    "nav.roll2": "卷2",
    "nav.notes": "笔记",

    // Notes
    "notes.title": "寿司卷笔记",
    "notes.selectSushi": "选择寿司卷",
    "notes.placeholder": "── 请选择寿司卷 ──",
    "notes.modeSelect": "单选模式",
    "notes.modeSearch": "搜寻模式",
    "notes.switchToSearch": "搜寻",
    "notes.switchToSelect": "单选",
    "notes.search": "搜寻",
    "notes.searchPlaceholder": "搜寻寿司卷名称或成分...",
    "notes.searchButton": "搜寻",
    "notes.clearSearch": "清除",
    "notes.searchResults": "搜寻结果",
    "notes.noResults": "找不到符合的寿司卷",
    "notes.view": "查看",
    "notes.empty": "请从上方选单选择一款寿司卷",
    "notes.emptySearch": "输入关键字搜寻寿司卷",
    "notes.notFound": "查无此品项。",
    "notes.styleUnknown": "卷型号未注明",
    "notes.toppings": "表面",
    "notes.fillings": "内馅",
    "notes.none": "（无）",

    // Checklist
    "checklist.title": "寿司部门帮厨",
    "checklist.todayComplete": "今日完成",
    "checklist.total": "共",
    "checklist.items": "项",
    "checklist.completionRate": "完成率",
    "checklist.resetToday": "今日重置",
    "checklist.confirmReset": "确定要将今天的勾选与计时器全部重置吗？",
    "checklist.timerLabel": "⏱ 便当「两小时回查」计时器",
    "checklist.timerStatusPending": "待启动",
    "checklist.timerStatusActive": "计时进行中",
    "checklist.startTimer": "开始计时",
    "checklist.stopTimer": "停止",
    "checklist.timerRunning": "计时中...",
    "checklist.timerAlert": "⏱️ 便当两小时回查\n\n便当已超过 2 小时\n请检查并贴上折价标签",
    "checklist.prep": "工作安排",
    "checklist.selectAll": "全选",
    "checklist.deselectAll": "全不选",
    "checklist.footer": "资料保存在此装置的浏览器（localStorage）<br>每日自动换日重置",

    // Ingredients
    "ingredients.notAvailable": "（成分待补）",

    // Common
    "common.targetLabel": "目标",

    // Footer
    "footer.appName": "寿司助手",
    "footer.version": "版本",
    "footer.copyright": "版权所有",
    "footer.author": "戴谷州",
    "footer.version.number": "6.0",

    // Product Names (Simplified Chinese)
    "product.california": "加州卷",
    "product.whiteCalifornia": "白加州",
    "product.salmonAvocado": "三文鱼牛油果",
    "product.spicySeafood": "香辣海鲜卷",
    "product.seafood": "海鲜",
    "product.avocado": "牛油果卷",
    "product.cucumberAvocado": "青瓜牛油卷",
    "product.crispyDragon": "脆龙卷",
    "product.spiderRoll": "脆龙卷",
    "product.miniShrimp": "小虾卷",
    "product.largeTempuraShrimp": "大虾卷",
    "product.gardenDelight": "田园卷",
    "product.miniCucumber": "小青瓜卷",
    "product.miniSalmon": "三文小卷",
    "product.cookedSalmon": "熟三文鱼卷",
    "product.futomaki": "太卷",
    "product.egg": "蛋卷",
    "product.tofuSeafood": "豆皮-海鲜卷",
    "product.largeShrimp": "大虾卷",
    "product.cucumber": "青瓜卷",
    "product.mapleLeafRoll": "枫叶卷",
    "product.spicyTunaRoll": "辣吞拿鱼卷",
    "product.spicySalmonRoll": "辣三文鱼卷",
    "product.bigRoll": "太卷",
    "product.batch": "批次",

    // Ingredient Components (Simplified Chinese)
    "ing.type2Inside": "(2号反卷)",
    "ing.type1Inside": "(1号反卷)",
    "ing.type1Normal": "(1号正卷)",
    "ing.type3Inside": "(3号反卷)",
    "ing.type1Outside": "(1号正卷)",
    "ing.type3Outside": "(3号正卷)",
    "ing.type3Normal": "(3号正卷)",
    "ing.multiType": "(多款)",
    "ing.seafoodMix": "(2号反卷 / 杂锦组合)",
    "ing.assorted": "杂锦",
    "ing.whiteSesame": "白芝麻",
    "ing.blackWhiteSesame": "黑白芝麻",
    "ing.orangeTobiko": "橙鱼子",
    "ing.redTobiko": "红鱼子",
    "ing.noTobiko": "没鱼子",
    "ing.greenGrass": "绿草",
    "ing.seaweed": "海藻",
    "ing.crabmeat": "蟹肉碎",
    "ing.crabstick": "蟹柳条",
    "ing.cucumber": "青瓜",
    "ing.avocado": "牛油果",
    "ing.salmon": "三文鱼",
    "ing.cookedSalmon": "熟三文鱼",
    "ing.tamago": "玉子蛋",
    "ing.tamagoyaki": "玉子蛋",
    "ing.lettuce": "生菜",
    "ing.carrotJulienne": "胡萝卜丝",
    "ing.carrotShred": "胡萝卜丝",
    "ing.shrimpPair": "一对炸虾",
    "ing.onePairShrimp": "一对炸虾",
    "ing.yellowPickle": "黄萝卜",
    "ing.redPepper": "红椒丝",
    "ing.redPepperShred": "红椒丝",
    "ing.pickledRadish": "日式萝卜条",
    "ing.pickledBamboo": "腌竹笋",
    "ing.egg": "蛋",
    "ing.tunaSashimi": "吞拿鱼刺身切碎（少量沙拉酱拌）",
    "ing.salmonSashimi": "三文鱼刺身切碎（少量沙拉酱拌），加天妇罗碎",
    "ing.californiaGreenGrass": "(2号反卷 / 绿草版)",

    // Notes (Simplified Chinese)
    "note.midAutumn": "中秋",
    "note.dropShape": "水滴",
    "note.triangle": "三角形",
    "note.canadaA": "加拿大A",
    "note.thousandIsland": "千岛",
    "note.chargrilled": "炭烧三文鱼",
    "note.redTobiko": "红鱼子",
    "note.multipleTypes": "多款",
    "note.mapleLeafFilling": "蟹肉碎/蟹棒/玉子/三文鱼/青瓜",
    "note.cookedSalmonNote": "千岛寿司盘，加红鱼子",
    "note.tunaSashimi": "吞拿鱼刺身切碎（少量拉差酱拌）",
    "note.salmonSashimi": "三文鱼刺身切碎（少量拉差酱拌）",
    "note.gardenDelight1": "第一条（1号反卷，边缘补米饭）",
    "note.gardenDelight2": "第二条（1号反卷，边缘补米饭）",
    "note.gardenDelight3": "第三条（1号反卷，边缘补米饭）",
    "note.gardenDelight4": "第四条（3号正卷）",

    // Roll Instructions (Simplified Chinese)
    "instruction.roll1Type1": "第一条(1号反/边补米)：黑白芝麻；黄萝卜 30g、红椒丝 25g",
    "instruction.roll2Type1": "第二条(1号反/边补米)：黑白芝麻；青瓜 20g、牛油果 25g",
    "instruction.roll3Type1": "第三条(1号反/边补米)：黑白芝麻；青瓜 20g、红椒丝 10g、胡萝卜丝 20g",
    "instruction.roll4Type3": "第四条(3号正)：黄萝卜 30g、青瓜 30g、红椒丝 20g、牛油果 20g、胡萝卜丝 15g、生菜 2片",
    "instruction.note": "备注：千岛寿司盘可加红鱼子",

    // Checklist Items (Simplified Chinese)
    "checklist.task.prep1": "煮饭 3 锅，并准备洗好下一轮煮饭 3 锅的米，及制作第二轮的饭。蒸热醋饭。开打包机，清洁并处理展柜食物，补好小菜，取回蒸饭。",
    "checklist.task.prep2": "出餐：刺身、特价盘、组合盘（依第一轮要求的数量，与 B 位互相配合）。A–E 盘（若有订单时完成）。",
    "checklist.task.prep3": "在 12 点前安排午餐。",
    "checklist.task.prep4": "午餐后接替出餐 B 午餐，继续补出餐 A、B 位的出餐，直到出餐 B 回来。",
    "checklist.task.prep5": "切三文鱼 3 条、COHO 鱼 1 条（数量依剩余量与销售情况决定）。",
    "checklist.task.prep6": "填写早上温度表与出餐温度表。",
    "checklist.task.prep7": "准备出餐材料并进行清洁。",

    // Checklist B
    "checklistb.prep": "工作安排",

    // Checklist B Items
    "checklistb.task.prep1": "拍打饭粒。",
    "checklistb.task.prep2": "出餐 ST2、ST4、ST5（依第一轮要求的数量，与 A 位互相配合），于十一点半前完成并拍照上传群组。",
    "checklistb.task.prep3": "根据销售情况，持续补充 A、B 位的出餐，直到 A 位回来午餐。",
    "checklistb.task.prep4": "午餐后继续负责 A、B 位的出餐。",
    "checklistb.task.prep5": "备料（刨萝卜丝与洗生菜），于五点拍照上传群组。",
    "checklistb.task.prep6": "处理当天剩饭，最后进行寿司部总清洁。",

    // Roll 1
    "roll1.prep": "工作安排",

    // Roll 1 Items
    "roll1.task.prep1": "组装包卷机并加油，打包寿司托盘与寿司卷席。",
    "roll1.task.prep2": "完成第一轮包卷要求（与卷2协调进度），完成三角饭的贴价钱并摆放至展柜。",
    "roll1.task.prep3": "在完成第一轮包卷数量后，根据需要继续准备出餐用卷。",
    "roll1.task.prep4": "在 12 点前用午餐。",
    "roll1.task.prep5": "准备包卷所需材料。",
    "roll1.task.prep6": "切三文鱼 3 条。",
    "roll1.task.prep7": "继续完成晚间出餐用卷。",
    "roll1.task.prep8": "清洁。",

    // Roll 2
    "roll2.prep": "工作安排",

    // Roll 2 Items
    "roll2.task.prep1": "将煮好的第一轮饭打成寿司饭，完成寿司饭酸碱度测试。",
    "roll2.task.prep2": "完成包卷数量（白加州 9、加州 40、三文鱼卷 20、海鲜卷 5）。",
    "roll2.task.prep3": "约在 10 点左右先将饭合用的鸡肉与三文鱼送至厨房加工。",
    "roll2.task.prep4": "打第二轮寿司饭。",
    "roll2.task.prep5": "开始制作 Bento 饭（鸡饭 6、三文鱼饭 6、鳗鱼饭 6、鸡饭 6）。",
    "roll2.task.prep6": "制作鳗鱼冷饭 6–8 份。",
    "roll2.task.prep7": "备小菜并切鸡肉、鳗鱼（小菜量：架上 4、备货 4）。",
    "roll2.task.prep8": "再煮三锅饭后用午餐。",
    "roll2.task.prep9": "打寿司饭，将鸡肉与三文鱼送至厨房加工，继续完成晚餐 Bento（鸡饭 6、三文鱼饭 6、鳗鱼饭 6、鸡饭 6–12）。",
    "roll2.task.prep10": "填写早上温度表和出餐温度表。",
    "roll2.task.prep11": "备货与清洁。",
  },

  "en": {
    //Page title
    "page.title": "Sushi Assistant 🍣 - Kitchen Helper in Sushi Department",

    // Navigation
    "nav.checklist": "Service A",
    "nav.checklistb": "Service B",
    "nav.roll1": "Roll 1",
    "nav.roll2": "Roll 2",
    "nav.notes": "Notes",

    // Notes
    "notes.title": "Sushi Roll Notes",
    "notes.selectSushi": "Select Sushi Roll",
    "notes.placeholder": "── Please Select a Sushi Roll ──",
    "notes.modeSelect": "Select Mode",
    "notes.modeSearch": "Search Mode",
    "notes.switchToSearch": "Search",
    "notes.switchToSelect": "Select",
    "notes.search": "Search",
    "notes.searchPlaceholder": "Search sushi name or ingredients...",
    "notes.searchButton": "Search",
    "notes.clearSearch": "Clear",
    "notes.searchResults": "Search Results",
    "notes.noResults": "No matching sushi rolls found",
    "notes.view": "View",
    "notes.empty": "Please select a sushi roll from the menu above",
    "notes.emptySearch": "Enter keywords to search sushi rolls",
    "notes.notFound": "Item not found.",
    "notes.styleUnknown": "Roll type not specified",
    "notes.toppings": "Toppings",
    "notes.fillings": "Fillings",
    "notes.none": "(None)",

    // Checklist
    "checklist.title": "Sushi Department Assistant",
    "checklist.todayComplete": "Today's Completed",
    "checklist.total": "of",
    "checklist.items": "items",
    "checklist.completionRate": "Completion Rate",
    "checklist.resetToday": "Reset Today",
    "checklist.confirmReset": "Are you sure you want to reset all checkmarks and timers for today?",
    "checklist.timerLabel": "⏱ Bento \"2-Hour Check\" Timer",
    "checklist.timerStatusPending": "Pending",
    "checklist.timerStatusActive": "Timer Running",
    "checklist.startTimer": "Start Timer",
    "checklist.stopTimer": "Stop",
    "checklist.timerRunning": "Timing...",
    "checklist.timerAlert": "⏱️ Bento 2-Hour Check\n\nBento has exceeded 2 hours\nPlease check and apply discount label",
    "checklist.prep": "Work Schedule",
    "checklist.selectAll": "Select All",
    "checklist.deselectAll": "Deselect All",
    "checklist.footer": "Data stored in device browser (localStorage)<br>Automatically resets daily",

    // Ingredients
    "ingredients.notAvailable": "(Ingredients pending)",

    // Common
    "common.targetLabel": "Target",

    // Footer
    "footer.appName": "Sushi Assistant",
    "footer.version": "Version",
    "footer.copyright": "Copyright",
    "footer.author": "Kuchou Tai",
    "footer.version.number": "6.0",

    // Product Names (English)
    "product.california": "California Roll",
    "product.whiteCalifornia": "White California",
    "product.salmonAvocado": "Salmon Avocado",
    "product.spicySeafood": "Spicy Seafood Roll",
    "product.seafood": "Seafood",
    "product.avocado": "Avocado Roll",
    "product.cucumberAvocado": "Cucumber Avocado",
    "product.crispyDragon": "Crispy Dragon",
    "product.spiderRoll": "Spider Roll",
    "product.miniShrimp": "Mini Shrimp",
    "product.largeTempuraShrimp": "Large Tempura Shrimp",
    "product.gardenDelight": "Garden Delight",
    "product.miniCucumber": "Mini Cucumber",
    "product.miniSalmon": "Mini Salmon",
    "product.cookedSalmon": "Cooked Salmon Roll",
    "product.futomaki": "Futomaki",
    "product.egg": "Egg Roll",
    "product.tofuSeafood": "Tofu Skin Seafood",
    "product.mapleLeafRoll": "Maple Leaf Roll",
    "product.spicyTunaRoll": "Spicy Tuna Roll",
    "product.spicySalmonRoll": "Spicy Salmon Roll",
    "product.bigRoll": "Big Roll",
    "product.largeShrimp": "Large Shrimp",
    "product.cucumber": "Cucumber",
    "product.batch": "Batch",

    // Ingredient Components (English)
    "ing.type2Inside": "(Type 2 Inside-Out)",
    "ing.type1Inside": "(Type 1 Inside-Out)",
    "ing.type1Normal": "(Type 1 Regular)",
    "ing.type3Inside": "(Type 3 Inside-Out)",
    "ing.type1Outside": "(Type 1 Regular)",
    "ing.type3Outside": "(Type 3 Regular)",
    "ing.type3Normal": "(Type 3 Regular)",
    "ing.multiType": "(Multiple Types)",
    "ing.seafoodMix": "(Type 2 Inside-Out / Assorted Mix)",
    "ing.assorted": "Assorted",
    "ing.whiteSesame": "White Sesame",
    "ing.blackWhiteSesame": "Black & White Sesame",
    "ing.orangeTobiko": "Orange Tobiko",
    "ing.redTobiko": "Red Tobiko",
    "ing.noTobiko": "No Tobiko",
    "ing.greenGrass": "Green Grass",
    "ing.seaweed": "Seaweed",
    "ing.crabmeat": "Crabmeat",
    "ing.crabstick": "Crab sticks",
    "ing.cucumber": "Cucumber",
    "ing.avocado": "Avocado",
    "ing.salmon": "Salmon",
    "ing.cookedSalmon": "Cooked Salmon",
    "ing.tamago": "Tamago",
    "ing.tamagoyaki": "Tamago",
    "ing.lettuce": "Lettuce",
    "ing.carrotJulienne": "Carrot Julienne",
    "ing.carrotShred": "Carrot Shred",
    "ing.shrimpPair": "Tempura Shrimp Pair",
    "ing.onePairShrimp": "Tempura Shrimp Pair",
    "ing.yellowPickle": "Yellow Pickled Radish",
    "ing.redPepper": "Red Pepper Strips",
    "ing.redPepperShred": "Red Pepper Strips",
    "ing.pickledRadish": "Japanese Pickled Radish",
    "ing.pickledBamboo": "Pickled Bamboo",
    "ing.egg": "Egg",
    "ing.tunaSashimi": "Minced Tuna Sashimi (with Sriracha)",
    "ing.salmonSashimi": "Minced Salmon Sashimi (with Sriracha), with Tempura Bits",
    "ing.californiaGreenGrass": "(Type 2 Inside-Out / Green Grass Version)",

    // Notes (English)
    "note.midAutumn": "Mid-Autumn",
    "note.dropShape": "Teardrop",
    "note.triangle": "Triangle",
    "note.canadaA": "Canada A",
    "note.thousandIsland": "Thousand Island",
    "note.chargrilled": "Chargrilled Salmon",
    "note.redTobiko": "Red Tobiko",
    "note.multipleTypes": "Multiple Types",
    "note.mapleLeafFilling": "Crabmeat/Crab Stick/Tamago/Salmon/Cucumber",
    "note.cookedSalmonNote": "Thousand Island Platter, with Red Tobiko",
    "note.tunaSashimi": "Minced Tuna Sashimi (with Sriracha)",
    "note.salmonSashimi": "Minced Salmon Sashimi (with Sriracha), with Tempura Bits",
    "note.gardenDelight1": "Roll 1 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight2": "Roll 2 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight3": "Roll 3 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight4": "Roll 4 (Type 3 Regular)",

    // Roll Instructions (English)
    "instruction.roll1Type1": "Roll 1 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Yellow Pickle 30g, Red Pepper 25g",
    "instruction.roll2Type1": "Roll 2 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Cucumber 20g, Avocado 25g",
    "instruction.roll3Type1": "Roll 3 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Cucumber 20g, Red Pepper 10g, Carrot 20g",
    "instruction.roll4Type3": "Roll 4 (Type 3 Regular): Yellow Pickle 30g, Cucumber 30g, Red Pepper 20g, Avocado 20g, Carrot 15g, Lettuce 2 leaves",
    "instruction.note": "Note: Thousand Island platter can add red tobiko",


    // Checklist Items
    "checklist.task.prep1": "Cook 3 pots of rice, prepare and wash rice for next 3 pots, make second batch. Steam vinegar rice. Start packing machine, clean and handle display case food, refill side dishes, retrieve steamed rice.",
    "checklist.task.prep2": "Service: Sashimi, special plates, combo plates (according to first round requirements, coordinate with Position B). A-E plates (complete when ordered).",
    "checklist.task.prep3": "Arrange lunch break before 12 PM.",
    "checklist.task.prep4": "After lunch, cover Position B's lunch break, continue service for Positions A & B until Position B returns.",
    "checklist.task.prep5": "Cut 3 salmon fillets, 1 COHO fish (quantity depends on remaining stock and sales).",
    "checklist.task.prep6": "Fill out morning temperature log and service temperature log.",
    "checklist.task.prep7": "Prepare service materials and perform cleaning.",

    // Checklist B
    "checklistb.prep": "Work Schedule",

    // Checklist B Items
    "checklistb.task.prep1": "Pat rice grains.",
    "checklistb.task.prep2": "Service ST2, ST4, ST5 (according to first round requirements, coordinate with Position A), complete before 11:30 AM and upload photo to group.",
    "checklistb.task.prep3": "Based on sales, continuously replenish service for Positions A & B until Position A returns for lunch.",
    "checklistb.task.prep4": "After lunch, continue handling service for Positions A & B.",
    "checklistb.task.prep5": "Prep materials (shred radish and wash lettuce), upload photo to group at 5 PM.",
    "checklistb.task.prep6": "Handle leftover rice from the day, then perform final sushi department cleaning.",

    // Roll 1
    "roll1.prep": "Work Schedule",

    // Roll 1 Items
    "roll1.task.prep1": "Assemble rolling machine and add oil, pack sushi trays and rolling mats.",
    "roll1.task.prep2": "Complete first round rolling requirements (coordinate progress with Roll 2), price and display onigiri in showcase.",
    "roll1.task.prep3": "After completing first round quantity, continue preparing service rolls as needed.",
    "roll1.task.prep4": "Take lunch break before 12 PM.",
    "roll1.task.prep5": "Prepare rolling materials.",
    "roll1.task.prep6": "Cut 3 salmon fillets.",
    "roll1.task.prep7": "Continue completing evening service rolls.",
    "roll1.task.prep8": "Cleaning.",

    // Roll 2
    "roll2.prep": "Work Schedule",

    // Roll 2 Items
    "roll2.task.prep1": "Mix first round cooked rice into sushi rice, complete sushi rice pH test.",
    "roll2.task.prep2": "Complete roll quantities (White California 9, California 40, Salmon Roll 20, Seafood Roll 5).",
    "roll2.task.prep3": "Around 10 AM, send chicken and salmon for rice bowls to kitchen for processing.",
    "roll2.task.prep4": "Mix second round sushi rice.",
    "roll2.task.prep5": "Start making Bento bowls (Chicken 6, Salmon 6, Eel 6, Chicken 6).",
    "roll2.task.prep6": "Make 6-8 portions of cold eel rice.",
    "roll2.task.prep7": "Prep side dishes and cut chicken, eel (side dish quantity: shelf 4, stock 4).",
    "roll2.task.prep8": "Cook three more pots of rice then take lunch break.",
    "roll2.task.prep9": "Mix sushi rice, send chicken and salmon to kitchen, continue completing dinner Bentos (Chicken 6, Salmon 6, Eel 6, Chicken 6-12).",
    "roll2.task.prep10": "Fill out morning temperature log and service temperature log.",
    "roll2.task.prep11": "Stock prep and cleaning."
  }
};

// ========================================
// i18n Manager
// ========================================
class I18nManager {
  constructor() {
    this.currentLang = this.loadLanguage();
    this.translations = translations;
  }

  loadLanguage() {
    const saved = localStorage.getItem('sushi-assistant-lang');
    if (saved && translations[saved]) {
      return saved;
    }

    // Auto-detect from browser
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-Hant')) {
      return 'zh-TW';
    } else if (browserLang.startsWith('zh-CN') || browserLang.startsWith('zh-Hans')) {
      return 'zh-CN';
    } else if (browserLang.startsWith('en')) {
      return 'en';
    }

    return 'zh-TW'; // Default
  }

  saveLanguage(lang) {
    localStorage.setItem('sushi-assistant-lang', lang);
    this.currentLang = lang;
  }

  t(key) {
    return this.translations[this.currentLang]?.[key] || key;
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not found`);
      return;
    }

    this.saveLanguage(lang);
    this.updateUI();
  }

  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.t(key);

      // Check if element has data-i18n-attr to update attribute instead of content
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, translated);
      } else {
        el.textContent = translated;
      }
    });

    // Update elements with data-i18n-html (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = this.t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update titles/tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });

    // Dispatch custom event for dynamic content updates
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang: this.currentLang }
    }));
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  getLanguageName(lang) {
    const names = {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English'
    };
    return names[lang] || lang;
  }

  // Get translated product name
  getProductName(key) {
    return this.t(`product.${key}`) || key;
  }

  // Get translated ingredient component
  getIngredient(key) {
    return this.t(`ing.${key}`) || key;
  }

  // Get translated note
  getNote(key) {
    return this.t(`note.${key}`) || key;
  }

  // Get translated instruction
  getInstruction(key) {
    return this.t(`instruction.${key}`) || key;
  }

  // Get translated checklist task
  getTask(section, index) {
    return this.t(`checklist.task.${section}${index}`) || '';
  }
}

// Create global i18n instance
const i18n = new I18nManager();
