import numpy as np
import pandas as pd

dtype = {'prognosis': str}
ds = pd.read_csv(r'C:\Users\AYAN JANA\Documents\MyCodingDirectory\Python Folder\Training.csv', dtype=dtype)
X=ds.iloc[:,:132]
ds = pd.read_csv(r'C:\Users\AYAN JANA\Documents\MyCodingDirectory\Python Folder\Training.csv', usecols=[132], dtype=dtype)
Y=ds
ds = pd.read_csv(r'C:\Users\AYAN JANA\Documents\MyCodingDirectory\Python Folder\Testing.csv', dtype=dtype)
x=ds.iloc[:,:132]
ds = pd.read_csv(r'C:\Users\AYAN JANA\Documents\MyCodingDirectory\Python Folder\Testing.csv', usecols=[132], dtype=dtype)
y=ds
ip = pd.concat((X,x),axis=0)
op = pd.concat((Y,y),axis=0)


if __name__ == "__main__" :
    def symptom_check(disease):
        symptoms = set()
        for i in range(4921):
            # try:
                Y_arr = []
                for row in range(4921):
                    Y_arr.append(Y.iloc[row])
                if Y_arr[i] == disease:
                    for column in X.iloc[i].columns_with_1 :
                        print(column)
            # except:
            #     print(len(Y_arr))
    symptom_check("Impetigo")
    
    
    # for clm in X.columns:
    #     print (clm)
    # arr = pd.concat((X,Y),axis=1)
    # # print(arr['prognosis'].unique())
    # ls=arr['prognosis'].unique()
    # print(ls)
    # clm = list(arr.columns)
    # dc={}
    # for i in range(132):
    #     dc[clm[i]]=i
    # I=0
    # for i in ls:
    #     r=arr[arr['prognosis']==i]
    #     columns_with_1 = r.columns[r.eq(1).any()]
    #     sc = r[columns_with_1]
    #     jump = -1
    #     for j in sc.columns:
    #         if dc[j] < I:
    #             if jump == -1:
    #                 jump = dc[j]
    #         if dc[j] > I:
    #             temp = ip[j]
    #             ip.drop(columns=[j], inplace=True)
    #             if jump != -1:
    #                 ip.insert(jump, j, temp)
    #             else:
    #                 ip.insert(I, j, temp)
    #             I+=1


    # for i in ip.columns:
    #     print(i)
    # for i in ls:
    #     r=arr[arr['prognosis']==i]
    #     columns_with_1 = r.columns[r.eq(1).any()]
    #     sc = r[columns_with_1]
    #     ic=0
    #     jc=0
    #     for j in sc.columns:
    #         if dc[j]<I:
    #             jc+=1
    #         else:
    #             ic+=1
    #     if ic > jc:
    #         jump = -1
    #     else:
    #         jump = -2
    #     for j in sc.columns:
    #         if dc[j] < I:
    #             if jump == -2:
    #                 jump = dc[j]
    #         if dc[j] > I:
    #             temp = ip[j]
    #             ip.drop(columns=[j], inplace=True)
    #             if jump != -1:
    #                 ip.insert(jump, j, temp)
    #             else:
    #                 ip.insert(I, j, temp)
    #             I+=1