import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository"
import { Order } from "../../entities/Order";


const {updateToDispatched} = new OrderRepositoryImp();

//Metodo para actualizar la orden a despachado
export default async function UpdateToDispatchedOrderUseCase(order: Order) {
  return await updateToDispatched(order);
   
  
}
