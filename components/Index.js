import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

const Index = () => {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupname, setSignupName] = useState('');

  const navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.find((user) => user.email === email && user.password === password);
        if (user) {
          console.log('Đăng nhập thành công:', user);
          setUser(user);
       
          navigation.navigate('Home', { isLoggedIn: true, email: email  }); // Truyền giá trị isLoggedIn: true cho trang Home
        } else {
          console.error('Email hoặc mật khẩu không chính xác.');
        }
      } else {
        console.error('Lỗi đăng nhập:', response.status);
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

   const handleSignup = async (name,email, password,confirmPassword) => {
    try {
      const response = await fetch('https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, password,confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsSignupSuccess(true);

        setSignupSuccess(true);
          setSignupEmail(email);
           setSignupName(name);
    
      } else {
        console.error('Error signing up:', response.status);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

   const toggleScreen = () => {
    setCurrentScreen(currentScreen === 'login' ? 'signup' : 'login');
  };

  const handleAlertClose = () => {
    setIsSignupSuccess(false);
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập bằng Facebook
  };

  const handleGitHubLogin = () => {
    // Xử lý đăng nhập bằng GitHub
  };
return (
    <View style={styles.container}>
      {user ? (
        <Text>Welcome, {user.email}!</Text>
      ) : (
        <View style={styles.formContainer}>
  <View style={styles.form}>
    <Text style={styles.formTitle}>{currentScreen === 'login' ? 'Login' : 'Signup'}</Text>
    {currentScreen === 'login' ? (
      <LoginScreen onLogin={handleLogin} />
    ) : (
      <SignupScreen onSignup={handleSignup} />
    )}
    
    <TouchableOpacity onPress={toggleScreen}>
      <Text style={styles.switchText}>
        {currentScreen === 'login' ? "Chưa có tài khoản? Đăng ký ngay" : "Bạn đã có tài khoản? Đăng nhập ngay"}
      </Text>
    </TouchableOpacity>
     <Text style={styles.text}>--- Hoặc ---</Text>
    <View style={styles.socialLoginContainer}>
      <TouchableOpacity style={[styles.socialLoginButton, { backgroundColor: '#DB4437' }]} onPress={handleGoogleLogin}>
        <Icon name="google" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialLoginButton, { backgroundColor: '#4267B2' }]} onPress={handleFacebookLogin}>
        <Icon name="facebook" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialLoginButton, { backgroundColor: '#24292E' }]} onPress={handleGitHubLogin}>
        <Icon name="github" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
  {signupSuccess && currentScreen === 'signup' && (
    <View style={styles.alertContainer}>
      <Text style={styles.alertText}>Signup successful! name: {signupname}, Email: {signupEmail}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => setCurrentScreen('login')}>
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  )}
</View>
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
  formContainer: {
    width: '80%',
    elevation: 5,
    shadowColor: 'red',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 84,
  },
  form: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialLoginButton: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  
  alertContainer: {
  marginTop: 20,
  backgroundColor: '#e0e0e0',
  padding: 10,
  borderRadius: 5,

},
alertText: {
  fontSize: 16,
  marginBottom: 10,
  color:'green'
},
loginButton: {
  marginTop: 10,
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
},
loginButtonText: {
  color: 'white',
  textAlign: 'center',
},
  text:{
  textAlign: 'center',
  marginTop:10,
  color:'blue',
  }
});

export default Index;