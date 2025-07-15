import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository"

const {getDelivery} = new UserRepositoryImpl();

export default async function GetDeliveryUseCase() {
  return await getDelivery();
}
