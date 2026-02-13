import { UserRepository } from "../../repositories/UserRepository";

export class GetDeliveryUseCase {
  constructor(private userRepository: UserRepository) {}

  execute() {
    return this.userRepository.getDelivery();
  }
}
