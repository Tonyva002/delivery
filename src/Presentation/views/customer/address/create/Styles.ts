import { StyleSheet } from "react-native";

const CustomerAddressCreateStyles = StyleSheet.create({
   container: {
        flex: 1,
    },
    imageContainer: {
        paddingTop: 30,
        
    },
    
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'contain'
    },
    form: {
        position: 'absolute',
        backgroundColor: 'white',
        height: '75%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        bottom: 0
    },
    buttonContainer: {
        marginTop: 30
        
    }


});

export default CustomerAddressCreateStyles;
