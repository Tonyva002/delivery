import { CategoryRepository } from "../../repositories/CategoryRepository";

export class GetAllCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute() {
    return this.categoryRepository.getAll();
  }
}
