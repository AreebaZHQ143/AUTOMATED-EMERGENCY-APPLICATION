import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { db } from '../components/firebase.config'; // Ensure the correct path
import { ref, onValue, off, set } from 'firebase/database';
import { useTheme } from './ThemeContext'; // Ensure the correct path

const MissingPersonsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    name: '',
    location: '',
    description: '',
  });
  const { theme } = useTheme();

  // Fetch data from Firebase
  useEffect(() => {
    const postsRef = ref(db, '/missing-persons');
    const listener = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setPosts(postsList);
    });

    return () => off(postsRef, 'value', listener);
  }, []);

  // Add a new post
  const handleAddPost = () => {
    if (!newPost.name || !newPost.location || !newPost.description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const postId = Date.now().toString(); // Generate unique ID
    const postRef = ref(db, `/missing-persons/${postId}`); // Corrected string handling
    set(postRef, newPost)
      .then(() => {
        Alert.alert('Success', 'Post added!');
        setNewPost({ name: '', location: '', description: '' });
        setNewPostVisible(false);
      })
      .catch((error) => {
        Alert.alert('Error', `Failed to add post: ${error.message}`); // Fixed error alert
      });
  };

  // Post Card Component
  const PostCard = ({ post }) => (
    <View
      style={[
        styles.postCard,
        { backgroundColor: theme === 'dark' ? '#444' : '#fff' },
      ]}
    >
      <Text
        style={[styles.postTitle, { color: theme === 'dark' ? '#fff' : '#333' }]}
      >
        {post.name}
      </Text>
      <Text
        style={[
          styles.postLocation,
          { color: theme === 'dark' ? '#ddd' : '#666' },
        ]}
      >
        Location: {post.location}
      </Text>
      <Text
        style={[
          styles.postDescription,
          { color: theme === 'dark' ? '#ccc' : '#555' },
        ]}
      >
        {post.description}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#2c3e50' : '#f5f6fa' },
      ]}
    >
      <ScrollView>
        <Text
          style={[
            styles.title,
            { color: theme === 'dark' ? '#fff' : '#333' },
          ]}
        >
          Missing Persons
        </Text>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          ListEmptyComponent={
            <Text
              style={[
                styles.emptyText,
                { color: theme === 'dark' ? '#bbb' : '#888' },
              ]}
            >
              No posts available.
            </Text>
          }
        />

        {!newPostVisible && (
          <TouchableOpacity
            style={[
              styles.createPostButton,
              { backgroundColor: theme === 'dark' ? '#007bff' : 'purple' },
            ]}
            onPress={() => setNewPostVisible(true)}
          >
            <Text style={styles.createPostButtonText}>Create New Post</Text>
          </TouchableOpacity>
        )}

        {newPostVisible && (
          <View
            style={[
              styles.newPostForm,
              { backgroundColor: theme === 'dark' ? '#555' : '#f9f9f9' },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'dark' ? '#666' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#000',
                },
              ]}
              placeholder="Name"
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={newPost.name}
              onChangeText={(text) =>
                setNewPost({ ...newPost, name: text })
              }
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'dark' ? '#666' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#000',
                },
              ]}
              placeholder="Location"
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={newPost.location}
              onChangeText={(text) =>
                setNewPost({ ...newPost, location: text })
              }
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'dark' ? '#666' : '#fff',
                  color: theme === 'dark' ? '#fff' : '#000',
                },
              ]}
              placeholder="Description"
              placeholderTextColor={theme === 'dark' ? '#bbb' : '#888'}
              value={newPost.description}
              onChangeText={(text) =>
                setNewPost({ ...newPost, description: text })
              }
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: theme === 'dark' ? '#28a745' : 'purple' },
              ]}
              onPress={handleAddPost}
            >
              <Text style={styles.addButtonText}>Submit Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  postCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postLocation: {
    fontSize: 14,
    marginTop: 5,
  },
  postDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  createPostButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor:'purple',
  },
  createPostButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  newPostForm: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default MissingPersonsScreen;
