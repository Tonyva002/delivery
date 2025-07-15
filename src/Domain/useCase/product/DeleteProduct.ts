import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

const {remove} = new ProductRepositoryImp();

export async function DeleteProductUseCase(product: Product) {

        return await remove(product);
        
}