import express from "express";
import demoController from "../controllers/demo.controller";

const demoRouter = express.Router();
// demoRouter = app + demoRouter: http://localhost:3069/demo
// GET: /hello-world
// ENDPOINT: demoRouter + GET: http://localhost:3069/demo/hello-world
demoRouter.get("/hello-world", demoController.helloWorld);


// 4 cách nhận dữ liệu từ FE (hê thống khác)
// Query
// Cách nhận biết: bắt đầu bằng dấu chẩm hỏi (?), phân tách biến bằng dấu và (&)
// Thường sử dụng: phân trang, lọc, tim kiếm
demoRouter.get("/query", demoController.query);

// Params
// Cách nhận biết: bắt đầu bằng dấu sẹc (/:id)
// Thường sử dụng: để lấy thông tin chi tiết của một item (detail)
demoRouter.get("/params/:id",demoController.params );

// headers
// Thường sử dụng: token, x-api-key
demoRouter.delete("/headers", demoController.headers);

// body
// sẽ cần middleware: express.json() để chuyển từ dữ liệu JSON => JAVASCRIPT
// Thường sử dụng: khi tạo mới, dữ liệu gửi lên nhiều
demoRouter.post("/body", demoController.body);

demoRouter.get("/mysql2", demoController.mysql2);

demoRouter.get("/sequelize", demoController.sequelize);

export default demoRouter;
