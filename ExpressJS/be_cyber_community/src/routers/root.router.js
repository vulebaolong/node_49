import express from "express";
import demoRouter from "./demo.router";
import articleRouter from "./article.router";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import permissionRouter from "./permission.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger";
import userRouter from "./user.router";
import chatGroupRouter from "./chat-group.router";
import chatMessageRouter from "./chat-message.router";

const rootRouter = express.Router();

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get(
   "/api-docs",
   swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
         persistAuthorization: true,
      },
   })
);

// app: http://localhost:3069
// demoRouter: /demo
// demoRouter = app + demoRouter: http://localhost:3069/demo
rootRouter.use("/demo", demoRouter);
rootRouter.use("/demo", (req, res, next) => {
   res.json(`sử dụng next('router')`);
});

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/role", roleRouter);
rootRouter.use("/permission", permissionRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat-group", chatGroupRouter);
rootRouter.use("/chat-message", chatMessageRouter);

export default rootRouter;
