import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const WeatherNotification = ({ temp, weather, rainVolume }) => {
  const lastAlert = useRef({ temp: null, weather: null });
  const [notification, setNotification] = useState(null);

  const displayNotification = (title, message) => {
    setNotification({ title, message, backgroundColor: "#D9534F" }); // "danger" red color
  };

  useEffect(() => {
    if (lastAlert.current.temp !== temp || lastAlert.current.weather !== weather) {
      if (temp > 36) {
        displayNotification("High Temperature Alert", "The temperature is above 36°C!");
      }

      if (weather === "rain") {
        const alertMessage =
          rainVolume > 10 ? "Heavy rain is expected in the area." : "It may rain in your area.";
        displayNotification("Rain Alert", alertMessage);
      }

      if (weather === "thunderstorm" || weather === "storm") {
        displayNotification("Storm Alert", "High winds and storms are expected.");
      }

      lastAlert.current = { temp, weather };
    }
  }, [temp, weather, rainVolume]);

  const handleDismissNotification = () => {
    setNotification(null);
  };

  if (!notification) return null;

  return (
    <Animatable.View
      animation="slideInDown"
      duration={500}
      style={[styles.notificationContainer, { backgroundColor: notification.backgroundColor }]}
    >
      <Text style={styles.notificationTitle}>{notification.title}</Text>
      <Text style={styles.notificationMessage}>{notification.message}</Text>
      <TouchableOpacity onPress={handleDismissNotification} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>OK</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: '30%', // Center vertically
    alignSelf: "center", // Center horizontally
    padding: 15,
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
    width: width - 40, // Adjusted width for consistent padding on both sides
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    transform: [{ translateY: -50 }], // Shift up by 50% of its own height to center perfectly
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  dismissButton: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dismissButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D9534F",
  },
});

export default WeatherNotification;
