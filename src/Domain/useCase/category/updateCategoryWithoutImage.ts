import { CategoryRepositoryImp } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';

const {updateWithoutImage} = new CategoryRepositoryImp();


export const UpdateCategoryWithoutImageUseCase = async (category: Category) => {
  return  await  updateWithoutImage(category);
  
}