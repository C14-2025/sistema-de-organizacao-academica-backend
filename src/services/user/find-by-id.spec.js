import { expect, describe, it, beforeEach } from "vitest";
import { FindByIdService } from "./find-by-id.service.js";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user-repository.js";
import { CreateUserService } from "./create.service.js";

let userRepository;
let sut;
let createUserService;

describe("Find By Id Service", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new FindByIdService(userRepository);
    createUserService = new CreateUserService(userRepository);
  });

  it("should return a user by id", async () => {
    const { user } = await createUserService.execute({
      email: "user@email.com",
      secret: "secret",
    });

    const response = await sut.execute(user.id);

    expect(response.user).not.toBeNull();
    expect(response.user.id).toBe(user.id);
  });

  it("should return null if user does not exist", async () => {
    const response = await sut.execute(999);
    expect(response.user).toBeNull();
  });
});
