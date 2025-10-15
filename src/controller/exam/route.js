import { verifyJwt } from "../middleware/verify-jwt.js";
import { create } from "./create.controller.js";
import { findById } from "./find-by-id.controller.js";
import { findByUserId } from "./find-by-user-id.controller.js";
import { update } from "./update.controller.js";
import { remove } from "./delete.controller.js";
import express from "express";

const router = express.Router();

router.post("/", verifyJwt, create);
router.get("/", verifyJwt, findByUserId);
router.get("/:examId", verifyJwt, findById);
router.put("/:examId", verifyJwt, update);
router.delete("/:examId", verifyJwt, remove);

export { router as examRoutes };
