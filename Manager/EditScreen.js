import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditScreen = ({ navigation, route }) => {
  const { id, fetchData } = route.params;
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch user data based on the provided id
    fetch(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setPassword(data.password);
        setEmail(data.email);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = () => {
    fetch(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          setSuccessMessage(`Đã sửa thành công với user có id ${id}, name: ${name}, email: ${email}`);
          setTimeout(() => {
            setSuccessMessage('');
            navigation.goBack(); // Quay trở lại trang trước đó
          }, 3000); // Xóa thông báo sau 3 giây
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sửa thông tin người dùng</Text>
      <Text>ID: {user.id}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.buttonText}>Hủy</Text>
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
  updateButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
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

export default EditScreen;