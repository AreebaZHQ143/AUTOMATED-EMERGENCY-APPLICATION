import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { UserContext } from '../App1';
import { ThemeContext } from './ThemeContext'; // Import the ThemeContext

export default function CustomDrawerContent(props) {
  const { user, setUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme context

  const handleLogout = () => {
    props.navigation.navigate('Signin');
  };

  const toggleRole = () => {
    setUser((prevUser) => ({
      ...prevUser,
      role: prevUser.role === 'admin' ? 'user' : 'admin',
    }));
  };

  return (
    <View style={[styles.drawerContainer, { backgroundColor: theme === 'dark' ? '#2c3e50' : '#f5f6fa' }]}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.profileImage}
        />
        <Text style={[styles.profileName, { color: theme === 'dark' ? '#ecf0f1' : '#2c3e50' }]}>
          {user.username}
        </Text>
      </View>
      <View style={styles.drawerItems}>
      <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Emergency Alerts')}>
          <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Emergency Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Missing Persons')}>
          <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Missing Persons</Text>
        </TouchableOpacity>
        
        {user.role === 'admin' && (
          <TouchableOpacity onPress={() => props.navigation.navigate('Users')}>
            <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Users</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Posts')}>
          <Text style={[styles.drawerItemText, { color: theme === 'dark' ? '#ecf0f1' : '#3498db' }]}>Posts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsSection}>
        <Button
          title={`Switch to ${user.role === 'admin' ? 'User' : 'Admin'}`}
          onPress={toggleRole}
        />
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme === 'dark' ? '#e74c3c' : '#e74c3c' }]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItems: {
    flex: 1,
  },
  drawerItemText: {
    fontSize: 16,
    marginVertical: 10,
    padding: 5,
    fontWeight: 'bold',
  },
  actionsSection: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
