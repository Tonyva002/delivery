import { CategoryRepositoryImp } from '../../Data/repositories/CategoryRepository';
import { CategoryRepository } from '../../Domain/repositories/CategoryRepository';
import { CreateCategoryUseCase } from '../../Domain/useCase/category/CreateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../Domain/useCase/category/DeleteCategoryUseCase';
import { GetAllCategoryUseCase } from '../../Domain/useCase/category/GetAllCategoryUseCase';
import { UpdateCategoryUseCase } from '../../Domain/useCase/category/updateCategoryUseCase';
import { UpdateCategoryWithImageUseCase } from '../../Domain/useCase/category/updateCategoryWithImageUseCase';


const categoryRepository: CategoryRepository =
new CategoryRepositoryImp();

export const createCategoryUseCase =
new CreateCategoryUseCase(categoryRepository);

export const deleteCategoryUseCase =
new DeleteCategoryUseCase(categoryRepository);

export const getAllCategoryUseCase = 
 new GetAllCategoryUseCase(categoryRepository);

 export const updateCategoryUseCase =
 new UpdateCategoryUseCase(categoryRepository);

 export const updateCategoryWithImageUseCase =
 new UpdateCategoryWithImageUseCase(categoryRepository);
