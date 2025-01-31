import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import useViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";

export default function Login({ navigation }) {
  const { email, password, onChange } = useViewModel();

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../../assets/logo.png")}
        />
        <Text style={styles.logoText}>FOOD</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>LOGIN</Text>

        <CustomTextInput
          image={require("../../../../assets/email.png")}
          placeholder="Email"
          value={email}
          keyboardtype="email-address"
          property="email"
          onChangeText={onChange}
        />

        <CustomTextInput
          image={require("../../../../assets/password.png")}
          placeholder="Password"
          value={password}
          keyboardtype="default"
          property="password"
          onChangeText={onChange}
        />

        <View style={{ marginTop: 40 }}>
          <RoundedButton
            text="LOGIN"
            onPress={() => {
              console.log("Email: " + email);
              console.log("Password" + password);
            }}
          />
        </View>

        <View style={styles.formRegister}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.formTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
