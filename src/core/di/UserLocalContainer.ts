import { UserLocalRepositoryImpl } from '../../Data/repositories/UserLocalRepository';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import { GetUserLocalUseCase } from '../../Domain/useCase/userLocal/GetUserLocalUseCase';
import { RemoveUserLocalUseCase } from '../../Domain/useCase/userLocal/RemoveUserLocalUseCase';
import { SaveUserLocalUseCase } from '../../Domain/useCase/userLocal/SaveUserLocalUseCase';

const userLocalRepository: UserLocalRepository =
new UserLocalRepositoryImpl();

export const getUserLocalUseCase =
new GetUserLocalUseCase(userLocalRepository);

export const removeUserLocalUseCase =
new RemoveUserLocalUseCase(userLocalRepository);

export const saveUserLocalUseCase = 
new SaveUserLocalUseCase(userLocalRepository);