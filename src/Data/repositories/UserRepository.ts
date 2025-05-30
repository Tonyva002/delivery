import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/ApiDelivery";
import mime from "mime";
import { handleAxiosError } from "../../utils/handleAxiosError";

export class UserRepositoryImpl implements UserRepository {

  // Metodo para actualizar usuario sin imagen
  async updateWithoutImage(user: User): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        "/users/updateWithoutImage",
        user
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar usuario sin imagen");
    }
  }

  // Metodo para actualizar usuario con imagen
  async updateWithImage(
    user: User,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
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

      const { data } = await ApiDeliveryForImage.put<ResponseApiDelivery>(
        "/users/updateWithImage",
        formData
      );

      return data;
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar usuario con imagen");
    }
  }
}
