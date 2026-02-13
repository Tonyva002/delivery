
import { AuthRepository } from "../../repositories/AuthRepository";
import { User } from "../../entities/User";

export class RegisterAuthUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(user: User) {
    return this.authRepository.register(user);
  }
}
