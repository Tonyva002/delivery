import { View, TextInput, KeyboardType, StyleSheet, Image, ImageSourcePropType } from "react-native";
import React, { useCallback } from "react";

interface Props {
  image: ImageSourcePropType;
  placeholder: string;
  value: string;
  keyboardType: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  editable?: boolean;
  onChangeText: (property: string, value: any) => void;
}

function CustomTextInput({
  image,
  placeholder,
  value,
  keyboardType,
  secureTextEntry,
  property,
  editable = true,
  onChangeText,
}: Props) {

  const handleChange = useCallback(
    (text: string) => {
      onChangeText(property, text);
    },
    [property, onChangeText]
  );

  return (
    <View style={styles.formView}>
      <Image style={styles.formImage} source={image} />
      <TextInput
        style={styles.formTextInput}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        editable={editable}
      />
    </View>
  );
}

export default React.memo(CustomTextInput);

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
