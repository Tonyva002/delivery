import { ProductRepositoryImp } from '../../../Data/repositories/ProductRepository';
import { Product } from '../../entities/Product';

const {updateWithoutImage} = new ProductRepositoryImp();


export async function UpdateProductWithoutImageUseCase (product: Product){
  return  await  updateWithoutImage(product);
  
}