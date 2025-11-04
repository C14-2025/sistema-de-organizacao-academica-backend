import { hashPassword } from "../../controller/middleware/bcrypt-hasher.js";

export class CreateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, secret }) {
    const hashedSecret = hashPassword(secret);

    const user = await this.userRepository.create({
      email,
      secret: hashedSecret,
    });

    return { user };
  }
}
