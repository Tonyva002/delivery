import { Address } from "../../Domain/entities/Address";
import { Response } from "../../Domain/models/Response";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { ResponseApiMapper } from "../mappers/ResponseApiMapper";
import { ResponseApiDelivery } from "../sources/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/ApiDelivery";

export class AddressRepositoryImp implements AddressRepository{

    async  getByUser(id_user: string): Promise<Address[]> {
        try {
          const response = await ApiDelivery.get<Address[]>(`/address/findAddressByUser/${id_user}`);
          return response.data
          
        } catch (error) {
         handleAxiosError(error, "Error al leer las direcciones");
         return [];
          
        }
      }

      async create(address: Address): Promise<Response> {
               try {
                const response = await ApiDelivery.post<ResponseApiDelivery>('/address/create', address);
                return ResponseApiMapper.toDomain(response.data);

                
               } catch (error) {
                 const apiError = handleAxiosError(error, "Error al crear la dirección");
                 return ResponseApiMapper.toDomain(apiError)
                
               }
        }

}