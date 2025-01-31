import { StyleSheet } from "react-native";


const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%'
    },

    logoImage: {
        width: 100,
        height: 100
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },

    form: {
        width: '100%',
        height: '50%',
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },

    formTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },


    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },

    formTextRegister: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default LoginStyles;