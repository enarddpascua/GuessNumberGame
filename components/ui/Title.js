import { Text, StyleSheet } from "react-native";
function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "expo-reg",
    fontSize: 24,
    color: "white",
    borderColor: "white",
    borderWidth: 2,
    padding: 8,
    textAlign: "center",
  },
});
export default Title;
