import { StyleSheet } from "react-native";
import { MyColors } from "../../../theme/AppTheme";

const CustomerShoppingBagStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  totalToPayContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: MyColors.gris_muy_claro,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
     marginBottom:105
  },
  totalInfo: {
    alignItems: "center",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonAdd: {
    width: "50%",
  },
});

export default CustomerShoppingBagStyles;
