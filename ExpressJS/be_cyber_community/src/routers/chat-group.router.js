import express from "express";
import { chatGroupController } from "../controllers/chat-group.controller";
import protect from "../common/middlewares/protect.middleware";

const chatGroupRouter = express.Router();

// Tạo route CRUD
chatGroupRouter.post("/", chatGroupController.create);
chatGroupRouter.get("/", protect, chatGroupController.findAll);
chatGroupRouter.get("/:id", chatGroupController.findOne);
chatGroupRouter.patch("/:id", chatGroupController.update);
chatGroupRouter.delete("/:id", chatGroupController.remove);

export default chatGroupRouter;
