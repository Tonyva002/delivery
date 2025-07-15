import { createContext, useEffect, useState } from "react";
import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { Order } from "../../Domain/entities/Order";
import GetByStatusOrderUseCase from "../../Domain/useCase/order/GetByStatusOrder";
import UpdateToDispatchedOrderUseCase from "../../Domain/useCase/order/UpdateToDispatchedOrder";
import GetByDeliveryAndStatusOrderUseCase from "../../Domain/useCase/order/GetByDeliveryAndStatusOrder";
import UpdateByToOnTheWayOrder from "../../Domain/useCase/order/UpdateToOnTheWayOrder";
import UpdateToOnTheWayOrderUseCase from "../../Domain/useCase/order/UpdateToOnTheWayOrder";
import UpdateToDeliveredOrderUseCase from "../../Domain/useCase/order/UpdateToDeliveredOrder";

export interface OrderContextProps {
  ordersPayed: Order[];
  ordersDispatched: Order[];
  ordersOnTheWay: Order[];
  ordersDelivery: Order[];
  getOrdersByStatus(status: string): Promise<void>;
  getOrdersByDeliveryAndStatus(id_delivery: string, status: string): Promise<void>;
  updateToDispatched(order: Order): Promise<ResponseApiDelivery>;
  updateToOnTheWay(order: Order): Promise<ResponseApiDelivery>;
  updateToDelivered(order: Order): Promise<ResponseApiDelivery>;
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


  //Obterner las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
  const getOrdersByStatus = async (status: string) => {
    const response = await GetByStatusOrderUseCase(status);
    updateOrdersList(status, response);
  };

  //Metodo para obtener las ordenes asignada al delivery
  const getOrdersByDeliveryAndStatus = async (id_delivery: string, status: string) => {
    const response = await GetByDeliveryAndStatusOrderUseCase(id_delivery, status);
    updateOrdersList(status, response);
  };

  //Metodo para actualizar la orden a despachado
  const updateToDispatched = async (order: Order) => {
    const response = await UpdateToDispatchedOrderUseCase(order);
    getOrdersByStatus("PAGADO");
    getOrdersByStatus("DESPACHADO");
    return response;
  };

  //Metodo para actualizar la orden a despachado
  const updateToOnTheWay = async (order: Order) => {
    const response = await UpdateToOnTheWayOrderUseCase(order);
    getOrdersByDeliveryAndStatus(order.id_delivery!,"DESPACHADO");
    getOrdersByDeliveryAndStatus(order.id_delivery!,"EN CAMINO");
    return response;
  };

    //Metodo para actualizar la orden a despachado
  const updateToDelivered = async (order: Order) => {
    const response = await UpdateToDeliveredOrderUseCase(order);
    getOrdersByDeliveryAndStatus(order.id_delivery!,"EN CAMINO");
    getOrdersByDeliveryAndStatus(order.id_delivery!,"ENTREGADO");
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
        updateToDelivered
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
