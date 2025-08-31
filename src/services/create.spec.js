import { expect, describe, it, beforeEach } from "vitest";
import { CreateUserService } from "./create.service.js";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository";

let userRepository;
let sut;

describe("Create User Service", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserService(userRepository);
  });

  it("should create a user", async () => {
    const response = await sut.execute({
      name: "User 1",
      email: "user@email.com",
      secret: "secret",
      role: 0,
    });

    expect(response.user.id).toBe(1);
    expect(response.user.name).toBe("User 1");
    expect(response.user.email).toBe("user@email.com");
    expect(response.user.secret).not.toBe("secret");
  });
});
