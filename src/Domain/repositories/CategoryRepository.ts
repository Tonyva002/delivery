import { ImagePickerAsset } from "expo-image-picker";
import { Category } from "../entities/Category";
import { Response } from "../models/Response";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  create(category: Category, file: ImagePickerAsset): Promise<Response>;
  updateCategoryWithImage(
    category: Category,
    file: ImagePickerAsset,
  ): Promise<Response>;
  updateCategory(category: Category): Promise<Response>;
  remove(id: string): Promise<Response>;
}
