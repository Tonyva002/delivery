import { Category } from "../../Domain/entities/Category";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
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

export class CategoryRepositoryImp implements CategoryRepository {
  
  //Listar las categorias
  async getAll(): Promise<Category[]> {
    try {
      const response = await ApiDelivery.get<Category[]>("/categories/getAll");
      return response.data;

    } catch (error) {
      handleAxiosError(error, "Error al listar la categoría");
      return Promise.resolve([]);
    }
  }

  // Crear categoria
  async create(category: Category, file: ImagePickerAsset): Promise<Response> {
    try {
      const formData = new FormData();
      const fileUri = file.uri;
      const fileName = fileUri.split("/").pop() || "image.jpg";
      const fileType = mime.getType(fileUri) || "image/jpeg";

      formData.append("image", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      } as any);

      formData.append("category", JSON.stringify(category));
      
      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>("/categories/create", formData);
      return ResponseApiMapper.toDomain(response.data);

    } catch (error) {
      const apiError = handleAxiosError(error, "Error al crear categoría");
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  // Actualizar categoria con imagen
  async updateWithImage(category: Category, file: ImagePickerAsset): Promise<Response> {
    try {
      const formData = new FormData();
      const fileUri = file.uri;
      const fileName = fileUri.split("/").pop() ?? "image.jpg";
      const fileType = mime.getType(fileUri) ?? "image/jpeg";

      formData.append("image", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      } as any);

      formData.append("category", JSON.stringify(category));
      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>("/categories/updateWithImage", formData);
      return ResponseApiMapper.toDomain(response.data);

    } catch (error) {
      const apiError = handleAxiosError(error, "Error al actualizar la categoría");
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  // Actualizar la categoria sin imagen
  async updateWithoutImage(category: Category): Promise<Response> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>("/categories/updateWithoutImage", category);
      return ResponseApiMapper.toDomain(response.data);

    } catch (error) {
      const apiError =  handleAxiosError(error, "Error al actualizar la categoría");
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  // Eliminar categoria
  async remove(id: string): Promise<Response> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>( `/categories/delete/${id}`);
      return ResponseApiMapper.toDomain(response.data);

    } catch (error) {
      const apiError = handleAxiosError(error, "Error al eliminar la categoría");
      return ResponseApiMapper.toDomain(apiError);
    }
  }
}
