import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from 'react-native-vector-icons';

import axios from 'axios';
import { Alert } from 'react-native';
import moment from 'moment';
const PostManagementScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formImage, setFormImage] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [editFormTitle, setEditFormTitle] = useState('');
  const [editFormImage, setEditFormImage] = useState('');
const [formContent, setFormContent] = useState('');
const [formLike, setFormLike] = useState('');
const [editFormContent, setEditFormContent] = useState('');
  const perPage = 19;
const [editFormTime, setEditFormTime] = useState('');
   useEffect(() => {
    fetchPosts();
  }, [currentPage]);

 const handleGoBack = () => {
     navigation.navigate('start');
  };

   const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post?page=${currentPage}&limit=${perPage}`);
      setPosts(response.data);
      setTotalPages(response.headers['x-total-pages']);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
  try {
    await axios.delete(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post/${postId}`);
    fetchPosts();

    Alert.alert(`Bài viết "${postTitle}" đã xóa thành công.`);
  } catch (error) {
    console.error(error);
  }
};

  const handleAddPost = async () => {
  try {
    const currentTime = new Date().toLocaleString();

    await axios.post('https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post', {
      title: formTitle,
      image: formImage,
      content: formContent,
      like: formLike,
      time: currentTime,
    });

    setShowAddForm(false);
    setFormTitle('');
    setFormImage('');
    setFormContent('');
    setFormLike('');
    fetchPosts();

    // Hiển thị thông báo thành công
    Alert.alert(`Đã thêm bài viết "${formTitle}" thành công.`);
  } catch (error) {
    console.error(error);
  }
};

  const handleEditPost = async () => {
  try {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    await axios.put(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post/${editPostId}`, {
  title: editFormTitle,
  image: editFormImage,
  content: editFormContent,
  time: editFormTime,
});
    setShowEditForm(false);
    setEditPostId('');
    setEditFormTitle('');
    setEditFormImage('');
    setEditFormTime(currentTime);
    fetchPosts();

    // Hiển thị thông báo thành công
    Alert.alert(`Bài viết "${editFormTitle}"  đã sửa thành công`);
  } catch (error) {
    console.error(error);
  }
};


  const renderItem = ({ item }) => (
  <View style={styles.postContainer}>
    <Image source={{ uri: item.image }} style={styles.postImage} />
    <View style={styles.postContent}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postTime}>{item.time}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postLike}>Likes: {item.like}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => handleDeletePost(item.id, item.title)}> 
          <Icon name="trash-outline" size={20} color="red" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showEditPostForm(item)}>
          <Icon name="pencil-outline" size={20} color="blue" style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
 

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator size="large" />
    );
  };
  const handleShowAddForm = () => {
    setShowAddForm(true);
  };
const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => setCurrentPage(i)}>
          <Text style={{ marginHorizontal: 5 }}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        {pages}
      </View>
    );
  };
  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setFormTitle('');
    setFormImage('');
  };

  const showEditPostForm = (post) => {
  setEditPostId(post.id);
  setEditFormTitle(post.title);
  setEditFormImage(post.image);
  setEditFormContent(post.content);
  setEditFormTime(post.time);
  setShowEditForm(true);
};

  const handleCloseEditForm = () => {
    setEditPostId('');
    setEditFormTitle('');
    setEditFormImage('');
    setShowEditForm(false);
  };

  return (
    <React.Fragment>
    <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 10, left: 10 }}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
    <View style={styles.container}>
    
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={renderFooter}
      />
      {renderPageNumbers()}
      <TouchableOpacity style={styles.addButton} onPress={handleShowAddForm}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal visible={showAddForm} animationType="slide" transparent>
  <View style={styles.formContainer}>
    <TextInput
      placeholder="Title"
      value={formTitle}
      onChangeText={(text) => setFormTitle(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Image URL"
      value={formImage}
      onChangeText={(text) => setFormImage(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Content"
      value={formContent}
      onChangeText={(text) => setFormContent(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Like"
      value={formLike}
      onChangeText={(text) => setFormLike(text)}
      style={styles.input}
    />
    <View style={styles.formButtonsContainer}>
      <TouchableOpacity style={styles.formButton} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.formButton} onPress={handleCloseAddForm}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
     <Modal visible={showEditForm} animationType="slide" transparent>
  <View style={styles.formContainer}>
    <TextInput
      placeholder="Title"
      value={editFormTitle}
      onChangeText={(text) => setEditFormTitle(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Image URL"
      value={editFormImage}
      onChangeText={(text) => setEditFormImage(text)}
      style={styles.input}
    />
    <TextInput
      placeholder="Content"
      value={editFormContent}
      onChangeText={(text) => setEditFormContent(text)}
      style={styles.input}
    />
    <View style={styles.inputContainer}>
      <Text>Current Time: {moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
      <TextInput
        placeholder="Time"
        value={editFormTime}
        onChangeText={(text) => setEditFormTime(text)}
        style={styles.input}
      />
    </View>
    <View style={styles.formButtonsContainer}>
    
      <TouchableOpacity style={styles.formButton} onPress={handleEditPost}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.formButton} onPress={handleCloseEditForm}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
      </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  postContent: {
    flex: 1,
    marginLeft: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginRight: 8,
  },
   postTime: {
    fontSize: 12,
    marginBottom: 4,
  },
  // postContent: {
  //   marginBottom: 8,
  // },
  postLike: {
    fontSize: 12,
    color: 'green',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  formButtonsContainer: {
    flexDirection: 'row',
  },
  formButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostManagementScreen;