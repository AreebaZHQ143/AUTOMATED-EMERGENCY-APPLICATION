import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../App';
export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const handleLogin = () => {
    setUser({
      username: 'Admin User',
      role: 'admin',
      profilePicture: 'https://via.placeholder.com/80',
    });
    navigation.navigate('Emergency Alerts');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login as Admin</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
