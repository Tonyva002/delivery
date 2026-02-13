import { Order } from '../../entities/Order';
import { OrderRepository } from '../../repositories/OrderRepository';




//Metodo para actualizar la orden a despachado
export class UpdateToDispatchedOrderUseCase {
  constructor(private orderRepository: OrderRepository){}

  execute(order: Order){
    return this.orderRepository.updateToDispatched(order)
  }
  
}
