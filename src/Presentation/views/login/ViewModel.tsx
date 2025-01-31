

import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function LoginViewModel() {

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

  return {
    ...values,
    onChange

  }
    
    
  
}