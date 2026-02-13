import { ShoppingBagLocalRepository } from '../../repositories/ShoppingBagLocalRepository';




export class GetShoppingBagLocalUseCase {
  constructor(private shoppingBagLocalRepository: ShoppingBagLocalRepository){}
  execute(){
    return this.shoppingBagLocalRepository.getShoppingBag();
  }
}
