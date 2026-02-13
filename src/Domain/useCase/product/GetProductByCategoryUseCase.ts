import { ProductRepository } from '../../repositories/ProductRepository';


export class GetProductByCategoryUseCase {
        constructor(private productRepository: ProductRepository){}
        execute(id_category: string){
                return this.productRepository.getProductByCategory(id_category);
        }
        
}