import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

const StartScreen = ({ navigation }) => {
  const snowflakes = useRef([]);

  const buttonScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateSnowfall();
    animateButton();
    animateText();
  }, []);

  const animateSnowfall = () => {
    snowflakes.current.forEach((flake, index) => {
      const x = Math.random() * 400;
      const y = Math.random() * 800;
      const duration = 4000 + Math.random() * 2000;
      Animated.loop(
        Animated.sequence([
          Animated.timing(flake.x, {
            toValue: x,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(flake.y, {
            toValue: y,
            duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  const animateButton = () => {
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animateText = () => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.snowfallContainer}>
        {[...Array(100)].map((_, index) => {
          const x = new Animated.Value(Math.random() * 400);
          const y = new Animated.Value(Math.random() * 800);
          snowflakes.current[index] = { x, y };
          return (
            <Animated.View
              key={index}
              style={[
                styles.snowflake,
                { transform: [{ translateX: x }, { translateY: y }] },
              ]}
            />
          );
        })}
      </View>
      <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        Ứng dụng quản lý bài viết
      </Animated.Text>
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ scale: buttonScale }] },
        ]}>
        <Button
          title="start"
          onPress={() => navigation.navigate('Home')}
          color="red"
          style={{ borderRadius: 10 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFFFF',
  },
  snowfallContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  snowflake: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 0,
    opacity: 1,
  },
});
export default StartScreen;