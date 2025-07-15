import { AddressRepositoryImp } from "../../../Data/repositories/AddressRepository"
import { Address } from "../../entities/Address";

const {create} = new AddressRepositoryImp();

export default async function CreateAddressUseCase(address: Address) {
  return await create(address);
}
