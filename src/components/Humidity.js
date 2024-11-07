import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Humidity = ({ humidity }) => (
  <View style={styles.container}>
    <Icon name="tint" size={30} color="#00BFFF" style={styles.icon} />
    {/* Humidity Icon */}
    <Text style={styles.label}>HUMIDITY</Text>
    <Text style={styles.value}>{humidity}%</Text>
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
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
  },
});

export default Humidity;
