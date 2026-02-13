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
import { Response } from "../../Domain/models/Response";
import { ResponseApiMapper } from "../mappers/ResponseApiMapper";

export class AuthRepositoryImpl implements AuthRepository {
  // Login
  async login(email: string, password: string): Promise<Response> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>(
        "/users/login",
        { email, password },
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(
        error,
        "Error al iniciar sesión",
      );
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  // Registro sin imagen
  async register(user: User): Promise<Response> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>(
        "/users/create",
        user,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(
        error,
        "Error al registrar usuario sin imagen",
      );
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  // Registro con imagen
  async registerWithImage(
    user: User,
    file: ImagePickerAsset,
  ): Promise<Response> {
    try {
      if (!file?.uri) {
        throw new Error("La imagen seleccionada no es válida.");
      }

      const formData = new FormData();
      const filename = file.uri.split("/").pop() ?? "image.jpg";
      const fileType = mime.getType(file.uri) ?? "image/jpeg";

      formData.append("image", {
        uri: file.uri,
        name: filename,
        type: fileType,
      } as any);

      formData.append("user", JSON.stringify(user));

      const { data } = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/users/createWithImage",
        formData,
      );
      return ResponseApiMapper.toDomain(data);
    } catch (error) {
      const apiError = handleAxiosError(
        error,
        "Error al registrar usuario con imagen",
      );
      return ResponseApiMapper.toDomain(apiError);
    }
  }
}
