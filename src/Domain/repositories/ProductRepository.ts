import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../entities/Product";
import { Response } from "../models/Response";
export interface ProductRepository {
  create(product: Product, files: ImagePickerAsset[]): Promise<Response>;
  getProductByCategory(id_category: string): Promise<Product[]>;
  updateProductWithImage(
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<Response>;
  updateProduct(product: Product): Promise<Response>;
  remove(product: Product): Promise<Response>;
}
