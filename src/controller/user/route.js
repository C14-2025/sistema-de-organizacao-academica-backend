import { verifyJwt } from "../middleware/verify-jwt.js";
import { create } from "./create.controller.js";
import { findById } from "./find-by-id.controller.js";
import { update } from "./update.controller.js";
import express from "express";

const router = express.Router();

router.get("/my", verifyJwt, findById);
router.post("/", create);
router.post("/auth/create", verifyJwt, create);
router.put("/:userId", verifyJwt, update);
router.get("/verify", verifyJwt);

export { router as userRoutes };
