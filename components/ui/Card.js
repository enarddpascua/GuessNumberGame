import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function Card({ children }) {
  return <View style={styles.rootContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
  },
});
export default Card;
