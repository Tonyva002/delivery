import { AuthRepositoryImplement } from "../../../Data/repositories/AuthRepositoryImplement";
import { User } from "../../entities/User";

const { register } = new AuthRepositoryImplement();


export const RegisterAuthUserCase = async (user: User) => {
    return await register(user);
}