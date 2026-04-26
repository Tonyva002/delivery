import { useContext, useState, useCallback } from "react";
import { loginAuthUseCase } from "../../../core/di/AuthContainer";
import { UserContext } from "../../context/UserContext";

type FormValues = {
  email: string;
  password: string;
};

export default function useLoginViewModel() {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const { user, saveUserSesion } = useContext(UserContext);

  const onChange = useCallback((property: keyof FormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [property]: value,
    }));
  }, []);

  // Validacion del formulario
  const isValidForm = useCallback((): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      return "Invalid email";
    }

    if (!values.password.trim()) {
      return "Enter a password";
    }

    return null;
  }, [values]);

  // Metodo para loguearse y guardar al usuario en sesion
  const login = useCallback(async () => {
    const error = isValidForm();

    if (error) {
      setErrorMessage(error);
      return;
    }

    const response = await loginAuthUseCase.execute(
      values.email,
      values.password,
    );

    if (!response.success) {
      setErrorMessage(response.message);
    } else {
      saveUserSesion(response.data);
    }
  }, [values, saveUserSesion, isValidForm]);

  return {
    ...values,
    onChange,
    login,
    setErrorMessage,
    errorMessage,
    user,
  };
}
