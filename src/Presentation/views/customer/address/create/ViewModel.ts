import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import CreateAddressUseCase from "../../../../../Domain/useCase/address/CreateAddress";
import { useAddress } from "../../../../context/AddressContext";

export default function useCustomerAddresCreateViewModel() {
  const [values, setValues] = useState({
    address: "",
    neighborhood: "",
    zipcode: "",
    city: "",
    country: "",
    refPoint: "",
    lat: 0.0,
    lng: 0.0,
    id_user: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, saveUserSesion, getUserSesion } = useContext(UserContext);
  const { refPoint, latitude, longitude, resetAddress } = useAddress();

  // Actualiza el id del usuario
  useEffect(() => {
    if (user?.id != "") {
      onChange("id_user", user.id);
    }
  }, [user?.id]);

  // Metodo para actualizar dinámicamente las propiedades del formulario
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Metodo para actualizar dinámicamente las propiedades del formulario (refPoint, lat, lng)
  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint, lat, lng });
  };

  // Metodo para crear direcciones
  const createAddress = async () => {
    if (isValidForm()) {
      setLoading(true);
      const response = await CreateAddressUseCase(values);
      setLoading(false);
      setResponseMessage(response.message);
      if (response.success) {
        resetForm();
        user.address = values;
        user.address.id = response.data
        await saveUserSesion(user);
        getUserSesion();
      }
    }
  };

  // Metodo para limpiar formulario
  const resetForm = async () => {
    setValues({
      address: "",
      neighborhood: "",
      zipcode: "",
      city: "",
      country: "",
      refPoint: "",
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!,
    });
  };
  
  //Metodo para validar los campos del formulario
  const isValidForm = (): boolean => {
    
    if (values.address === "") {
      setErrorMessage("Enter your address");
      return false;
    }

    if (values.neighborhood === "") {
      setErrorMessage("Enter your neighborhood");
      return false;
    }

    if (values.zipcode === "") {
      setErrorMessage("Enter your zip code");
      return false;
    }

    if (values.city === "") {
      setErrorMessage("Enter your city");
      return false;
    }

    if (values.country === "") {
      setErrorMessage("Enter your country");
      return false;
    }

    if (values.refPoint === "") {
      setErrorMessage("Confirm your refPoint");
      return false;
    }

    return true;
  };

  return {
    ...values,
    loading,
    responseMessage,
    errorMessage,
    refPoint, 
    latitude, 
    longitude, 
    resetAddress,
    setResponseMessage,
    setErrorMessage,
    onChange,
    onChangeRefPoint,
    createAddress,
  };
}
