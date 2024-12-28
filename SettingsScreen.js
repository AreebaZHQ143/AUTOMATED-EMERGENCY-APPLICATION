import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme from context

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
