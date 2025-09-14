import { vi, expect, describe, it, beforeEach, afterEach } from "vitest";
import { UpdateUserService } from "./update.service.js";

let mockUserRepository;
let sut;

describe("Update User Service", () => {
  
  beforeEach(() => {
    mockUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn(),
      update: vi.fn(),
    };

    sut = new UpdateUserService(mockUserRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing user", async () => {
    const existingUser = {
      id: 1,
      name: "User 1",
      email: "user@email.com",
      secret: "secret",
      role: 0,
      created: new Date(),
      updated: new Date(),
    };

    const updatedUser = {
      ...existingUser,
      name: "User Updated",
      email: "new@email.com",
      updated: new Date(),
    };

    mockUserRepository.findById.mockResolvedValue(existingUser);
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.update.mockResolvedValue(updatedUser);

    const response = await sut.execute({
      userId: existingUser.id,
      data: {
        name: "User Updated",
        email: "new@email.com",
      },
    });

    expect(response.user.id).toBe(existingUser.id);
    expect(response.user.name).toBe("User Updated");
    expect(response.user.email).toBe("new@email.com");
  });
});
