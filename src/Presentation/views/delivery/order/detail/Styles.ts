import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const AdminOrderDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsContainer: {
    width: "100%",
    height: "50%",
  },

  infoContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  infoText: {
    flex: 1,
  },

  infoTitle: {
    color: "black",
  },

  infoDescription: {
    color: "gray",
    fontSize: 13,
    marginTop: 3,
  },

  infoImage: {
    width: 25,
    height: 25,
  },

  delivery: {
    fontWeight: "bold",
    marginTop: 15,
    color: MyColors.primary,
  },

  totalInfo: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  total: {
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    width: "50%",
  },

  dropDownContainer: {
    height: 80,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AdminOrderDetailsStyles;
