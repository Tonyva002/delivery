import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository"


const {getByDeliveryAndStatus} = new OrderRepositoryImp();

//Metodo para obtener las ordenes asignada al delivery
export default async function GetByDeliveryAndStatusOrderUseCase(id_delivery: string, status: string) {

        return await getByDeliveryAndStatus(id_delivery, status);
   
} 
