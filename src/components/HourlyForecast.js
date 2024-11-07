import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Function to determine the appropriate weather icon based on temperature
const getWeatherIcon = (temp) => {
  if (temp >= 30) {
    return "weather-sunny";
  } else if (temp >= 20) {
    return "weather-partly-cloudy";
  } else {
    return "weather-cloudy";
  }
};

// Function to determine the icon color based on temperature
const getIconColor = (temp) => {
  if (temp >= 30) {
    return "#FFA500"; // Orange for hot hours
  } else if (temp >= 20) {
    return "#FFD700"; // Yellow for warm hours
  } else {
    return "#ADD8E6"; // Light blue for cooler hours
  }
};

const HourlyForecast = ({ hourlyData }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
  >
    {hourlyData.map((hour, index) => (
      <View key={index} style={styles.hourContainer}>
        <Text style={styles.time}>{hour.time}</Text>
        <Icon
          name={getWeatherIcon(hour.temp)}
          size={30}
          color={getIconColor(hour.temp)} // Apply color based on temperature
          style={styles.icon}
        />
        <Text style={styles.temp}>{hour.temp ? `${hour.temp}°` : "N/A"}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 10,
  },
  hourContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  time: {
    color: "gray",
  },
  temp: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginVertical: 5,
  },
});

export default HourlyForecast;
