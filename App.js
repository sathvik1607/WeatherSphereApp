import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
const { width } = Dimensions.get("window");
import CitySelector from "./src/components/CitySelector";
import HourlyForecast from "./src/components/HourlyForecast";
import DailyForecast from "./src/components/DailyForecast";
import AirQuality from "./src/components/AirQuality";
import Humidity from "./src/components/Humidity";
import WindSpeed from "./src/components/WindSpeed";
import Pressure from "./src/components/Pressure";
import Precipitation from "./src/components/Precipitation";
import Sunrise from "./src/components/Sunrise";
import Sunset from "./src/components/Sunset";
import FeelsLike from "./src/components/Feelslike";
import CurrentTemperature from "./src/components/CurrentTemperature";

const App = () => {
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [error, setError] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const API_KEY = "42f7a6079492f96294569d12b22c20a3";

  const scrollX = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setWeatherData(null);
    setHourlyForecast([]);
    setDailyForecast([]);
    setAirQuality(null);
    setSunrise(null);
    setSunset(null);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found or invalid city name");

      const data = await response.json();
      setWeatherData(data);

      const { lat, lon } = data.coord;
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      await fetchForecast(lat, lon);
      await fetchAirQuality(lat, lon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Failed to fetch forecast data");

      const data = await response.json();
      const next5Hours = data.list.slice(0, 7).map((hour) => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: hour.main.temp,
      }));
      setHourlyForecast(next5Hours);

      const dailyDataMap = {};
      data.list.forEach((hour) => {
        const date = new Date(hour.dt * 1000);
        const dateString = date.toISOString().split("T")[0];
        if (!dailyDataMap[dateString]) {
          dailyDataMap[dateString] = {
            day: date.toLocaleDateString([], { weekday: "short" }),
            temp: hour.main.temp,
            minTemp: hour.main.temp_min,
            maxTemp: hour.main.temp_max,
          };
        } else {
          dailyDataMap[dateString].temp += hour.main.temp;
        }
      });

      const next5Days = Object.values(dailyDataMap)
        .slice(1, 7)
        .map((dayData) => ({
          day: dayData.day,
          temp: (dayData.temp / 8).toFixed(1),
        }));

      setDailyForecast(next5Days);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setError(error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch air quality data");

      const data = await response.json();
      if (data.list.length > 0) {
        const aqi = data.list[0].main.aqi;
        setAirQuality(aqi);
      } else {
        setAirQuality(null);
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (airQuality === 5) {
      startScrolling();
    } else {
      scrollX.setValue(width);
    }
  }, [airQuality]);

  const startScrolling = () => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CitySelector onCityChange={handleCityChange} />
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
        {!error && weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{city}</Text>
            {airQuality === 5 && (
              <Animated.Text
                style={[
                  styles.alertText,
                  {
                    transform: [{ translateX: scrollX }],
                  },
                ]}
              >
                Better to stay at home, air quality is not good!
              </Animated.Text>
            )}
            <View style={styles.temprow}>
              <Sunrise time={sunrise} />
              <CurrentTemperature
                temp={weatherData.main.temp}
                high={weatherData.main.temp_max}
                low={weatherData.main.temp_min}
              />
              <Sunset time={sunset} />
            </View>
            <View style={styles.row}>
              <Humidity humidity={weatherData.main.humidity} />
              <Pressure pressure={weatherData.main.pressure} />
              <FeelsLike feelsLike={weatherData.main.feels_like} />
            </View>
            <View style={styles.row}>
              <WindSpeed speed={weatherData.wind.speed} direction="NE" />
              <Precipitation amount={weatherData.rain?.["1h"] ?? 0} />
              <AirQuality
                quality={airQuality}
                status={airQuality ? getAirQualityStatus(airQuality) : "N/A"}
              />
            </View>
            <Text style={styles.Hourly}>Hourly Data:</Text>
            <HourlyForecast hourlyData={hourlyForecast} />
            <Text style={styles.Hourly}>Daily Data:</Text>
            <DailyForecast dailyData={dailyForecast} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getAirQualityStatus = (aqi) => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "N/A";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  Hourly: {
    color: "green",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  temprow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 1,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  alertText: {
    position: "absolute",
    top: 27,
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
