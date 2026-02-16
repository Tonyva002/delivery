import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import useProfileInfoViewModel from "./ProfileInfoViewModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./Styles";
import RoundedButton from "../../../components/RoundedButton";
import { useFocusEffect } from "@react-navigation/native";
import { StackParamList } from "../../../navigator/main-navigator/MainStackNavigator";
import { MyColors, MyStyles } from "../../../theme/AppTheme";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList>;
};

export const ProfileInfoScreen = ({ navigation }: ProfileScreenProps) => {
  const { removeUserSesion, user } = useProfileInfoViewModel();
  const [loading, setLoading] = useState(!!user?.image);

  /**
   * Configuración del StatusBar cuando la pantalla entra en foco
   */
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("transparent");
    }, []),
  );

  /**
   * Si el usuario NO tiene imagen apagamos el loader
   */
  useEffect(() => {
    if (!user?.image) {
      setLoading(false);
    }
  }, [user?.image]);

  /**
   * Si no hay usuario o no tiene id, redirige al Login
   */
  useEffect(() => {
    if (!user?.id) {
      navigation.replace("LoginScreen");
    }
  }, [user?.id]);

  /**
   * Mientras el user se resuelve, no renderizamos nada
   */
  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <Image
        style={styles.imageBackground}
        source={require("../../../../../assets/city.jpg")}
      />

      {/* Botón de logout */}
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

      <View style={styles.imageContainer}>
        {/* Loader mientras carga la imagen remota */}
        {loading && (
          <ActivityIndicator
            style={MyStyles.loading}
            size="large"
            color={MyColors.primary}
          />
        )}
        {user?.image ? (
          <Image
            style={styles.image}
            recyclingKey={user.id?.toString()}
            source={{ uri: user?.image }}
            contentFit="cover"
            transition={500}
            cachePolicy={"memory-disk"}
            onLoadEnd={() => {
              setLoading(false);
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../../../../assets/user_image.png")}
          />
        )}
      </View>

      {/* Información del usuario */}
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

        <View style={{ marginTop: 30 }}>
          <RoundedButton
            onPress={() => {
              navigation.navigate("ProfileUpdateScreen", { user });
            }}
            text="ACTUALIZAR INFORMACION"
          />
        </View>
      </View>
    </View>
  );
};
