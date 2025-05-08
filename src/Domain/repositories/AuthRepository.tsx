import { ImagePickerAsset } from "expo-image-picker";
import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { User } from "../entities/User";


export interface AuthRepository {
    register(user: User): Promise<ResponseApiDelivery>;
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    registerWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery>;

}