
import {  ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { RegisterAuthUserCase } from '../../../Domain/useCase/auth/RegisterAuth';
import { useUserLocal } from '../../hooks/useUserLocal';
import * as ImagePicker from 'expo-image-picker';
import { RegisterWithImageAuthUserCase } from '../../../Domain/useCase/auth/RegisterWithImage';
import { SaveUserLocalUseCase } from '../../../Domain/useCase/userLocal/SaveUserLocal';

export default function ViewModel() {

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
const { user, getUserSession } = useUserLocal();

const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requieren permisos para acceder a la galeria');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets.length > 0){
      onChange('image', result.assets[0].uri);
      setfile(result.assets[0]);
    }
    
  } catch (error) {
    console.error('Error al seleccionar imagen: ', error); 
  }

};

const takePhoto = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if(status !== 'granted' ){
    alert('Se requieren permisos para acceder a la camara')
    return;
  }

  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
    selectionLimit: 1
  });

  if(!result.canceled && result.assets.length > 0) {
    onChange('image', result.assets[0].uri);
    setfile(result.assets[0]);
  }
    
  } catch (error) {
    console.error('Error al tomar foto', error);
    
  }
};

const onChange = (property: string, value: any) => {
  setValues({...values, [property]: value})
}

const register = async () => {
  if(isValidForm()) {
    setloading(true);
    const response = await RegisterWithImageAuthUserCase(values, file!);
    setloading(false);
    console.log('RESULT:' + JSON.stringify(response));

    if(response.success){
      await SaveUserLocalUseCase(response.data);
      getUserSession();
       
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
    setErrorMessage
    
  }
}