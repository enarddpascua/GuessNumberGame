import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, numberToGuess, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.jpg")} style={styles.image} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{" "}
        <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess
        the number <Text style={styles.highlightText}>{numberToGuess}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </>
  );

  if (width > 500) {
    content = (
      <View style={styles.contentRootContainerWide}>
        <View style={styles.imageContainerWide}>
          <Image
            source={require("../assets/success.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainerWide}>
          <Title>GAME OVER!</Title>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlightText}>{numberToGuess}</Text>
          </Text>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </View>
    );
  }

  return <View style={styles.rootContainer}>{content}</View>;
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  contentRootContainerWide: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-around",
  },
  imageContainerWide: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary800,
  },
  contentContainerWide: {
    flex: 1,
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    overflow: "hidden",
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "expo-reg",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "expo-reg",
    color: Colors.primary500,
  },
});
