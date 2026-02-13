import { UserRepositoryImpl } from '../../Data/repositories/UserRepository';
import { UserRepository } from '../../Domain/repositories/UserRepository';
import { GetDeliveryUseCase } from '../../Domain/useCase/user/GetDeliveryUseCase';
import { UpdateUserUseCase } from '../../Domain/useCase/user/UpdateUserUseCase';
import { UpdateUserWithImageUseCase } from '../../Domain/useCase/user/UpdateUserWithImageUseCase';


const userRepository: UserRepository =
new UserRepositoryImpl();

export const getDeliveryUseCase =
new GetDeliveryUseCase(userRepository);

export const updateUserWithImageUseCase = 
new UpdateUserWithImageUseCase(userRepository);

export const updateUserUseCase =
new UpdateUserUseCase(userRepository);