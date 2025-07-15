import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/ApiDelivery";
import { ImagePickerAsset } from "expo-image-picker";
import mime from "mime";
import { handleAxiosError } from "../../utils/handleAxiosError";

export class AuthRepositoryImpl implements AuthRepository {

  // Metodo para loguearse en la aplicacion
  async login(email: string, password: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>("/users/login", {email, password,});
      return Promise.resolve(response.data);

    } catch (error) {
      return handleAxiosError(error, "Error al loguearse en la aplicacion");
    }
  }

  // Metodo para registrarse sin imagen
  async register(user: User): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>("/users/create", user);
      return Promise.resolve(response.data);
    } catch (error) {
      return handleAxiosError(error, "Error al registrar usuario sin imagen");
    }
  }

  // Metodo para registrarse con imagen
  async registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {
    try {
      if (!file?.uri) {
        throw new Error("La imagen seleccionada no es válida.");
      }

      const formData = new FormData();
      const filename = file.uri.split("/").pop() || "image.jpg";
      const fileType = mime.getType(file.uri) || "image/jpeg";

      formData.append("image", {
        uri: file.uri,
        name: filename,
        type: fileType,
      } as any);

      formData.append("user", JSON.stringify(user));

      const { data } = await ApiDeliveryForImage.post<ResponseApiDelivery>("/users/createWithImage", formData);
      return data;
      
    } catch (error) {
      return handleAxiosError(error, "Error al registrar usuario con imagen");
    }
  }
}
