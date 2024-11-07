// AirQuality.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const AirQuality = ({ quality, status }) => (
  <View style={styles.container}>
    <Icon name="wind" size={30} color="#008080" style={styles.icon} />
    <Text style={styles.label}>AIR QUALITY</Text>
    <Text style={styles.value}>{quality ? quality.toString() : "N/A"}</Text>
    <Text style={styles.status}>{status ? status : "N/A"}</Text>
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
    marginBottom: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingTop: 5,
  },
  status: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});

export default AirQuality;
