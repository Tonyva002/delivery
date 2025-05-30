import { UserRepositoryImpl } from "../../../Data/repositories/UserRepository";
import { User } from "../../entities/User";



const { updateWithoutImage } = new UserRepositoryImpl();

export const updateUserWithoutImageUseCase = async(user: User) => {

        return await updateWithoutImage(user);
}