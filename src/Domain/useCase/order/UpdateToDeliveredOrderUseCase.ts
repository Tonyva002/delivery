import { Order } from '../../entities/Order';
import { OrderRepository } from '../../repositories/OrderRepository';



export class UpdateToDeliveredOrderUseCase {
  constructor(private orderRepository: OrderRepository){}
  execute(order: Order){
    return this.orderRepository.updateToDelivered(order)

  }
}
