import { View, TextInput, KeyboardType, StyleSheet, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface Props {
  image: ImageSourcePropType;
  placeholder: string;
  value: string;
  keyboardtype: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  editable?: boolean;
  onChangeText: (property: string, value: any) => void;
}

export default function CustomTextInput({
  image,
  placeholder,
  value,
  keyboardtype,
  secureTextEntry,
  property,
  editable = true,
  onChangeText,
}: Props) {
  return (
    <View style={styles.formView}>
      <Image style={styles.formImage} source={image} />
      <TextInput
        style={styles.formTextInput}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardtype}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(property, text)}
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formView: {
    flexDirection: "row",
    marginTop: 25,
  },

  formImage: {
    width: 25,
    height: 25,
    marginTop: 5,
  },

  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    marginLeft: 16,
  },
});
