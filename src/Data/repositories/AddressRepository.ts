import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/ApiDelivery";

export class AddressRepositoryImp implements AddressRepository{

    async  getByUser(id_user: string): Promise<Address[]> {
        try {
          const response = await ApiDelivery.get<Address[]>(`/address/findAddressByUser/${id_user}`);
          return Promise.resolve(response.data)
          
        } catch (error) {
         handleAxiosError(error, "Error al leer las direcciones");
         return Promise.resolve([]);
          
        }
      }

      async create(address: Address): Promise<ResponseApiDelivery> {
               try {
                const response = await ApiDelivery.post<ResponseApiDelivery>('/address/create', address);
                return Promise.resolve(response.data);

                
               } catch (error) {
                 return handleAxiosError(error, "Error al actualizar la categoría");
                
               }
        }

}