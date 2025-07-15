import { ImagePickerAsset } from 'expo-image-picker';
import { Product } from '../entities/Product';
import { ResponseApiDelivery } from '../../Data/sources/models/ResponseApiDelivery';
export interface ProductRepository {

        create(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery>;
        getProductByCategory(id_category: string): Promise<Product[]>;
        updateWithImage(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery>;
        updateWithoutImage(product: Product): Promise<ResponseApiDelivery>;
        remove(product: Product): Promise<ResponseApiDelivery>;


}