import { ProductRepositoryImp } from '../../../Data/repositories/ProductRepository';
import { ImagePickerAsset } from 'expo-image-picker';
import { Product } from '../../entities/Product';

const {updateWithImage} = new ProductRepositoryImp();


export async function UpdateProductWithImageUseCase(product: Product, files: ImagePickerAsset[]) {
  return  await  updateWithImage(product, files);
  
}