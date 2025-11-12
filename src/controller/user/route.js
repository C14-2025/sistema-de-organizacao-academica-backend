import { verifyJwt } from "../middleware/verify-jwt.js";
import { authenticate } from "./authenticate.controller.js";
import { create } from "./create.controller.js";
import { findById } from "./find-by-id.controller.js";
import { update } from "./update.controller.js";
import { validateToken } from "./validate-token.controller.js";
import express from "express";

const router = express.Router();

router.get("/my", verifyJwt, findById);
router.post("/", create);
router.post("/auth", authenticate);
router.put("/:userId", verifyJwt, update);
router.get("/verify", verifyJwt, validateToken);

export { router as userRoutes };
