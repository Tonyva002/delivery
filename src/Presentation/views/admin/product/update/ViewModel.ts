import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {pickImageUtil } from "../../../../../utils/pickImageUtil";
import {takePhotoUtil } from "../../../../../utils/takePhotoUtil";
import { Category } from "../../../../../Domain/entities/Category";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../../../../Data/sources/models/ResponseApiDelivery";

export default function useAdminProductUpdateViewModel(product: Product, category: Category) {

  const [values, setValues] = useState(product);

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [file1, SetFile1] = useState<ImagePicker.ImagePickerAsset>();
  const [file2, SetFile2] = useState<ImagePicker.ImagePickerAsset>();
  const [file3, SetFile3] = useState<ImagePicker.ImagePickerAsset>();
  const {updateWithImage, updateWithoutImage} = useContext(ProductContext);

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
  const updateProduct = async () => {
      let files = [];
      files.push(file1!);
      files.push(file2!);
      files.push(file3!);
      setLoading(true);
      
      let response = {} as ResponseApiDelivery;
      if(values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')){
        response = await updateWithoutImage(values);
      }else {
        response = await updateWithImage(values, files)

      }
      
      setLoading(false);
      setResponseMessage(response.message);     
  };



  return {
    ...values,
    loading,
    responseMessage,
    setResponseMessage,
    onChange,
    pickImage,
    takePhoto,
    updateProduct,
    
    
    
 

  };
}
