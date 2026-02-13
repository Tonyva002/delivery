import { AuthRepository } from "../../repositories/AuthRepository";

export class LoginAuthUseCaseLocal {
  constructor(private authRepository: AuthRepository) {}

  execute(email: string, password: string) {
    return this.authRepository.login(email, password);
  }
}
