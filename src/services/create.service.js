import { hashPassword } from "../controller/middleware/bcrypt-hasher.js";

export class CreateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, secret, role }) {
    const hashedSecret = hashPassword(secret);

    const user = await this.userRepository.create({
      name,
      email,
      secret: hashedSecret,
      role,
    });

    return { user };
  }
}
