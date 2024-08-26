import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 150,
    height: 150,
  },

  footerText: {
    opacity: 0.5,
    color: "white",
    fontWeight: "bold",
  },

  footer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
});
