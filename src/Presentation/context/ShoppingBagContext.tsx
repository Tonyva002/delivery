import { createContext, useEffect, useState } from "react";
import { Product } from "../../Domain/entities/Product";
import GetShoppingBagLocalUseCase from "../../Domain/useCase/shoppingBagLocal/GetShoppingBagLocal";
import { SaveShoppingBagLocalUseCase } from "../../Domain/useCase/shoppingBagLocal/SaveShoppingBagLocal";

export interface ShoppingBagContextProps {
  shoppingBag: Product[];
  total: number;
  getShoppingBag(): Promise<void>;
  getTotal(): Promise<void>;
  saveItem(product: Product): Promise<void>;
  deleteItem(product: Product): Promise<void>;
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps);

export const ShoppingBagProvider = ({ children }: any) => {
  const [shoppingBag, setShoppingBag] = useState<Product[]>([]);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    getShoppingBag();
  }, []);

  useEffect(() => {
    getTotal();
  }, [shoppingBag]);

  const getShoppingBag = async (): Promise<void> => {
    const response = await GetShoppingBagLocalUseCase();
    setShoppingBag(response);
    
  };

  const getTotal = async (): Promise<void> => {
    setTotal(0);
    let totalPrice = 0;
    shoppingBag.forEach((product) => {
      totalPrice = totalPrice + product.quantity! * product.price;
    });
    setTotal(totalPrice);
  };

  const saveItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    if (index === -1) {
      // El producto no ha sido agregado a la bolsa de compras -> Insertarlo a la lista
      shoppingBag.push(product);
    } else {
      // El producto ya ha sido agregado a la bolsa de compras -> Editar la cantidad
      shoppingBag[index].quantity = product.quantity;
    }

    await SaveShoppingBagLocalUseCase(shoppingBag);
    getShoppingBag();
  
  };

  const deleteItem = async (product: Product): Promise<void> => {
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    shoppingBag.splice(index, 1);
    await SaveShoppingBagLocalUseCase(shoppingBag);
    getShoppingBag();
   
  };

  return (
    <ShoppingBagContext.Provider
      value={{
        shoppingBag,
        total,
        getShoppingBag,
        getTotal,
        saveItem,
        deleteItem,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
