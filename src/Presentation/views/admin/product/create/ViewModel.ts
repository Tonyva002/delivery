import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {pickImageUtil } from "../../../../../utils/pickImageUtil";
import {takePhotoUtil } from "../../../../../utils/takePhotoUtil";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";

export default function useAdminProductCreateViewModel(category: Category) {

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: 0.0,
    image1: '',
    image2: '',
    image3: '',
    id_category: category.id
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [file1, SetFile1] = useState<ImagePicker.ImagePickerAsset>();
  const [file2, SetFile2] = useState<ImagePicker.ImagePickerAsset>();
  const [file3, SetFile3] = useState<ImagePicker.ImagePickerAsset>();
  const {create} = useContext(ProductContext);

  // Metodo para actualizar dinámicamente las propiedades del formulario
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Metodo para selecionar imagen desde la galeria del dispositivo
  const pickImage = async (numberImage: number) => {
    await pickImageUtil({ onChange, setFile1: SetFile1, setFile2: SetFile2, setFile3: SetFile3, numberImage: numberImage });
  };

  // Metodo para tomar fotos con la camara del dispositivo
  const takePhoto = async (numberImage: number) => {
    await takePhotoUtil({ onChange, setFile1: SetFile1, setFile2: SetFile2, setFile3: SetFile3, numberImage: numberImage});
  };

  // Metodo para crear producto
  const createProduct = async () => {
      let files = [];
      files.push(file1!);
      files.push(file2!);
      files.push(file3!);
      setLoading(true);
      const response = await create(values, files);
      setLoading(false);
      setResponseMessage(response.message);

      if(response.success){
       resetForm();
      }
      
  };

  // Metodo para limpiar formulario
  const resetForm = async () => {
    setValues({
      name: '',
      description: '',
      price: 0.0,
      image1: '',
      image2: '',
      image3: '',
      id_category: category.id
    });
  };

  return {
    ...values,
    responseMessage,
    setResponseMessage,
    loading,
    onChange,
    pickImage,
    takePhoto,
    createProduct
    
 

  };
}
