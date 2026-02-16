import { Category } from "../../entities/Category";
import { ImagePickerAsset } from "expo-image-picker";
import { CategoryRepository } from '../../repositories/CategoryRepository';

;

export class UpdateCategoryWithImageUseCase {
  constructor(private categoryRepository: CategoryRepository){}

  execute(category: Category, file: ImagePickerAsset){
    return this.categoryRepository.updateCategoryWithImage(category, file)
  }
};
