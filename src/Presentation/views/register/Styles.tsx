import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
  },

  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "8%",
    alignItems: "center",
  },

  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },

  form: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },

  formTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  formSave: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  formTextSave: {
    fontStyle: "italic",
    color: "orange",
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    fontWeight: "bold",
    marginLeft: 10,
  },

  loading: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  }
});

export default registerStyles;
