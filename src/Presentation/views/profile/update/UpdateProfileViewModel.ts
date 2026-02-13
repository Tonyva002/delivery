import { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../../Domain/entities/User";
import { UserContext } from "../../../context/UserContext";
import { pickImageUtil } from "../../../../utils/pickImageUtil";
import { takePhotoUtil } from "../../../../utils/takePhotoUtil";
import { Response } from "../../../../Domain/models/Response";
import {
  updateUserUseCase,
  updateUserWithImageUseCase,
} from "../../../../core/di/UserContainer";

export default function useUpdateProfileViewModel(user: User) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      let response = {} as Response;

      if (values.image?.includes("https://")) {
        response = await updateUserUseCase.execute(values);
      } else {
        response = await updateUserWithImageUseCase.execute(values, file!);
      }

      setLoading(false);
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
