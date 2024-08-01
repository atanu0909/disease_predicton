from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
import numpy as np

app = Flask(__name__)

# Load the models and encoders
doctor = load('backend/General-Disease-Prediction-main/Doctor.joblib')
label_encoder = load('backend/General-Disease-Prediction-main/Encoder.joblib')
X, x, Y, y = load('backend/General-Disease-Prediction-main/DataSet.joblib')

def check(*position_1):
    mask = list(np.zeros(len(X.columns)))
    for pos in position_1:
        if pos in X.columns:
            mask[X.columns.get_loc(pos)] = 1
    inp = pd.DataFrame([mask], dtype=int, columns=X.columns)
    return inp

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Welcome to the Disease Predictor API!'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract user input from request body
        data = request.json
        positions = data.get('positions', [])

        # Generate input mask based on positions
        inp_mask = check(*positions)
        
        # Make prediction
        report = doctor.predict(inp_mask)
        result = label_encoder.inverse_transform(report)
        
        # Return the result as JSON
        return jsonify({'prediction': result.tolist()})
    
    except Exception as e:
        # Handle exceptions and return error message
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
