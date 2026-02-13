import { OrderRepositoryImp } from '../../Data/repositories/OrderRepository';
import { OrderRepository } from '../../Domain/repositories/OrderRepository';
import { CreateOrderUseCase } from '../../Domain/useCase/order/CreateOrderUseCase';
import { GetByDeliveryAndStatusOrderUseCase } from '../../Domain/useCase/order/GetByDeliveryAndStatusOrderUseCase';
import { GetByStatusOrderUseCase } from '../../Domain/useCase/order/GetByStatusOrderUseCase';
import { UpdateToDeliveredOrderUseCase } from '../../Domain/useCase/order/UpdateToDeliveredOrderUseCase';
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCase/order/UpdateToDispatchedOrderUseCase';
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCase/order/UpdateToOnTheWayOrderUseCase';

const orderRepository: OrderRepository = 
new OrderRepositoryImp();

export const createOrderUseCase = 
new CreateOrderUseCase(orderRepository);

export const getByDeliveryAndStatusOrderUseCase =
new GetByDeliveryAndStatusOrderUseCase(orderRepository);

export const getByStatusOrderUseCase = 
new GetByStatusOrderUseCase(orderRepository);

export const updateToDeliveredOrderUseCase =
new UpdateToDeliveredOrderUseCase(orderRepository);

export const updateToDispatchedOrderUseCase =
new UpdateToDispatchedOrderUseCase(orderRepository);

export const updateToOnTheWayOrderUseCase =
new UpdateToOnTheWayOrderUseCase(orderRepository);