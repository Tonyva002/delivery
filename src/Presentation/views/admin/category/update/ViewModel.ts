import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { pickImage as pickImageUtil } from "../../../../../utils/pickImage";
import { takePhoto as takePhotoUtil } from "../../../../../utils/takePhoto";
import { Category } from "../../../../../Domain/entities/Category";
import { ResponseApiDelivery } from "../../../../../Data/sources/models/ResponseApiDelivery";
import { CategoryContext } from "../../../../context/CategoryContext";

export default function AdminUpdateCategoryViewModel(category: Category) {
  const [file, setfile] = useState<ImagePicker.ImagePickerAsset>();

  const [values, setValues] = useState(category );

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const {updateWithImage, updateWithoutImage} = useContext(CategoryContext);

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

  // Metodo para actualizar una categoria
  const updateCategory = async () => {
    setLoading(true);
    let response = {} as ResponseApiDelivery;
    if(values.image?.includes("https://")){
     response = await updateWithoutImage(values);

    }else {
     response = await updateWithImage(values, file!);

    }
    setLoading(false);
    setResponseMessage(response.message);
   
  };



  return {
    ...values,
    responseMessage,
    setResponseMessage,
    loading,
    onChange,
    pickImage,
    takePhoto,
    updateCategory,

  };
}
