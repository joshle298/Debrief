import React, { useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const SummaryBriefing = ({ text, onWordRevealed }) => {
  console.log(text)
  const words = text.split(" ");
  const animatedValues = words.map(() => new Animated.Value(0));

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      animatedValue.addListener(({ value }) => {
        if (value > 0.5) {
          onWordRevealed(index);
        }
      });
  
      return Animated.timing(animatedValue, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      });
    });
  
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      {words.map((word, index) => {
        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        });

        const opacity = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        return (
          <Animated.Text
            key={index}
            style={[styles.text, { opacity, transform: [{ translateY }] }]}
          >
            {word}{" "}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SummaryBriefing;
