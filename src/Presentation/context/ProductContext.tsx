import { ImagePickerAsset } from "expo-image-picker";
import { Product } from '../../Domain/entities/Product';
import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from "react";
import { CreateProductUseCase } from "../../Domain/useCase/product/CreateProduct";
import { GetProductByCategoryUseCase } from "../../Domain/useCase/product/GetProductByCategory";
import { DeleteProductUseCase } from "../../Domain/useCase/product/DeleteProduct";
import { UpdateProductWithImageUseCase } from "../../Domain/useCase/product/updateProductWithImage";
import { UpdateProductWithoutImageUseCase } from "../../Domain/useCase/product/updateProductWithoutImage";

export interface ProductContextProps {
  products: Product[],
  getProducts(id_category: string): Promise<void>,  
  create(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery>,
  updateWithImage(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery>;
  updateWithoutImage(product: Product): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>,
}
export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {

  const [products, setProducts] = useState<Product[]>([]);


  const getProducts = async (id_category: string): Promise<void> => {
    const response = await GetProductByCategoryUseCase(id_category);
    setProducts(response);

  }

  const create = async (product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> => {
    const response = await CreateProductUseCase(product, files);
    getProducts(product.id_category!);
    return response;
  };

  //Metodo para actualizar con imagen
  const updateWithImage = async (product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> => {
    const response = await UpdateProductWithImageUseCase(product, files);
    getProducts(product.id_category!);
    return response;
    };
       
  //Metodo para actualizar sin imagen
  const updateWithoutImage = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await UpdateProductWithoutImageUseCase(product);
    getProducts(product.id_category!);
    return response;
      }

  const remove = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await DeleteProductUseCase(product);
    getProducts(product.id_category!);
    return response;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        create,
        updateWithImage,
        updateWithoutImage,
        remove,
        
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
