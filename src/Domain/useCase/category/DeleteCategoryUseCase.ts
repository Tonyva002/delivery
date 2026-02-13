import { CategoryRepositoryImp } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import { ImagePickerAsset } from 'expo-image-picker';

const {remove} = new CategoryRepositoryImp();


export const DeleteCategoryUseCase = async (id: string) => {
  return  await  remove(id);
  
}
