import { expect, describe, it, beforeEach } from "vitest";
import { UpdateUserService } from "./update.service.js";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository.js";
import { CreateUserService } from "./create.service.js";

let userRepository;
let sut;
let createUserService;

describe("Update User Service", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new UpdateUserService(userRepository);
    createUserService = new CreateUserService(userRepository);
  });

  it("should update an existing user", async () => {
    const { user } = await createUserService.execute({
      name: "User 1",
      email: "user@email.com",
      secret: "secret",
      role: 0,
    });

    const response = await sut.execute({
      userId: user.id,
      data: {
        name: "User Updated",
        email: "new@email.com",
      },
    });

    expect(response.user.id).toBe(user.id);
    expect(response.user.name).toBe("User Updated");
    expect(response.user.email).toBe("new@email.com");
  });

  it("should throw error if user does not exist", async () => {
    await expect(
      sut.execute({
        userId: 999,
        data: { name: "Not Found" },
      })
    ).rejects.toThrow("User not found.");
  });
});
