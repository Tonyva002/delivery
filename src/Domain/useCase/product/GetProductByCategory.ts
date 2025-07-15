import { ProductRepositoryImp } from "../../../Data/repositories/ProductRepository";

const {getProductByCategory} = new ProductRepositoryImp();

export async function GetProductByCategoryUseCase(id_category: string) {

        return await getProductByCategory(id_category);
        
}