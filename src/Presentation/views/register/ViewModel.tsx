
import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { RegisterAuthUserCase } from '../../../Domain/useCase/auth/RegisterAuth';

export default function ViewModel() {

const [errorMessage, setErrorMessage] = useState('');
const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
});

const onChange = (property: string, value: any) => {
  setValues({...values, [property]: value})
}

const register = async () => {
  if(isValidForm()) {
    const response = await RegisterAuthUserCase(values);
    console.log('RESULT:' + JSON.stringify(response));

    if(response.success){
      ToastAndroid.show(JSON.stringify(response.message), ToastAndroid.LONG);
      
    }else {
      ToastAndroid.show(JSON.stringify(response.message), ToastAndroid.LONG);
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

    return true;
}

  return {
    ...values,
    onChange,
    register,
    errorMessage
  }
}