import { ProductRepositoryImp } from '../../Data/repositories/ProductRepository';
import { ProductRepository} from '../../Domain/repositories/ProductRepository';
import { CreateProductUseCase } from '../../Domain/useCase/product/CreateProductUseCase';
import { DeleteProductUseCase } from '../../Domain/useCase/product/DeleteProductUseCase';
import { GetProductByCategoryUseCase } from '../../Domain/useCase/product/GetProductByCategoryUseCase';
import { UpdateProductUseCase } from '../../Domain/useCase/product/updateProductUseCase';
import { UpdateProductWithImageUseCase } from '../../Domain/useCase/product/updateProductWithImageUseCase';

const productRepository: ProductRepository =
new ProductRepositoryImp();

export const createProductUseCase = 
new CreateProductUseCase(productRepository);

export const deleteProductUseCase = 
new DeleteProductUseCase(productRepository);

export const getProductByCategoryUseCase =
new GetProductByCategoryUseCase(productRepository);

export const updateProductWithImageUseCase =
 new UpdateProductWithImageUseCase(productRepository);

 export const updateProductUseCase = 
 new UpdateProductUseCase(productRepository);