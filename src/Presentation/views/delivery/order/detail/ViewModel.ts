import React, { useContext, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { User } from "../../../../../Domain/entities/User";
import { OrderContext } from "../../../../context/OrderContext";



export default function useDeliveryOrderDetailViewModel(order: Order) {
  const [total, setTotal] = useState(0.0);
  const [delivery,] = useState<User[]>([])
  const [responseMessage, setResponseMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const {updateToOnTheWay} = useContext(OrderContext)


  // Calcular el total del pedido
  const getTotal = () => {
    const totalCalculated = order.products.reduce((acc, p) => {
      return acc + p.price * p.quantity!;
    }, 0);

    setTotal(totalCalculated);
  };

  //Metodo para actualizar la orden a despachado
  const updateToOnTheWayOrder = async () => {
      const response = await updateToOnTheWay(order);
      setResponseMessage(response.message);
    }

  return {
    total,
    delivery,
    open,
    value,
    responseMessage,
    setResponseMessage,
    getTotal,
    setOpen,
    setValue,
    updateToOnTheWayOrder,
    
  };
}
