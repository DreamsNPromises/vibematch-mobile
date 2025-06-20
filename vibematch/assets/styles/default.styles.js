import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  background: {
    //flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "ADLaM"
  },
});