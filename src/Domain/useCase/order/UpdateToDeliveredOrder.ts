import { OrderRepositoryImp } from '../../../Data/repositories/OrderRepository'
import { Order } from '../../entities/Order'

const {updateToDelivered} = new OrderRepositoryImp();

export default async function UpdateToDeliveredOrderUseCase(order: Order) {
  return  await updateToDelivered(order)
}
