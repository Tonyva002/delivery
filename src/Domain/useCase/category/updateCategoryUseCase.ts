import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(category: Category) {
    return this.categoryRepository.updateCategory(category);
  }
}
