import { Order } from "../../Domain/entities/Order";
import { Response } from "../../Domain/models/Response";
import { OrderRepository } from "../../Domain/repositories/OrderRepository";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { ResponseApiMapper } from "../mappers/ResponseApiMapper";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/ApiDelivery";

export class OrderRepositoryImp implements OrderRepository {
  //Metodo para obtener las ordenes asignada al delivery
  async getByDeliveryAndStatus(
    id_delivery: string,
    status: string,
  ): Promise<Order[]> {
    try {
      const response = await ApiDelivery.get<Order[]>(
        `/orders/findByDeliveryAndStatus/${id_delivery}/${status}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(
        error,
        "Error al listar las ordenes asignada a un delivery",
      );
      return [];
    }
  }

  //Metodo para obterner las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
  async getByStatus(status: string): Promise<Order[]> {
    try {
      const response = await ApiDelivery.get<Order[]>(
        `/orders/findByStatus/${status}`,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Error al listar la orden por status");
      return [];
    }
  }

  //Metodo para crear la orden
  async create(order: Order): Promise<Response> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>(
        "/orders/create",
        order,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(error, "Error al crear la orden");
      return ResponseApiMapper.toDomain(apiError);
    }
  }

  //Metodo para actualizar la orden a despachado
  async updateToDispatched(order: Order): Promise<Response> {
    return this.updateStatus(
      "/orders/updateToDispatched",
      order,
      "Error al actualizar la orden a despachado",
    );
  }

  //Metodo para actualizar la orden a despachado
  async updateToOnTheWay(order: Order): Promise<Response> {
    return this.updateStatus(
      "/orders/updateToOnTheWay",
      order,
      "Error al actualizar la orden a en camino",
    );
  }

  //Metodo para actualizar la orden a despachado
  async updateToDelivered(order: Order): Promise<Response> {
    return this.updateStatus(
      "/orders/updateToDelivered",
      order,
      "Error al actualizar la orden a entregado",
    );
  }

  private async updateStatus(
    endpoint: string,
    order: Order,
    errorMessage: string,
  ): Promise<Response> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(
        endpoint,
        order,
      );
      return ResponseApiMapper.toDomain(response.data);
    } catch (error) {
      const apiError = handleAxiosError(error, errorMessage);
      return ResponseApiMapper.toDomain(apiError);
    }
  }
}
