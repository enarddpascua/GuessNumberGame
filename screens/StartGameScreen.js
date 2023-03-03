import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function StartGameScreen({ setNumberToGuess }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();
  function numberInputHandler(text) {
    setEnteredNumber(text);
  }

  function confirmInputHandler() {
    let chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //show alert
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setNumberToGuess(chosenNumber);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  const marginTopDistance = height < 380 ? 30 : 150;

  return (
    <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonView}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonView: {
    flex: 1,
  },
});
