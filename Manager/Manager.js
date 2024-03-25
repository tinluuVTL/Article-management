import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Manager = ({ navigation, route }) => {
  const { email } = route.params;

  const handleUserPress = () => {
  navigation.navigate('ManagerScreen', { email: email });
  
  };

  const handlePostPress = () => {
     navigation.navigate('Post');
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to: </Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUserPress}>
          <Icon name="user" size={30} color="#000" />
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePostPress}>
          <Icon name="file" size={30} color="#000" />
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    marginRight: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Manager;