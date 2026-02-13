import { useContext, useState } from "react";
import { OrderContext } from "../../../../context/OrderContext";

export default function useAdminOrderListViewModel() {
  const {
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrdersByStatus,
  } = useContext(OrderContext);

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
