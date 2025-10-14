
import json
import pandas as pd


sourceFile = "Materia Medica_20240416.xlsx"

# fufan

# var comparisonlist =


def exportToJSONFile(ret, jsonFileName):
    with open(jsonFileName, 'w') as file3:
        json.dump(ret, file3)


def parseComparisonList(sourceFile):
    dataframe1 = pd.read_excel(sourceFile, 2)
    all = len(dataframe1)
    compareList = []
    section = {}
    list = []
    count = 0
    current = None
    for i in range(len(dataframe1)):
        if not pd.isna(dataframe1.iloc[i][1]):
            name = dataframe1.iloc[i][1].strip()
            # print(i, dataframe1.iloc[i][0])
            # compare section
            if not pd.isna(dataframe1.iloc[i][2]):
                section["commons"] = dataframe1.iloc[i][2]
            list.append(name)
            section[name] = dataframe1.iloc[i][3]
        else:
            if len(list) != 0:
                section["elements"] = list
                # print(list)
                compareList.append(section)
                section = {}
                list = []
    # print(compareList)
    jsonFileName = "tcmdafan_comparison.json"
    exportToJSONFile(compareList, jsonFileName)
    print("Comparision List done!")


parseComparisonList(sourceFile)
