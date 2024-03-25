import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const FormDetail = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.content}</Text>
      <Text style={styles.author}>Author: {post.image}</Text>
      <Text style={styles.author}>Author: {post.like}</Text>
      <Text style={styles.author}>Author: {post.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  author: {
    fontStyle: 'italic',
  },
});

export default FormDetail;