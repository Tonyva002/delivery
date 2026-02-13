import { User } from "../entities/User";
import * as ImagePicker from "expo-image-picker";
import { Response } from "../models/Response";

export interface UserRepository {
  getDelivery(): Promise<User[]>;
  updateUser(user: User): Promise<Response>;
  updateUserWithImage(
    user: User,
    file: ImagePicker.ImagePickerAsset,
  ): Promise<Response>;
}
