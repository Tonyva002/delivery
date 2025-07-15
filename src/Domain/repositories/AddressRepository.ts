import { ResponseApiDelivery } from '../../Data/sources/models/ResponseApiDelivery';
import { Address } from '../entities/Address';
export interface AddressRepository {

        create(address: Address): Promise<ResponseApiDelivery>;
        getByUser(id_user: string): Promise<Address[]>


}