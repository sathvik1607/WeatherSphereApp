// WindSpeed.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const WindSpeed = ({ speed, direction }) => (
  <View style={styles.container}>
    <Icon name="flag" size={30} color="#32CD32" style={styles.icon} />
    <Text style={styles.label}>WIND SPEED</Text>
    <Text style={styles.value}>{speed ? `${speed} km/h` : "N/A"}</Text>
    <Text style={styles.direction}>Direction: {direction || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height:120,
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  label: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingTop: 5,
  },
  direction: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
  },
});

export default WindSpeed;
