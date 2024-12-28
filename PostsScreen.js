import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useTheme } from './ThemeContext'; // Import the useTheme hook

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme(); // Access the current theme

  // Function to fetch data from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Render a single post
  const renderPostItem = ({ item }) => (
    <View style={[styles.postItem, { backgroundColor: theme === 'dark' ? '#333' : '#f2f2f2' }]}>
      <Text style={[styles.postTitle, { color: theme === 'dark' ? '#fff' : '#333' }]}>{item.title}</Text>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#333' }}>{item.body}</Text>
    </View>
  );

  if (loading) {
    // Show a loading indicator while data is being fetched
    return (
      <View style={[styles.centered, { backgroundColor: theme === 'dark' ? '#333' : '#f2f2f2' }]}>
        <ActivityIndicator size="large" color={theme.button} />
        <Text style={{ color: theme === 'dark' ? '#fff' : '#333'  }}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    // Show an error message if fetching fails
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
        <Text
          style={[styles.retryText, { color: theme.button }]}
          onPress={fetchPosts}
        >
          Tap here to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#f2f2f2' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#333' }]}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  postItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default PostsScreen;
