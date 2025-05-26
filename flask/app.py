
from flask import Flask, jsonify, request
import model
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import calendar

app = Flask(__name__)

# API key for the Visual Crossing API
API_KEY = '8FVU8WF6CYS3DZL8F4ZTNHXQ4'  # Replace with your actual API key

# Load your model and scalers here (ensure the model is already trained)
model_lstm, scaler, scaler_y, _, _ = model.train_lstm_model(
    model.fetch_weather_data('hyderabad', API_KEY)
)

@app.route('/current', methods=['GET'])
def current_weather():
    location = request.args.get('location', 'hyderabad')  # Default to 'hyderabad'
    try:
        # Fetch weather data and process it
        weather_data = model.fetch_weather_data(location, API_KEY)
        current_data = model.get_current_day_data(weather_data)
        if current_data is not None:
            # Convert any datetime index to string
            current_data.index = current_data.index.astype(str)
            return jsonify(current_data.to_dict()), 200
        else:
            return jsonify({"error": "No data available for the current day."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/forecast', methods=['GET'])
def forecast_weather():
    location = request.args.get('location', 'hyderabad')  # Default to 'hyderabad'
    time_steps = int(request.args.get('days', 7))  # Default to forecasting for 7 days
    try:
        # Fetch weather data and process it
        weather_data = model.fetch_weather_data(location, API_KEY)
        last_data = weather_data.tail(1)  # Take the most recent data as the last known sequence

        # Preprocess and scale the data for LSTM input
        numeric_cols = ['tempmax', 'tempmin', 'meantemp', 'feelslike', 'humidity', 'precipprob', 'wind_speed', 'meanpressure', 'uvindex']
        last_sequence_scaled = scaler.transform(last_data[numeric_cols])
        last_sequence_scaled = last_sequence_scaled.reshape((1, 1, last_sequence_scaled.shape[1]))  # Reshape for LSTM input

        # Forecast the weather for the given time steps
        forecast_df = model.forecast_weather(model_lstm, last_sequence_scaled, scaler, scaler_y, time_steps)

        # Convert forecasted DataFrame to JSON-serializable format
        forecast_data = forecast_df.reset_index().to_dict(orient='records')  # Reset index for days to make it serializable

        # Ensure all numerical values are converted to Python native types
        for record in forecast_data:
            for key, value in record.items():
                if isinstance(value, (np.float32, np.float64)):
                    record[key] = float(value)
                elif isinstance(value, (np.int32, np.int64)):
                    record[key] = int(value)

        return jsonify(forecast_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
