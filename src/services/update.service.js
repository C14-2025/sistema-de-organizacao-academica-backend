import { hashPassword } from "../controller/middleware/bcrypt-hasher.js";

export class UpdateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ userId, data }) {
    if (data.secret) {
      data.secret = hashPassword(data.secret);
    }

    const user = await this.userRepository.update(userId, data);
    return { user };
  }
}
