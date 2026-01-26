import express from "express";
import { body, query as q } from "express-validator";
import { authMiddleware } from "../middleware/auth.js";
import { handleValidationErrors } from "../middleware/validation.js";
import { createCheckin, listCheckins } from "../controllers/checkinController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("profileId").isInt(),
    body("date").isISO8601(), // 'YYYY-MM-DD'
    body("energy").isInt({ min: 1, max: 5 }),
    body("sleepQuality").isIn(["good", "ok", "bad"]),
    body("appetite").isIn(["normal", "low", "high"]),
    body("symptoms").optional().isArray(),
    body("medications").optional().isArray()
  ],
  handleValidationErrors,
  createCheckin
);

router.get(
  "/",
  authMiddleware,
  [
    q("profileId").isInt(),
    q("from").isISO8601(),
    q("to").isISO8601()
  ],
  handleValidationErrors,
  listCheckins
);

export default router;