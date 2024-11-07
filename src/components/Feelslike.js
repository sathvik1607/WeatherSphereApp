// FeelsLike.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FeelsLike = ({ feelsLike }) => (
  <View style={styles.container}>
    <Icon name="thermometer-half" size={30} color="#8A2BE2" style={styles.icon} />
    <Text style={styles.label}>FEELS LIKE</Text>
    <Text style={styles.temp}>{feelsLike}°C</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  label: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temp: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});

export default FeelsLike;
