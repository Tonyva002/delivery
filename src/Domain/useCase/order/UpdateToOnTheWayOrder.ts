import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository"
import { Order } from "../../entities/Order";

const {updateToOnTheWay} = new OrderRepositoryImp();

export default async function UpdateToOnTheWayOrderUseCase(order: Order) {
  return  await updateToOnTheWay(order);
}
