import { Address } from '../../entities/Address';
import { AddressRepository } from '../../repositories/AddressRepository';



export class CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository){}
  execute(address: Address){
    return this.addressRepository.create(address);
  }
}
