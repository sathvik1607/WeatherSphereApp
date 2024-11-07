import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentTemperature = ({ temp, high, low }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
      <Text style={styles.temp}>{temp ? `${temp}°C` : "N/A"}</Text>
      <Text style={styles.range}>HIGH: {high}°</Text>
      <Text style={styles.range}>LOW: {low}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
  },
  dateTimeContainer: {
    alignItems: "center",
    marginBottom: 3,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 16,
    color: "#333",
  },
  temp: {
    fontSize: 30,
    fontWeight: "bold",
  },
  range: {
    fontSize: 15,
  },
});

export default CurrentTemperature;
