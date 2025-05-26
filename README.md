---

# 🌦️ WeatherSphere – Weather Forecast & Alerts App

**GitHub Repo:** [https://github.com/sathvik1607/WeatherSphereApp.git](https://github.com/sathvik1607/WeatherSphereApp.git)

WeatherSphere is a cross-platform mobile application powered by React Native and Flask. It provides real-time weather updates, forecasts, and personalized alerts using the **OpenWeatherMap API**. The backend is built with Flask to support machine learning integration and alert management.

---

## 📁 Project Structure

```
WeatherSphereApp/
├── WeatherSphere/             # React Native frontend
│   ├── App.js
│   ├── package.json
│   ├── app.json
│   ├── babel.config.js
│   └── src/
│       └── components/
│           ├── AirQuality.js
│           ├── CitySelector.js
│           ├── CurrentTemperature.js
│           ├── DailyForecast.js
│           ├── Feelslike.js
│           ├── HourlyForecast.js
│           ├── Humidity.js
│           ├── Precipitation.js
│           ├── Pressure.js
│           ├── Sunrise.js
│           ├── Sunset.js
│           ├── WeatherNotification.js
│           └── WindSpeed.js
│
├── FlaskServer/               # Flask backend
│   ├── app.py
│   ├── model.py
│   ├── requirements.txt
│   ├── instruction.txt
│   └── tempCodeRunnerFile.py
│
└── README.md

```

---

## 🚀 Features

### ✅ Frontend (React Native)

* 🔍 City Search & Selection
* 🌡️ Real-time weather conditions
* 🕒 Hourly and 📅 Daily forecasts
* 💧 Humidity, Wind, Pressure, Feels Like, AQI, Sunrise/Sunset
* ⚠️ Alerts and Animated Notifications

### ✅ Backend (Flask)

* 📡 Weather Data Fetching
* 🧠 (Planned) LSTM-based Forecasting
* 📬 Alert Triggering via Custom Rules

---

## 🔧 Getting Started

### 🔹 React Native Frontend

```bash
cd WeatherSphereApp/WeatherSphere
npm install
npx expo start
```

### 🔹 Flask Backend

```bash
cd WeatherSphereApp/FlaskServer
pip install -r requirements.txt
python app.py
```

---

## 🔑 API Usage

Make sure to replace the placeholder API key in your frontend config:

```js
const API_KEY = "your_visual_crossing_api_key";

```

---

## 🔮 Future Enhancements

* 📍 GPS-based weather updates
* 🔔 Push/email notifications
* 📊 Weather trends using ML (LSTM)
* 🌘 Dark mode

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Made with ❤️ by [Sathvik](https://github.com/sathvik1607)**

Let me know if you'd like help adding screenshots, CI badges, or deployment instructions.
