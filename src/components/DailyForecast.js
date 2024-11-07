import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Function to determine the appropriate weather icon based on the temperature or condition
const getWeatherIcon = (temp) => {
  if (temp >= 30) {
    return "weather-sunny";
  } else if (temp >= 20) {
    return "weather-partly-cloudy";
  } else {
    return "weather-cloudy";
  }
};

// Function to determine the icon color based on the temperature
const getIconColor = (temp) => {
  if (temp >= 30) {
    return "#FFA500"; // Orange for hot days
  } else if (temp >= 20) {
    return "#FFD700"; // Yellow for warm days
  } else {
    return "#ADD8E6"; // Light blue for cooler days
  }
};

const DailyForecast = ({ dailyData }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
  >
    {dailyData.map((day, index) => (
      <View key={index} style={styles.dayContainer}>
        <Text style={styles.day}>{day.day}</Text>
        <Icon
          name={getWeatherIcon(day.temp)}
          size={30}
          color={getIconColor(day.temp)} // Apply color based on temperature
          style={styles.icon}
        />
        <Text style={styles.temp}>{day.temp ? `${day.temp}°` : "N/A"}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    marginVertical:10,
  },
  dayContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  day: {
    color: "gray",
  },
  temp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginVertical: 5,
  },
});

export default DailyForecast;
