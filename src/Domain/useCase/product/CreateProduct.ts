import { ProductRepositoryImp } from '../../../Data/repositories/ProductRepository';
import { Product } from '../../entities/Product';
import { ImagePickerAsset } from 'expo-image-picker';

const { create } = new ProductRepositoryImp();

export async function CreateProductUseCase(product: Product, files: ImagePickerAsset[]) {
  return await create(product, files);
}