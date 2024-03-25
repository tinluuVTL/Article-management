import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SignupScreen = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
  const handleSignup = () => {
    onSignup(name,email, password);
  };
 const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
  setShowConfirmPassword(!showConfirmPassword);
};
  return (
    <View>
     <Text style={styles.buttonText}>Họ tên:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ tên ...."
          value={name}
          onChangeText={setname}
        />
      </View>
      <Text style={styles.buttonText}>Email:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập Email ...."
          value={email}
          onChangeText={setEmail}
        />
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
          {/* Thêm biểu tượng */}
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.buttonText}>Nhập lại Password:</Text>
      <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Nhập lại Password...."
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry={!showConfirmPassword}
  />
  <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowConfirmPassword}>
    <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
  </TouchableOpacity>
</View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
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
  showPasswordButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 10,
    justifyContent: 'center',
  },
  
  buttonContainer: {
    backgroundColor: 'blue',
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

export default SignupScreen;