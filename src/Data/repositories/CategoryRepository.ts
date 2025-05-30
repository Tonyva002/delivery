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

export class CategoryRepositoryImp implements CategoryRepository {
  //Metodo para listar las categorias
  async getAll(): Promise<Category[]> {
    try {
      const response = await ApiDelivery.get<Category[]>("/categories/getAll");
      return Promise.resolve(response.data);
    } catch (error) {
      handleAxiosError(error, "Error al listar la categoría");
      return Promise.resolve([]);
    }
  }

  // Metodo para crear categoria
  async create(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
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

      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/categories/create",
        formData
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "Error al crear categoría");
    }
  }

  // Metodo para actualizar categoria con imagen
  async updateWithImage(
    category: Category,
    file: ImagePickerAsset
  ): Promise<ResponseApiDelivery> {
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
      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>(
        "/categories/updateWithImage",
        formData
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar la categoría");
    }
  }

  // Metodo para actualizar la categoria sin imagen
  async updateWithoutImage(category: Category): Promise<ResponseApiDelivery> {
    
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        "/categories/updateWithoutImage", category);
      return Promise.resolve(response.data);
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar la categoría");
    }
  }

  // Metodo para eliminar categoria
  async remove(id: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(
        `/categories/delete/${id}`
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return handleAxiosError(error, "Error al eliminar la categoría");
    }
  }
}
