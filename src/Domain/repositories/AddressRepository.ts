import { Address } from '../entities/Address';
import { Response } from '../models/Response';
export interface AddressRepository {

        create(address: Address): Promise<Response>;
        getByUser(id_user: string): Promise<Address[]>


}