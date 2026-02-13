import { OrderRepository } from '../../repositories/OrderRepository';


//Obterner las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
export class GetByStatusOrderUseCase {
  constructor(private orderRepository: OrderRepository){}
  execute(status: string){
    return this.orderRepository.getByStatus(status);

  }
  
}
