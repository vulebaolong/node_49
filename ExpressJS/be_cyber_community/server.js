import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import initModels from "./src/models/init-models";
import rootRouter from "./src/routers/root.router";
import { DATABASE_URL } from "./src/common/constant/app.constant";
import { handleError } from "./src/common/helpers/handle-err.helper";
var app = express();

// middleware
app.use(express.json());

// gắn rootRouter vào app
// app: http://localhost:3069
app.use(rootRouter);
// Middleware gom lỗi và chỉ nên có 1 trong nguyên cả ứng dụng
// Nên để cuối cùng
app.use(handleError);

app.listen(3069, () => {
   console.log(`Server running on port http://localhost:3069`);
});


/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: giúp kéo table vào trong code và tự tạo ra model (DATABASE FIRST),
 * extensionless: giúp import file mà không cần phải thêm đuôi js
 */
