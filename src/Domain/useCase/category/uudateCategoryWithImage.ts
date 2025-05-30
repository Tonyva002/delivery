import { CategoryRepositoryImp } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import { ImagePickerAsset } from 'expo-image-picker';

const {updateWithImage} = new CategoryRepositoryImp();


export const UpdateCategoryWithImageUseCase = async (category: Category, file: ImagePickerAsset) => {
  return  await  updateWithImage(category, file);
  
}