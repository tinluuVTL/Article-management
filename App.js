import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import StartScreen from './StartScreen'; 
import Index from './components/Index'; 
import ManagerScreen from './Manager/ManagerScreen'; 
import AddScreen from './Manager/AddScreen';
import EditScreen from './Manager/EditScreen';
import Home from './Post/PostScreen';
import Post from './Manager/ManagerPostScreen';
import Manager from './Manager/Manager'

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="start" component={StartScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ManagerScreen" component={ManagerScreen} />
          <Stack.Screen name="Login & Signup" component={Index} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="Manager" component={Manager} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 23,
    // Các thuộc tính CSS khác tại đây
  },
});