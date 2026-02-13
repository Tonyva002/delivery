import { AddressRepositoryImp } from "../../Data/repositories/AddressRepository";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { CreateAddressUseCase } from '../../Domain/useCase/address/CreateAddressUseCase';
import { GetAddressByUserUseCase } from '../../Domain/useCase/address/getAddressByUserUseCase';


const addressRepository: AddressRepository = 
new AddressRepositoryImp();

export const createAddressUseCase =
new CreateAddressUseCase(addressRepository);

export const getAddressByUserUseCase = 
new GetAddressByUserUseCase(addressRepository);