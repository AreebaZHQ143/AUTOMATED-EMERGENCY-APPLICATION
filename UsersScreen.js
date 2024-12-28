import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../components/firebase.config';
import { ref, onValue } from 'firebase/database';
import { useTheme } from '../screens/ThemeContext'; // Import useTheme to get the current theme

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const { theme } = useTheme(); // Access the current theme from context

  useEffect(() => {
    const usersRef = ref(db, 'Users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setUsers(usersList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.userItem, { backgroundColor: theme === 'dark' ? '#444' : '#f9f9f9' }]}>
            <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>Username: {item.username}</Text>
            <Text style={[styles.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>Email: {item.email}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>No users available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default UsersScreen;
