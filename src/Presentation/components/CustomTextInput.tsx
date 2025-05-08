import { View, TextInput, KeyboardType, StyleSheet, Image } from "react-native";
import React from "react";


interface Props {
  image: any;
  placeholder: string;
  value: string;
  keyboardtype: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  onChangeText: (property: string, value: any) => void;
}

export default function CustomTextInput({
  image,
  placeholder,
  value,
  keyboardtype,
  secureTextEntry,
  property,
  onChangeText,
}: Props) {
  return (
    <View style={styles.formInput}>
      <Image style={styles.formIcon} source={image} />
      <TextInput
        style={styles.formTextInput}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardtype}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(property, text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },

  formInput: {
    flexDirection: "row",
    marginTop: 25,
  },

  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 16,
  },
});
