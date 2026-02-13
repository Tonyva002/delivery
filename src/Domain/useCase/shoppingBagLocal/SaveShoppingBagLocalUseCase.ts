
import { Product } from '../../entities/Product';
import { ShoppingBagLocalRepository } from '../../repositories/ShoppingBagLocalRepository';


export class SaveShoppingBagLocalUseCase {
  constructor(private shoppingBagLocalRepository: ShoppingBagLocalRepository){}
  execute(products: Product[]){
    return this.shoppingBagLocalRepository.save(products);
  }
}
