import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminProductCreateStyles = StyleSheet.create({
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
    top: "10%",
    gap: 20,
  
  },
  image: {
    width: 104,
    height: 104,
    borderRadius: 100,
  },
  form: {
    backgroundColor: "white",
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    marginTop: 90,
  },
 
});

export default AdminProductCreateStyles;
