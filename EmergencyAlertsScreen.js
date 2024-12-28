import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { db } from '../components/firebase.config';
import { ref, onValue, off, set, remove } from 'firebase/database';
import { useTheme } from './ThemeContext';

const EmergencyAlertsScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    type: '',
    location: { latitude: '', longitude: '' },
  });
  const [formVisible, setFormVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const alertsRef = ref(db, '/emergency_alerts');
    const listener = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const alertsList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setAlerts(alertsList);
    });

    return () => off(alertsRef, 'value', listener);
  }, []);

  const handleAddAlert = () => {
    if (!newAlert.type || !newAlert.location.latitude || !newAlert.location.longitude) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const alertId = Date.now().toString();
    const alertRef = ref(db, `/emergency_alerts/${alertId}`);
    set(alertRef, newAlert)
      .then(() => {
        Alert.alert('Success', 'Emergency alert added!');
        setNewAlert({ type: '', location: { latitude: '', longitude: '' } });
        setFormVisible(false);
      })
      .catch((error) => {
        Alert.alert('Error', `Failed to add emergency alert: ${error.message}`);
      });
  };

  const handleDeleteAlert = (id) => {
    const alertRef = ref(db, `/emergency_alerts/${id}`);
    remove(alertRef)
      .then(() => {
        Alert.alert('Success', 'Emergency alert deleted!');
      })
      .catch((error) => {
        Alert.alert('Error', `Failed to delete emergency alert: ${error.message}`);
      });
  };

  const filteredAlerts = alerts.filter((alert) =>
    alert.type.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme === 'dark' ? '#2c3e50' : '#f5f6fa' }]}
    >
      <Text style={[styles.title, { color: theme === 'dark' ? '#E4E6EB' : '#333' }]}>
        Emergency Alerts
      </Text>

      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: theme === 'dark' ? '#242526' : '#fff' }]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme === 'dark' ? '#3A3B3C' : '#f0f0f0',
              color: theme === 'dark' ? '#E4E6EB' : '#000',
            },
          ]}
          placeholder="Search by Alert Type"
          placeholderTextColor={theme === 'dark' ? '#B0B3B8' : '#888'}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Alerts */}
      <FlatList
        data={filteredAlerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.postCard, { backgroundColor: theme === 'dark' ? '#242526' : '#fff' }]}>
            <Text style={[styles.postType, { color: theme === 'dark' ? '#E4E6EB' : '#333' }]}>
              {item.type}
            </Text>
            <Text style={[styles.postLocation, { color: theme === 'dark' ? '#B0B3B8' : '#666' }]}>
              Location: {item.location.latitude}, {item.location.longitude}
            </Text>
            <TouchableOpacity
              style={[
                styles.deleteButton,
                { backgroundColor: theme === 'dark' ? '#FF4D4F' : '#f44336' },
              ]}
              onPress={() => handleDeleteAlert(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme === 'dark' ? '#E4E6EB' : '#666' }]}>
            No alerts available
          </Text>
        }
      />

      {/* Add Alert Button */}
      {!formVisible && (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme === 'dark' ? '#8E44AD' : '#9B59B6' }]}
          onPress={() => setFormVisible(true)}
        >
          <Text style={styles.addButtonText}>Add New Alert</Text>
        </TouchableOpacity>
      )}

      {/* Form for Adding New Alert */}
      {formVisible && (
        <View style={[styles.form, { backgroundColor: theme === 'dark' ? '#242526' : '#fff' }]}>
          <Text style={[styles.formTitle, { color: theme === 'dark' ? '#E4E6EB' : '#333' }]}>
            Add New Alert
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme === 'dark' ? '#3A3B3C' : '#f8f9fa', color: theme === 'dark' ? '#E4E6EB' : '#000' },
            ]}
            placeholder="Alert Type"
            value={newAlert.type}
            onChangeText={(text) => setNewAlert({ ...newAlert, type: text })}
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme === 'dark' ? '#3A3B3C' : '#f8f9fa', color: theme === 'dark' ? '#E4E6EB' : '#000' },
            ]}
            placeholder="Latitude"
            keyboardType="numeric"
            value={newAlert.location.latitude}
            onChangeText={(text) =>
              setNewAlert({ ...newAlert, location: { ...newAlert.location, latitude: text } })
            }
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme === 'dark' ? '#3A3B3C' : '#f8f9fa', color: theme === 'dark' ? '#E4E6EB' : '#000' },
            ]}
            placeholder="Longitude"
            keyboardType="numeric"
            value={newAlert.location.longitude}
            onChangeText={(text) =>
              setNewAlert({ ...newAlert, location: { ...newAlert.location, longitude: text } })
            }
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme === 'dark' ? '#8E44AD' : '#9B59B6' }]}
            onPress={handleAddAlert}
          >
            <Text style={styles.addButtonText}>Add Alert</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
  },
  searchInput: {
    fontSize: 16,
    padding: 8,
    borderRadius: 8,
    height: 40,
  },
  postCard: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  postType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postLocation: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
});

export default EmergencyAlertsScreen;
