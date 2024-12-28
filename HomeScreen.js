import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../App1';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext); // Access current theme

  // Apply styles based on the theme
  const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyle = theme === 'light' ? styles.lightText : styles.darkText;
  const buttonStyle = theme === 'light' ? styles.lightButton : styles.darkButton;
  const buttonTextStyle = theme === 'light' ? styles.lightButtonText : styles.darkButtonText;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.welcomeText, textStyle]}>Welcome, back!</Text>

      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => navigation.navigate('Emergency Alerts')}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>Emergency Alerts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => navigation.navigate('Missing Persons')}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>Missing Persons</Text>
      </TouchableOpacity>

      {user.role === 'admin' && (
        <TouchableOpacity
          style={[styles.button, styles.adminButton]}
          onPress={() => navigation.navigate('Users')}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>Users</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f5f6fa', // Light background color
  },
  darkContainer: {
    backgroundColor: '#2c3e50', // Dark background color
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color:'purple',
  },
  lightText: {
    color: '#333', // Light text color
  },
  darkText: {
    color: '#ecf0f1', // Dark text color
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: 'purple', // Light button color
  },
  darkButton: {
    backgroundColor: '#1abc9c', // Dark button color
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#fff', // Light button text color
  },
  darkButtonText: {
    color: '#2c3e50', // Dark button text color
  },
  adminButton: {
    backgroundColor: 'purple', // Admin button color
  },
});

export default HomeScreen;
