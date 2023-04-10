import React, { useState, useRef } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header from './components/Header';
import SummaryBriefing from './components/SummaryBriefing';
import LottieView from 'lottie-react-native';
import data from './dummyData';

const TEXT_FONT_SIZE = 16;

const App = () => {
  const [showLottie, setShowLottie] = useState(true);
  const scrollViewRef = useRef(null);

  const handlePress = () => {
    setShowLottie(false);
  };

  const onWordRevealed = (index) => {
    const wordHeight = 24;
    const wordsPerRow = Math.floor(Dimensions.get('window').width / (TEXT_FONT_SIZE + 8));
    const row = Math.floor(index / wordsPerRow);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: row * wordHeight, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header name={data.name} />
        {!showLottie && (
          <ScrollView ref={scrollViewRef}>
            <SummaryBriefing text={data.summaryBriefing} onWordRevealed={onWordRevealed} />
          </ScrollView>
        )}
        {showLottie && (
          <TouchableOpacity onPress={handlePress} style={styles.lottieContainer}>
            <LottieView
              source={require('./assets/startDebrief.json')}
              autoPlay
              loop
            />
          </TouchableOpacity>
        )}
        {/* Add the rest of your app components here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  lottieContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: TEXT_FONT_SIZE,
    lineHeight: 24,
  },
});

export default App;
