import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminProductUpdateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
    
  },

  imageContainer: {
    flexDirection: "row", 
    position: "absolute",
    alignSelf: "center",
    top: "8%",
    gap: 20,
  
  },
  image: {
    width: 104,
    height: 104,
    borderRadius: 100,
  },
  form: {
    backgroundColor: "white",
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    marginTop: 80,
  },
  categoryInfo: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCategory: {
    width: 50,
    height: 50,
  },

  textCategoryTilte: {
    marginLeft: 17,
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },

  textCategoryValue: {
    marginLeft: 17,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminProductUpdateStyles;
