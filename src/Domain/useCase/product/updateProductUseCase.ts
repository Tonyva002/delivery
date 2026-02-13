
import { Product } from "../../entities/Product";
import { ProductRepository } from '../../repositories/ProductRepository';


export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository){}
  execute(product: Product){
    return this.productRepository.updateProduct(product)
  }
}
