import { Order } from '../../entities/Order';
import { OrderRepository } from '../../repositories/OrderRepository';



export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository){}
  execute(order: Order){
    return this.orderRepository.create(order);
  }
}
