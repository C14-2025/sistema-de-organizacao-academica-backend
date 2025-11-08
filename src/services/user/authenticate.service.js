import { comparePassword } from "../../controller/middleware/bcrypt-hasher.js";
import { generate } from "../../controller/middleware/generate-jwt.js";

export class AuthenticateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ email, secret }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = comparePassword(secret, user.secret);

    if (!isPasswordCorrect) {
      throw new Error("Invalid secret");
    }

    const payload = {
      userId: user.id,
      userEmail: user.email,
      accountId: user.accountId,
      userRole: user.role,
    };

    const jwt = await generate(payload);

    return {
      user,
      jwt,
    };
  }
}
