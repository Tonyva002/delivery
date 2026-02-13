import { ImagePickerAsset } from "expo-image-picker";
import { Product } from "../../Domain/entities/Product";
import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { createContext, useState } from "react";
import {
  createProductUseCase,
  deleteProductUseCase,
  getProductByCategoryUseCase,
  updateProductUseCase,
  updateProductWithImageUseCase,
} from "../../core/di/ProductContainer";

export interface ProductContextProps {
  products: Product[];
  getProducts(id_category: string): Promise<void>;
  create(
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<ResponseApiDelivery>;
  updateWithImage(
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<ResponseApiDelivery>;
  updateWithoutImage(product: Product): Promise<ResponseApiDelivery>;
  remove(product: Product): Promise<ResponseApiDelivery>;
}
export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async (id_category: string): Promise<void> => {
    const response = await getProductByCategoryUseCase.execute(id_category);
    setProducts(response);
  };

  const create = async (
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<ResponseApiDelivery> => {
    const response = await createProductUseCase.execute(product, files);
    getProducts(product.id_category!);
    return response;
  };

  //Metodo para actualizar con imagen
  const updateWithImage = async (
    product: Product,
    files: ImagePickerAsset[],
  ): Promise<ResponseApiDelivery> => {
    const response = await updateProductWithImageUseCase.execute(
      product,
      files,
    );
    getProducts(product.id_category!);
    return response;
  };

  //Metodo para actualizar sin imagen
  const updateWithoutImage = async (
    product: Product,
  ): Promise<ResponseApiDelivery> => {
    const response = await updateProductUseCase.execute(product);
    getProducts(product.id_category!);
    return response;
  };

  const remove = async (product: Product): Promise<ResponseApiDelivery> => {
    const response = await deleteProductUseCase.execute(product);
    getProducts(product.id_category!);
    return response;
  };

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
