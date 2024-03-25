import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const { width } = Dimensions.get('window');
const itemsPerPage = 5;

const HomeScreen = ({ navigation, route }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [selectedPost, setSelectedPost] = useState(null);
const [showPostDetail, setShowPostDetail] = useState(false);

const [showAddForm, setShowAddForm] = useState(false);
const [newPost, setNewPost] = useState({
  title: '',
  content: '',
  image: '',
});

const handleAdd = () => {
  setShowAddForm(true);
};

const handleCancelAdd = () => {
  setShowAddForm(false);
  setNewPost({
    title: '',
    content: '',
    image: '',
  });
};

const handleInputChange = (field, value) => {
  setNewPost((prevPost) => ({
    ...prevPost,
    [field]: value,
  }));
};

const handleAddPost = async () => {
  try {
    const response = await axios.post(
      'https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post',
      {
        ...newPost,
        time: new Date().toLocaleString(),
        like: 1,
      }
    );
    const addedPost = response.data;
    setPosts((prevPosts) => [...prevPosts, addedPost]);
    setShowAddForm(false);
    setNewPost({
      title: '',
      content: '',
      image: '',
    });
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    if (route.params?.isLoggedIn) {
      setIsLoggedIn(route.params.isLoggedIn);
    }
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.isLoggedIn, route.params?.email]);

const fetchPostDetail = async (postId) => {
  try {
    const response = await axios.get(
      `https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post/${postId}`
    );
    setSelectedPost(response.data);
  } catch (error) {
    console.log(error);
  }
};
const handlePostDetail = (postId) => {
  openPostDetail(postId);
};
const openPostDetail = async (postId) => {
  await fetchPostDetail(postId);
  setShowPostDetail(true);
};
const closePostDetail = () => {
  setShowPostDetail(false);
};
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/post'
        );
        // Add the 'time' field to each post
        const updatedPosts = response.data.map((post) => ({
          ...post,
          time: post.time,
        }));
        setPosts(updatedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
       
        const newLikeCount = post.like + (post.like % 2 === 0 ? -1 : 1);
        return { ...post, like: newLikeCount };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleLogin = () => {
    navigation.navigate('Login & Signup');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignup = () => {
    navigation.navigate('Login & Signup');
  };

  const handleManager = () => {
    navigation.navigate('Manager', { email: email });
  };

  const renderButtons = () => {
  if (isLoggedIn) {
    return (
      <>
        <Text style={styles.emailText}>Xin chào {email} !</Text>
        <TouchableOpacity style={styles.managerbutton} onPress={handleManager}>
          <Icon name="briefcase" size={20} color="white" style={styles.buttonIcon} />
     
        </TouchableOpacity>
      
        <TouchableOpacity onPress={handleAdd}>
          <Icon name="plus" size={20} color="green" style={styles.addbt} />
        </TouchableOpacity> 
         <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="red" style={styles.logoutButton} />
        </TouchableOpacity>
      </>
    );
  } else {
    return (
      <>
        <TouchableOpacity style={styles.button } onPress={handleLogin}>
          <Icon name="sign-in" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Icon name="user-plus" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </>
    );
  }
};



const renderPostDetail = () => {
  if (showPostDetail && selectedPost) {
    return (
      <View style={styles.postDetailOverlay}>
        <TouchableOpacity style={styles.closeButton} onPress={closePostDetail}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <View style={styles.postDetailContainer}>
          <Text style={styles.postDetailTitle}>{selectedPost.title}</Text>
          <Image source={{ uri: selectedPost.image }} style={styles.postDetailImage} />
          <Text style={styles.postDetailContent}>{selectedPost.content}</Text>
        </View>
      </View>
    );
  } else if (showAddForm) {
  return (
  <View style={styles.postDetailOverlay}>
    <TouchableOpacity style={styles.closeButton} onPress={handleCancelAdd}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>
    <View style={styles.postDetailContainer}>
      <Text style={styles.postDetailTitle}>Add New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newPost.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={newPost.content}
        onChangeText={(text) => handleInputChange('content', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={newPost.image}
        onChangeText={(text) => handleInputChange('image', text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <Icon name="plus" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  </View>
);
  }
  return null;
};
  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postInfoContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.time}</Text> 
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item.id)}>
          <Icon
name={item.like % 2 === 0 ? 'heart' : 'heart-o'}
size={20}
color={item.like % 2 === 0 ? 'red' : 'black'}
/>
          <Text style={styles.likeCount}>{item.like}</Text>
        </TouchableOpacity>
      </View>
     <TouchableOpacity style={styles.detailButton} onPress={() => handlePostDetail(item.id)}>
  <Text style={styles.detailButtonText}>Chi tiết</Text>
</TouchableOpacity>
    </View>
  );

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const postsToRender = posts.slice(startIndex, endIndex); 

    return (
      <View style={styles.content}>
        <Text style={styles.heading}>Danh sách bài viết</Text>
        <FlatList
          data={postsToRender}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.paginationContainer}>
          {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map(
            (_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationItem,
                  currentPage === index + 1 && styles.paginationItemActive,
                ]}
                onPress={() => setCurrentPage(index + 1)}>
                <Text style={styles.paginationText}>{index + 1}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>{renderButtons()}</View>
      {renderPosts()}
       {renderPostDetail()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFCC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width,
    backgroundColor: 'skyblue',

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
     marginHorizontal: -29,
  },
 

  postDetailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postDetailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor:'white',
  },
  
  postDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDetailImage: {
    
   
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
     width: '100%',
    height: 200,
   
   
  },
  postDetailContent: {
    fontSize: 16,
  },
 
  logoutButton: {
    marginLeft: 10,
  },
  addbt:{
   
    borderRadius:5,
    padding: 10,
  },
  emailText: {
    color: 'white',
  },
  managerbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
 
 
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: width - 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  postImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  postInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
  },
  detailButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  detailButtonText: {
    color: 'white',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationItem: {
    padding: 11,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'gray',
  },
  paginationItemActive: {
    backgroundColor: '#FF9933',
  },
  paginationText: {
    color: 'white',
  },
});

export default HomeScreen;
