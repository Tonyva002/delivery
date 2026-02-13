import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(user: User) {
    return this.userRepository.updateUser(user);
  }
}
