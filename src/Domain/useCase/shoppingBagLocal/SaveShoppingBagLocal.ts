import { ShoppingBagLocalRepositoryImp } from '../../../Data/repositories/ShoppingBagLocalRepository';
import { Product } from '../../entities/Product';

const {save} = new ShoppingBagLocalRepositoryImp();
export async function SaveShoppingBagLocalUseCase(products: Product[]) {
  return await save(products);
}
