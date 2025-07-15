import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const CustomerProductDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productImage: {
    width: "100%",
    height: "45%",
  },
  productDetail: {
    position: "absolute",
    width: "100%",
    height: "58%",
    backgroundColor: "white",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  divider: {
    height: 1,
    backgroundColor: MyColors.gris_muy_claro,
    marginTop: 15,
  },

  productInfo: {
    padding: 30,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },

  descriptionValue: {
    fontSize: 13,
    marginTop: 5,
  },

  actionsContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: MyColors.gris_casi_blanco,
    paddingHorizontal: 30,
  },

  actionText: {
    color: "white",
    fontSize: 15,
  },

  actionLess: {
    backgroundColor: MyColors.gris_oscuro,
    padding: 10,
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  quantity: {
    backgroundColor: MyColors.gris_oscuro,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: "center",
  },
  actionAdd: {
    backgroundColor: MyColors.gris_oscuro,
    padding: 10,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  buttonAdd: {
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  back: {
    position: "absolute",
    top: 35,
    left: 15,
  },

  backImage: {
    width: 32,
    height: 32,
  },
});

export default CustomerProductDetailStyles;
