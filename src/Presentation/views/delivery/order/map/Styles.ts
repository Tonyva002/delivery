import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const DeliveryOrderMapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    width: "100%",
    height: "64%",
    top: 0,
  },

  buttonRefPoint: {
    width: "100%",
    marginTop: 15,
  },

  info: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "37%",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    alignItems: "center",
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

  divider: {
    backgroundColor: MyColors.gris_muy_claro,
    width: "100%",
    height: 1,
    marginTop: 15,
  },

  infoCustomer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 15,
    
  },

  imageCustomer: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },

  imagePhone: {
    width: 30,
    height: 30,
    borderRadius: 15,

  },
  nameCustomer: {
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
    marginLeft: 15
  },


  markerImage: {
    width: 50,
    height: 50,
    transform: [{ scale: 0.7 }],
   
  },

  backContainer: {
    position: 'absolute',
    top: 50,
    left:20

  },

  back: {
    width: 40,
    height: 40

  }
});

export default DeliveryOrderMapStyles;
