import { View, Image, Text, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import styles from "./Styles";
import { ScrollView } from "react-native-gesture-handler";
import CustomTextInput from "../../components/CustomTextInput";
import RoundedButton from "../../components/RoundedButton";

export default function Register() {
  const {
    name,
    lastname,
    email,
    phone,
    password,
    confirmPassword,
    errorMessage,
    onChange,
    register,
  } = useViewModel();

  useEffect(() => {
    if (errorMessage != "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../assets/chef.jpg")}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../../../assets/user_image.png")}
        />
        <Text style={styles.logoText}>SELECT AN IMAGE</Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Register</Text>

          <CustomTextInput
            placeholder="Name"
            keyboardtype="default"
            image={require("../../../../assets/user.png")}
            property="name"
            onChangeText={onChange}
            value={name} />

          <CustomTextInput
            placeholder="Last Name"
            keyboardtype="default"
            image={require("../../../../assets/my_user.png")}
            property="lastname"
            onChangeText={onChange}
            value={lastname} />

<CustomTextInput
            placeholder="Email"
            keyboardtype="email-address"
            image={require("../../../../assets/email.png")}
            property="email"
            onChangeText={onChange}
            value={email} />


<CustomTextInput
            placeholder="Phone"
            keyboardtype="numeric"
            image={require("../../../../assets/phone.png")}
            property="phone"
            onChangeText={onChange}
            value={phone} />



<CustomTextInput
            placeholder="Password"
            keyboardtype="default"
            image={require("../../../../assets/password.png")}
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true} />

<CustomTextInput
            placeholder="Confirm Password"
            keyboardtype="default"
            image={require("../../../../assets/confirm_password.png")}
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true} />


            <View style={{marginTop: 30}}>
              <RoundedButton text="SAVE" onPress={() => register()} />

            </View>
        </ScrollView>

      </View>
    </View>
  );
}
