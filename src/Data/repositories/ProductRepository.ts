import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { handleAxiosError } from "../../utils/handleAxiosError";
import mime from "mime";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/ApiDelivery";
import { AxiosError } from 'axios';

export class ProductRepositoryImp implements ProductRepository {

  
 //Metodo para obtener productos por categoria 
 async getProductByCategory(id_category: string): Promise<Product[]> {
   try {
    const response = await ApiDelivery.get<Product[]>(`/products/findByCategory/${id_category}`);
    return Promise.resolve(response.data);
    
   } catch (error) {
    let e = (error as AxiosError);
    console.log("ERROR: "  + JSON.stringify(e.response?.data));
     return Promise.resolve([]);
   }
  };



  //Metodo para crear producto      
  async create(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        const fileUri = file.uri;
        const fileName = fileUri.split("/").pop() || "image.jpg";
        const fileType = mime.getType(fileUri) || "image/jpeg";

        formData.append("image", {
          uri: fileUri,
          name: fileName,
          type: fileType,
        } as any);
      });

      formData.append("product", JSON.stringify(product));

      const response = await ApiDeliveryForImage.post<ResponseApiDelivery>(
        "/products/create",
        formData
      );
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "Error al crear el producto");
    }
  };
  
  //Metodo para actualizar productos con imagen
  async updateWithImage(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        const fileUri = file.uri;
        const fileName = fileUri.split("/").pop() || "image.jpg";
        const fileType = mime.getType(fileUri) || "image/jpeg";

        formData.append("image", {
          uri: fileUri,
          name: fileName,
          type: fileType,
        } as any);
      });

      formData.append("product", JSON.stringify(product));

      const response = await ApiDeliveryForImage.put<ResponseApiDelivery>( "/products/updateWithImage", formData);
      return response.data;
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar el producto");
    }
  }

  //Metodo para actualizar productos sin imagen
  async updateWithoutImage(product: Product): Promise<ResponseApiDelivery> {
    try {
       const response = await ApiDelivery.put<ResponseApiDelivery>("/products/updateWithoutImage", product);
      return Promise.resolve(response.data);
      
    } catch (error) {
       return handleAxiosError(error, "Error al actualizar el producto");
      
    }
  }

  //Metodo para eliminar producto por categoria
  async remove(product: Product): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(`/products/delete/${product.id}`);
      return Promise.resolve(response.data);
      
    } catch (error) {

       return handleAxiosError(error, "Error al eliminar el producto");
      
    }
  }
}
