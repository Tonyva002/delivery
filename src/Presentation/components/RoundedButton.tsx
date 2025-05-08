import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface Props {
  text: string;
  onPress: () => void;
}

export default function RoundedButton({ text, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.roundedButton} onPress={() => onPress()}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roundedButton: {
    width: "100%",
    height: 50,
    backgroundColor: MyColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  textButton: {
    color: "white",
  },
});
