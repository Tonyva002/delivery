import React, { useEffect } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity, Pressable } from "react-native";
import userViewModel from "./ViewModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./Styles";
import RoundedButton from "../../../components/RoundedButton";
import { useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "../../../navigator/MainStackNavigator";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList>;
};

export const ProfileInfoScreen = ({ navigation }: ProfileScreenProps) => {
  const { removeUserSesion, user } = userViewModel();

  useFocusEffect(
  React.useCallback(() => {
    // código que se ejecuta al enfocarse la pantalla
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000');
  }, [])
);

useEffect(()=> {
  if(user.id === ''){
    navigation.replace('LoginScreen');
  }
}, [user])



  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../../../../../assets/city.jpg")}
      />
       <Pressable
       style={styles.logout}
       onPress={() => {
        removeUserSesion();
       }}
       >
        <Image
            source={require("../../../../../assets/logout.png")}
            style={styles.logoutImage}
          />
       </Pressable>

      <View style={styles.logoContainer}>
       {
        user?.image == "" ?
         <Image style={styles.logoImage} source={require("../../../../../assets/user_image.png")} />

        : user?.image !== ""
        &&
        <Image style={styles.logoImage} source={{ uri: user?.image }} />
       }
      </View>

      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require("../../../../../assets/user.png")}
            style={styles.formImage}
          />

          <View style={styles.formContent}>
            <Text>
              {user?.name} {user?.lastname}
            </Text>
            <Text style={styles.formTextDescription}>Nombre del usuario</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require("../../../../../assets/email.png")}
            style={styles.formImage}
          />

          <View style={styles.formContent}>
            <Text> {user?.email}</Text>
            <Text style={styles.formTextDescription}>Correo electronico</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 40 }}>
          <Image
            source={require("../../../../../assets/phone.png")}
            style={styles.formImage}
          />

          <View style={styles.formContent}>
            <Text> {user?.phone}</Text>
            <Text style={styles.formTextDescription}>Telefono</Text>
          </View>
        </View>

         <RoundedButton onPress={() => {
          navigation.navigate('ProfileUpdateScreen', {user: user!});
         }} text="ACTUALIZAR INFORMACION" />
      </View>
    </View>
  );
};
