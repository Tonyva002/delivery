import { StyleSheet } from "react-native";


const ProfileInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
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
    top: "14%",
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2
    
    
  },

   form: {
        width: '100%',
        height: '48%',
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },

    formImage: {
        height: 40,
        width: 40
    },

    formInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    formContent: {
        marginLeft: 15

    },

    formTextDescription: {
        fontSize: 12,
        color: 'gray'

    },

    logout: {
        position: 'absolute',
        top: 50, 
        right: 15,
        
    },

    logoutImage: {
        width: 40,
        height: 40,
        

    }



});

export default ProfileInfoStyles;
