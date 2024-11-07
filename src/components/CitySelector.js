// CitySelector.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const CitySelector = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState("");

  const handlePress = () => {
    onCityChange(inputCity);
    setInputCity("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#aaa"
        value={inputCity}
        onChangeText={setInputCity}
      />
      <Button title="Get Weather" onPress={handlePress} color="#333" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
    marginBottom: 10,
  },
});

export default CitySelector;
