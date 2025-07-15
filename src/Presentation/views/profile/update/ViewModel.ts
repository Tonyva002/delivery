import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { updateUserWithoutImageUseCase } from "../../../../Domain/useCase/user/UpdateUserWithoutImage";
import { User } from "../../../../Domain/entities/User";
import { ResponseApiDelivery } from "../../../../Data/sources/models/ResponseApiDelivery";
import { updateUserWithImageUseCase } from "../../../../Domain/useCase/user/UpdateUserWithImage";
import { UserContext } from "../../../context/UserContext";
import {pickImageUtil } from "../../../../utils/pickImageUtil";
import {takePhotoUtil } from "../../../../utils/takePhotoUtil";

export default function useProfileUpdateViewModel(user: User) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState(user);
  const [loading, setloading] = useState(false);
  const [file, setfile] = useState<ImagePicker.ImagePickerAsset>();
  const { saveUserSesion } = useContext(UserContext);

  // Metodo para actualizar dinámicamente las propiedades del formulario
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };
  // Metodo para selecionar imagen desde la galeria del dispositivo
  const pickImage = async () => {
    await pickImageUtil({ onChange, setFile: setfile });
  };

  // Metodo para tomar fotos con la camara del dispositivo
  const takePhoto = async () => {
    await takePhotoUtil({ onChange, setFile: setfile });
  };

  // Metodo para actualizar usuario
  const update = async () => {
    if (isValidForm()) {
      setloading(true);
      let response = {} as ResponseApiDelivery;

      if (values.image?.includes("https://")) {
        response = await updateUserWithoutImageUseCase(values);
      } else {
        response = await updateUserWithImageUseCase(values, file!);
      }

      setloading(false);
      console.log("Usuario actualizado:" + JSON.stringify(response));

      if (response.success) {
        saveUserSesion(response.data);
        setSuccessMessage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.name === "") {
      setErrorMessage("Enter your name");
      return false;
    }

    if (values.lastname === "") {
      setErrorMessage("Enter your lastname");
      return false;
    }

    if (values.phone === "") {
      setErrorMessage("Enter your phone");
      return false;
    }

    return true;
  };

  return {
    ...values,
    loading,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    onChange,
    update,
    pickImage,
    takePhoto,
  };
}
