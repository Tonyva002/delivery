import { StyleSheet } from "react-native";


const AdminUpdateCategoryStyles = StyleSheet.create({
   container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 50,
        alignItems: 'center'
     
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    form: {
        backgroundColor: 'white',
        height: '65%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        marginTop: 40,
        bottom: 0
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left:20,
        right:20
    }


});

export default AdminUpdateCategoryStyles;
