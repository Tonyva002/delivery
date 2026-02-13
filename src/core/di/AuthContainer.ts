import { AuthRepositoryImpl } from "../../Data/repositories/AuthRepository";
import { LoginAuthUseCaseLocal } from "../../Domain/useCase/auth/LoginAuthUseCase";
import {  RegisterAuthUserUseCase } from '../../Domain/useCase/auth/RegisterAuthUseCase';
import { RegisterWithImageAuthUserCase } from '../../Domain/useCase/auth/RegisterWithImageUseCase';


const authRepository = new AuthRepositoryImpl();

export const loginAuthUseCase =
  new LoginAuthUseCaseLocal(authRepository);

  export const registerAuthUserUseCase = 
  new RegisterAuthUserUseCase(authRepository);

  export const registerWithImageAuthUserCase = 
  new RegisterWithImageAuthUserCase(authRepository);
