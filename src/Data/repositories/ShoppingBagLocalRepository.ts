import { Product } from '../../Domain/entities/Product';
import { ShoppingBagLocalRepository } from '../../Domain/repositories/ShoppingBagLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';
export class ShoppingBagLocalRepositoryImp implements ShoppingBagLocalRepository{


        async save(products: Product[]): Promise<void> {
               const { save } = LocalStorage();
               await save('shopping_bag', JSON.stringify(products));
        }

       async getShoppingBag(): Promise<Product[]> {
                const { getItem } = LocalStorage();
                const response = await getItem('shopping_bag');
                const shoppingBag: Product[] = JSON.parse(response as any);
                if(shoppingBag === null){

                        return[];
                }else {
                        return shoppingBag;

                }
                
        }

}