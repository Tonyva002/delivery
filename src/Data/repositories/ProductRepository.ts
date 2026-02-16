import mime from "mime";
import { ImagePickerAsset } from "expo-image-picker";

import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { Response } from "../../Domain/models/Response";

import {
  ApiDelivery,
  ApiDeliveryForImage,
} from "../sources/remote/ApiDelivery";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ResponseApiMapper } from "../mappers/ResponseApiMapper";

import { handleAxiosError } from "../../utils/handleAxiosError";

export class ProductRepositoryImp implements ProductRepository {
  //Metodo para obtener productos por categoria
  async getProductByCategory(id_category: string): Promise<Product[]> {
    try {
      const response = await ApiDelivery.get<Product[]>(
        `/products/findByCategory/${id_category}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Error al listar productos por categoría");
      return [];
    }
  }

  //Metodo para crear producto
  async create(product: Product, files: ImagePickerAsset[]): Promise<Response> {
    try {
      const formData = this.buildFormData(product, files);
      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/products/create",
        formData,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(error, "Error al crear el producto");
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  //Metodo para actualizar productos con imagen
  async updateProductWithImage(
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<Response> {
    try {
      const formData = this.buildFormData(product, files);
      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>(
        "/products/updateWithImage",
        formData,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(
        error,
        "Error al actualizar el producto",
      );
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  private buildFormData(product: Product, files: ImagePickerAsset[]): FormData {
    const formData = new FormData();

    files.forEach((file) => {
      const uri = file.uri;
      const name = uri.split("/").pop() ?? "image.jpg";
      const type = mime.getType(uri) ?? "image/jpeg";

      formData.append("image", {
        uri,
        name,
        type,
      } as any);
    });

    formData.append("product", JSON.stringify(product));
    return formData;
  }

  //Metodo para actualizar productos sin imagen
  async updateProduct(product: Product): Promise<Response> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        "/products/updateWithoutImage",
        product,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(
        error,
        "Error al actualizar el producto",
      );
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  //Metodo para eliminar producto por categoria
  async remove(product: Product): Promise<Response> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(
        `/products/delete/${product.id}`,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(error, "Error al eliminar el producto");
      return ResponseApiMapper.toDomain(apiError);
    }
  }
}
