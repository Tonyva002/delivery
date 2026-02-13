import { Order } from '../../entities/Order';
import { OrderRepository } from '../../repositories/OrderRepository';



export class UpdateToOnTheWayOrderUseCase {
  constructor(private orderRepository: OrderRepository){}

  execute(order: Order){
    return this.orderRepository.updateToOnTheWay(order)
  }
}
