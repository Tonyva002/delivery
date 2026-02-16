import { CategoryRepository } from "../../repositories/CategoryRepository";

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(id: string) {
   return this.categoryRepository.remove(id);
  }
}
