import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useAddress } from "../../../../context/AddressContext";

export default function useCustomerCreateAddressViewModel() {
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
  const { refPoint, latitude, longitude, createAddress, resetAddress } =
    useAddress();

  // Actualizar el id del usuario
  useEffect(() => {
    if (user?.id) {
      onChange("id_user", user.id);
    }
  }, [user?.id]);

  // Metodo para actualizar el formulario
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  // Metodo para actualizar dinámicamente las propiedades del formulario (refPoint, lat, lng)
  const onChangeRefPoint = (refPoint: string, lat: number, lng: number) => {
    setValues({ ...values, refPoint, lat, lng });
  };

  // Metodo para crear direcciones
  const submit = async () => {
    if (!isValidForm()) return;
    setLoading(true);
    const response = await createAddress(values);
    setLoading(false);

    setResponseMessage(response.message);
    if (response.success) {
      resetForm();
      user.address = values;
      user.address.id = response.data;
      await saveUserSesion(user);
      getUserSesion();
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
    if (!values.address) return setError("Enter your address");
    if (!values.neighborhood) return setError("Enter your neighborhood");
    if (!values.zipcode) return setError("Enter your zip code");
    if (!values.city) return setError("Enter your city");
    if (!values.country) return setError("Enter your country");
    if (!values.refPoint) return setError("Confirm your refPoint");
    return true;
  };

  const setError = (msg: string): false => {
    setErrorMessage(msg);
    return false;
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
    submit,
  };
}
