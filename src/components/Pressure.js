import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Pressure = ({ pressure }) => (
  <View style={styles.container}>
    <Icon name="tachometer-alt" size={30} color="#FFD700" style={styles.icon} />
    {/* Pressure Icon */}
    <Text style={styles.label}>PRESSURE</Text>
    <Text style={styles.value}>{pressure} hPa</Text>
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
  },
  icon: {
    fontSize: 30, // Consistent icon size
    marginBottom: 5,
  },
  label: {
    color: "white",
    fontSize: 12, // Consistent label font size
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    color: "white",
    fontSize: 17, // Consistent value font size
    fontWeight: "bold",
    paddingTop: 5,
  },
});

export default Pressure;
