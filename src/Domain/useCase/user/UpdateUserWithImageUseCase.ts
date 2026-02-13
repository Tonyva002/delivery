import { ImagePickerAsset } from "expo-image-picker";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

export class UpdateUserWithImageUseCase {
  constructor(private userRepository: UserRepository) {}
  execute(user: User, file: ImagePickerAsset) {
    return this.userRepository.updateUserWithImage(user, file);
  }
}
