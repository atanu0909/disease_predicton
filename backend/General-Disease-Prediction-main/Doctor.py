import data as dt
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score
from joblib import dump





label_encoder = LabelEncoder()
numericOp = label_encoder.fit_transform(dt.op.values.ravel())



X,x,Y,y = train_test_split(dt.ip,numericOp,test_size=0.2,random_state=35)
DataSet = (X,x,Y,y)

doctor = XGBClassifier()
doctor.fit(X,Y)

numericReport = doctor.predict(x)
print(accuracy_score(y.ravel(),numericReport)*100,"%")

#packing model,encoder and the dataset
dump(doctor,'Doctor.joblib')
dump(DataSet,'DataSet.joblib')
dump(label_encoder,'Encoder.joblib')

