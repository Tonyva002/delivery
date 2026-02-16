import { createContext, useState } from "react";
import { Order } from "../../Domain/entities/Order";
import {
  getByDeliveryAndStatusOrderUseCase,
  getByStatusOrderUseCase,
  updateToDeliveredOrderUseCase,
  updateToDispatchedOrderUseCase,
  updateToOnTheWayOrderUseCase,
} from "../../core/di/OrderContainer";
import { Response } from "../../Domain/models/Response";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersOnTheWay: Order[];
  ordersDelivery: Order[];
  getOrdersByStatus(status: string): Promise<void>;
  getOrdersByDeliveryAndStatus(
    id_delivery: string,
    status: string,
  ): Promise<void>;
  updateToDispatched(order: Order): Promise<Response>;
  updateToOnTheWay(order: Order): Promise<Response>;
  updateToDelivered(order: Order): Promise<Response>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {
  const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
  const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
  const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
  const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

  const updateOrdersList = (status: string, response: Order[]) => {
    switch (status) {
      case "PAGADO":
        setOrdersPayed(response);
        break;
      case "DESPACHADO":
        setOrdersDispatched(response);
        break;
      case "EN CAMINO":
        setOrdersOnTheWay(response);
        break;
      case "ENTREGADO":
        setOrdersDelivery(response);
        break;
    }
  };

  //Obtener las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
  const getOrdersByStatus = async (status: string) => {
    const response = await getByStatusOrderUseCase.execute(status);
    updateOrdersList(status, response);
  };

  //Metodo para obtener las ordenes asignada al delivery
  const getOrdersByDeliveryAndStatus = async (
    id_delivery: string,
    status: string,
  ) => {
    const response = await getByDeliveryAndStatusOrderUseCase.execute(
      id_delivery,
      status,
    );
    updateOrdersList(status, response);
  };

  //Metodo para actualizar la orden a despachado
  const updateToDispatched = async (order: Order) => {
    const response = await updateToDispatchedOrderUseCase.execute(order);
    getOrdersByStatus("PAGADO");
    getOrdersByStatus("DESPACHADO");
    return response;
  };

  //Metodo para actualizar la orden a despachado
  const updateToOnTheWay = async (order: Order) => {
    const response = await updateToOnTheWayOrderUseCase.execute(order);
    getOrdersByDeliveryAndStatus(order.id_delivery!, "DESPACHADO");
    getOrdersByDeliveryAndStatus(order.id_delivery!, "EN CAMINO");
    return response;
  };

  //Metodo para actualizar la orden a despachado
  const updateToDelivered = async (order: Order) => {
    const response = await updateToDeliveredOrderUseCase.execute(order);
    getOrdersByDeliveryAndStatus(order.id_delivery!, "EN CAMINO");
    getOrdersByDeliveryAndStatus(order.id_delivery!, "ENTREGADO");
    return response;
  };

  return (
    <OrderContext.Provider
      value={{
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        getOrdersByStatus,
        getOrdersByDeliveryAndStatus,
        updateToDispatched,
        updateToOnTheWay,
        updateToDelivered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
