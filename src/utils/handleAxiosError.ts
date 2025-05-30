import { AxiosError } from "axios";
import { ResponseApiDelivery } from "../Data/sources/models/ResponseApiDelivery";


export function handleAxiosError(error: unknown, customMessage: string): ResponseApiDelivery {
  const axiosError = error as AxiosError;
  const responseData = axiosError.response?.data;

  console.error(`${customMessage}:`, JSON.stringify(responseData));

  return {
    success: false,
    message: "Error en la petición",
    data: null,
    ...(typeof responseData === "object" ? responseData : {}),
  };
}
