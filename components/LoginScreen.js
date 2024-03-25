import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const LoginScreen = ({ onLogin, navigation  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
  const handleLogin = () => {
    onLogin(email, password);
  };
const validateInputs = () => {
  let isValid = true;

  // Kiểm tra trường email
  if (email.trim() === '') {
    setEmailError('Vui lòng nhập email');
    isValid = false;
  } else {
    setEmailError('');
  }

  // Kiểm tra trường password
  if (password.trim() === '') {
    setPasswordError('Vui lòng nhập password');
    isValid = false;
  } else {
    setPasswordError('');
  }

  return isValid;
};
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Text style={styles.buttonText}>Email:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập Email ...."
          value={email}
          onChangeText={setEmail}
        />
         <Text style={styles.errorText}>{emailError}</Text>
      </View>
      <Text style={styles.buttonText}>Password:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập Password...."
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
        
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity> 

         <Text style={styles.errorText}>{passwordError}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
  },
  errorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
},
  showPasswordButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;