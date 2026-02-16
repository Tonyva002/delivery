import { Category } from "../../entities/Category";
import { ImagePickerAsset } from "expo-image-picker";
import { CategoryRepository } from "../../repositories/CategoryRepository";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(category: Category, file: ImagePickerAsset) {
    return this.categoryRepository.create(category, file);
  }
}
