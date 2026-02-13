import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";
import { UserLocalRepository } from "../../repositories/UserLocalRepository";

export class SaveUserLocalUseCase {
  constructor(private userLocalRepository: UserLocalRepository) {}

  execute(user: User) {
    return this.userLocalRepository.save(user);
  }
}
