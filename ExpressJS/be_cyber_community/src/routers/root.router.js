import express from "express"
import demoRouter from "./demo.router"
import articleRouter from "./article.router"

const rootRouter = express.Router()

// app: http://localhost:3069
// demoRouter: /demo
// demoRouter = app + demoRouter: http://localhost:3069/demo
rootRouter.use("/demo", demoRouter)
rootRouter.use("/demo", (req, res, next) => { res.json(`sử dụng next('router')`) })

rootRouter.use("/article", articleRouter)

export default rootRouter