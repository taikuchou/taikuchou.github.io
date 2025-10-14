
import json
import pandas as pd


sourceFile = "Materia Medica_20240416.xlsx"

# fufan

# var dafanList =
# var dafanGroup =
# var groups =


def exportToJSONFile(ret, jsonFileName):
    with open(jsonFileName, 'w') as file3:
        json.dump(ret, file3)


def parseFuFan(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 1)
    all = len(dataframe1)
    fkeys = ["name", "desc", "url"]
    fufanList = []
    fufanDict = {}
    for i in range(len(dataframe1)):
        if not pd.isna(dataframe1.iloc[i][0]):
            funfan = {}
            fufanDict[dataframe1.iloc[i][0]] = dataframe1.iloc[i][2]
            for j in range(len(fkeys)):
                data = ""
                if not pd.isna(dataframe1.iloc[i][j]):
                    data = str(dataframe1.iloc[i][j]).replace("\n", "|")
                funfan[fkeys[j].lower()] = data
            fufanList.append(funfan)
            # print(funfan)
    jsonFileName = "tcmfufandict_lower.json"
    exportToJSONFile(fufanDict, jsonFileName)
    print("Fufan done!")


def parseDaFan(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)
    dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
             "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
    dafanList = []
    groups = {}
    for i in range(len(dataframe1)):
        if not pd.isna(dataframe1.iloc[i][0]):
            danfan = {}
            groups[dataframe1.iloc[i][4]] = dataframe1.iloc[i][4]
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
    jsonFileName = "tcmdafan.json"
    exportToJSONFile(dafanList, jsonFileName)
    jsonFileName = "groups.json"
    keys = []
    for key in groups.keys():
        keys.append(key)
    # print(keys)
    exportToJSONFile(keys, jsonFileName)
    print("Dafan done!")


def parseDaFanGroup(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)
    dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
             "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
    dafanList = []
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
            g1 = danfan[dkeys[4].upper()]
            g2 = danfan[dkeys[5].upper()]
            g3 = danfan[dkeys[6].upper()]
            group = {}
            if g1 not in groups.keys():
                groups[g1] = group
            else:
                group = groups[g1]
            subgroup1 = {}
            if g2 not in group.keys():
                group[g2] = subgroup1
            else:
                subgroup1 = group[g2]
            subgroup2 = []
            if g3 not in subgroup1.keys():
                subgroup1[g3] = subgroup2
            else:
                subgroup2 = subgroup1[g3]
            subgroup2.append(danfan)
            # dafanList.append(danfan)
            # print(danfan)
    jsonFileName = "tcmdafan_group.json"
    exportToJSONFile(groups, jsonFileName)
    print("Dafan Group done!")


def parseDaFanGroup4(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)
    dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
             "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
    dafanList = []
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
            g0 = danfan[dkeys[3].upper()]
            g1 = danfan[dkeys[4].upper()]
            g2 = danfan[dkeys[5].upper()]
            g3 = danfan[dkeys[6].upper()]
            main = {}
            if g0 not in main.keys():
                groups[g0] = main
            else:
                main = groups[g0]
            group = {}
            if g1 not in main.keys():
                main[g1] = group
            else:
                group = main[g1]
            subgroup1 = {}
            if g2 not in group.keys():
                group[g2] = subgroup1
            else:
                subgroup1 = group[g2]
            subgroup2 = []
            if g3 not in subgroup1.keys():
                subgroup1[g3] = subgroup2
            else:
                subgroup2 = subgroup1[g3]
            subgroup2.append(danfan)
            # dafanList.append(danfan)
            # print(danfan)
    jsonFileName = "tcmdafan_group4.json"
    exportToJSONFile(groups, jsonFileName)
    print("Dafan Group done!")


def parseDaFanGroup3(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 0)
    all = len(dataframe1)
    dkeys = ["URL", "SUBJECT", "EFFECT", "MainCategory", "GROUP", "SUBGROUP_1",
             "SUBGROUP_2", "PINYIN_NAME", "NAME", "LATIN_NAME", "Properties", "Channels", "Actions_Indications", "Dosage", "Common_Name", "Literal_English", "Contraindications_Cautions", "Common_Combinations", "Others", "FuFan"]
    dafanList = []
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
            g1 = danfan[dkeys[4].upper()]
            g2 = danfan[dkeys[5].upper()]
            g3 = danfan[dkeys[6].upper()]
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
            # subgroup2 = []
            # if g3 not in subgroup1.keys():
            #     subgroup1[g3] = subgroup2
            # else:
            #     subgroup2 = subgroup1[g3]
            subgroup1.append(danfan)
            # dafanList.append(danfan)
            # print(danfan)
    jsonFileName = "tcmdafan_group3.json"
    exportToJSONFile(groups, jsonFileName)
    print("Dafan Group 3 done!")


parseDaFan(sourceFile)
parseDaFanGroup3(sourceFile)
# parseDaFanGroup4(sourceFile)
# parseFuFan(sourceFile)
