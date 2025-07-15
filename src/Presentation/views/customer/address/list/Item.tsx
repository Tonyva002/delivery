import React from "react";
import { Address } from "../../../../../Domain/entities/Address";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { MyColors } from "../../../../theme/AppTheme";

interface Props {
  address: Address;
  checked: string;
  changeRadioValue: (address: Address) => void;
}

export default function AddressListItem({
  address,
  checked,
  changeRadioValue,
}: Props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.info}>
          <RadioButton
            value={address.id!}
            status={checked === address.id ? "checked" : "unchecked"}
            onPress={() => changeRadioValue(address)}
          />

          <View style={styles.infoAddress}>
            <Text style={styles.address}>{address.address}</Text>
            <Text style={styles.neighborhood}>{address.neighborhood}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 7,
    alignItems: "center",
  },

  info: {
    flexDirection: "row",
    padding: 10,
  },

  infoAddress: {
        marginLeft: 5,
       
  },

  address: {
        fontWeight: 'bold',

  },

  neighborhood: {
        fontSize: 12

  },

  divider: {
    width: "100%",
    height: 1,
    marginHorizontal: 20,
    backgroundColor: MyColors.gris_casi_blanco,
  },
});
