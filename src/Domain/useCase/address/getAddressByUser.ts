import { AddressRepositoryImp } from "../../../Data/repositories/AddressRepository"


const {getByUser} = new AddressRepositoryImp();

export default async function GetAddressByUserUseCase(id_user: string) {
  return await getByUser(id_user);
}
