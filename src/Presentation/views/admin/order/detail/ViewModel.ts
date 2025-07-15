import React, { useContext, useEffect, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import GetDeliveryUseCase from "../../../../../Domain/useCase/user/GetDelivery";
import { User } from "../../../../../Domain/entities/User";
import UpdateToDispatchedOrderUseCase from "../../../../../Domain/useCase/order/UpdateToDispatchedOrder";
import { OrderContext } from "../../../../context/OrderContext";

interface DropDownProps {
  label: string, 
  value: string
  
}

export default function useAdminOrderDetailViewModel(order: Order) {
  const [total, setTotal] = useState(0.0);
  const [delivery, setDelivery] = useState<User[]>([])
  const [responseMessage, setResponseMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);

  const {updateToDispatched} = useContext(OrderContext)

  useEffect(() => {
    setDropDownItems();
  }, [delivery])
  
  //Metodo para actualizar la orden a despachado
  const updateDispatchOrder = async () => {
    if(value !== null){
      order.id_delivery = value!;
      const response = await updateToDispatched(order);
      setResponseMessage(response.message);
    }else {
      setResponseMessage('Selecciona el repartidor')
    }
  }

  // Metodo para seleccionar los delivery
  const setDropDownItems = () => {
    let itemsDelivery: DropDownProps[] = [];
    delivery.forEach(deliver => {
      itemsDelivery.push({
        label: deliver.name + ' ' + deliver.lastname,
        value: deliver.id!
      })
    });
    setItems(itemsDelivery);

  }

  // Calcular el total del pedido
  const getTotal = () => {
    const totalCalculated = order.products.reduce((acc, p) => {
      return acc + p.price * p.quantity!;
    }, 0);

    setTotal(totalCalculated);
  };

  // Obtener los delivery
  const getDelivery = async () => {
    const response = await GetDeliveryUseCase();
    console.log('Repartidores: ' + JSON.stringify(response, null, 3));
    setDelivery(response);

  }

  return {
    total,
    delivery,
    open,
    value,
    items,
    responseMessage,
    setResponseMessage,
    getTotal,
    getDelivery,
    setOpen,
    setValue,
    setItems,
    updateDispatchOrder,
    
  };
}
