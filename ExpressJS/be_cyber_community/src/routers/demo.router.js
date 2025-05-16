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
demoRouter.get("/params/:id", demoController.params);

// headers
// Thường sử dụng: token, x-api-key
demoRouter.delete("/headers", demoController.headers);

// body
// sẽ cần middleware: express.json() để chuyển từ dữ liệu JSON => JAVASCRIPT
// Thường sử dụng: khi tạo mới, dữ liệu gửi lên nhiều
demoRouter.post("/body", demoController.body);

demoRouter.get("/mysql2", demoController.mysql2);

demoRouter.get(
   "/sequelize",
   (req, res, next) => {
      const dataMid1 = {
         a: 1,
         b: 1,
         c: 1,
      };

      req.long = dataMid1;
      res.long = dataMid1;

      console.log(`Middleware 1`, dataMid1);

      // chuyển sáng middleware tiếp theo
      next();

      // nếu truyền tham số vào next bất kể là gì ngoại trừ 2 string "route", "router" bật nhảy tới middleware 4 tham số
      // (err, req, res, next) => {} : middleware 4 tham số
      // next(123);

      // nếu truyền vào tham số là: "route"
      // gọi route kế tiếp (url, endpoint) cùng tên, cùng cấp
      // next("route");

      // nếu truyền vào tham số là: "router"
      // gọi router kế tiếp cấp cha (lùi 1 sẹc)
      // next("router");
   },
   (req, res, next) => {
      console.log(`Middleware 2`, req.long, res.long);
      // res.json(`Không hợp lệ`);

      next();
   },
   (req, res, next) => {
      console.log(`Middleware 3`);
      next();
   },
   demoController.sequelize
);
demoRouter.get("/sequelize", (req, res, next) => {
   res.json("sử dụng next('route')");
});

export default demoRouter;
