import { AxiosError } from "axios";
import { ResponseApiDelivery } from "../Data/sources/models/ResponseApiDelivery";

export function handleAxiosError(error: unknown, customMessage: string): ResponseApiDelivery {
  let errorMessage = "Error desconocido";
  let responseData: any = null;

  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
      responseData = axiosError.response.data;
      errorMessage = JSON.stringify(responseData);
    } else if (axiosError.message) {
      errorMessage = axiosError.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return {
    success: false,
    message: `${customMessage}: ${errorMessage}`,
    data: null,
    ...(typeof responseData === "object" ? responseData : {}),
  };
}
