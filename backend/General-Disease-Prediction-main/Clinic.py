

from joblib import load
import numpy as np
import pandas as pd
from xgboost import plot_tree
import matplotlib.pyplot as plt
import warnings

# Suppress specific warnings
warnings.filterwarnings("ignore", category=UserWarning, module='xgboost')
warnings.filterwarnings("ignore", category=DeprecationWarning, module='pandas')
warnings.filterwarnings("ignore", category=RuntimeWarning)

# Load models and data
doctor = load('General-Disease-Prediction-main/Doctor.joblib')
label_encoder = load('General-Disease-Prediction-main/Encoder.joblib')
X, x, Y, y = load('General-Disease-Prediction-main/DataSet.joblib')

# doctor = load('Doctor.joblib')
# label_encoder = load('Encoder.joblib')
# X, x, Y, y = load('DataSet.joblib')


def check(*position_1):
    mask = list(np.zeros(len(X.columns)))
    for pos in position_1:
        if pos in X.columns:
            mask[X.columns.get_loc(pos)] = 1
        else:
            print(f"Warning: Column '{pos}' not found in the dataset.")
    inp = pd.DataFrame([mask], dtype=int, columns=X.columns)
    return inp

# Prepare input mask
inp_mask = check(
    "fatigue", "weight_loss", "lethargy", "high_fever", "sweating", 
    "diarrhoea", "receiving_blood_transfusion", "receiving_unsterile_injections", "muscle_pain"
)

# Predict and print result
report = doctor.predict(inp_mask)
print(label_encoder.inverse_transform(report))

# # Visualize the tree (optional)
# try:
#     plot_tree(doctor, num_trees=0)
#     plt.title('Tree Visualization')
#     plt.show()
# except Exception as e:
#     print(f"Error while plotting the tree: {e}")
