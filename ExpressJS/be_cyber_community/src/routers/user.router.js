import express from "express";
import { userController } from "../controllers/user.controller";
import uploadLocal from "../common/multer/local.multer";
import protect from "../common/middlewares/protect.middleware";
import uploadcloud from "../common/multer/cloud.multer";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

userRouter.post("/avatar-local", protect, uploadLocal.single("avatar"), userController.avatarLocal);
userRouter.post("/avatar-cloud", protect, uploadcloud.single("avatar"), userController.avatarCloud);

export default userRouter;
