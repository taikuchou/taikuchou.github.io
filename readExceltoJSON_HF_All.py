
import gdown
import urllib.request
import json
import pandas as pd
from datetime import datetime

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


def parseHFAll(sourceFile):
    # dataframe1 = pd.read_excel(sourceFile, 0)
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTatnO255in3hXmXE5G58doUM3_mq5GX2KoJtbXvKIbQHL_9tDpIUx_EFySf8ItByCnWbPgJkuLBHqn/pub?output=xlsx"

    dataframe1 = pd.read_excel(url)
    all = len(dataframe1)

    dafanList = []
    groups = {}
    groupsCategory = {}
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
                # print(dkeys[j].upper(), "=>", data
            g1 = danfan[dkeys[2].upper()]
            g2 = danfan[dkeys[3].upper()]
            g3 = danfan[dkeys[4].upper()]
            group = {}
            if g1 not in groupsCategory.keys():
                groupsCategory[g1] = group
            else:
                group = groupsCategory[g1]
            subgroup1 = []
            if g2 != g3:
                g2 = g2 + "," + g3
            if g2 not in group.keys():
                group[g2] = subgroup1
            else:
                subgroup1 = group[g2]
            subgroup1.append(danfan)
            dafanList.append(danfan)
            # print(danfan)
    jsonFileName = "tcmhfall.js"
    keys = []
    for key in groups.keys():
        keys.append(key)
    now = datetime.now()  # current date and time
    date_time = now.strftime("%Y.%m.%d.%H.%M")
    version_str = f'ver {date_time}'
    result = {"dafanGroup": groupsCategory,
              "groups": keys, "dafanList": dafanList,
              "version": version_str}
    # print(keys)
    exportToJSFileWithPrefix(result, jsonFileName, "var alldata = ")
    print("parseHFAll done!")


# url = "https://docs.google.com/spreadsheets/d/1hOSxKcgLkcXH3NYnRuldjYBVs41I6DK1YMOeU2mPq5A/edit?usp=sharing"
# gdown.download(url, sourceFile, quiet=False)
parseHFAll(sourceFile)
