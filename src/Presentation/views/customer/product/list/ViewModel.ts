import React, { useState } from 'react'
import { Product } from '../../../../../Domain/entities/Product'
import { GetProductByCategoryUseCase } from '../../../../../Domain/useCase/product/GetProductByCategory';

export default function useCustomerProductListViewModel() {

        const [products, setProducts] = useState<Product[]>([]);

      const getProducts = async (id_category: string) => {
                const response = await GetProductByCategoryUseCase(id_category);
                setProducts(response);
        }
  return {
        products,
        getProducts,

  }
    
  
}
