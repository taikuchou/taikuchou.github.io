// ========================================
// i18n Translations
// ========================================
const translations = {
  "zh-TW": {
    //Page title
    "page.title": "壽司助手 🍣 - 壽司部門幫廚",

    // Navigation
    "nav.checklist": "流程",
    "nav.checklist2": "流程2",
    "nav.roll2": "卷2",
    "nav.roll1": "卷1",
    "nav.notes": "筆記",

    // Roll 1
    "roll1.title": "卷1 出餐紀錄",
    "roll1.totalRemaining": "總剩餘",
    "roll1.portions": "份",
    "roll1.complete": "完成 ✓",
    "roll1.reset": "重設",
    "roll1.resetTooltip": "恢復每日目標",
    "roll1.product": "產品",
    "roll1.target": "目標",
    "roll1.remaining": "剩餘",
    "roll1.actions": "操作",
    "roll1.serve": "出",
    "roll1.serveAll": "全",
    "roll1.serveOne": "出餐 1 份",
    "roll1.confirmReset": "確認恢復所有剩餘至每日目標？",
    "roll1.clickToExpand": "點擊展開/收合成分",

    // Roll 2
    "roll2.title": "卷2 出餐紀錄",
    "roll2.totalRemaining": "總剩餘",
    "roll2.portions": "份",
    "roll2.complete": "完成 ✓",
    "roll2.reset": "重設",
    "roll2.resetTooltip": "恢復每日目標",
    "roll2.product": "產品",
    "roll2.dailyTarget": "每日目標",
    "roll2.remaining": "剩餘",
    "roll2.actions": "操作",
    "roll2.serve": "出",
    "roll2.serveAll": "全",
    "roll2.serveOne": "出餐 1 份",
    "roll2.confirmReset": "確認恢復所有剩餘至每日目標？",
    "roll2.clickToExpand": "點擊展開/收合成分",

    // Notes
    "notes.title": "壽司卷筆記",
    "notes.selectSushi": "選擇壽司卷",
    "notes.view": "查看",
    "notes.empty": "請從上方選單選擇一款壽司卷",
    "notes.notFound": "查無此品項。",
    "notes.styleUnknown": "卷型號未註明",

    // Checklist
    "checklist.title": "壽司部門幫廚",
    "checklist2.title": "壽司部門幫廚 - 流程2",
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
    "checklist.prep": "準備前",
    "checklist.during": "準備中",
    "checklist.post": "準備後",
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
    "footer.version.number": "4.0",

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
    "product.largeTempuraShrimp": "大炸蝦卷",
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
    "ing.pickledRadish": "醃竹筍",
    "ing.pickledBamboo": "醃竹筍",
    "ing.egg": "蛋",
    "ing.tunaSashimi": "吞拿魚刺身切碎（少量拉差醬拌）",
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
    "note.gardenDelight1": "第一條（1號反卷，邊緣補米飯）",
    "note.gardenDelight2": "第二條（1號反卷，邊緣補米飯）",
    "note.gardenDelight3": "第三條（1號反卷，邊緣補米飯）",
    "note.gardenDelight4": "第四條（3號正卷）",

    // Roll Instructions
    "instruction.roll1Type1": "第一條(1號反/邊補米)：黑白芝麻；黃蘿蔔 30g、紅椒絲 25g",
    "instruction.roll2Type1": "第二條(1號反/邊補米)：黑白芝麻；青瓜 20g、牛油果 25g",
    "instruction.roll3Type1": "第三條(1號反/邊補米)：黑白芝麻；青瓜 20g、紅椒絲 10g、胡蘿蔔絲 20g",
    "instruction.roll4Type3": "第四條(3號正)：生菜 2片、青瓜 30g、牛油果 20g、黃蘿蔔 30g、紅椒絲 20g、胡蘿蔔絲 15g",
    "instruction.note": "備註：千島壽司盤可加紅魚子",

    // Checklist Items
    "checklist.task.prep1": "一早拌三鍋醋飯（加入前一天剩餘的醋飯）",
    "checklist.task.prep2": "準備卷位：蟹肉碎、青瓜、牛油果、炸蝦",
    "checklist.task.prep3": "",
    "checklist.task.prep4": "",
    "checklist.task.during1": "開始做手捲：先切牛油果",
    "checklist.task.during2": "依「卷1」早上卷 74 份壽司",
    "checklist.task.during3": "確認素材：紅椒、黃蘿蔔、青瓜條、胡蘿蔔絲、青菜是否足夠",
    "checklist.task.during4": "蒸熱三文魚",
    "checklist.task.during5": "卷完後休息吃飯",
    "checklist.task.during6": "完成「卷2」未完成壽司",
    "checklist.task.during7": "第二輪：加州20，三文牛油，10，小三文10，大蝦4，脆龍2",
    "checklist.task.during8": "",
    "checklist.task.post1": "下午備壽司料：紅椒、黃蘿蔔、青瓜條(15條)、胡蘿蔔絲、青菜、",
    "checklist.task.post2": "確認：熟三文魚",
    "checklist.task.post3": "確認：海苔（大)、海苔（小）、芝麻、擦手紙 是否足夠",
    "checklist.task.post4": "補魚子與蟹肉碎",
    "checklist.task.post5": "打掃所有廚具",
    "checklist.task.post6": "拆壽司機零件與清洗",
    "checklist.task.post7": "",
    "checklist.task.post8": "",
    "checklist.task.post9": "",
    "checklist.task.post10": "",
    "checklist.task.post11": "",

    // Checklist 2 Items
    "checklist2.task.prep1": "一早拌三鍋醋飯（加入前一天剩餘的醋飯）",
    "checklist2.task.prep2": "煮兩鍋白飯 + 一鍋醋飯",
    "checklist2.task.prep3": "記錄兩張表：出餐表、醋飯酸鹼度（8:30／10:30/14:30）",
    "checklist2.task.prep4": "送三文魚 + 兩份烤雞至熱廚部加熱",
    "checklist2.task.during1": "開始做手捲：先切牛油果",
    "checklist2.task.during2": "依「卷2」早上卷 81 卷壽司",
    "checklist2.task.during3": "09:30–10:00 準備便當：6 三文魚／6 鰻魚／12 烤雞",
    "checklist2.task.during4": "便當貼公司標籤與價格，打包後用鐵籤戳洞",
    "checklist2.task.during5": "確認下午便當素材：3 條鰻魚、3 盒雞腿排、2 盒鰻魚片",
    "checklist2.task.during6": "續煮三鍋飯：2 白飯 + 1 壽司飯",
    "checklist2.task.during7": "煮完飯後休息吃飯",
    "checklist2.task.post1": "下午備壽司料",
    "checklist2.task.post2": "檢查庫存（含冷凍櫃），適當品項移至冷藏；庫存含：玉子燒／雞肉／鰻魚；冷藏含：薑片／雞汁／雞醬油",
    "checklist2.task.post3": "送 3 盒烤雞 + 1 盒三文魚給後廚（炸／加熱）",
    "checklist2.task.post4": "製作下午便當",
    "checklist2.task.post5": "（便當出完）啟動 2 小時回查；逾時貼折價標籤",
    "checklist2.task.post6": "準備明日：檢查鰻魚片／雞肉片；至少切 2 盒雞肉；冷藏保有 3 包雞塊、6 份鰻魚",
    "checklist2.task.post7": "確認：雞扒,鰻魚,米,玉米罐頭,燒雞汁是否足夠，若不足，向 Toby 申請",
    "checklist2.task.post8": "補醬料與玉米粒",
    "checklist2.task.post9": "打掃所有廚具",
    "checklist2.task.post10": "拍照上傳到群組",
    "checklist2.task.post11": "確認：鋁便當盒,冷便當餐盒,小菜盒,手套是否足夠，若不足，填寫登記表申請",
  },

  "zh-CN": {
    //Page title
    "page.title": "寿司助手 🍣 - 寿司部门帮厨",
    // Navigation
    "nav.checklist": "流程",
    "nav.checklist2": "流程2",
    "nav.roll2": "卷2",
    "nav.roll1": "卷1",
    "nav.notes": "笔记",

    // Roll 1
    "roll1.title": "卷1 出餐记录",
    "roll1.totalRemaining": "总剩余",
    "roll1.portions": "份",
    "roll1.complete": "完成 ✓",
    "roll1.reset": "重置",
    "roll1.resetTooltip": "恢复每日目标",
    "roll1.product": "产品",
    "roll1.target": "目标",
    "roll1.remaining": "剩余",
    "roll1.actions": "操作",
    "roll1.serve": "出",
    "roll1.serveAll": "全",
    "roll1.serveOne": "出餐 1 份",
    "roll1.confirmReset": "确认恢复所有剩余至每日目标？",
    "roll1.clickToExpand": "点击展开/收合成分",

    // Roll 2
    "roll2.title": "卷2 出餐记录",
    "roll2.totalRemaining": "总剩余",
    "roll2.portions": "份",
    "roll2.complete": "完成 ✓",
    "roll2.reset": "重置",
    "roll2.resetTooltip": "恢复每日目标",
    "roll2.product": "产品",
    "roll2.dailyTarget": "每日目标",
    "roll2.remaining": "剩余",
    "roll2.actions": "操作",
    "roll2.serve": "出",
    "roll2.serveAll": "全",
    "roll2.serveOne": "出餐 1 份",
    "roll2.confirmReset": "确认恢复所有剩余至每日目标？",
    "roll2.clickToExpand": "点击展开/收合成分",

    // Notes
    "notes.title": "寿司卷笔记",
    "notes.selectSushi": "选择寿司卷",
    "notes.view": "查看",
    "notes.empty": "请从上方选单选择一款寿司卷",
    "notes.notFound": "查无此品项。",
    "notes.styleUnknown": "卷型号未注明",

    // Checklist
    "checklist.title": "寿司部门帮厨",
    "checklist2.title": "寿司部门帮厨 - 流程2",
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
    "checklist.prep": "准备前",
    "checklist.during": "准备中",
    "checklist.post": "准备后",
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
    "footer.version.number": "4.0",

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
    "product.largeTempuraShrimp": "大炸虾卷",
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
    "ing.pickledRadish": "腌竹笋",
    "ing.pickledBamboo": "腌竹笋",
    "ing.egg": "蛋",
    "ing.tunaSashimi": "吞拿鱼刺身切碎（少量拉差酱拌）",
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
    "note.gardenDelight1": "第一条（1号反卷，边缘补米饭）",
    "note.gardenDelight2": "第二条（1号反卷，边缘补米饭）",
    "note.gardenDelight3": "第三条（1号反卷，边缘补米饭）",
    "note.gardenDelight4": "第四条（3号正卷）",

    // Roll Instructions (Simplified Chinese)
    "instruction.roll1Type1": "第一条(1号反/边补米)：黑白芝麻；黄萝卜 30g、红椒丝 25g",
    "instruction.roll2Type1": "第二条(1号反/边补米)：黑白芝麻；青瓜 20g、牛油果 25g",
    "instruction.roll3Type1": "第三条(1号反/边补米)：黑白芝麻；青瓜 20g、红椒丝 10g、胡萝卜丝 20g",
    "instruction.roll4Type3": "第四条(3号正)：生菜 2片、青瓜 30g、牛油果 20g、黄萝卜 30g、红椒丝 20g、胡萝卜丝 15g",
    "instruction.note": "备注：千岛寿司盘可加红鱼子",

    // Checklist Items (Simplified Chinese)
    "checklist.task.prep1": "早上拌三锅醋饭（加入前一天剩下的醋饭）",
    "checklist.task.prep2": "准备卷料：蟹肉碎、黄瓜、牛油果、炸虾",
    "checklist.task.prep3": "",
    "checklist.task.prep4": "",
    "checklist.task.during1": "开始制作手卷：先切牛油果",
    "checklist.task.during2": "按照「卷1」早上卷74份寿司",
    "checklist.task.during3": "确认食材：红椒、黄萝卜、黄瓜条、胡萝卜丝、青菜是否足够",
    "checklist.task.during4": "蒸热三文鱼",
    "checklist.task.during5": "卷完后休息吃饭",
    "checklist.task.during6": "完成「卷2」未完成的寿司",
    "checklist.task.during7": "第二轮：加州20，三文牛油10，小三文10，大虾4，脆龙2",
    "checklist.task.during8": "",
    "checklist.task.post1": "下午准备寿司材料：红椒、黄萝卜、黄瓜条(15条)、胡萝卜丝、青菜",
    "checklist.task.post2": "确认：熟三文鱼",
    "checklist.task.post3": "确认：海苔（大）、海苔（小）、芝麻、擦手纸是否足够",
    "checklist.task.post4": "补鱼子与蟹肉碎",
    "checklist.task.post5": "打扫所有厨具",
    "checklist.task.post6": "拆开寿司机零件并清洗",
    "checklist.task.post7": "",
    "checklist.task.post8": "",
    "checklist.task.post9": "",
    "checklist.task.post10": "",
    "checklist.task.post11": "",



    // Checklist 2 Items (Simplified Chinese)
    "checklist2.task.prep1": "一早拌三锅醋饭（加入前一天剩余的醋饭）",
    "checklist2.task.prep2": "煮两锅白饭 + 一锅醋饭",
    "checklist2.task.prep3": "记录两张表：出餐表、醋饭酸碱度（8:30／10:30/14:30）",
    "checklist2.task.prep4": "送三文鱼 + 两份烤鸡至热厨部加热",
    "checklist2.task.during1": "开始做手卷：先切牛油果",
    "checklist2.task.during2": "依「卷2」早上卷 81 卷寿司",
    "checklist2.task.during3": "09:30–10:00 准备便当：6 三文鱼／6 鳗鱼／12 烤鸡",
    "checklist2.task.during4": "便当贴公司标签与价格，打包后用铁签戳洞",
    "checklist2.task.during5": "确认下午便当素材：3 条鳗鱼、3 盒鸡腿排、2 盒鳗鱼片",
    "checklist2.task.during6": "续煮三锅饭：2 白饭 + 1 寿司饭",
    "checklist2.task.during7": "煮完饭后休息吃饭",
    "checklist2.task.post1": "下午备寿司料",
    "checklist2.task.post2": "检查库存（含冷冻柜），适当品项移至冷藏；库存含：玉子烧／鸡肉／鳗鱼；冷藏含：姜片／鸡汁／鸡酱油",
    "checklist2.task.post3": "送 3 盒烤鸡 + 1 盒三文鱼给后厨（炸／加热）",
    "checklist2.task.post4": "制作下午便当",
    "checklist2.task.post5": "（便当出完）启动 2 小时回查；逾时贴折价标签",
    "checklist2.task.post6": "准备明日：检查鳗鱼片／鸡肉片；至少切 2 盒鸡肉；冷藏保有 3 包鸡块、6 份鳗鱼",
    "checklist2.task.post7": "确认：鸡扒、鳗鱼、米、玉米罐头、烧鸡汁是否足够，若不足，向 Toby 申请",
    "checklist2.task.post8": "补酱料与玉米粒",
    "checklist2.task.post9": "打扫所有厨具",
    "checklist2.task.post10": "拍照上传到群组",
    "checklist2.task.post11": "确认：铝便当盒、冷便当餐盒、小菜盒、手套是否足够，若不足，填写登记表申请",

  },

  "en": {
    //Page title
    "page.title": "Sushi Assistant 🍣 - Kitchen Helper in Sushi Department",

    // Navigation
    "nav.checklist": "Workflow",
    "nav.checklist2": "Workflow 2",
    "nav.roll2": "Roll 2",
    "nav.roll1": "Roll 1",
    "nav.notes": "Notes",

    // Roll 1
    "roll1.title": "Roll 1 Service Log",
    "roll1.totalRemaining": "Total Remaining",
    "roll1.portions": "portions",
    "roll1.complete": "Complete ✓",
    "roll1.reset": "Reset",
    "roll1.resetTooltip": "Restore daily targets",
    "roll1.product": "Product",
    "roll1.target": "Target",
    "roll1.remaining": "Remaining",
    "roll1.actions": "Actions",
    "roll1.serve": "Serve",
    "roll1.serveAll": "All",
    "roll1.serveOne": "Serve 1 Portion",
    "roll1.confirmReset": "Confirm restoring all remaining to daily targets?",
    "roll1.clickToExpand": "Click to expand/collapse ingredients",

    // Roll 2
    "roll2.title": "Roll 2 Service Log",
    "roll2.totalRemaining": "Total Remaining",
    "roll2.portions": "portions",
    "roll2.complete": "Complete ✓",
    "roll2.reset": "Reset",
    "roll2.resetTooltip": "Restore daily targets",
    "roll2.product": "Product",
    "roll2.dailyTarget": "Daily Target",
    "roll2.remaining": "Remaining",
    "roll2.actions": "Actions",
    "roll2.serve": "Serve",
    "roll2.serveAll": "All",
    "roll2.serveOne": "Serve 1 Portion",
    "roll2.confirmReset": "Confirm restoring all remaining to daily targets?",
    "roll2.clickToExpand": "Click to expand/collapse ingredients",

    // Notes
    "notes.title": "Sushi Roll Notes",
    "notes.selectSushi": "Select Sushi Roll",
    "notes.view": "View",
    "notes.empty": "Please select a sushi roll from the menu above",
    "notes.notFound": "Item not found.",
    "notes.styleUnknown": "Roll type not specified",

    // Checklist
    "checklist.title": "Sushi Department Assistant",
    "checklist2.title": "Sushi Department Assistant - Workflow 2",
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
    "checklist.prep": "Pre-Prep",
    "checklist.during": "In Progress",
    "checklist.post": "Post-Prep",
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
    "footer.version.number": "4.0",

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
    "ing.pickledRadish": "Pickled Radish",
    "ing.pickledBamboo": "Pickled Bamboo",
    "ing.egg": "Egg",
    "ing.tunaSashimi": "Minced Tuna Sashimi (with Sriracha)",
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
    "note.gardenDelight1": "Roll 1 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight2": "Roll 2 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight3": "Roll 3 (Type 1 Inside-Out, rice edges)",
    "note.gardenDelight4": "Roll 4 (Type 3 Regular)",

    // Roll Instructions (English)
    "instruction.roll1Type1": "Roll 1 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Yellow Pickle 30g, Red Pepper 25g",
    "instruction.roll2Type1": "Roll 2 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Cucumber 20g, Avocado 25g",
    "instruction.roll3Type1": "Roll 3 (Type 1 Inside-Out/Edge Rice): Black & White Sesame; Cucumber 20g, Red Pepper 10g, Carrot 20g",
    "instruction.roll4Type3": "Roll 4 (Type 3 Regular): Lettuce 2 leaves, Cucumber 30g, Avocado 20g, Yellow Pickle 30g, Red Pepper 20g, Carrot 15g",
    "instruction.note": "Note: Thousand Island platter can add red tobiko",

    // Checklist Items (English)
    "checklist.task.prep1": "In the morning, mix three batches of sushi rice (add leftover rice from the previous day).",
    "checklist.task.prep2": "Prepare roll ingredients: shredded crab meat, cucumber, avocado, and fried shrimp.",
    "checklist.task.prep3": "",
    "checklist.task.prep4": "",
    "checklist.task.during1": "Start making hand rolls: cut the avocado first.",
    "checklist.task.during2": "Roll 74 sushi pieces for 'Roll 1' in the morning.",
    "checklist.task.during3": "Check ingredients: ensure enough red pepper, yellow radish, cucumber strips, shredded carrot, and greens.",
    "checklist.task.during4": "Steam the salmon to heat it up.",
    "checklist.task.during5": "Take a break and have lunch after finishing rolling.",
    "checklist.task.during6": "Finish the remaining sushi for 'Roll 2'.",
    "checklist.task.during7": "Second round: 20 California rolls, 10 salmon & avocado, 10 small salmon rolls, 4 shrimp rolls, 2 crispy dragon rolls.",
    "checklist.task.during8": "",
    "checklist.task.post1": "In the afternoon, prepare sushi ingredients: red pepper, yellow radish, 15 cucumber strips, shredded carrot, and greens.",
    "checklist.task.post2": "Check: cooked salmon.",
    "checklist.task.post3": "Check: large seaweed sheets, small seaweed sheets, sesame seeds, and paper towels are sufficient.",
    "checklist.task.post4": "Refill fish roe and shredded crab meat.",
    "checklist.task.post5": "Clean all kitchen utensils.",
    "checklist.task.post6": "Disassemble and wash sushi machine parts.",
    "checklist.task.post7": "",
    "checklist.task.post8": "",
    "checklist.task.post9": "",
    "checklist.task.post10": "",
    "checklist.task.post11": "",


    // Checklist 2 Items (English)
    "checklist2.task.prep1": "Mix three pots of sushi rice early (add previous day's leftover rice)",
    "checklist2.task.prep2": "Cook two pots of white rice + one pot of sushi rice",
    "checklist2.task.prep3": "Record on two sheets: Service log, Rice pH (8:30／10:30/14:30)",
    "checklist2.task.prep4": "Send salmon + two servings of grilled chicken to hot kitchen for heating",
    "checklist2.task.during1": "Start making hand rolls: cut avocado first",
    "checklist2.task.during2": "Follow 'Roll 2' - make 81 sushi rolls in the morning",
    "checklist2.task.during3": "09:30–10:00 Prepare bento: 6 salmon / 6 eel / 12 grilled chicken",
    "checklist2.task.during4": "Label bento with company sticker and price, poke holes with skewer after packing",
    "checklist2.task.during5": "Confirm afternoon bento ingredients: 3 eels, 3 boxes chicken thighs, 2 boxes eel fillets",
    "checklist2.task.during6": "Continue cooking three pots: 2 white rice + 1 sushi rice",
    "checklist2.task.during7": "Rest and eat after cooking rice",
    "checklist2.task.post1": "Prepare sushi ingredients in afternoon",
    "checklist2.task.post2": "Check inventory (incl. freezer), move items to fridge as appropriate; Inventory: Tamago/Chicken/Eel; Fridge: Ginger/Chicken sauce/Chicken soy sauce",
    "checklist2.task.post3": "Send 3 boxes grilled chicken + 1 box salmon to back kitchen (fry/heat)",
    "checklist2.task.post4": "Make afternoon bento",
    "checklist2.task.post5": "(After bento finished) Start 2-hour check; apply discount label if overdue",
    "checklist2.task.post6": "Prepare for tomorrow: Check eel/chicken fillets; cut at least 2 boxes chicken; keep 3 packs chicken, 6 portions eel in fridge",
    "checklist2.task.post7": "Check: Ensure chicken fillets, eel, rice, canned corn, and roasted chicken sauce are sufficient. If not, request from Toby.",
    "checklist2.task.post8": "Refill sauces and corn",
    "checklist2.task.post9": "Clean all kitchen utensils",
    "checklist2.task.post10": "Take photos and upload to group",
    "checklist2.task.post11": "Check: Ensure aluminum bento boxes, cold meal containers, side dish boxes, and gloves are sufficient. If not, fill out the request form.",
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
