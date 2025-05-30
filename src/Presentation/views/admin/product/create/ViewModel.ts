import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { pickImage as pickImageUtil } from "../../../../../utils/pickImage";
import { takePhoto as takePhotoUtil } from "../../../../../utils/takePhoto";
import { CategoryContext } from "../../../../context/CategoryContext";

export default function AdminProductCreateViewModel() {

  const [file, setfile] = useState<ImagePicker.ImagePickerAsset>();
  const [values, setValues] = useState({
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    id_category: '',
    price: ''
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const {create} = useContext(CategoryContext);

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

  // Metodo para crear categoria
 /* const createCategory = async () => {
    setLoading(true);
    const response = await create(values, file!);
    setLoading(false);
    setResponseMessage(response.message);
    resetForm();
  };*/

  // Metodo para limpiar formulario
/*  const resetForm = async () => {
    setValues({
    /*  name: "",
      description: "",
      image: "",
    });
  };*/

  return {
    ...values,
    responseMessage,
    setResponseMessage,
    loading,
    onChange,
    pickImage,
    takePhoto,
 

  };
}
