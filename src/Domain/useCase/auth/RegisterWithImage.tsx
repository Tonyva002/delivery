import { ImagePickerAsset } from "expo-image-picker";
import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";


const { registerWithImage} = new AuthRepositoryImpl;

export const RegisterWithImageAuthUserCase = async (user: User, file: ImagePickerAsset) => {
        return await registerWithImage(user, file);
}