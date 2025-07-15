import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository"


const {getByStatus} = new OrderRepositoryImp();

//Obterner las ordenes segun el status(PAGADO, DESPACHADO, EN CAMINO, ENTREGADO)
export default async function GetByStatusOrderUseCase(status: string) {
  return await getByStatus(status);
}
