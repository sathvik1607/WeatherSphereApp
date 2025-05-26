Here is your **fully updated `README.md`** with a well-organized folder structure, corrected **Visual Crossing API** reference (no OpenWeatherMap mention), added **screenshots**, and matching project structure to your React Native + Flask repo setup.

---

```markdown
# 🌦️ WeatherSphere – Weather Forecast & Alerts App

**GitHub Repo:** [https://github.com/sathvik1607/WeatherSphereApp.git](https://github.com/sathvik1607/WeatherSphereApp.git)

WeatherSphere is a cross-platform mobile application built using **React Native** (frontend) and **Flask** (backend). It delivers real-time weather updates, hourly and daily forecasts, and location-based weather alerts using the **Visual Crossing API**. The backend also supports integration of machine learning models for advanced prediction.

---

## 📁 Project Structure

```

WeatherSphereApp/
├── assets/
│   └── screenshots/
│       ├── home.png
│       └── result.png
├── flask/                      # Flask backend
│   ├── app.py
│   ├── model.py
│   ├── requirements.txt
│   ├── instruction.txt
│   └── tempCodeRunnerFile.py
├── src/                        # React Native components
│   └── components/
│       ├── AirQuality.js
│       ├── CitySelector.js
│       ├── CurrentTemperature.js
│       ├── DailyForecast.js
│       ├── Feelslike.js
│       ├── HourlyForecast.js
│       ├── Humidity.js
│       ├── Precipitation.js
│       ├── Pressure.js
│       ├── Sunrise.js
│       ├── Sunset.js
│       ├── WeatherNotification.js
│       └── WindSpeed.js
├── App.js
├── app.json
├── babel.config.js
├── eas.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

````

---

## 🚀 Features

### ✅ React Native Frontend

- 🔍 City Search & Selection
- 🌡️ Real-Time Temperature & Conditions
- 🕒 Hourly & 📅 Daily Forecasts
- 💧 Humidity, Wind, Feels Like, AQI, Pressure
- 🌅 Sunrise/Sunset Information
- ⚠️ In-App Weather Alerts & Animated Notifications

### ✅ Flask Backend

- 📡 Weather Data Fetching via Visual Crossing
- 🧠 Planned LSTM-based Forecasting Integration
- 📬 Personalized Alerts via Rules (e.g., temperature thresholds)

---

## 🔧 Getting Started

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/sathvik1607/WeatherSphereApp.git
cd WeatherSphereApp
````

### 🔹 2. Run the React Native Frontend

```bash
npm install
npx expo start
```

### 🔹 3. Run the Flask Backend

```bash
cd flask
pip install -r requirements.txt
python app.py
```

---

## 🔑 API Key – Visual Crossing

Replace the placeholder API key in your frontend configuration:

```js
const API_KEY = "your_visual_crossing_api_key";
```

> You can obtain a free API key from [Visual Crossing](https://www.visualcrossing.com/).

---

## 🖼️ Screenshots

| Home Screen                          | Forecast Result                          |
| ------------------------------------ | ---------------------------------------- |
| ![Home](assets/screenshots/home.png) | ![Result](assets/screenshots/result.png) |

---

## 🔮 Future Enhancements

* 📍 GPS-Based Weather Updates
* 🔔 Push or Email Notifications
* 📊 ML-Based Forecasts (LSTM)
* 🌘 Dark Mode Support

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Made with ❤️ by [Sathvik](https://github.com/sathvik1607)**

```

---

### ✅ Tips

- Make sure to add your screenshots to:
```

WeatherSphereApp/assets/screenshots/home.png
WeatherSphereApp/assets/screenshots/result.png

```
- If you plan to hide your API key, use `.env` and the `react-native-dotenv` library, and add `.env` to your `.gitignore`.

Would you like me to:
- Add `.env` setup?
- Add deployment instructions for Flask (e.g., Render)?
- Add GitHub Actions for automatic testing/linting?
```
