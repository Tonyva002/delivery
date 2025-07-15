import { Order } from "../../Domain/entities/Order";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/ApiDelivery";

export class OrderRepositoryImp implements OrderRepository {
  

  //Metodo para obtener las ordenes asignada al delivery
 async getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]> {
   try {
    const response = await ApiDelivery.get<Order[]>(`/orders/findByDeliveryAndStatus/${id_delivery}/${status}`);
    return Promise.resolve(response.data);
    
   } catch (error) {
    handleAxiosError(error, "Error al listar las ordenes asignada a un delivery");
     return Promise.resolve([]);
    
   }
  }
  
 //Metodo para obterner las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
 async getByStatus(status: string): Promise<Order[]> {
    try {
      const response = await ApiDelivery.get<Order[]>(`/orders/findByStatus/${status}`)
      return Promise.resolve(response.data);
      
    } catch (error) {
     handleAxiosError(error, "Error al listar la orden por status");
     return Promise.resolve([]);
    }
  }
  
  //Metodo para crear la orden      
  async create(order: Order): Promise<ResponseApiDelivery> {
    
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>(
        "/orders/create",
        order
      );
      return Promise.resolve(response.data);
      
    } catch (error) {
      return handleAxiosError(error, "Error al crear la orden");
    }
  }

  //Metodo para actualizar la orden a despachado
  async updateToDispatched(order: Order): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToDispatched', order);
      return Promise.resolve(response.data);
      
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar la orden a despachado");
    }
  }

  //Metodo para actualizar la orden a despachado
  async updateToOnTheWay(order: Order): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToOnTheWay', order);
      return Promise.resolve(response.data);
      
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar la orden a en camino");
    }
  }

   //Metodo para actualizar la orden a despachado
  async updateToDelivered(order: Order): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToDelivered', order);
      return Promise.resolve(response.data);
      
    } catch (error) {
      return handleAxiosError(error, "Error al actualizar la orden a en camino");
    }
  }
}


