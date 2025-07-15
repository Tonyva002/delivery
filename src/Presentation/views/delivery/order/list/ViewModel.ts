import { useContext, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext";
import { UserContext } from "../../../../context/UserContext";

export default function useAdminOrderViewModel() {
  const {ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByDeliveryAndStatus: getOrdersByBeliveryAndStatus} = useContext(OrderContext);
  const {user} = useContext(UserContext);

  const getOrders = async (id_delivery: string, status: string) => {
     await getOrdersByBeliveryAndStatus(id_delivery, status);
    
  };
  return {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders,
    user
  };
}
