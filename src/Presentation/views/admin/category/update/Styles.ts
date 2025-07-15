import { StyleSheet } from "react-native";

const AdminUpdateCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  form: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    marginTop: 30,
    paddingTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
    /* position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,*/
  },
});

export default AdminUpdateCategoryStyles;
