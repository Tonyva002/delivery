import { Product } from '../../entities/Product';
import { ImagePickerAsset } from 'expo-image-picker';
import { ProductRepository } from '../../repositories/ProductRepository';


export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository){}

  execute(product: Product, file: ImagePickerAsset[]){
    return this.productRepository.create(product, file);
    
  }
}