import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { UpdateWorkService } from "./update.service.js";

let repo;
let sut;

const work = (overrides = {}) => ({
  id: 1,
  title: "Initial Title",
  description: "Initial Description",
  userId: 1,
  subjectId: 1,
  deadline: new Date("2025-01-10T00:00:00Z"),
  createdAt: new Date("2025-01-01T00:00:00Z"),
  updatedAt: new Date("2025-01-01T00:00:00Z"),
  ...overrides,
});

describe("Update Work Service (mocked)", () => {
  beforeEach(() => {
    repo = { findById: vi.fn(), update: vi.fn() };
    sut = new UpdateWorkService(repo);
  });

  afterEach(() => vi.clearAllMocks());

  it("atualiza quando existir (trim + preserva imutáveis + chama repo corretamente)", async () => {
    const existing = work();
    const patch = { title: "  Updated Title  ", description: "  Updated Description  " };

    repo.findById.mockResolvedValue(existing);
    repo.update.mockImplementation(async (_id, data) => ({
      ...existing, ...data, updatedAt: new Date(),
    }));

    const { work: out } = await sut.execute({ workId: existing.id, data: patch });

    expect(repo.findById).toHaveBeenCalledWith(existing.id);
    expect(repo.update).toHaveBeenCalledTimes(1);

    const saved = repo.update.mock.calls[0][1];
    expect(saved.title).toBe("Updated Title");
    expect(saved.description).toBe("Updated Description");
    expect(saved.id).toBeUndefined();

    expect(repo.update).toHaveBeenCalledWith(
      existing.id,
      expect.objectContaining({ title: "Updated Title", description: "Updated Description" })
    );
    expect(repo.update).toHaveBeenCalledWith(
      existing.id,
      expect.not.objectContaining({ id: expect.anything(), userId: expect.anything(), subjectId: expect.anything() })
    );

    expect(out.id).toBe(existing.id);
    expect(out.title).toBe("Updated Title");
  });

  it("não chama update quando o work não existir", async () => {
    repo.findById.mockResolvedValue(null);

    await expect(sut.execute({ workId: 999, data: { title: "X" } }))
      .rejects.toThrow("Work not found.");

    expect(repo.update).not.toHaveBeenCalled();
  });

  it("patch parcial: ignora undefined (não sobrescreve valores atuais)", async () => {
    const existing = work({ description: "KeepMe" });
    const patch = { title: "New Title", description: undefined };

    repo.findById.mockResolvedValue(existing);
    repo.update.mockImplementation(async (_id, data) => ({ ...existing, ...data }));

    const { work: out } = await sut.execute({ workId: existing.id, data: patch });

    const saved = repo.update.mock.calls[0][1];
    expect(saved.title).toBe("New Title");
    expect(saved).not.toHaveProperty("description"); 
    expect(out.description).toBe("KeepMe");
  });

  it("protege campos imutáveis mesmo se vierem no patch", async () => {
    const existing = work();
    const patch = { id: 999, userId: 77, subjectId: 55, title: "Safe Update" };

    repo.findById.mockResolvedValue(existing);
    repo.update.mockImplementation(async (_id, data) => ({ ...existing, ...data }));

    await sut.execute({ workId: existing.id, data: patch });

    const saved = repo.update.mock.calls[0][1];
    expect(saved.id).toBeUndefined();
    expect(saved.title).toBe("Safe Update");

    expect(repo.update).toHaveBeenCalledWith(
      existing.id,
      expect.not.objectContaining({ id: expect.anything(), userId: expect.anything(), subjectId: expect.anything() })
    );
  });

  it("propaga erro de infraestrutura do repo.update", async () => {
    const existing = work();
    repo.findById.mockResolvedValue(existing);
    repo.update.mockRejectedValue(new Error("db down"));

    await expect(sut.execute({ workId: existing.id, data: { title: "Any" } }))
      .rejects.toThrow("db down");
  });
});
