import express from "express";
import protect from "../common/middlewares/protect.middleware";
import { chatMessageController } from "../controllers/chat-message.controller";

const chatMessageRouter = express.Router();

// Tạo route CRUD
chatMessageRouter.post("/", chatMessageController.create);
chatMessageRouter.get("/", protect, chatMessageController.findAll);
chatMessageRouter.get("/:id", chatMessageController.findOne);
chatMessageRouter.patch("/:id", chatMessageController.update);
chatMessageRouter.delete("/:id", chatMessageController.remove);

export default chatMessageRouter;
