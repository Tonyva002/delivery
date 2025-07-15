import React, { useContext, useEffect, useState } from "react";
import { Product } from "../../../../../Domain/entities/Product";
import { ShoppingBagContext } from "../../../../context/ShoppingBagContext";

export default function useCustomerProductDetailViewModel(product: Product) {
  const productImages: string[] = [
    product.image1,
    product.image2,
    product.image3,
  ];

  const [quantity, setQuantity] = useState(product ? 1 : 0);
  const [total, setTotal] = useState(product ? product.price : 0.0);
  const [responseMessage, setResponseMessage] = useState('');
  const {shoppingBag, saveItem} = useContext(ShoppingBagContext);

  useEffect(() => {
    const index = shoppingBag.findIndex((p) => p.id === product.id);
    if (index !== -1){
      setQuantity(shoppingBag[index].quantity!)
    }
  })

  useEffect(() => {
     setTotal(product.price * quantity);
  }, [quantity])

 const addToBag = () => {
  if(quantity > 0) {
    product.quantity = quantity;
    saveItem(product);
    setResponseMessage('Producto agregado al carrito de compra')
  }

  }

  const addItem = () => {
    setQuantity(quantity + 1);
  }

   const subtractItem = () => {
   if(quantity > 0){
     setQuantity(quantity - 1);
   }
  }

  return {
    productImages,
    quantity,
    total,
    shoppingBag,
    responseMessage,
    setResponseMessage,
    addItem,
    subtractItem,
    addToBag,
    
  };
}
