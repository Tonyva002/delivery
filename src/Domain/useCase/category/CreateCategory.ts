import { CategoryRepositoryImp } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import { ImagePickerAsset } from 'expo-image-picker';

const {create} = new CategoryRepositoryImp();


export const CreateCategoryUseCase = async (category: Category, file: ImagePickerAsset) => {
  return  await  create(category, file);
  
}
