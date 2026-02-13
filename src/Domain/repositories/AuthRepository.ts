import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../entities/User";
import { Response } from "../models/Response";


export interface AuthRepository {
    register(user: User): Promise<Response>;
    login(email: string, password: string): Promise<Response>;
    registerWithImage(user: User, file: ImagePickerAsset): Promise<Response>;

}