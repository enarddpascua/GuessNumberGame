import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandNumBetween(min, max, exclude) {
  let randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandNumBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ numberToGuess, gameOverHandler }) {
  const initialGuess = generateRandNumBetween(1, 100, numberToGuess);
  const [opponentGuessedNumber, setOpponentGuessedNumber] =
    useState(initialGuess);
  const [guessedRounds, setGuessedRounds] = useState([initialGuess]);

  useEffect(() => {
    if (numberToGuess === opponentGuessedNumber) {
      gameOverHandler(guessNumberLength);
    }
  }, [opponentGuessedNumber, gameOverHandler, numberToGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && opponentGuessedNumber < numberToGuess) ||
      (direction === "higher" && opponentGuessedNumber > numberToGuess)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = opponentGuessedNumber;
    } else {
      minBoundary = opponentGuessedNumber + 1;
    }
    const newRndNumber = generateRandNumBetween(
      minBoundary,
      maxBoundary,
      opponentGuessedNumber
    );
    setGuessedRounds((prevGuessNumber) => [newRndNumber, ...prevGuessNumber]);
    setOpponentGuessedNumber(newRndNumber);
  }

  let guessNumberLength = guessedRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guessed</Title>
      <NumberContainer>{opponentGuessedNumber}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonView}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.guessListContainer}>
        <FlatList
          data={guessedRounds}
          renderItem={(num) => (
            <GuessLogItem
              guess={num.item}
              roundNumber={guessNumberLength - num.index}
            />
          )}
          keyExtractor={(num) => {
            return num;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonView: {
    flex: 1,
  },
  guessListContainer: {
    flex: 1,
    padding: 18,
  },
});

export default GameScreen;
