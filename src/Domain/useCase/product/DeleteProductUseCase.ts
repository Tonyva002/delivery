import { Product } from "../../entities/Product";
import { ProductRepository } from '../../repositories/ProductRepository';


export class DeleteProductUseCase {
        constructor(private productRepository: ProductRepository){}

        execute(product: Product){
                return this.productRepository.remove(product);
        }

        
        
}