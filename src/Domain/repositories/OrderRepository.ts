import { Order } from "../entities/Order";
import { Response } from "../models/Response";

export interface OrderRepository {
        create(order: Order): Promise<Response>;
        getByStatus(status: string): Promise<Order[]>;
        getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]>;
        updateToDispatched(order: Order): Promise<Response>;
        updateToOnTheWay(order: Order): Promise<Response>;
        updateToDelivered(order: Order): Promise<Response>;
}