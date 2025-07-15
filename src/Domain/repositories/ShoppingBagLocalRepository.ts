import { Product } from '../entities/Product'

export interface ShoppingBagLocalRepository {
 save(products: Product[]): Promise<void>;
 getShoppingBag(): Promise<Product[]>;
}
