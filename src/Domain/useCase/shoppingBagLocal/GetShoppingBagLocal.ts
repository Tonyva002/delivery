import { ShoppingBagLocalRepositoryImp } from "../../../Data/repositories/ShoppingBagLocalRepository"

const {getShoppingBag} = new ShoppingBagLocalRepositoryImp();

export default async function GetShoppingBagLocalUseCase() {
  return await getShoppingBag();
}
