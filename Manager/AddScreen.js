import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddScreen = ({ navigation, route }) => {
  const { fetchData } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = () => {
    fetch('https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          setSuccessMessage(`User added successfully! Name: ${name}, Email: ${email}`);
          setTimeout(() => {
            setSuccessMessage('');
            navigation.goBack();
          }, 3000);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thêm người dùng mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
      {successMessage !== '' && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default AddScreen;