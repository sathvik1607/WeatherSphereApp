import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Sunset = ({ time }) => (
  <View style={styles.container}>
    <Icon name="sun" size={30} color="#FF4500" style={styles.icon} />
    <Text style={styles.label}>SUNSET</Text>
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
    width: 100, // Consistent width for alignment
    height: 120, // Adjusted height to match Sunrise component
    justifyContent: "space-between", // Evenly space items vertically
  },
  icon: {
    fontSize: 30,
    marginBottom: 5, // Adjusted spacing for icon consistency
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

export default Sunset;
