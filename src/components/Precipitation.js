// Precipitation.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Precipitation = ({ amount }) => (
  <View style={styles.container}>
    <Icon name="cloud-rain" size={30} color="#00008B" style={styles.icon} />
    <Text style={styles.label}>PRECIPITATION</Text>
    <Text style={styles.value}>{amount ? `${amount} mm` : "N/A"}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingTop: 5,
  },
});

export default Precipitation;
