
import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { RegisterWithImageAuthUserCase } from '../../../Domain/useCase/auth/RegisterWithImage';
import { pickImageUtil } from '../../../utils/pickImageUtil';
import { takePhotoUtil } from '../../../utils/takePhotoUtil';
import { UserContext } from '../../context/UserContext';

export default function useRegisterViewModel() {

const [errorMessage, setErrorMessage] = useState('');
const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    confirmPassword: '',
});

const [loading, setloading] = useState(false);
const [file, setfile] = useState<ImagePicker.ImagePickerAsset>();
const { user, getUserSesion, saveUserSesion } = useContext(UserContext);

const onChange = (property: string, value: any) => {
  setValues({...values, [property]: value})
}

const pickImage = async () => {
    await pickImageUtil({ onChange, setFile: setfile });
  };

  const takePhoto = async () => {
  await takePhotoUtil({ onChange, setFile: setfile });
};



const register = async () => {
  if(isValidForm()) {
    setloading(true);
    const response = await RegisterWithImageAuthUserCase(values, file!);
    setloading(false);
  
    if(response.success){
      await saveUserSesion(response.data);
      getUserSesion();
       
    }else {
      setErrorMessage(response.message);
     
    }
  }
}


const isValidForm = (): boolean => {

  if (values.name === ''){
    setErrorMessage('Enter your name');
    return false;
  }

  if(values.lastname === '') {
    setErrorMessage('Enter your lastname');
    return false;
  }

  if(values.email === ''){
    setErrorMessage('Enter your email');
    return false;
  }

  if(values.phone === ''){
    setErrorMessage('Enter your phone');
    return false;
  }

  if(values.password === ''){
    setErrorMessage('Enter your phone');
    return false;
  }

  if(values.confirmPassword === ''){
    setErrorMessage('Confirm your password');
    return false;
  }

  if(values.password !== values.confirmPassword){
    setErrorMessage('Passwords do not match');
    return false;
  }

  if(values.image === ''){
    setErrorMessage('Select an image');
    return false;
  }

    return true;
}

  return {
    ...values,
    loading,
    errorMessage,
    user,
    onChange,
    register,
    pickImage,
    takePhoto,
    setErrorMessage,
    
    
  }
}