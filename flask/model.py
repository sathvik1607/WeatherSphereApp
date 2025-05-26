import pandas as pd
import requests
from io import StringIO
from datetime import datetime, timedelta
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dropout, Dense
from tensorflow.keras.callbacks import EarlyStopping

def fetch_weather_data(location, API_KEY):
    # Calculate the date range (last 45 days)
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=45)).strftime('%Y-%m-%d')

    url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{start_date}/{end_date}?unitGroup=metric&include=days&key={API_KEY}&contentType=csv'
    response = requests.get(url)

    if response.status_code == 200:
        csv_data = StringIO(response.text)
        weather_df = pd.read_csv(csv_data)

        # Select and clean the necessary columns
        selected_columns = weather_df[['datetime', 'tempmax', 'tempmin', 'temp', 'feelslike', 'humidity', 'precipprob', 'windspeed', 'winddir', 'sealevelpressure', 'uvindex', 'sunrise', 'sunset']].copy()
        selected_columns.columns = ['date', 'tempmax', 'tempmin', 'meantemp', 'feelslike', 'humidity', 'precipprob', 'wind_speed', 'wind_dir', 'meanpressure', 'uvindex', 'sunrise', 'sunset']
        selected_columns['date'] = pd.to_datetime(selected_columns['date'])
        selected_columns.set_index('date', inplace=True)

        # Ensure numeric columns are converted properly
        numeric_cols = ['tempmax', 'tempmin', 'meantemp', 'feelslike', 'humidity', 'precipprob', 'wind_speed', 'meanpressure', 'uvindex']
        selected_columns[numeric_cols] = selected_columns[numeric_cols].apply(pd.to_numeric, errors='coerce')

        return selected_columns
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}, Response: {response.text}")

def create_dataset(X, y, time_steps=1):
    Xs, ys = [], []
    for i in range(len(X) - time_steps):
        Xs.append(X[i:(i + time_steps)])
        ys.append(y[i + time_steps])
    return np.array(Xs), np.array(ys)

def train_lstm_model(weather_df, time_steps=4):
    # Preprocess and scale data
    numeric_cols = ['tempmax', 'tempmin', 'meantemp', 'feelslike', 'humidity', 'precipprob', 'wind_speed', 'meanpressure', 'uvindex']
    train_size = int(len(weather_df) * 0.9)
    train, test = weather_df.iloc[:train_size], weather_df.iloc[train_size:]

    scaler = MinMaxScaler()
    train_scaled = scaler.fit_transform(train[numeric_cols])
    test_scaled = scaler.transform(test[numeric_cols])

    scaler_y = MinMaxScaler()
    y_train_scaled = scaler_y.fit_transform(train[['meantemp']])
    y_test_scaled = scaler_y.transform(test[['meantemp']])

    X_train, y_train = create_dataset(train_scaled, y_train_scaled, time_steps)
    X_test, y_test = create_dataset(test_scaled, y_test_scaled, time_steps)

    # Define and train the LSTM model
    model = Sequential()
    model.add(LSTM(units=128, return_sequences=True, input_shape=(time_steps, X_train.shape[2])))
    model.add(Dropout(0.2))
    model.add(LSTM(units=64, return_sequences=False))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(1))  # Output: mean temperature

    model.compile(optimizer='adam', loss='mse')
    early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=20, batch_size=32, callbacks=[early_stop])

    return model, scaler, scaler_y, X_train, train_scaled

# def forecast_weather(model, last_sequence, scaler, scaler_y, time_steps=7):
#     future_predictions_scaled = []
#     for i in range(time_steps):
#         prediction = model.predict(last_sequence)
#         future_predictions_scaled.append(prediction)

#         prediction_full = np.zeros((1, 1, len(last_sequence[0][0])))  # Assuming all columns used
#         prediction_full[0, 0, :] = prediction[0, :]
#         last_sequence = np.append(last_sequence[:, 1:, :], prediction_full, axis=1)

#     future_predictions_scaled = np.array(future_predictions_scaled).reshape(-1, 1)
#     future_predictions = scaler_y.inverse_transform(future_predictions_scaled)

#     forecast_df = pd.DataFrame(future_predictions, columns=['meantemp'])

#     # Fix for the time index: use the last date in the sequence and generate the next dates
#     last_date = pd.to_datetime(last_sequence[-1, 0, 0]).date()  # Extract the last known date from the sequence
#     forecast_df.index = pd.date_range(start=last_date + timedelta(days=1), periods=time_steps, freq='D')  # Start from the next day

#     return forecast_df
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def forecast_weather(model, last_sequence, scaler, scaler_y, time_steps=7):
    """
    Generate weather forecast for the next `time_steps` days starting from today's date.

    Args:
        model: Trained LSTM model.
        last_sequence: Scaled input sequence of shape (1, time_steps, num_features).
        scaler: Scaler object for input features.
        scaler_y: Scaler object for the output feature.
        time_steps: Number of days to forecast.

    Returns:
        forecast_df: DataFrame containing forecasted mean temperature and corresponding dates.
    """
    future_predictions_scaled = []

    for _ in range(time_steps):
        # Predict the next value
        prediction = model.predict(last_sequence, verbose=0)
        future_predictions_scaled.append(prediction)

        # Prepare the input for the next step
        prediction_full = np.zeros((1, 1, last_sequence.shape[2]))  # Match feature dimensions
        prediction_full[0, 0, :] = prediction[0, :]
        last_sequence = np.append(last_sequence[:, 1:, :], prediction_full, axis=1)

    # Convert scaled predictions back to original values
    future_predictions_scaled = np.array(future_predictions_scaled).reshape(-1, 1)
    future_predictions = scaler_y.inverse_transform(future_predictions_scaled)

    # Prepare the forecast DataFrame with dates starting from today
    forecast_df = pd.DataFrame(future_predictions, columns=['meantemp'])
    forecast_df.index = pd.date_range(start=datetime.now().date(), periods=time_steps, freq='D')
    forecast_df.index.name = "date"

    return forecast_df


def get_current_day_data(weather_df):
    current_date = datetime.now().date()
    current_day_data = weather_df[weather_df.index.date == current_date]
    return current_day_data[['tempmax', 'tempmin', 'meantemp', 'feelslike', 'humidity', 'precipprob', 'wind_speed', 'wind_dir', 'meanpressure', 'uvindex', 'sunrise', 'sunset']] if not current_day_data.empty else None
