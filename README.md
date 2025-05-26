Here is your **fully updated `README.md`** with corrected structure, **Visual Crossing API usage**, and **screenshots added**. I’ve removed mentions of OpenWeatherMap and inserted screenshot placeholders pointing to `assets/screenshots`.

---

```markdown
# 🌦️ WeatherSphere – Weather Forecast & Alerts App

**GitHub Repo:** [https://github.com/sathvik1607/WeatherSphereApp.git](https://github.com/sathvik1607/WeatherSphereApp.git)

WeatherSphere is a cross-platform mobile application powered by **React Native** (frontend) and **Flask** (backend). It provides real-time weather updates, forecasts, and personalized alerts using the **Visual Crossing API**. The backend supports ML integrations and alert management.

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
├── src/                        # React Native source
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

### ✅ Frontend (React Native)

- 🔍 City Search & Selection
- 🌡️ Real-time Weather Conditions
- 🕒 Hourly and 📅 Daily Forecasts
- 💧 Humidity, Wind, Pressure, Feels Like, AQI, Sunrise/Sunset
- ⚠️ In-App Weather Alerts and Animated Notifications

### ✅ Backend (Flask)

- 📡 Weather Data Fetching from Visual Crossing
- 🧠 (Planned) LSTM-based Forecasting
- 📬 Personalized Alert Triggers via Rules

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

## 🔑 API Key (Visual Crossing)

Update the API key in your React Native frontend (likely in a config file or component):

```js
const API_KEY = "your_visual_crossing_api_key";
```

You can get a free API key from [Visual Crossing](https://www.visualcrossing.com/).

---

## 🖼️ Screenshots

| Home Screen                          | Forecast Result                          |
| ------------------------------------ | ---------------------------------------- |
| ![Home](assets/screenshots/home.png) | ![Result](assets/screenshots/result.png) |

---

## 🔮 Future Enhancements

* 📍 GPS-based Weather Updates
* 🔔 Push/Email Notifications
* 📊 ML-based Weather Trends with LSTM
* 🌘 Dark Mode Support

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Made with ❤️ by [Sathvik](https://github.com/sathvik1607)**

```

---

### ✅ Notes:

- Place screenshots at: `WeatherSphereApp/assets/screenshots/home.png` and `result.png`.
- Replace `"your_visual_crossing_api_key"` with your actual API key.
- If using `.env`, ensure it is properly ignored with `.gitignore`.

Let me know if you want me to add:
- `.env` support,
- CI/CD badge (GitHub Actions),
- deployment instructions (Heroku/Vercel/Render).
```
