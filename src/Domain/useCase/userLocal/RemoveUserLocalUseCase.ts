import { UserLocalRepository } from "../../repositories/UserLocalRepository";

export class RemoveUserLocalUseCase {
  constructor(private userLocalRepository: UserLocalRepository) {}

  execute() {
    return this.userLocalRepository.remove();
  }
}
