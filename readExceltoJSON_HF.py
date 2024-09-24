
import json
import pandas as pd


sourceFile = "Herbal Formula.xlsx"

# fufan

# var dafanList =
# var dafanGroup =
# var groups =

dkeys_old = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
             "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions"]  # , "Common_Combinations", "Others", "FuFan"]
dkeys = ["URL", "MainCategory", "GROUP", "SUBGROUP_1", "SUBGROUP_2", "Channels", "Literal_English", "EFFECT", "Actions_Indications",
         "LATIN_NAME", "PINYIN_NAME", "NAME", "Common_Name", "Dosage", "SUBJECT", "Properties", "Contraindications_Cautions"]


def exportToJSONFile(ret, jsonFileName):
    with open(jsonFileName, 'w') as file3:
        json.dump(ret, file3)


def exportToJSFileWithPrefix(ret, jsonFileName, prefix):
    with open(jsonFileName, 'w') as file3:
        file3.write(prefix)
        json.dump(ret, file3)


def parseHF(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)

    dafanList = []
    groups = {}
    for i in range(len(dataframe1)):
        if not pd.isna(dataframe1.iloc[i][0]):
            danfan = {}
            groups[dataframe1.iloc[i][2]] = dataframe1.iloc[i][2]
            for j in range(len(dkeys)):
                data = ""
                if not pd.isna(dataframe1.iloc[i][j]):
                    data = str(dataframe1.iloc[i][j]).replace(
                        "\n", "|").replace("，", "， ")
                danfan[dkeys[j].upper()] = data
                # danfan[dkeys[j].lower()] = data
                # print(dkeys[j].upper(), "=>", data)
            dafanList.append(danfan)
            # print(danfan)
    jsonFileName = "tcmhf.js"
    exportToJSFileWithPrefix(dafanList, jsonFileName, "var dafanList = ")
    jsonFileName = "hfgroups.js"
    keys = []
    for key in groups.keys():
        keys.append(key)
    # print(keys)
    exportToJSFileWithPrefix(keys, jsonFileName, "var groups = ")
    print("parseHF done!")


def parseHFGroup(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)
    groups = {}
    for i in range(len(dataframe1)):
        if not pd.isna(dataframe1.iloc[i][0]):
            danfan = {}
            # groups[dataframe1.iloc[i][3]] = dataframe1.iloc[i][3]
            for j in range(len(dkeys)):
                data = ""
                if not pd.isna(dataframe1.iloc[i][j]):
                    data = str(dataframe1.iloc[i][j]).replace(
                        "\n", "|").replace("，", "， ")
                danfan[dkeys[j].upper()] = data
            g1 = danfan[dkeys[2].upper()]
            g2 = danfan[dkeys[3].upper()]
            g3 = danfan[dkeys[4].upper()]
            group = {}
            if g1 not in groups.keys():
                groups[g1] = group
            else:
                group = groups[g1]
            subgroup1 = []
            if g2 != g3:
                g2 = g2 + "," + g3
            if g2 not in group.keys():
                group[g2] = subgroup1
            else:
                subgroup1 = group[g2]
            subgroup1.append(danfan)
    jsonFileName = "tcmhf_groups.js"
    exportToJSFileWithPrefix(groups, jsonFileName, "var dafanGroup = ")
    print("Herbal Formula Groups done!")


parseHF(sourceFile)
parseHFGroup(sourceFile)
