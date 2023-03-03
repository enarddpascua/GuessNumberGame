import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  useEffect,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [numberToGuess, setNumberToGuess] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "expo-reg": require("./assets/fonts/ExpoRegular.ttf"),
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    setNumberToGuess(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numOfRounds);
  }

  function startNewGameHandler() {
    setNumberToGuess(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen setNumberToGuess={pickedNumberHandler} />;

  if (numberToGuess) {
    screen = (
      <GameScreen
        numberToGuess={numberToGuess}
        gameOverHandler={gameOverHandler}
      />
    );
  }

  if (gameIsOver && numberToGuess) {
    screen = (
      <GameOverScreen
        numberToGuess={numberToGuess}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      style={styles.rootView}
      colors={[Colors.primary700, Colors.accent500]}
    >
      <ImageBackground
        source={require("./assets/dices.jpg")}
        resizeMode="cover"
        style={styles.rootView}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={[styles.rootView, styles.androidSafeArea]}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
});
