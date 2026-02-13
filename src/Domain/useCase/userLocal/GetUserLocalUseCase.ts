import { UserLocalRepository } from "../../repositories/UserLocalRepository";

export class GetUserLocalUseCase {
  constructor(private userLocalRepository: UserLocalRepository) {}

  execute() {
    return this.userLocalRepository.getUser();
  }
}
