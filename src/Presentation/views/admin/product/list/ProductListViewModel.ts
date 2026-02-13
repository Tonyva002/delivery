import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext";
import { Product } from "../../../../../Domain/entities/Product";

export default function useAdminProductListViewModel() {
  const { products, getProducts, remove } = useContext(ProductContext);
  const [responseMessage, setResponseMessage] = useState("");

  //Metodo para eliminar categoria
  const deleteProduct = async (product: Product) => {
    const response = await remove(product);
    setResponseMessage(response.message);
  };

  return {
    products,
    responseMessage,
    setResponseMessage,
    getProducts,
    deleteProduct,
    
  };
}
