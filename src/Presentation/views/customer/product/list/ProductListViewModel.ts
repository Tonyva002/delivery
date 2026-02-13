import  { useState } from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { getProductByCategoryUseCase } from "../../../../../core/di/ProductContainer";

export default function useCustomerProductListViewModel() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async (id_category: string) => {
    const response = await getProductByCategoryUseCase.execute(id_category);
    setProducts(response);
  };
  return {
    products,
    getProducts,
  };
}
