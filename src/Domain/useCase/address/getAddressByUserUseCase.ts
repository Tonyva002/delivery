import { Address } from "../../entities/Address";
import { AddressRepository } from "../../repositories/AddressRepository";


export class GetAddressByUserUseCase {
  constructor(
    private readonly addressRepository: AddressRepository
  ){}

  execute(idUser: string): Promise<Address[]> {
    return this.addressRepository.getByUser(idUser)
  }
}
