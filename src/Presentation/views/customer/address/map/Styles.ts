import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const CustomerAddressMapStyles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
        },
        map: {
                width: '100%',
                height: '100%'
        },

        imageLocation: {
                position: 'absolute',
                justifyContent: 'center'
        },

        redPoint: {
                position: 'absolute',
                width: '70%',
                backgroundColor: MyColors.gris_medio,
                paddingVertical: 4,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                top: 40


        },
        redPointText: {
                textAlign: 'center',
                

        },

        buttonRefPoint: {
                position: 'absolute',
                width: '70%',
                bottom: 104,

        }


})

export default CustomerAddressMapStyles;