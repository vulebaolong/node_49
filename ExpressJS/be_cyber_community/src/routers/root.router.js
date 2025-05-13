import express from "express"
import demoRouter from "./demo.router"

const rootRouter = express.Router()

// app: http://localhost:3069
// demoRouter: /demo
// demoRouter = app + demoRouter: http://localhost:3069/demo
rootRouter.use("/demo", demoRouter)

export default rootRouter