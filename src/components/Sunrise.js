import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Sunrise = ({ time }) => (
  <View style={styles.container}>
    <Icon name="sun" size={30} color="#FFA500" style={styles.icon} />
    <Text style={styles.label}>SUNRISE</Text>
    <Text style={styles.value}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100, // Ensure consistent width
    height: 120, // Adjusted height for alignment
    justifyContent: "space-between", // Space items evenly
  },
  icon: {
    fontSize: 30,
    marginBottom: 5, // Adjusted spacing for icon
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Sunrise;
