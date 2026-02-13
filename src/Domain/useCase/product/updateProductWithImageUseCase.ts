import { ImagePickerAsset } from 'expo-image-picker';
import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';


export class UpdateProductWithImageUseCase {
  constructor(private productRepository: ProductRepository){}
  execute(product: Product, files: ImagePickerAsset[]){
      return this.productRepository.updateWithImage(product, files)
  }
  
}