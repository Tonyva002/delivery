import { ShoppingBagLocalRepository } from '../../Domain/repositories/ShoppingBagLocalRepository';
import { ShoppingBagLocalRepositoryImp } from '../../Data/repositories/ShoppingBagLocalRepository';
import { GetShoppingBagLocalUseCase } from '../../Domain/useCase/shoppingBagLocal/GetShoppingBagLocalUseCase';
import { SaveShoppingBagLocalUseCase } from '../../Domain/useCase/shoppingBagLocal/SaveShoppingBagLocalUseCase';


const shoppingBagLocalRepository: ShoppingBagLocalRepository =
new ShoppingBagLocalRepositoryImp();

export const getShoppingBagLocalUseCase =
new GetShoppingBagLocalUseCase(shoppingBagLocalRepository);

export const saveShoppingBagLocalUseCase =
 new SaveShoppingBagLocalUseCase(shoppingBagLocalRepository)