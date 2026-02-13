import { ImagePickerAsset } from "expo-image-picker";
import { AuthRepository } from "../../repositories/AuthRepository";
import { User } from "../../entities/User";

export class RegisterWithImageAuthUserCase {
  constructor(private authRepository: AuthRepository) {}

  execute(user: User, file: ImagePickerAsset) {
    return this.authRepository.registerWithImage(user, file);
  }
}
