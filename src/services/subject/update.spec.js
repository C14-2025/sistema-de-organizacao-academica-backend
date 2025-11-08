import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { UpdateSubjectService } from "./update.service.js";

let repo;
let sut;

describe("Update Subject Service (with mocks)", () => {
  beforeEach(() => {
    repo = {
      findById: vi.fn(),
      findByCode: vi.fn(),
      update: vi.fn(),
    };
    sut = new UpdateSubjectService(repo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing subject", async () => {
    const existing = {
      id: 1,
      name: "OS",
      code: "SO1",
      professor: "Prof. B",
      userId: 1,
      created: new Date("2025-01-01T00:00:00Z"),
      updated: new Date("2025-01-01T00:00:00Z"),
    };

    const payload = { name: "Operating Systems", code: " os1 " };

    repo.findById.mockResolvedValue({ subject: existing });
    repo.findByCode.mockResolvedValue({ subject: null });
    repo.update.mockResolvedValue({
      subject: {
        ...existing,
        name: "Operating Systems",
        code: "OS1",
        updated: new Date(),
      },
    });

    const res = await sut.execute({ subjectId: existing.id, data: payload });

    expect(res.subject.id).toBe(existing.id);
    expect(res.subject.name).toBe("Operating Systems");
    expect(res.subject.code).toBe("OS1");

    expect(repo.findById).toHaveBeenCalledWith(existing.id);
    expect(repo.findByCode).toHaveBeenCalledWith("OS1");
    expect(repo.update).toHaveBeenCalledWith(existing.id, {
      name: "Operating Systems",
      code: "OS1",
    });
  });

  it("should update when payload has no code (should not call findByCode)", async () => {
    const existing = { id: 1, name: "OS", code: "SO1", userId: 1 };
    const payload = { name: "Operating Systems" };

    repo.findById.mockResolvedValue({ subject: existing });
    repo.update.mockResolvedValue({
      subject: { ...existing, name: "Operating Systems", updated: new Date() },
    });

    const res = await sut.execute({ subjectId: existing.id, data: payload });

    expect(res.subject.name).toBe("Operating Systems");
    expect(repo.findByCode).not.toHaveBeenCalled();
    expect(repo.update).toHaveBeenCalledWith(existing.id, {
      name: "Operating Systems",
    });
  });

  it("should throw error if subject does not exist", async () => {
    repo.findById.mockResolvedValue({ subject: null });

    await expect(
      sut.execute({ subjectId: 999, data: { name: "Not Found" } })
    ).rejects.toThrow("SUBJECT_NOT_FOUND");

    expect(repo.update).not.toHaveBeenCalled();
    expect(repo.findByCode).not.toHaveBeenCalled();
  });

  it("should reject when code already in use by another subject", async () => {
    const existing = { id: 1, userId: 1, name: "OS", code: "SO1" };
    const conflict = { id: 2, userId: 1, name: "DB", code: "OS1" };

    repo.findById.mockResolvedValue({ subject: existing });
    repo.findByCode.mockResolvedValue({ subject: conflict });

    await expect(
      sut.execute({ subjectId: existing.id, data: { code: "  os1 " } })
    ).rejects.toThrow("SUBJECT_CODE_ALREADY_EXISTS");

    expect(repo.update).not.toHaveBeenCalled();
    expect(repo.findByCode).toHaveBeenCalledWith("OS1");
  });
});
