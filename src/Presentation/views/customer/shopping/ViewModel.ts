import React, { useContext } from "react";
import { ShoppingBagContext } from "../../../context/ShoppingBagContext";
import { Product } from "../../../../Domain/entities/Product";

export default function useCustomerShoppingBagViewModel() {
  const { shoppingBag, saveItem, deleteItem, total } = useContext(ShoppingBagContext);

  const addItem = async (product: Product) => {
    product.quantity!++;
    await saveItem(product);
  };

  const subtractItem = async (product: Product) => {
    if (product.quantity! > 1) {
      product.quantity!--;
      await saveItem(product);
    }
  };
  return {
    shoppingBag,
    total,
    addItem,
    subtractItem,
    deleteItem
  };
}
