import express from "express";
import articleController from "../controllers/article.controller";
import protect from "../common/middlewares/protect.middleware";
import checkPermision from "../common/middlewares/check-permission.middleware";

const articleRouter = express.Router();

articleRouter.get("/", protect, checkPermision, articleController.findAll);

export default articleRouter;
