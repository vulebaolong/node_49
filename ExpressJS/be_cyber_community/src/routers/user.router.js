import express from "express";
import { userController } from "../controllers/user.controller";

import multer from "multer";
const upload = multer({ dest: "images/" });

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

userRouter.post("/avatar-local", upload.single("avatar"), userController.avatarLocal);
userRouter.post("/avatar-cloud", userController.avatarCloud);

export default userRouter;
