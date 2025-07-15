import React, { useContext, useState } from "react";
import { LoginAuthUseCaseLocal } from "../../../Domain/useCase/auth/LoginAuth";
import { UserContext } from "../../context/UserContext";


export default function useLoginViewModel() {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

 const{user, getUserSesion, saveUserSesion} = useContext(UserContext);
 
  console.log('USUARIO DE SESION: ' + JSON.stringify(user, null, 3));

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCaseLocal(
        values.email,
        values.password
      );
      console.log("RESPONSE LOGIN: " + JSON.stringify(response, null, 3));

      if(!response.success){
        setErrorMessage(response.message);

      }else {
        saveUserSesion(response.data);
        getUserSesion();
        
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Enter a email");
      return false;
    }

    if (values.password === "") {
      setErrorMessage("Enter a password");
      return false;
    }

    return true;
  };

  return {
    ...values,
    onChange,
    login,
    setErrorMessage,
    errorMessage,
    user
  };
}
