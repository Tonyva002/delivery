import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface UserRepository {
        
        getDelivery(): Promise<User[]>;
        updateWithoutImage(user: User): Promise<ResponseApiDelivery>;
        updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;

}