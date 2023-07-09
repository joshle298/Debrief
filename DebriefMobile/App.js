import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  AppState,
  Modal,
  TextInput,
} from "react-native";
import Header from "./components/Header";
import SummaryBriefing from "./components/SummaryBriefing";
import LottieView from "lottie-react-native";
import data from "./dummyData";
import Icon from "react-native-vector-icons/Ionicons";

const TEXT_FONT_SIZE = 16;

const App = () => {
  const [showLottie, setShowLottie] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [modalVisible, setModalVisible] = useState(true);
  const scrollViewRef = useRef(null);
  const secondLottieRef = useRef(null);
  const lottieRef = useRef(null);
  const [userText, setUserText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showSecondLottie, setShowSecondLottie] = useState(false);
  const [showFirstLottie, setShowFirstLottie] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const handlePress = () => {
    setShowFirstLottie(false);
    setShowText(true);
  };
  

  const onWordRevealed = (index) => {
    const wordHeight = 24;
    const wordsPerRow = Math.floor(
      Dimensions.get("window").width / (TEXT_FONT_SIZE + 8)
    );
    const row = Math.floor(index / wordsPerRow);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: row * wordHeight, animated: true });
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active" && appState !== "active") {
      setAppState(nextAppState);
      setShowLottie(true);
      lottieRef.current?.reset();
      lottieRef.current?.play();
    } else {
      setAppState(nextAppState);
    }
  };

  const handleNext = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove();
    };
  }, [appState]);

  // this should be changed according to your system
  SUMMARY_API_URL = "http://192.168.1.91:5000/summary";

  const fetchSummary = async (persona) => {
    try {
      const response = await fetch(SUMMARY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ persona: persona })
      });
      const data = await response.json();
      setText(data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };
  

  // Add a new state variable 'text' to the App component, initialized to an empty string:
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showHeader && <Header name={data.name} />}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={[
                styles.input,
                inputFocused && { borderBottomColor: "#8DBAE2" },
              ]}
              placeholder="Type your persona here"
              onChangeText={(text) => setUserText(text)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
            <TouchableOpacity
              onPress={async () => {
                console.log(userText);
                setModalVisible(!modalVisible);
                setShowSecondLottie(true);
                setShowFirstLottie(false);
                await fetchSummary(userText);
                setTimeout(() => {
                  setShowSecondLottie(false);
                  setShowFirstLottie(true);
                  setShowHeader(true);
                }, 10000);
              }}
            >
              <Icon
                style={styles.nextButton}
                name="arrow-forward"
                size={45}
                color="#8DBAE2"
              />
            </TouchableOpacity>
          </View>
        </Modal>
        {showSecondLottie && (
          <TouchableOpacity style={styles.lottieContainer}>
            <LottieView
              ref={secondLottieRef}
              onLayout={() => secondLottieRef.current?.play()}
              source={require("./assets/loading.json")}
              loop
            />
          </TouchableOpacity>
        )}
        {showFirstLottie && (
          <TouchableOpacity
            onPress={handlePress}
            style={styles.lottieContainer}
          >
            <LottieView
              ref={lottieRef}
              onLayout={() => lottieRef.current?.play()}
              source={require("./assets/startDebrief.json")}
              loop
            />
          </TouchableOpacity>
        )}
        {showText && (
          <ScrollView ref={scrollViewRef}>
            <SummaryBriefing
              text={text}
              onWordRevealed={onWordRevealed}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  lottieContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "80%",
    marginBottom: 20,
    fontSize: 18,
    paddingBottom: 14,
  },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20, // Increase the margin top to move the arrow down
  },
});

export default App;