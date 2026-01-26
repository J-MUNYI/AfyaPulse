import express from "express";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validation.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("emailOrPhone").isString().isLength({ min: 4 }),
    body("password").isString().isLength({ min: 6 }),
    body("name").optional().isString()
  ],
  handleValidationErrors,
  register
);

router.post(
  "/login",
  [
    body("emailOrPhone").isString().isLength({ min: 4 }),
    body("password").isString().isLength({ min: 6 })
  ],
  handleValidationErrors,
  login
);

export default router;