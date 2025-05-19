import express from "express";
import articleController from "../controllers/article.controller";

const articleRouter = express.Router();

articleRouter.get("/",  articleController.findAll)

export default articleRouter;
