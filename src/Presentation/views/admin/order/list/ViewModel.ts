import { useContext, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order";
import { OrderContext } from "../../../../context/OrderContext";

export default function useAdminOrderViewModel() {
  const {ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByStatus} = useContext(OrderContext)

  const getOrders = async (status: string) => {
     await getOrdersByStatus(status);
    
  };
  return {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
  };
}
