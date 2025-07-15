import { StyleSheet } from "react-native";

const ProfileUpdateStyles = StyleSheet.create({
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

  imageContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "6%",
    
    
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2
  },

  textImage: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },

  form: {
    position: 'absolute',
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    bottom: 0,
  },

  formTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

   buttonContainer: {
        marginTop: 30
        
    }

});

export default ProfileUpdateStyles;
