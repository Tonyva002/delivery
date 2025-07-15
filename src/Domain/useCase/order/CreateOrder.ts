import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository"
import { Order } from "../../entities/Order";

const {create} = new OrderRepositoryImp();

export default async function CreateOrderUseCase(order: Order) {
  return await create(order);
}
