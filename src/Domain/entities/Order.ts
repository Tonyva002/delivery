import { Address } from "./Address";
import { Product } from "./Product";
import { User } from "./User";

export interface Order {
        id?: string,
        id_customer: string,
        id_delivery?: string,
        id_address: string,
        status?: string,
        lat?: number,
        lng?: number,
        timestamp?: number,
        customer?: User,
        delivery?: User,
        address?: Address,
        products: Product[]
        

}