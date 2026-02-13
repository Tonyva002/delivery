import { OrderRepository } from '../../repositories/OrderRepository';



//Metodo para obtener las ordenes asignada al delivery
export class GetByDeliveryAndStatusOrderUseCase {
        constructor(private orderRepository: OrderRepository){}

        execute(id_delivery: string, status: string){
                return this.orderRepository.getByDeliveryAndStatus(id_delivery, status);
        }
   
} 
